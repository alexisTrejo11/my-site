#!/usr/bin/env node
/**
 * parse-vault.js
 *
 * Preprocessor script: reads the Obsidian markdown vault, extracts published
 * notes' frontmatter metadata, and outputs two artifacts:
 *
 *   public/data/notes-catalog.json          → master metadata catalog
 *   public/notes/{subcategory}/{slug}.md    → clean content (no YAML block)
 *
 * Run with:  node parse-vault.js
 *        or: npm run parse-vault
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// ─── Configuration ────────────────────────────────────────────────────────────

const VAULT_PATH = path.resolve(__dirname, '../../../obsidan/myDevLearningVault');

const CATALOG_OUTPUT = path.resolve(__dirname, 'public/data/notes-catalog.json');
const NOTES_OUTPUT_DIR = path.resolve(__dirname, 'public/notes');

/** Remove markdown files in public/notes/ that were not produced in this run. */
const CLEAN_ORPHAN_NOTES = true;

const SKIP_DIRS = new Set(['.obsidian', '00_System', '.trash']);

/** Skip vault-root files that are templates, daily notes, or scratch pads. */
const SKIP_ROOT_FILE = /^(Template_Tech_Note|Untitled|\d{4}-\d{2}-\d{2})\.md$/i;

const TOP_CATEGORY = {
  '01_Fundamentals': 'fundamentals',
  '02_Languages': 'languages',
  '03_Backend': 'backend',
  '04_DevOps_Cloud': 'devops',
  '05_Databases': 'databases',
  '07_Data_Science_and_AI': 'data-science',
};

const SUBCATEGORY_HINTS = [
  ['Spring_Boot', 'spring-boot'],
  ['FastAPI', 'fastapi'],
  ['Django', 'django'],
  ['PostgreSQL', 'postgresql'],
  ['Redis', 'redis'],
  ['MongoDB', 'mongodb'],
  ['Kafka', 'kafka'],
  ['Java', 'java'],
  ['Python', 'python'],
  ['JavaScript', 'javascript'],
  ['Go', 'go'],
  ['CSharp', 'csharp'],
  ['AWS', 'aws'],
  ['Kubernetes', 'kubernetes'],
  ['Docker', 'docker'],
  ['Linux', 'linux'],
  ['Networking', 'networking'],
  ['Computer_Architecture', 'computer-architecture'],
  ['Operating_Systems', 'operating-systems'],
  ['Software_Engineer', 'software-engineer'],
  ['PyTorch', 'pytorch'],
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function shouldSkipFile(filePath) {
  const rel = path.relative(VAULT_PATH, filePath);
  const parts = rel.split(path.sep);

  if (parts.length === 1 && SKIP_ROOT_FILE.test(parts[0])) {
    return true;
  }

  return parts.some((part) => part.startsWith('.'));
}

function walkDir(dir, collected = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.warn(`⚠️  Cannot read directory: ${dir}\n   ${err.message}`);
    return collected;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;
      walkDir(path.join(dir, entry.name), collected);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const fullPath = path.join(dir, entry.name);
      if (!shouldSkipFile(fullPath)) {
        collected.push(fullPath);
      }
    }
  }

  return collected;
}

function inferCategory(relPath) {
  const top = relPath.split(path.sep)[0];
  if (TOP_CATEGORY[top]) return TOP_CATEGORY[top];
  if (top) return top.replace(/^\d+_/, '').replace(/_/g, '-').toLowerCase();
  return 'general';
}

function inferSubcategory(relPath) {
  for (const [hint, sub] of SUBCATEGORY_HINTS) {
    if (relPath.includes(hint)) return sub;
  }

  const parts = relPath.split(path.sep);
  if (parts.length >= 2) {
    const seg = parts[1];
    return seg.replace(/^\d+_/, '').replace(/_/g, '-').toLowerCase();
  }

  return inferCategory(relPath);
}

function normalizeHeading(text) {
  return String(text ?? '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function descriptionsMatch(a, b) {
  const left = normalizeHeading(a);
  const right = normalizeHeading(b);
  if (!left || !right) return false;
  return left === right || left.includes(right) || right.includes(left);
}

function stripDuplicateNoteHeader(content, title, description) {
  const lines = content.replace(/^\n+/, '').split('\n');
  let index = 0;

  const h1 = lines[index]?.match(/^#\s+(.+)$/);
  if (h1 && title && normalizeHeading(h1[1]) === normalizeHeading(title)) {
    index++;
    while (index < lines.length && lines[index].trim() === '') index++;
  }

  if (description?.trim()) {
    const quoteParts = [];
    let quoteIndex = index;

    while (quoteIndex < lines.length && lines[quoteIndex].startsWith('>')) {
      quoteParts.push(lines[quoteIndex].replace(/^>\s?/, '').trim());
      quoteIndex++;
    }

    const quote = quoteParts.join(' ').trim();
    if (quote && descriptionsMatch(quote, description)) {
      index = quoteIndex;
      while (index < lines.length && lines[index].trim() === '') index++;
    }
  }

  return lines.slice(index).join('\n').replace(/^\n+/, '');
}

function normalizeLinkKey(name) {
  return name
    .replace(/\.md$/i, '')
    .replace(/^\d+[-_]/, '')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

function buildWikilinkIndex(entries) {
  const index = new Map();

  for (const entry of entries) {
    index.set(entry.slug, entry.slug);
    index.set(normalizeLinkKey(entry.slug), entry.slug);
    index.set(normalizeLinkKey(entry.title), entry.slug);

    const stem = path.basename(entry.sourcePath, '.md');
    index.set(normalizeLinkKey(stem), entry.slug);
  }

  return index;
}

function resolveWikilink(target, wikilinkIndex) {
  const raw = target.trim();
  if (!raw) return null;

  const normalized = normalizeLinkKey(raw);
  return wikilinkIndex.get(raw) ?? wikilinkIndex.get(normalized) ?? null;
}

function rewriteWikilinks(content, wikilinkIndex) {
  return content.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g, (match, target, alias) => {
    const slug = resolveWikilink(target, wikilinkIndex);
    const label = (alias ?? target.replace(/\.md$/i, '').replace(/^\d+[-_]/, '').replace(/_/g, ' ')).trim();

    if (slug) {
      return `[${label}](/learning/${slug})`;
    }

    return label;
  });
}

function removeOrphanNoteFiles(activeRelativePaths) {
  if (!fs.existsSync(NOTES_OUTPUT_DIR)) {
    return 0;
  }

  const active = new Set(activeRelativePaths);
  let removed = 0;

  function walkNotes(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkNotes(fullPath);
        continue;
      }

      if (!entry.name.endsWith('.md')) continue;

      const rel = path.relative(NOTES_OUTPUT_DIR, fullPath).split(path.sep).join('/');
      if (active.has(rel)) continue;

      fs.unlinkSync(fullPath);
      console.log(`  🗑️  Removed orphan: notes/${rel}`);
      removed++;
    }
  }

  walkNotes(NOTES_OUTPUT_DIR);
  return removed;
}

function pruneEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      pruneEmptyDirs(path.join(dir, entry.name));
    }
  }

  if (dir !== NOTES_OUTPUT_DIR && fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function processVault() {
  console.log('\n📂  Vault Scanner — parse-vault.js');
  console.log('────────────────────────────────────');
  console.log(`    Source : ${VAULT_PATH}`);
  console.log(`    Catalog: ${CATALOG_OUTPUT}`);
  console.log(`    Notes  : ${NOTES_OUTPUT_DIR}`);
  console.log('────────────────────────────────────\n');

  if (!fs.existsSync(VAULT_PATH)) {
    console.error(`❌  Vault path not found: ${VAULT_PATH}`);
    console.error('    Update the VAULT_PATH constant at the top of parse-vault.js');
    process.exit(1);
  }

  const allFiles = walkDir(VAULT_PATH);
  const draftEntries = [];
  let skipped = 0;
  let errors = 0;

  for (const filePath of allFiles) {
    let parsed;
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      parsed = matter(raw);
    } catch (err) {
      console.warn(`⚠️  Malformed YAML — skipping: ${path.relative(VAULT_PATH, filePath)}`);
      console.warn(`    ${err.message}\n`);
      errors++;
      continue;
    }

    const fm = parsed.data;
    if (fm.status !== 'published') {
      skipped++;
      continue;
    }

    const relPath = path.relative(VAULT_PATH, filePath);
    const title = fm.title ?? path.basename(filePath, '.md').replace(/_/g, ' ');
    const category = fm.category ?? inferCategory(relPath);
    const subcategory = fm.subcategory || inferSubcategory(relPath);
    const slug = fm.slug ?? normalizeLinkKey(path.basename(filePath, '.md'));

    if (!slug || !subcategory) {
      console.warn(
        `⚠️  Missing slug/subcategory — skipping: ${relPath}`
      );
      skipped++;
      continue;
    }

    draftEntries.push({
      title,
      category,
      subcategory,
      slug,
      difficulty: fm.difficulty ?? 'beginner',
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      description: fm.description ?? '',
      sourcePath: filePath,
      content: parsed.content.replace(/^\n+/, ''),
    });
  }

  const slugOwners = new Map();
  const entries = [];

  for (const entry of draftEntries) {
    if (slugOwners.has(entry.slug)) {
      console.warn(
        `⚠️  Duplicate slug "${entry.slug}" — skipping: ${path.relative(VAULT_PATH, entry.sourcePath)}`
      );
      console.warn(`    First defined by: ${path.relative(VAULT_PATH, slugOwners.get(entry.slug))}\n`);
      skipped++;
      continue;
    }

    slugOwners.set(entry.slug, entry.sourcePath);
    entries.push(entry);
  }

  const wikilinkIndex = buildWikilinkIndex(entries);
  const catalog = [];
  const activeNotePaths = [];
  ensureDir(NOTES_OUTPUT_DIR);

  for (const entry of entries) {
    const rewritten = stripDuplicateNoteHeader(
      rewriteWikilinks(entry.content, wikilinkIndex),
      entry.title,
      entry.description,
    );
    const destDir = path.join(NOTES_OUTPUT_DIR, entry.subcategory);
    ensureDir(destDir);

    const relativePath = `${entry.subcategory}/${entry.slug}.md`;
    fs.writeFileSync(path.join(NOTES_OUTPUT_DIR, relativePath), rewritten, 'utf-8');
    activeNotePaths.push(relativePath);

    catalog.push({
      title: entry.title,
      category: entry.category,
      subcategory: entry.subcategory,
      slug: entry.slug,
      difficulty: entry.difficulty,
      tags: entry.tags,
      description: entry.description,
      filePath: `notes/${relativePath}`,
    });

    console.log(`  ✅  [${entry.category}/${entry.subcategory}] ${entry.slug}`);
  }

  catalog.sort((a, b) => {
    const cat = a.category.localeCompare(b.category);
    if (cat !== 0) return cat;
    const sub = a.subcategory.localeCompare(b.subcategory);
    if (sub !== 0) return sub;
    return a.title.localeCompare(b.title);
  });

  ensureDir(path.dirname(CATALOG_OUTPUT));
  fs.writeFileSync(CATALOG_OUTPUT, JSON.stringify(catalog, null, 2), 'utf-8');

  let orphansRemoved = 0;
  if (CLEAN_ORPHAN_NOTES) {
    orphansRemoved = removeOrphanNoteFiles(activeNotePaths);
    pruneEmptyDirs(NOTES_OUTPUT_DIR);
  }

  console.log('\n────────────────────────────────────');
  console.log(`  📦  Catalog → ${path.relative(__dirname, CATALOG_OUTPUT)}`);
  console.log(`  ✅  Published : ${catalog.length} notes`);
  console.log(`  ⏭️   Skipped   : ${skipped} files (draft / invalid / duplicate)`);
  if (errors > 0) console.warn(`  ⚠️   YAML errors: ${errors} files`);
  if (orphansRemoved > 0) console.log(`  🗑️   Orphans   : ${orphansRemoved} removed`);
  console.log('────────────────────────────────────\n');

  if (catalog.length === 0) {
    process.exit(1);
  }
}

processVault();
