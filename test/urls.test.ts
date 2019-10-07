import { getItemURL, getUserURL } from '../src/urls'

test('Should return a valid user URL', () => {
  expect(getUserURL('dh')).toBe('https://hacker-news.firebaseio.com/v0/user/dh.json')
})

test('Should return a valid item URL', () => {
  expect(getItemURL('123')).toBe('https://hacker-news.firebaseio.com/v0/item/123.json')
})