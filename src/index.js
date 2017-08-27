const fetch = require('node-fetch');

const {
  getItemURL,
  getUserURL,
  topStoriesURL,
  bestStoriesURL,
  newStoriesURL,
  askStoriesURL,
  jobStoriesURL,
  showStoriesURL
} = require('./urls');

const defaultNumberOfStories = 10;

function fetchJSON(URL) {
	return fetch(URL).then(response => response.json());
}

// Items

function fetchItem(itemID) {
	return fetchJSON(getItemURL(itemID));
}

function fetchItems(itemIDs) {
	return Promise.all(itemIDs.map(itemID => fetchItem(itemID)));
}

// Stories

function fetchStories(storiesURL, numberOfStories = defaultNumberOfStories) {
	return fetchJSON(storiesURL).then(itemIDs =>
    fetchItems(itemIDs.slice(0, numberOfStories))
  );
}

function fetchTopStories(numberOfStories) {
	return fetchStories(topStoriesURL, numberOfStories);
}

function fetchNewStories(numberOfStories) {
	return fetchStories(newStoriesURL, numberOfStories);
}

function fetchBestStories(numberOfStories) {
	return fetchStories(bestStoriesURL, numberOfStories);
}

function fetchAskStories(numberOfStories) {
	return fetchStories(askStoriesURL, numberOfStories);
}

function fetchJobStories(numberOfStories) {
	return fetchStories(jobStoriesURL, numberOfStories);
}

function fetchShowStories(numberOfStories) {
	return fetchStories(showStoriesURL, numberOfStories);
}

// Users

function fetchUser(userId) {
	return fetchJSON(getUserURL(userId));
}

module.exports = {
	fetchItem,
	fetchUser,
	fetchTopStories,
	fetchNewStories,
	fetchBestStories,
	fetchAskStories,
	fetchJobStories,
	fetchShowStories
};
