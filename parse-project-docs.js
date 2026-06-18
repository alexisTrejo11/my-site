#!/usr/bin/env node
/**
 * parse-project-docs.js
 *
 * Manual sync script: reads Obsidian markdown project docs (YAML frontmatter),
 * assembles each project into the portfolio schema, and writes JSON artifacts:
 *
 *   public/data/projects-catalog.json   → lightweight list for home / projects list
 *   public/data/projects/{projectId}.json → full Project + docs per project
 *
 * Run when you want to sync (not wired into ng build):
 *   node parse-project-docs.js
 *   npm run parse-projects
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// ─── Configuration ────────────────────────────────────────────────────────────

/**
 * Absolute paths to each project's docs folder.
 * Every folder must contain the same section files (see SECTION_FILES below).
 *
 * Example:
 *   '/Users/alexis/Documents/personal_projects/bank/bank-api/docs/project',
 *   '/Users/alexis/Documents/personal_projects/me/test/source',
 */
const PROJECT_DOCS_PATHS = [
  '/Users/alexis/Documents/personal_projects/bank/bank-api/docs/project/source',
  '/Users/alexis/Documents/personal_projects/company/company-expenses-api/docs/project/source',
  '/Users/alexis/Documents/personal_projects/cooking/cooking-recipes-app/recipe-back-end/docs/project/source',
  '/Users/alexis/Documents/personal_projects/restaurant/restaurant-managemenet-api/docs/source',
  '/Users/alexis/Documents/personal_projects/marketing/marketing-company-api/docs/project/source',
  '/Users/alexis/Documents/personal_projects/mind-care/mind-care-company-api/docs/project/source',
  '/Users/alexis/Documents/personal_projects/social-events/social-events-api/docs/project/source',
  '/Users/alexis/Documents/personal_projects/tourist-places/tourist-places-api/docs/source',
  '/Users/alexis/Documents/personal_projects/pimienta-alimentos/backend/docs/project/source',
  '/Users/alexis/Documents/personal_projects/vet-clinic/veterinary-clinic-api/docs/project/source',
  // Microservices
  '/Users/alexis/Documents/personal_projects/cinema/cinema-plattform/docs/project/source',
  '/Users/alexis/Documents/personal_projects/architecture/architecture-college-plattform/docs/project/source',
  '/Users/alexis/Documents/personal_projects/drugstore/drugstore-platform/docs/project/source',
];

/** Remove JSON files in public/data/projects/ that were not produced in this run. */
const CLEAN_ORPHAN_PROJECTS = true;

const CATALOG_OUTPUT = path.resolve(__dirname, 'public/data/projects-catalog.json');
const PROJECTS_LIST_OUTPUT = path.resolve(__dirname, 'public/data/projects.json');
const PROJECTS_OUTPUT_DIR = path.resolve(__dirname, 'public/data/projects');

/** Section filenames shared by every project docs folder. */
const SECTION_FILES = {
  metadata: 'ProjectMetadata.md',
  overview: 'ProjectOverview.md',
  architecture: 'ProjectArchitecture.md',
  codeShowcase: 'ProjectCodeShowCase.md',
  features: 'ProjectFeature.md',
  infrastructure: 'ProjectInfrastructure.md',
  apiSchema: 'APISchema.md',
};

const METADATA_FIELDS = [
  'projectId',
  'featured',
  'name',
  'language',
  'category',
  'framework',
  'version',
  'repositoryUrl',
  'liveDemoUrl',
  'description',
  'techStack',
  'status',
  'createdAt',
  'updatedAt',
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function readSectionFrontmatter(sourceDir, fileName) {
  const filePath = path.join(sourceDir, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${fileName}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);

  if (!parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) {
    throw new Error(`Invalid or empty YAML frontmatter in ${fileName}`);
  }

  return parsed.data;
}

function pickMetadata(frontmatter) {
  const metadata = {};

  for (const field of METADATA_FIELDS) {
    if (frontmatter[field] !== undefined) {
      metadata[field] = frontmatter[field];
    }
  }

  return metadata;
}

function buildCatalogEntry(project) {
  const entry = pickMetadata(project);
  entry.dataFile = `data/projects/${project.projectId}.json`;
  return entry;
}

function parseProjectFolder(sourceDir) {
  const metadataFm = readSectionFrontmatter(sourceDir, SECTION_FILES.metadata);
  const metadata = pickMetadata(metadataFm);

  if (!metadata.projectId?.trim()) {
    throw new Error(`Missing required field "projectId" in ${SECTION_FILES.metadata}`);
  }

  const docs = {
    overview: readSectionFrontmatter(sourceDir, SECTION_FILES.overview),
    architecture: readSectionFrontmatter(sourceDir, SECTION_FILES.architecture),
    codeShowcase: readSectionFrontmatter(sourceDir, SECTION_FILES.codeShowcase),
    features: readSectionFrontmatter(sourceDir, SECTION_FILES.features),
    infrastructure: readSectionFrontmatter(sourceDir, SECTION_FILES.infrastructure),
    apiSchema: readSectionFrontmatter(sourceDir, SECTION_FILES.apiSchema),
  };

  return { ...metadata, docs };
}

function removeOrphanProjectFiles(activeProjectIds) {
  if (!fs.existsSync(PROJECTS_OUTPUT_DIR)) {
    return 0;
  }

  const activeIds = new Set(activeProjectIds);
  let removed = 0;

  for (const entry of fs.readdirSync(PROJECTS_OUTPUT_DIR)) {
    if (!entry.endsWith('.json')) continue;

    const projectId = entry.replace(/\.json$/, '');
    if (activeIds.has(projectId)) continue;

    fs.unlinkSync(path.join(PROJECTS_OUTPUT_DIR, entry));
    console.log(`  🗑️  Removed orphan: ${entry}`);
    removed++;
  }

  return removed;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function processProjectDocs() {
  console.log('\n📂  Project Docs Sync — parse-project-docs.js');
  console.log('────────────────────────────────────────────────');
  console.log(`    Sources : ${PROJECT_DOCS_PATHS.length} path(s) configured`);
  console.log(`    Catalog : ${CATALOG_OUTPUT}`);
  console.log(`    Projects: ${PROJECTS_OUTPUT_DIR}`);
  console.log('────────────────────────────────────────────────\n');

  if (PROJECT_DOCS_PATHS.length === 0) {
    console.error('❌  No source paths configured.');
    console.error('    Add folder paths to PROJECT_DOCS_PATHS at the top of parse-project-docs.js');
    process.exit(1);
  }

  ensureDir(path.dirname(CATALOG_OUTPUT));
  ensureDir(PROJECTS_OUTPUT_DIR);

  const catalog = [];
  const projects = [];
  const seenProjectIds = new Set();
  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const sourcePath of PROJECT_DOCS_PATHS) {
    const resolvedPath = path.resolve(sourcePath);
    const label = path.basename(resolvedPath);

    if (!fs.existsSync(resolvedPath)) {
      console.warn(`⚠️  Path not found — skipping: ${resolvedPath}`);
      skipped++;
      continue;
    }

    if (!fs.statSync(resolvedPath).isDirectory()) {
      console.warn(`⚠️  Not a directory — skipping: ${resolvedPath}`);
      skipped++;
      continue;
    }

    let project;
    try {
      project = parseProjectFolder(resolvedPath);
    } catch (err) {
      console.warn(`⚠️  Failed to parse [${label}]: ${err.message}`);
      failed++;
      continue;
    }

    if (seenProjectIds.has(project.projectId)) {
      console.warn(
        `⚠️  Duplicate projectId "${project.projectId}" — skipping: ${resolvedPath}`,
      );
      failed++;
      continue;
    }

    seenProjectIds.add(project.projectId);

    const outputPath = path.join(PROJECTS_OUTPUT_DIR, `${project.projectId}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(project, null, 2), 'utf-8');

    catalog.push(buildCatalogEntry(project));
    projects.push(project);
    console.log(`  ✅  ${project.projectId} ← ${resolvedPath}`);
    success++;
  }

  catalog.sort((a, b) => a.name.localeCompare(b.name));
  projects.sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(CATALOG_OUTPUT, JSON.stringify(catalog, null, 2), 'utf-8');
  fs.writeFileSync(PROJECTS_LIST_OUTPUT, JSON.stringify(projects, null, 2), 'utf-8');

  let orphansRemoved = 0;
  if (CLEAN_ORPHAN_PROJECTS && success > 0) {
    orphansRemoved = removeOrphanProjectFiles([...seenProjectIds]);
  }

  console.log('\n────────────────────────────────────────────────');
  console.log(`  📦  Catalog → ${path.relative(__dirname, CATALOG_OUTPUT)}`);
  console.log(`  📦  List    → ${path.relative(__dirname, PROJECTS_LIST_OUTPUT)}`);
  console.log(`  ✅  Synced    : ${success} project(s)`);
  if (skipped > 0) console.log(`  ⏭️   Skipped   : ${skipped} path(s) (not found / not a dir)`);
  if (failed > 0) console.warn(`  ⚠️   Failed    : ${failed} project(s)`);
  if (orphansRemoved > 0) console.log(`  🗑️   Orphans   : ${orphansRemoved} removed`);
  console.log('────────────────────────────────────────────────\n');

  if (success === 0) {
    process.exit(1);
  }
}

processProjectDocs();
