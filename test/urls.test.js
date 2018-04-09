import test from 'ava'
import { getItemURL, getUserURL } from '../src/urls'

test('Should return a valid user URL', t => {
  t.is(getUserURL('dh'), 'https://hacker-news.firebaseio.com/v0/user/dh.json')
})

test('Should return a valid item URL', t => {
  t.is(getItemURL('123'), 'https://hacker-news.firebaseio.com/v0/item/123.json')
})
