import { expect, test, vi, beforeEach, describe } from 'vitest';
import {
  fetchItem,
  fetchUser,
  fetchTopStories,
  fetchNewStories,
  fetchBestStories,
  fetchJobStories,
  fetchAskStories,
  fetchShowStories,
  type HackerNewsItem,
  type HackerNewsUser,
} from '../src/index';

// Mock native fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Mock data
const mockItem: HackerNewsItem = {
  id: 12335,
  type: 'story',
  by: 'testuser',
  time: 1678901234,
  title: 'Test Story Title',
  url: 'https://example.com',
  score: 150,
  descendants: 25,
  kids: [12336, 12337],
};

const mockUser: HackerNewsUser = {
  id: 'dh',
  created: 1234567890,
  karma: 12345,
  about: 'Test user description',
  submitted: [12335, 12336, 12337],
};

const mockStoryIds = [12335, 12336, 12337, 12338, 12339, 12340];

const createMockStory = (id: number): HackerNewsItem => ({
  id,
  type: 'story',
  by: `user${id}`,
  time: 1678901234 + id,
  title: `Test Story ${id}`,
  url: `https://example.com/${id}`,
  score: 100 + id,
  descendants: id % 10,
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchItem', () => {
  test('should fetch valid item information', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockItem),
    } as any);

    const item = await fetchItem(12335);

    expect(item).toEqual(mockItem);
    expect(item.id).toBe(12335);
    expect(item.title).toBe('Test Story Title');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/item/12335.json'
    );
  });

  test('should throw error for invalid item ID', async () => {
    await expect(fetchItem(-1)).rejects.toThrow(
      'Item ID must be a positive integer'
    );
    await expect(fetchItem(0)).rejects.toThrow(
      'Item ID must be a positive integer'
    );
    await expect(fetchItem(1.5)).rejects.toThrow(
      'Item ID must be a positive integer'
    );
  });

  test('should handle fetch errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as any);

    await expect(fetchItem(99999)).rejects.toThrow('HTTP error! status: 404');
  });
});

describe('fetchUser', () => {
  test('should fetch valid user information', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockUser),
    } as any);

    const user = await fetchUser('dh');

    expect(user).toEqual(mockUser);
    expect(user.id).toBe('dh');
    expect(user.karma).toBe(12345);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/user/dh.json'
    );
  });

  test('should throw error for invalid user ID', async () => {
    await expect(fetchUser('')).rejects.toThrow(
      'User ID must be a non-empty string'
    );
    await expect(fetchUser('   ')).rejects.toThrow(
      'User ID must be a non-empty string'
    );
  });

  test('should handle fetch errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as any);

    await expect(fetchUser('nonexistentuser')).rejects.toThrow(
      'HTTP error! status: 404'
    );
  });
});

describe('Story fetching functions', () => {
  const setupMockForStories = (numberOfStories: number) => {
    // First call returns story IDs
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockStoryIds),
    } as any);

    // Subsequent calls return individual stories
    for (let i = 0; i < numberOfStories; i++) {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(createMockStory(mockStoryIds[i])),
      } as any);
    }
  };

  test('should fetch top stories', async () => {
    const numberOfStories = 5;
    setupMockForStories(numberOfStories);

    const stories = await fetchTopStories(numberOfStories);

    expect(stories).toHaveLength(numberOfStories);
    expect(stories[0].id).toBe(12335);
    expect(stories[0].title).toBe('Test Story 12335');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
  });

  test('should fetch new stories', async () => {
    const numberOfStories = 3;
    setupMockForStories(numberOfStories);

    const stories = await fetchNewStories(numberOfStories);

    expect(stories).toHaveLength(numberOfStories);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/newstories.json'
    );
  });

  test('should fetch best stories', async () => {
    const numberOfStories = 4;
    setupMockForStories(numberOfStories);

    const stories = await fetchBestStories(numberOfStories);

    expect(stories).toHaveLength(numberOfStories);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/beststories.json'
    );
  });

  test('should fetch ask stories', async () => {
    const numberOfStories = 2;
    setupMockForStories(numberOfStories);

    const stories = await fetchAskStories(numberOfStories);

    expect(stories).toHaveLength(numberOfStories);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/askstories.json'
    );
  });

  test('should fetch show stories', async () => {
    const numberOfStories = 5;
    setupMockForStories(numberOfStories);

    const stories = await fetchShowStories(numberOfStories);

    expect(stories).toHaveLength(numberOfStories);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/showstories.json'
    );
  });

  test('should fetch job stories', async () => {
    const numberOfStories = 3;
    setupMockForStories(numberOfStories);

    const stories = await fetchJobStories(numberOfStories);

    expect(stories).toHaveLength(numberOfStories);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/jobstories.json'
    );
  });
});

describe('Story functions with default parameters', () => {
  test('should use default number of stories when not specified', async () => {
    const defaultStoryIds = Array.from({ length: 20 }, (_, i) => 12335 + i);

    // Mock for story IDs fetch
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(defaultStoryIds),
    } as any);

    // Mock for individual story fetches (default is 10)
    for (let i = 0; i < 10; i++) {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(createMockStory(defaultStoryIds[i])),
      } as any);
    }

    const stories = await fetchTopStories(); // No parameter, should default to 10
    expect(stories).toHaveLength(10);
  });
});

describe('Error handling', () => {
  test('should throw error for invalid numberOfStories', async () => {
    await expect(fetchTopStories(-1)).rejects.toThrow(
      'numberOfStories must be a positive integer'
    );
    await expect(fetchTopStories(0)).rejects.toThrow(
      'numberOfStories must be a positive integer'
    );
    await expect(fetchTopStories(1.5)).rejects.toThrow(
      'numberOfStories must be a positive integer'
    );
  });

  test('should handle network errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchTopStories(5)).rejects.toThrow(
      'Failed to fetch data from https://hacker-news.firebaseio.com/v0/topstories.json: Network error'
    );
  });
});
