import { expect, test } from 'vitest';
import {
  fetchItem,
  fetchUser,
  fetchTopStories,
  fetchNewStories,
  fetchBestStories,
  fetchJobStories,
  fetchAskStories,
  fetchShowStories,
} from '../src/index';

test('Should fetch valid item information', async () => {
  const item = await fetchItem(12335);
  expect(item.id).toBe(12335);
});

test('Should fetch valid user information', async () => {
  const user = await fetchUser('dh');
  expect(user.id).toBe('dh');
});

test('Should fetch top stories', async () => {
  const numberOfStories = 5;
  const stories = await fetchTopStories(numberOfStories);
  expect(stories.length).toBe(numberOfStories);
});

test('Should fetch new stories', async () => {
  const numberOfStories = 6;
  const stories = await fetchNewStories(numberOfStories);
  expect(stories.length).toBe(numberOfStories);
});

test('Should fetch best stories', async () => {
  const numberOfStories = 5;
  const stories = await fetchBestStories(numberOfStories);
  expect(stories.length).toBe(numberOfStories);
});

test('Should fetch job stories', async () => {
  const numberOfStories = 5;
  const stories = await fetchJobStories(numberOfStories);
  expect(stories.length).toBe(numberOfStories);
});

test('Should fetch ask stories', async () => {
  const numberOfStories = 5;
  const stories = await fetchAskStories(numberOfStories);
  expect(stories.length).toBe(numberOfStories);
});

test('Should fetch show stories', async () => {
  const numberOfStories = 5;
  const stories = await fetchShowStories(numberOfStories);
  expect(stories.length).toBe(numberOfStories);
});
