import {
  getItemURL,
  getUserURL,
  topStoriesURL,
  bestStoriesURL,
  newStoriesURL,
  askStoriesURL,
  jobStoriesURL,
  showStoriesURL,
} from './urls';

const defaultNumberOfStories = 10;

/**
 * Represents a Hacker News item (story, comment, job, poll, etc.)
 */
export interface HackerNewsItem {
  /** The item's unique ID */
  id: number;
  /** Type of item */
  type: 'story' | 'comment' | 'job' | 'ask' | 'show' | 'poll' | 'pollopt';
  /** Username of the author */
  by: string;
  /** Unix timestamp of creation */
  time: number;
  /** The comment, story, or poll text (HTML) */
  text?: string;
  /** The title of the story, Ask HN, or job */
  title?: string;
  /** The URL of the story */
  url?: string;
  /** The story's score */
  score?: number;
  /** Array of comment IDs */
  kids?: number[];
  /** Comment's parent ID */
  parent?: number;
  /** Total comment count for stories */
  descendants?: number;
  /** For polls, array of related poll option IDs */
  parts?: number[];
  /** For poll options, the poll ID */
  poll?: number;
  /** Whether the item is deleted */
  deleted?: boolean;
  /** Whether the item is dead */
  dead?: boolean;
}

/**
 * Represents a Hacker News user
 */
export interface HackerNewsUser {
  /** The user's unique username */
  id: string;
  /** Unix timestamp of account creation */
  created: number;
  /** The user's karma score */
  karma: number;
  /** The user's optional self-description (HTML) */
  about?: string;
  /** Array of item IDs the user has submitted */
  submitted: number[];
  /** Whether the user is delayed */
  delay?: number;
}

/**
 * Fetches JSON data from a URL with error handling
 */
async function fetchJSON<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      `Failed to fetch data from ${url}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

/**
 * Fetches a single Hacker News item by its ID
 * @param itemId - The unique ID of the item to fetch
 * @returns Promise that resolves to a HackerNewsItem object
 * @throws Error when the item ID is invalid or the request fails
 * @example
 * ```typescript
 * const item = await fetchItem(8863);
 * console.log(item.title); // Item title
 * ```
 */
export async function fetchItem(itemId: number): Promise<HackerNewsItem> {
  if (!Number.isInteger(itemId) || itemId <= 0) {
    throw new Error('Item ID must be a positive integer');
  }
  return fetchJSON(getItemURL(itemId.toString()));
}

/**
 * Fetches multiple items by their IDs
 */
async function fetchItems(itemIds: number[]): Promise<HackerNewsItem[]> {
  return Promise.all(itemIds.map((itemId) => fetchItem(itemId)));
}

/**
 * Fetches stories from a given URL
 * @param storiesUrl - The URL to fetch story IDs from
 * @param numberOfStories - Number of stories to fetch (default: 10)
 * @returns Promise that resolves to an array of HackerNewsItem objects
 */
async function fetchStories(
  storiesUrl: string,
  numberOfStories = defaultNumberOfStories
): Promise<HackerNewsItem[]> {
  if (!Number.isInteger(numberOfStories) || numberOfStories <= 0) {
    throw new Error('numberOfStories must be a positive integer');
  }

  const itemIds = await fetchJSON<number[]>(storiesUrl);
  return fetchItems(itemIds.slice(0, numberOfStories));
}

/**
 * Fetches the current top stories from Hacker News
 * @param numberOfStories - Number of stories to fetch (default: 10)
 * @returns Promise that resolves to an array of top stories
 * @example
 * ```typescript
 * const topStories = await fetchTopStories(20);
 * console.log(topStories.map(s => s.title));
 * ```
 */
export function fetchTopStories(
  numberOfStories = defaultNumberOfStories
): Promise<HackerNewsItem[]> {
  return fetchStories(topStoriesURL, numberOfStories);
}

/**
 * Fetches the newest stories from Hacker News
 * @param numberOfStories - Number of stories to fetch (default: 10)
 * @returns Promise that resolves to an array of newest stories
 */
export function fetchNewStories(
  numberOfStories = defaultNumberOfStories
): Promise<HackerNewsItem[]> {
  return fetchStories(newStoriesURL, numberOfStories);
}

/**
 * Fetches the best stories from Hacker News based on score
 * @param numberOfStories - Number of stories to fetch (default: 10)
 * @returns Promise that resolves to an array of best stories
 */
export function fetchBestStories(
  numberOfStories = defaultNumberOfStories
): Promise<HackerNewsItem[]> {
  return fetchStories(bestStoriesURL, numberOfStories);
}

/**
 * Fetches Ask HN stories where users ask questions
 * @param numberOfStories - Number of stories to fetch (default: 10)
 * @returns Promise that resolves to an array of Ask HN stories
 */
export function fetchAskStories(
  numberOfStories = defaultNumberOfStories
): Promise<HackerNewsItem[]> {
  return fetchStories(askStoriesURL, numberOfStories);
}

/**
 * Fetches Show HN stories where users share projects
 * @param numberOfStories - Number of stories to fetch (default: 10)
 * @returns Promise that resolves to an array of Show HN stories
 */
export function fetchShowStories(
  numberOfStories = defaultNumberOfStories
): Promise<HackerNewsItem[]> {
  return fetchStories(showStoriesURL, numberOfStories);
}

/**
 * Fetches job postings from Hacker News
 * @param numberOfStories - Number of job posts to fetch (default: 10)
 * @returns Promise that resolves to an array of job postings
 */
export function fetchJobStories(
  numberOfStories = defaultNumberOfStories
): Promise<HackerNewsItem[]> {
  return fetchStories(jobStoriesURL, numberOfStories);
}

/**
 * Fetches user information for a given username
 * @param userId - The username to fetch information for
 * @returns Promise that resolves to a HackerNewsUser object
 * @throws Error when the userId is invalid or the request fails
 * @example
 * ```typescript
 * const user = await fetchUser('pg');
 * console.log(`${user.id} has ${user.karma} karma`);
 * ```
 */
export async function fetchUser(userId: string): Promise<HackerNewsUser> {
  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
    throw new Error('User ID must be a non-empty string');
  }
  return fetchJSON<HackerNewsUser>(getUserURL(userId.trim()));
}
