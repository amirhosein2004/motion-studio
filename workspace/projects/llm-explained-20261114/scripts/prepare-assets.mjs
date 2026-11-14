import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(await fs.readFile(path.join(root,'project.json'),'utf8'));
const assets=path.resolve(root,config.paths.assets);
const sha=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
// Retain separately prepared SFX mappings when fonts are re-staged.
let previous;
try{previous=JSON.parse(await fs.readFile(path.join(root,'ASSET-SOURCES.json'),'utf8'));}catch{}
const entries=(previous?.assets??[]).filter(asset=>asset.type==='sfx');
for(const name of ['Vazirmatn-Regular.woff2','Vazirmatn-Bold.woff2','OFL.txt']){
 const source=path.join(assets,'fonts',name),runtime=path.join(root,config.paths.public,'fonts',name);
 await fs.mkdir(path.dirname(runtime),{recursive:true});await fs.copyFile(source,runtime);
 entries.push({type:'font-or-license',source:path.relative(root,source).replaceAll('\\','/'),runtime:`fonts/${name}`,sha256:await sha(source),upstream:'https://github.com/rastikerdar/vazirmatn',license:'SIL Open Font License 1.1',provenance:'Preserved bytes copied from existing workspace project network-illustrated-20261106/public/fonts. Exact upstream release not recorded; local SHA-256 identifies the version.',processing:'Byte-for-byte copy; no font modifications.'});
}
for(const [name,type] of [['Pasted text.txt','user-request-and-raw-lesson'],['motionarray-1361492-poster.jpg','style-reference-only']]){
 const source=path.join(assets,'references',name);entries.push({type,source:path.relative(root,source).replaceAll('\\','/'),runtime:null,sha256:await sha(source),license:type==='style-reference-only'?'Copyright reference; no reuse license assumed; excluded from public and composition.':'User supplied for this project.',origin:type==='style-reference-only'?'https://motionarray.imgix.net/1361492-yEUcidHRzf-high_0000.jpg?w=660&q=60&fit=max&auto=format':'C:/Users/Asus/.codex/attachments/fc28f865-7c90-403b-9205-5c8786e6a203/Pasted text.txt',processing:'Preserved original bytes.'});
}
entries.push({type:'authored-vector-and-motion',source:'src/Shared.tsx; src/chapters/S01.tsx through S08.tsx',runtime:'Rendered directly in React/SVG; no image file dependency',license:'Original project code authored for this user',processing:'Deterministic frame-driven 2D geometry; not a 3D model.'});
await fs.writeFile(path.join(root,'ASSET-SOURCES.json'),JSON.stringify({projectId:config.projectId,assets:entries},null,2)+'\n');
console.log('Staged fonts and wrote hashes / source-to-runtime mapping.');
