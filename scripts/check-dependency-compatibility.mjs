// Local, side-effect-free compatibility checks for security dependency overrides.
// No SMTP connection, email delivery, HTTP request or database write is performed.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import nodemailer from 'nodemailer';
import selectorParser from 'postcss-selector-parser';
import {deepmerge} from 'deepmerge-ts';
import {z} from 'zod';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const lock = JSON.parse(await readFile(path.join(root, 'package-lock.json'), 'utf8'));

for (const [packagePath, metadata] of Object.entries(lock.packages)) {
  if (!packagePath.endsWith('node_modules/minimatch')) continue;
  const minimatchModule = require(path.join(root, packagePath));
  const matches = typeof minimatchModule === 'function' ? minimatchModule : minimatchModule.minimatch;
  assert.equal(matches('image.webp', '*.{webp,png}'), true, packagePath);
  assert.equal(matches('image.exe', '*.{webp,png}'), false, packagePath);
  assert.equal(typeof metadata.version, 'string');
}

assert.equal(selectorParser().processSync('.project > a[href^="/de"]:hover'), '.project > a[href^="/de"]:hover');
assert.deepEqual(deepmerge({languages: {de: true}}, {languages: {ru: true}}), {languages: {de: true, ru: true}});
assert.equal(z.object({email: z.email()}).safeParse({email: 'test@example.com'}).success, true);
assert.equal(z.object({email: z.email()}).safeParse({email: 'invalid'}).success, false);

const image = await sharp({create: {width: 24, height: 18, channels: 3, background: '#071f35'}})
  .resize(12, 9).webp().toBuffer();
const metadata = await sharp(image).metadata();
assert.equal(metadata.format, 'webp');
assert.equal(metadata.width, 12);
assert.equal(metadata.height, 9);

const transporter = nodemailer.createTransport({streamTransport: true, buffer: true, newline: 'unix'});
const mail = await transporter.sendMail({
  from: {name: 'SorgfaltBau', address: 'service@example.com'},
  to: 'customer@example.net',
  replyTo: 'reply@example.net',
  subject: 'SorgfaltBau - compatibility test',
  text: 'Проверка формирования письма без отправки.',
  html: '<p>Проверка формирования письма без отправки.</p>',
});
assert.deepEqual(mail.envelope.to, ['customer@example.net']);
assert.equal(mail.envelope.from, 'service@example.com');
assert.match(mail.message.toString(), /Reply-To: reply@example.net/);
assert.match(mail.message.toString(), /multipart\/alternative/);
transporter.close();
console.log('PASS: minimatch/brace-expansion, CSS selectors, deepmerge, Zod, Sharp WebP and Nodemailer MIME (no delivery).');
