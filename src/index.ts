import fetchData from 'isomorphic-fetch'
const {
  getItemURL,
  getUserURL,
  topStoriesURL,
  bestStoriesURL,
  newStoriesURL,
  askStoriesURL,
  jobStoriesURL,
  showStoriesURL
} = require('./urls')
const defaultNumberOfStories = 10

function fetchJSON(URL: string){
  return fetchData(URL).then((response: Response) => response.json())
}

// Items

export function fetchItem(itemID: number) {
  return fetchJSON(getItemURL(itemID))
}

function fetchItems(itemIDs: number[]): Promise<any> {
  return Promise.all(itemIDs.map(itemID => fetchItem(itemID)))
}

// Stories

export function fetchStories(storiesURL: string, numberOfStories = defaultNumberOfStories) {
  return fetchJSON(storiesURL).then((itemIDs: number[]) =>
    fetchItems(itemIDs.slice(0, numberOfStories))
  )
}

export function fetchTopStories(numberOfStories: number) {
  return fetchStories(topStoriesURL, numberOfStories)
}

export function fetchNewStories(numberOfStories: number) {
  return fetchStories(newStoriesURL, numberOfStories)
}

export function fetchBestStories(numberOfStories: number) {
  return fetchStories(bestStoriesURL, numberOfStories)
}

export function fetchAskStories(numberOfStories: number) {
  return fetchStories(askStoriesURL, numberOfStories)
}

export function fetchJobStories(numberOfStories: number) {
  return fetchStories(jobStoriesURL, numberOfStories)
}

export function fetchShowStories(numberOfStories: number) {
  return fetchStories(showStoriesURL, numberOfStories)
}

// Users

export function fetchUser(userId: string) {
  return fetchJSON(getUserURL(userId))
}

// module.exports = {
//   fetchItem,
//   fetchUser,
//   fetchTopStories,
//   fetchNewStories,
//   fetchBestStories,
//   fetchAskStories,
//   fetchJobStories,
//   fetchShowStories
// }