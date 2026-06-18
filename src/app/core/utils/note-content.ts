function normalizeHeading(text: string): string {
  return text
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function descriptionsMatch(a: string, b: string): boolean {
  const left = normalizeHeading(a);
  const right = normalizeHeading(b);
  if (!left || !right) return false;
  return left === right || left.includes(right) || right.includes(left);
}

/**
 * Removes a leading H1 and/or blockquote from note body when they duplicate
 * frontmatter already shown in the note viewer header.
 */
export function stripDuplicateNoteHeader(
  content: string,
  title: string,
  description: string,
): string {
  const lines = content.replace(/^\n+/, '').split('\n');
  let index = 0;

  const h1 = lines[index]?.match(/^#\s+(.+)$/);
  if (h1 && title && normalizeHeading(h1[1]) === normalizeHeading(title)) {
    index++;
    while (index < lines.length && lines[index].trim() === '') {
      index++;
    }
  }

  if (description.trim()) {
    const quoteParts: string[] = [];
    let quoteIndex = index;

    while (quoteIndex < lines.length && lines[quoteIndex].startsWith('>')) {
      quoteParts.push(lines[quoteIndex].replace(/^>\s?/, '').trim());
      quoteIndex++;
    }

    const quote = quoteParts.join(' ').trim();
    if (quote && descriptionsMatch(quote, description)) {
      index = quoteIndex;
      while (index < lines.length && lines[index].trim() === '') {
        index++;
      }
    }
  }

  return lines.slice(index).join('\n').replace(/^\n+/, '');
}
