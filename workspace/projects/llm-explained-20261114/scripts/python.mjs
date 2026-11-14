import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const python=path.resolve(root,'../../../installation/tools/manim/.venv/Scripts/python.exe');
const result=spawnSync(python,process.argv.slice(2),{cwd:root,stdio:'inherit'});
if(result.error)throw result.error;
process.exit(result.status??1);
