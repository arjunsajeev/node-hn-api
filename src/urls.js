const itemURL = 'https://hacker-news.firebaseio.com/v0/item/ITEM_ID.json'
const topStoriesURL = 'https://hacker-news.firebaseio.com/v0/topstories.json'
const bestStoriesURL = 'https://hacker-news.firebaseio.com/v0/beststories.json'
const newStoriesURL = 'https://hacker-news.firebaseio.com/v0/newstories.json'
const askStoriesURL = 'https://hacker-news.firebaseio.com/v0/askstories.json'
const showStoriesURL = 'https://hacker-news.firebaseio.com/v0/showstories.json'
const jobStoriesURL = 'https://hacker-news.firebaseio.com/v0/jobstories.json'
const userURL = 'https://hacker-news.firebaseio.com/v0/user/USER_ID.json'

function getItemURL(itemID) {
  return itemURL.replace('ITEM_ID', itemID)
}

function getUserURL(userId) {
  return userURL.replace('USER_ID', userId)
}

module.exports = {
  getItemURL,
  getUserURL,
  bestStoriesURL,
  topStoriesURL,
  newStoriesURL,
  askStoriesURL,
  jobStoriesURL,
  showStoriesURL
}
