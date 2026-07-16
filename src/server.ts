import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { ɵsetAngularAppEngineManifest } from '@angular/ssr';
import express from 'express';
import { join } from 'node:path';

// @angular/build emits the engine manifest without allowedHosts; AngularAppEngine
// requires it to be iterable when the server bundle is loaded during route extraction.
// @ts-expect-error Generated at build time next to the server bundle output.
import engineManifest from './angular-app-engine-manifest.mjs';

const browserDistFolder = join(import.meta.dirname, '../browser');

/** Hostnames permitted for SSR requests. Set via ALLOWED_HOSTS (comma-separated). */
const ALLOWED_HOSTS = (process.env['ALLOWED_HOSTS'] ?? 'localhost,127.0.0.1')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean);

ɵsetAngularAppEngineManifest({
  ...engineManifest,
  allowedHosts: ALLOWED_HOSTS,
});

const app = express();
const angularApp = new AngularNodeAppEngine({ allowedHosts: ALLOWED_HOSTS });

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
