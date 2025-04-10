#!/usr/bin/env node
import { program } from 'commander';
import { createInterface } from 'readline/promises'; // For user input
import { changePrefix } from './index';

program
  .version('1.0.0')
  .description('Change Angular selector prefixes')
  .option('-p, --prefix <prefix>', 'New prefix to apply')
  .option('-o, --old-prefix <oldPrefix>', 'Old prefix to replace')
  .option('--dry-run', 'Preview changes without applying them')
  .parse(process.argv);

const options = program.opts();

// Check if both options are provided
if (!options.prefix || !options.oldPrefix) {
  console.error('Error: Both --prefix (-p) and --old-prefix (-o) are required');
  console.error('Example: npx change-prefix -p newprefix -o oldprefix');
  process.exit(1);
}

// Create readline interface for confirmation
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function confirmChange(isDryRun: boolean) {
  if (isDryRun) {
    console.log('Dry run mode: No changes will be applied. Here’s what would happen:');
    await changePrefix(options.prefix, options.oldPrefix, true); // Dry run
    const apply = await rl.question('Would you like to apply these changes? (yes/no): ');
    rl.close();
    return apply.toLowerCase() === 'yes' || apply.toLowerCase() === 'y';
  } else {
    const answer = await rl.question(
      `Are you sure you want to replace prefix "${options.oldPrefix}" with "${options.prefix}"? (yes/no): `
    );
    rl.close();
    return answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y';
  }
}

confirmChange(options.dryRun)
  .then((confirmed) => {
    if (options.dryRun && confirmed) {
      // If dry run and user wants to apply, run again without dry-run mode
      return changePrefix(options.prefix, options.oldPrefix, false);
    } else if (!options.dryRun && confirmed) {
      // Normal mode with confirmation
      return changePrefix(options.prefix, options.oldPrefix, false);
    } else {
      console.log(options.dryRun ? 'Dry run completed, no changes applied.' : 'Operation cancelled by user.');
      process.exit(0);
    }
  })
  .then(() => {
    if (!process.exitCode) {
      console.log(`Prefix updated from "${options.oldPrefix}" to "${options.prefix}" successfully!`);
    }
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });