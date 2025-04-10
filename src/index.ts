const fs = require('fs');
const path = require('path');
const replaceInFileModule = require('replace-in-file');
const replaceInFile = replaceInFileModule.default || replaceInFileModule.replaceInFile || replaceInFileModule;

export async function changePrefix(newPrefix: string, oldPrefix: string, dryRun: boolean = false): Promise<void> {
  const cwd = process.cwd();
  const angularJsonPath = path.join(cwd, 'angular.json');

  // Step 1: Update angular.json prefix
  let angularJson;
  try {
    angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));
    const projectName = Object.keys(angularJson.projects)[0];
    if (dryRun) {
      console.log(`Would update angular.json: Set prefix to "${newPrefix}" for project "${projectName}"`);
    } else {
      angularJson.projects[projectName].prefix = newPrefix;
      fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
    }
  } catch (err) {
    throw new Error(`Failed to update angular.json: ${(err as Error).message}`);
  }

  const tsFiles = 'src/**/*.ts';
  const htmlFiles = 'src/**/*.html';

  try {
    if (typeof replaceInFile !== 'function') {
      throw new Error('replace-in-file is not a function');
    }

    // Update TypeScript selectors
    const tsResults = await replaceInFile({
      files: tsFiles,
      from: new RegExp(`selector:\\s*['"]${oldPrefix}-([^'"]+)['"]`, 'g'),
      to: `selector: '${newPrefix}-$1'`,
      dry: dryRun, // Enable dry-run mode
    });

    if (dryRun) {
      tsResults.forEach((result: { hasChanged: any; file: any; }) => {
        if (result.hasChanged) {
          console.log(`Would update ${result.file}: Replace "${oldPrefix}-" with "${newPrefix}-" in selectors`);
        }
      });
    }

    // Update HTML templates
    const htmlResults = await replaceInFile({
      files: htmlFiles,
      from: [
        new RegExp(`<${oldPrefix}-([^\\s>]+)`, 'g'),
        new RegExp(`</${oldPrefix}-([^>]+)>`, 'g'),
      ],
      to: [
        `<${newPrefix}-$1`,
        `</${newPrefix}-$1>`,
      ],
      dry: dryRun, // Enable dry-run mode
    });

    if (dryRun) {
      htmlResults.forEach((result: { hasChanged: any; file: any; }) => {
        if (result.hasChanged) {
          console.log(`Would update ${result.file}: Replace "<${oldPrefix}-" with "<${newPrefix}-" in tags`);
        }
      });
    }
  } catch (err) {
    throw new Error(`Failed to update selectors: ${(err as Error).message}`);
  }
}