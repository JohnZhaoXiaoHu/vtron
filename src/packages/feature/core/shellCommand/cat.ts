import type { Shell } from '../Shell';
import * as vPath from '../Path';
async function cat(input: string, output: (text: string) => void, shell: Shell) {
  const path = input.split(' ')[1];
  if (path) {
    const res = await shell.system.fs.stat(vPath.join(shell.router, path));
    if (res) {
      if (!res.isDirectory) {
        const file = await shell.system.fs.readFile(vPath.join(shell.router, path));
        // output(file||'')
        output('\x1b[32m' + (file || '') + '\x1b[0m\r\n');
      } else {
        output(`\x1b[31m${path}: Not a file\x1b[0m\r\n`);
      }
    } else {
      output(`\x1b[31m${path}: No such file or directory\x1b[0m\r\n`);
    }
  } else {
    output(`\x1b[31m${path}: No such file or directory\x1b[0m\r\n`);
  }
}
export { cat };
