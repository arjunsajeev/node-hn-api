# Contributing to node-hn-api

Thank you for your interest in contributing to node-hn-api! We appreciate your help in making this project better.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/node-hn-api.git
   cd node-hn-api
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

## Development Workflow

### Making Changes

1. **Create a new branch** for your feature or fix:

   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes** to the codebase

3. **Test your changes**:

   ```bash
   pnpm test    # Run tests
   pnpm lint    # Check code style
   pnpm build   # Ensure it builds
   ```

### Adding a Changeset

This project uses [Changesets](https://github.com/changesets/changesets) for version management and releases.

**When should you add a changeset?**

- ✅ Bug fixes
- ✅ New features
- ✅ Breaking changes
- ❌ Documentation updates only
- ❌ Test improvements only
- ❌ Internal refactoring without behavior changes

**How to add a changeset:**

```bash
pnpm changeset
```

You'll be prompted to:

1. **Select the type of change:**
   - `patch` - Bug fixes, minor updates (4.0.1 → 4.0.2)
   - `minor` - New features, backward compatible (4.0.1 → 4.1.0)
   - `major` - Breaking changes (4.0.1 → 5.0.0)

2. **Write a summary** of your changes (this will appear in the CHANGELOG)

This creates a file in `.changeset/` that you should commit with your changes.

### Submitting Your Changes

1. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add awesome new feature"
   ```

2. **Push to your fork**:

   ```bash
   git push origin feature/my-new-feature
   ```

3. **Open a Pull Request** on GitHub

## Pull Request Guidelines

- Provide a clear description of the problem and solution
- Include relevant issue numbers if applicable
- Make sure all tests pass
- Add tests for new features
- Update documentation if needed
- Add a changeset if your changes affect functionality

## Release Process

Releases are automated using Changesets:

1. When PRs with changesets are merged to `master`, a bot creates a "Version Packages" PR
2. A maintainer reviews and merges the "Version Packages" PR
3. The package is automatically published to npm

## Code Style

This project uses:

- **TypeScript** for type safety
- **ESLint** for linting
- **Prettier** for formatting (configured in package.json)

Run `pnpm lint` to check your code style before committing.

## Testing

- Run tests: `pnpm test`
- Tests are written using Vitest
- All tests must pass before a PR can be merged

## Questions?

Feel free to open an issue if you have any questions or need help with contributing.

## License

By contributing to node-hn-api, you agree that your contributions will be licensed under the MIT License.
