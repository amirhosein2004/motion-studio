// Sync the rules snapshot embedded in prompt-builder-motion-flexible.html (RULES_EMBED).
// Run from anywhere: node installation/scripts/Sync-PromptBuilderRules.mjs
// Re-run after every edit to AGENTS.md or rules/*.md, so the "send full rules"
// option of the form stays in step with the workspace files.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const FILES = ['AGENTS.md','rules/README.md','rules/workflow.md','rules/recording-guide.md','rules/motion-quality.md','rules/code-motion.md','rules/persian-rtl.md','rules/project-structure.md','rules/references.md','rules/quality.md','rules/advertising.md','rules/MOTION-CAPABILITIES.md'];
const FORM = path.join(root, 'prompt-builder-motion-flexible.html');

let block = 'قوانین کامل محیط — نسخهٔ همراه این پرامپت (معادل AGENTS.md و rules/؛ اگر همین فایل‌ها در محیط موجودند، همین متن ملاک است):\n';
for (const f of FILES) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) throw new Error('missing rules file: ' + f);
  block += '\n\n===== ' + f + ' =====\n\n' + fs.readFileSync(p, 'utf8').trim();
}

let s = fs.readFileSync(FORM, 'utf8');
const start = s.indexOf('const RULES_EMBED=');
if (start < 0) throw new Error('RULES_EMBED declaration not found in the form');
const lineEnd = s.indexOf('\n', start);
s = s.slice(0, start) + 'const RULES_EMBED=' + JSON.stringify(block) + ';' + s.slice(lineEnd);
fs.writeFileSync(FORM, s);
console.log('RULES_EMBED updated:', block.length, 'chars from', FILES.length, 'files');
