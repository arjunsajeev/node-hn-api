# node-hn-api

[![CI](https://github.com/arjunsajeev/node-hn-api/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/arjunsajeev/node-hn-api/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/node-hn-api.svg?maxAge=3600)](https://www.npmjs.com/package/node-hn-api) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A modern TypeScript wrapper for the [Firebase Hacker News API](https://github.com/HackerNews/API) with full type support and promise-based methods.

## Features

- Promise-based API with full TypeScript support
- Fetch individual items, users, and various story categories
- Built-in error handling and type safety
- Works in both Node.js and browser environments
- Supports both CommonJS and ES modules
- Zero runtime dependencies - uses native fetch API

## Installation

```bash
npm install node-hn-api
# or
pnpm add node-hn-api
# or
yarn add node-hn-api
```

## Quick Start

### CommonJS

```javascript
const hn = require('node-hn-api');

hn.fetchTopStories(5)
  .then((stories) => {
    console.log('Top 5 stories:', stories);
  })
  .catch((error) => {
    console.error('Error fetching stories:', error);
  });
```

### ES Modules / TypeScript

```typescript
import { fetchTopStories, fetchItem, fetchUser } from 'node-hn-api';

// Fetch top stories
const stories = await fetchTopStories(10);
console.log('Top 10 stories:', stories);

// Fetch a specific item
const item = await fetchItem(8863);
console.log('Item details:', item);

// Fetch user information
const user = await fetchUser('pg');
console.log('User details:', user);
```

## API Reference

This library provides TypeScript-friendly functions with full type definitions. All functions return promises and include comprehensive JSDoc comments for excellent IDE support.

### Core Functions

```typescript
// Fetch individual items and users
fetchItem(itemId: number): Promise<HackerNewsItem>
fetchUser(userId: string): Promise<HackerNewsUser>

// Fetch different story types (all with optional numberOfStories parameter, default: 10)
fetchTopStories(numberOfStories?: number): Promise<HackerNewsItem[]>
fetchNewStories(numberOfStories?: number): Promise<HackerNewsItem[]>
fetchBestStories(numberOfStories?: number): Promise<HackerNewsItem[]>
fetchAskStories(numberOfStories?: number): Promise<HackerNewsItem[]>
fetchShowStories(numberOfStories?: number): Promise<HackerNewsItem[]>
fetchJobStories(numberOfStories?: number): Promise<HackerNewsItem[]>
```

### Type Definitions

The library exports `HackerNewsItem` and `HackerNewsUser` interfaces with complete type definitions. Your IDE will provide full IntelliSense support showing all available properties and their types.

### Basic Examples

```typescript
// Fetch a story and its author
const story = await fetchItem(8863);
const author = await fetchUser(story.by);
console.log(`"${story.title}" by ${author.id} (${author.karma} karma)`);

// Get top stories
const topStories = await fetchTopStories(10);
console.log(topStories.map(s => `${s.title} (${s.score} points)`));

// Error handling
try {
  const user = await fetchUser('username');
  console.log(`User has ${user.submitted.length} submissions`);
} catch (error) {
  console.error('User not found:', error.message);
}
```

For detailed parameter information, return types, and additional examples, rely on your IDE's IntelliSense or view the [generated type definitions](dist/index.d.ts).

## Requirements

- Node.js 18.0.0 or higher (for native fetch support)
- Modern browsers (all browsers support fetch natively)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Arjun Sajeev](https://arjun.xyz)

## Related

- [Firebase Hacker News API Documentation](https://github.com/HackerNews/API)
- [Official Hacker News Website](https://news.ycombinator.com)
