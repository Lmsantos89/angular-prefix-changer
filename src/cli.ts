#!/usr/bin/env node
import { program } from 'commander';
import { createInterface } from 'readline/promises'; // For user input
import { changePrefix } from './index';

program
  .version('1.0.0')
  .description('Change Angular selector prefixes')
  .option('-p, --prefix <prefix>', 'New prefix to apply')
  .option('-o, --old-prefix <oldPrefix>', 'Old prefix to replace') // No default
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

// Prompt user for confirmation
async function confirmChange() {
  const answer = await rl.question(
    `Are you sure you want to replace prefix "${options.oldPrefix}" with "${options.prefix}"? (yes/no): `
  );
  rl.close();

  if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
    return true;
  } else {
    console.log('Operation cancelled by user.');
    return false;
  }
}

// Execute with confirmation
confirmChange()
  .then((confirmed) => {
    if (confirmed) {
      return changePrefix(options.prefix, options.oldPrefix);
    } else {
      process.exit(0);
    }
  })
  .then(() => {
    if (!process.exitCode) { // Only log success if not already exited
      console.log(`Prefix updated from "${options.oldPrefix}" to "${options.prefix}" successfully!`);
    }
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });