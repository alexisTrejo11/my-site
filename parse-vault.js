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

// Path to your Obsidian vault's backend section, relative to this script.
// Adjust if your vault lives elsewhere.
const VAULT_PATH = path.resolve(__dirname, '../../../obsidian/myDevLearningVault/03_Backend');

const CATALOG_OUTPUT = path.resolve(__dirname, 'public/data/notes-catalog.json');
const NOTES_OUTPUT_DIR = path.resolve(__dirname, 'public/notes');

// Directories to skip during traversal (hidden dirs + Obsidian system folders).
const SKIP_DIRS = new Set(['.obsidian', '00_System']);

// ─── Utilities ────────────────────────────────────────────────────────────────

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Recursively walks a directory and collects all .md file paths,
 * skipping hidden directories and SKIP_DIRS entries.
 */
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
      collected.push(path.join(dir, entry.name));
    }
  }
  return collected;
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
  const catalog = [];
  let published = 0;
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

    // Only include explicitly published notes.
    if (fm.status !== 'published') {
      skipped++;
      continue;
    }

    const { title, category, subcategory, slug, difficulty, tags, description } = fm;

    // Guard: slug and subcategory are required to generate correct file paths.
    if (!slug || !subcategory) {
      console.warn(
        `⚠️  Missing required frontmatter (slug/subcategory) — skipping: ${path.relative(VAULT_PATH, filePath)}`
      );
      skipped++;
      continue;
    }

    // Write clean markdown content (frontmatter stripped) to public/notes.
    const destDir = path.join(NOTES_OUTPUT_DIR, subcategory);
    ensureDir(destDir);
    fs.writeFileSync(
      path.join(destDir, `${slug}.md`),
      parsed.content.replace(/^\n+/, ''), // trim leading newlines from body
      'utf-8'
    );

    catalog.push({
      title: title ?? slug,
      category: category ?? 'backend',
      subcategory,
      slug,
      difficulty: difficulty ?? 'beginner',
      tags: Array.isArray(tags) ? tags : [],
      description: description ?? '',
      filePath: `notes/${subcategory}/${slug}.md`,
    });

    console.log(`  ✅  [${subcategory}] ${slug}`);
    published++;
  }

  // Write the master catalog JSON.
  ensureDir(path.dirname(CATALOG_OUTPUT));
  fs.writeFileSync(CATALOG_OUTPUT, JSON.stringify(catalog, null, 2), 'utf-8');

  console.log('\n────────────────────────────────────');
  console.log(`  📦  Catalog → ${path.relative(__dirname, CATALOG_OUTPUT)}`);
  console.log(`  ✅  Published : ${published} notes`);
  console.log(`  ⏭️   Skipped   : ${skipped} files (draft / no status)`);
  if (errors > 0) console.warn(`  ⚠️   YAML errors: ${errors} files`);
  console.log('────────────────────────────────────\n');
}

processVault();
