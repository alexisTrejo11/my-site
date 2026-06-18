# Portfolio agent skills

Project-specific Cursor Agent Skills for **alexis-trejo-portfolio**. Use these when adding pages, components, or UI so new work matches existing conventions.

## Skills

| Skill | Use when |
|-------|----------|
| [portfolio-design-system](./portfolio-design-system/SKILL.md) | Colors, fonts, gradients, dark mode, Tailwind/CSS utilities |
| [portfolio-ui-patterns](./portfolio-ui-patterns/SKILL.md) | Cards, buttons, code blocks, layout shells, shared components |
| [portfolio-angular-conventions](./portfolio-angular-conventions/SKILL.md) | File structure, Angular 20 patterns, routing, services, SSR |
| [portfolio-new-pages](./portfolio-new-pages/SKILL.md) | Adding a marketing page or a project-docs section |

## Enabling in Cursor

Skills in `agents/` are versioned with the repo. To have the agent discover them automatically, symlink or copy each skill folder into `.cursor/skills/`:

```bash
mkdir -p .cursor/skills
for d in agents/portfolio-*; do
  ln -sf "../../$d" ".cursor/skills/$(basename "$d")"
done
```

Or mention a skill explicitly in chat, e.g. “follow `agents/portfolio-design-system`”.

## Source of truth

- Global styles: `src/styles.scss`
- Tailwind config: `tailwind.config.js`
- Fonts: `src/index.html`
