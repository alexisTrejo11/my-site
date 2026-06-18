# TypeScript Config and Tooling

## Minimal tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"]
}
```

## Strict mode (recommended)

`"strict": true` enables:

- `strictNullChecks` — catch null/undefined mistakes
- `noImplicitAny` — flag missing types
- Other safety flags

Worth the initial friction for fewer production bugs.

## Compile commands

```bash
npm install -D typescript
npx tsc              # compile once
npx tsc --watch      # watch mode
```

## With Node / frameworks

- **ts-node** — run TS directly (dev)
- **Angular** — TS by default
- **NestJS** — backend framework on TS

Production usually compiles to JavaScript (`dist/`) and runs with Node.

## Everyday workflow

1. Write `.ts` with types
2. Let IDE show errors (VS Code / Cursor)
3. `tsc` or framework build before deploy

← [JS TS MOC](/learning/javascript-master-moc)
