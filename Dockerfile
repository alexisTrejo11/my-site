# =============================================================================
# Stage 1: build the Angular SSR app
# =============================================================================
# Use the same major Node version you develop with (Node 20 LTS is a safe match
# for Angular 20 / @types/node ^20).
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency manifests first so Docker can cache npm ci when only source changes.
COPY package.json package-lock.json  ./

# Clean, reproducible install for CI/Docker (requires package-lock.json).
RUN npm ci

# Copy the rest of the project (see .dockerignore to keep the context small).
COPY . .

# Production build by default (angular.json defaultConfiguration = production).
# Output: dist/alexis-trejo-portfolio/{browser,server}
RUN npm run build


# =============================================================================
# Stage 2: slim runtime image (only what is needed to serve SSR)
# =============================================================================
FROM node:20-alpine AS runtime

WORKDIR /app

# Do not run as root in production containers.
RUN addgroup -S app && adduser -S app -G app

ENV NODE_ENV=production
# server.ts reads process.env.PORT (default 4000)
ENV PORT=4000

# Copy only the built output + the minimal package files needed at runtime.
# The SSR server bundle already includes most deps; we still need node_modules
# for packages resolved from the server entry (express, etc.).
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist

# Production-only install keeps the image smaller than copying the full build node_modules.
RUN npm ci --omit=dev && npm cache clean --force

USER app

EXPOSE 4000

# Uses Node (always present) instead of wget (not guaranteed on alpine).
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Same entry as package.json "serve:ssr:alexis-trejo-portfolio"
CMD ["node", "dist/alexis-trejo-portfolio/server/server.mjs"]