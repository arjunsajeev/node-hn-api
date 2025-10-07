export const itemURL =
  'https://hacker-news.firebaseio.com/v0/item/ITEM_ID.json';
export const topStoriesURL =
  'https://hacker-news.firebaseio.com/v0/topstories.json';
export const bestStoriesURL =
  'https://hacker-news.firebaseio.com/v0/beststories.json';
export const newStoriesURL =
  'https://hacker-news.firebaseio.com/v0/newstories.json';
export const askStoriesURL =
  'https://hacker-news.firebaseio.com/v0/askstories.json';
export const showStoriesURL =
  'https://hacker-news.firebaseio.com/v0/showstories.json';
export const jobStoriesURL =
  'https://hacker-news.firebaseio.com/v0/jobstories.json';
export const userURL =
  'https://hacker-news.firebaseio.com/v0/user/USER_ID.json';

export function getItemURL(itemID: string) {
  return itemURL.replace('ITEM_ID', itemID);
}

export function getUserURL(userId: string) {
  return userURL.replace('USER_ID', userId);
}
