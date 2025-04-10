# Angular Prefix Changer

A CLI tool to change Angular selector prefixes across your project. Updates `angular.json`, TypeScript component selectors (`.ts` files), and HTML templates (`.html` files) with a new prefix, replacing an old one you specify.

## Features
- Replace an existing prefix with a new one in your Angular project.
- Updates:
  - `angular.json` prefix for the project.
  - Component selectors in `.ts` files (e.g., `selector: 'oldprefix-...'`).
  - HTML tags in `.html` files (e.g., `<oldprefix-...>` and `</oldprefix-...>`).
- Requires user confirmation before applying changes.
- No default prefixes—fully customizable via CLI options.

## Installation
Install as a dev dependency in your Angular project:

```
npm install --save-dev angular-prefix-changer
```

## Usage
Run the tool with npx (no global install needed) and provide both the old and new prefixes:
```
npx change-prefix -p <new-prefix> -o <old-prefix>
```

## Options

- `-p, --prefix <new-prefix>` - The new prefix to apply (required).

- `-o, --old-prefix <old-prefix>` - The old prefix to replace (required).

- `--dry-run`: Preview changes without applying them (optional).

## Example

To change all instances of `myapp` to `fooapp`:

### Without Dry Run

```
npx change-prefix -p fooapp -o myapp
```

You’ll be prompted to confirm:

```
Are you sure you want to replace prefix "myapp" with "fooapp"? (yes/no):
```
- Type `yes` to apply, `no` to exit.

### With Dry Run
Preview replacing `myapp` with `fooapp`:
```
npx change-prefix -p cool -o myapp --dry-run
```

### Output:

```
Dry run mode: No changes will be applied. Here’s what would happen:
Would update angular.json: Set prefix to "fooapp" for project "your-project"
Would update src/app.component.ts: Replace "myapp-" with "fooapp-" in selectors
Would update src/app.component.html: Replace "<myapp-" with "<fooapp-" in tags
Would you like to apply these changes? (yes/no):
```
- Type `yes` to apply, `no` to exit.

### Successful Output

```
Prefix updated from "myapp" to "fooapp" successfully!
```

### Cancelled Output

```
Operation cancelled by user.
```

### Error Output (Missing Options)
If you forget an option:

```
Error: Both --prefix (-p) and --old-prefix (-o) are required
Example: npx change-prefix -p newprefix -o oldprefix
```

## Prerequisites

- Node.js v17 or higher (tested on v22.14.0)
- An Angular project (v19+ recommended, but works with older versions)
- Must have an angular.json file in the project root

## How It Works

1. **CLI Validation**: Ensures both `--prefix` and `--old-prefix` are provided
2. **Confirmation**: Asks for user confirmation with the specified prefixes
3. **Changes Applied**: 
    - Updates the `prefix` field in `angular.json` for the first project
    - Replaces `selector: 'oldprefix-...'` with `selector: 'newprefix-...'` in all `.ts` files under `src/`
    - Replaces `<oldprefix-...>` and `</oldprefix-...>` with `<newprefix-...>` and `</newprefix-...>` in all .html files under `src/`

## License
[MIT](License)

## Author
[lmsantos](https://github.com/Lmsantos89)
