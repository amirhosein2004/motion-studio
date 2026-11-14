"""Restore only code-motion-v1; refuse to overwrite later edits."""
from pathlib import Path
import hashlib
import json
import shutil
import sys

ROOT=Path(__file__).resolve().parents[2]
CHECKPOINT=ROOT/'installation/config/checkpoints/code-motion-v1'
manifest_path=CHECKPOINT/'manifest.json'
manifest=json.loads(manifest_path.read_text(encoding='utf-8'))
if manifest['status']!='applied':
    raise SystemExit('Checkpoint is not applied: '+manifest['status'])
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
operations=[]
conflicts=[]
for entry in manifest['files']:
    target=(ROOT/entry['path']).resolve()
    if not target.is_relative_to(ROOT):raise ValueError('Target outside workspace')
    if not target.is_file() or sha(target)!=entry['afterSha256']:
        conflicts.append(entry['path']);continue
    backup=(CHECKPOINT/'before'/entry['path']).resolve()
    if entry['existed']:
        if not backup.is_relative_to(CHECKPOINT) or not backup.is_file() or sha(backup)!=entry['beforeSha256']:
            raise ValueError('Backup invalid: '+entry['path'])
    operations.append((entry,target,backup))
if conflicts:
    raise SystemExit('Stopped before any changes. Later edits detected: '+', '.join(conflicts))
print(f'code-motion-v1: {len(operations)} files verified for rollback.')
if '--check' in sys.argv:
    print('Check only; no files changed.')
    raise SystemExit(0)
for entry,target,backup in operations:
    if entry['existed']:shutil.copy2(backup,target)
    else:target.unlink()
manifest['status']='reverted'
manifest_path.write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print('Restored code-motion-v1 only. Earlier form features and video projects preserved.')
