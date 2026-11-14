import {build} from 'esbuild';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await build({entryPoints:[path.join(root,'src/preview.tsx')],outfile:path.join(root,'public/preview-bundle.js'),bundle:true,minify:true,platform:'browser',format:'iife',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},logLevel:'warning'});
console.log('Built local interactive player; no video export.');
