# node-hn-api [![Build Status](https://travis-ci.org/arjunsajeev/node-hn-api.svg?branch=master)](https://travis-ci.org/arjunsajeev/node-hn-api) [![npm](https://img.shields.io/npm/v/node-hn-api.svg?maxAge=3600)](https://www.npmjs.com/package/node-hn-api) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![Greenkeeper badge](https://badges.greenkeeper.io/arjunsajeev/node-hn-api.svg)](https://greenkeeper.io/)

A promise based wrapper for the [Firebase Hacker News API](https://github.com/HackerNews/API)

## Installation

```sh
npm i node-hn-api
```

## Usage

```js
const hn = require('node-hn-api')
hn.fetchTopStories(5).then((topStories) => {
 //..
})
```

## API

### fetchItem(itemId) - Fetch  Hacker News [Item](https://github.com/HackerNews/API) data

Returns a promise

### fetchUser(userId) - Fetch Hacker News [User](https://github.com/HackerNews/API#users) data

Returns a promise

### fetchTopStories([numberOfStories]) - Fetch Hacker News [Top Stories](https://github.com/HackerNews/API#new-top-and-best-stories) data

Returns a promise

#### numberOfStories - number
Number of records to fetch

### fetchNewStories([numberOfStories]) - Fetch Hacker News [New Stories](https://github.com/HackerNews/API#new-top-and-best-stories) data

Returns a promise

#### numberOfStories - number
Number of records to fetch

### fetchBestStories([numberOfStories]) - Fetch Hacker News [Best Stories](https://github.com/HackerNews/API#new-top-and-best-stories) data

Returns a promise

#### numberOfStories - number
Number of records to fetch

### fetchAskStories([numberOfStories]) - Fetch [Ask Hacker News Stories](https://github.com/HackerNews/API#ask-show-and-job-stories) data

Returns a promise

#### numberOfStories - number
Number of records to fetch

### fetchShowStories([numberOfStories]) - Fetch [Show Hacker News Stories](https://github.com/HackerNews/API#ask-show-and-job-stories) data

Returns a promise

#### numberOfStories - number
Number of records to fetch

### fetchJobStories([numberOfStories]) - Fetch Hacker News [Job Stories](https://github.com/HackerNews/API#ask-show-and-job-stories) data

Returns a promise

#### numberOfStories - number
Number of records to fetch
