import { cp, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root = fileURLToPath(new URL('..', import.meta.url));
const output = join(root, 'dist');
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'styles.css', 'app.js', 'site-data.js']) {
  await copyFile(join(root, name), join(output, name));
}
await cp(join(root, 'assets'), join(output, 'assets'), { recursive: true });
console.log('Built website in dist/');
