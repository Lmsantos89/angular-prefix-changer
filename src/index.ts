const fs = require('fs');
const path = require('path');
const replaceInFileModule = require('replace-in-file');
const replaceInFile = replaceInFileModule.default || replaceInFileModule.replaceInFile || replaceInFileModule;

export async function changePrefix(newPrefix: string, oldPrefix: string): Promise<void> {
  const cwd = process.cwd();
  const angularJsonPath = path.join(cwd, 'angular.json');

  try {
    const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));
    const projectName = Object.keys(angularJson.projects)[0];
    angularJson.projects[projectName].prefix = newPrefix;
    fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
  } catch (err) {
    throw new Error(`Failed to update angular.json: ${(err as Error).message}`);
  }

  const tsFiles = 'src/**/*.ts';
  const htmlFiles = 'src/**/*.html';

  try {
    if (typeof replaceInFile !== 'function') {
      throw new Error('replace-in-file is not a function');
    }

    await replaceInFile({
      files: tsFiles,
      from: new RegExp(`selector:\\s*['"]${oldPrefix}-([^'"]+)['"]`, 'g'),
      to: `selector: '${newPrefix}-$1'`,
    });

    await replaceInFile({
      files: htmlFiles,
      from: [
        new RegExp(`<${oldPrefix}-([^\\s>]+)`, 'g'),
        new RegExp(`</${oldPrefix}-([^>]+)>`, 'g'),
      ],
      to: [
        `<${newPrefix}-$1`,
        `</${newPrefix}-$1>`,
      ],
    });
  } catch (err) {
    throw new Error(`Failed to update selectors: ${(err as Error).message}`);
  }
}