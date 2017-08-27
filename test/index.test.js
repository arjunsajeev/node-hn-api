import test from 'ava';
import {
	fetchItem,
	fetchUser,
	fetchTopStories,
	fetchNewStories,
	fetchBestStories,
	fetchAskStories,
	fetchJobStories,
	fetchShowStories
} from '../src/.';

test('Should return valid item information', async t => {
	const item = await fetchItem(12335);
	t.is(item.id, 12335);
});

test('Should fetch user information', async t => {
	const user = await fetchUser('dh');
	t.is(user.id, 'dh');
});

test('Should fetch top stories', async t => {
	const numberOfStories = 5;
	const stories = await fetchTopStories(numberOfStories);
	t.is(stories.length, numberOfStories);
});

test('Should fetch new stories', async t => {
	const numberOfStories = 6;
	const stories = await fetchNewStories(numberOfStories);
	t.is(stories.length, numberOfStories);
});

test('Should fetch best stories', async t => {
	const numberOfStories = 4;
	const stories = await fetchBestStories(numberOfStories);
	t.is(stories.length, numberOfStories);
});

test('Should fetch job stories', async t => {
	const numberOfStories = 8;
	const stories = await fetchJobStories(numberOfStories);
	t.is(stories.length, numberOfStories);
});

test('Should fetch ask stories', async t => {
	const numberOfStories = 7;
	const stories = await fetchAskStories(numberOfStories);
	t.is(stories.length, numberOfStories);
});

test('Should fetch show stories', async t => {
	const numberOfStories = 7;
	const stories = await fetchShowStories(numberOfStories);
	t.is(stories.length, numberOfStories);
});
