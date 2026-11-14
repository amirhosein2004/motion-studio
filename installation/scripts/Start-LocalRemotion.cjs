// Keep Studio on loopback without modifying the installed Remotion package.
const {createRequire} = require('node:module');
const path = require('node:path');
const projectRequire = createRequire(path.join(process.cwd(), 'package.json'));
const {RenderInternals} = projectRequire('@remotion/renderer');
RenderInternals.getPortConfig = () => ({host: '127.0.0.1', hostsToTry: ['127.0.0.1']});
process.argv.splice(2, 0, 'studio');
const cliDir = path.dirname(projectRequire.resolve('@remotion/cli/package.json'));
require(path.join(cliDir, 'remotion-cli.js'));
