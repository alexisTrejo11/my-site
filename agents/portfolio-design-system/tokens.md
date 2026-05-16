# Design tokens reference

## CSS variables

```css
--gradient-primary: linear-gradient(135deg, #10b981 0%, #0d9488 50%, #4338ca 100%);
--color-emerald: #10b981;
--color-teal: #0d9488;
--color-indigo: #4338ca;
```

## Tailwind brand shortcuts

```
bg-gradient-brand
bg-gradient-brand-reverse
bg-gradient-brand-subtle
text-gradient-primary
```

## Common text pairings

```
text-gray-900 dark:text-white          /* headings */
text-gray-600 dark:text-gray-400       /* body secondary */
text-gray-700 dark:text-gray-300       /* nav items */
text-blue-600 dark:text-blue-400       /* links */
text-emerald-600 dark:text-emerald-400 /* success / CLI */
```

## Common borders

```
border-gray-200 dark:border-gray-800
border-gray-300 dark:border-gray-700   /* inputs, mobile controls */
```

## Category gradients (project cards)

| Category | Header gradient |
|----------|-----------------|
| backend | `from-blue-500 to-purple-600` |
| frontend | `from-green-400 to-blue-500` |
| fullstack | `from-yellow-400 to-red-500` |
| devops | `from-gray-700 to-black` |

## HTTP method colors (API explorer pattern)

Use semantic badges: GET → success/green tones, POST → blue, PUT → yellow, DELETE → red (match `.badge-*` or `app-badge` types).
