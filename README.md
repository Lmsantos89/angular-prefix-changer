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

## Example

To change all instances of `myapp` to `fooapp`:

```
npx change-prefix -p fooapp -o myapp
```

You’ll be prompted to confirm:

```
Are you sure you want to replace prefix "myapp" with "fooapp"? (yes/no):
```

- Type `yes` or `y` to proceed
- Type `no` or anything else to cancel

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
