import { expect, test } from 'claude-code/testing'

import { extractUrls, labelFor } from '../hooks/register'

test('URLs are found in prose and markdown, without trailing punctuation, once each', async () => {
  const text = [
    'Merge request opened: https://gitlab.com/group/project/-/merge_requests/138.',
    '[docs](https://istio.io/latest/docs/ambient/) and `https://istio.io/latest/docs/ambient/`',
    'repeated https://gitlab.com/group/project/-/merge_requests/138, end',
  ].join('\n')

  expect(extractUrls(text)).toEqual([
    'https://gitlab.com/group/project/-/merge_requests/138',
    'https://istio.io/latest/docs/ambient/',
  ])
  expect(extractUrls('no links here')).toEqual([])
})

test('labels drop the scheme and fit the width', async () => {
  const url = 'https://gitlab.example.com/some-group/some-subgroup/a-fairly-long-project-name/-/merge_requests/138'

  expect(labelFor('https://istio.io/docs/', 60)).toBe('istio.io/docs/')
  for (const width of [20, 40, 60]) {
    const label = labelFor(url, width)
    expect(label.length <= width).toBe(true)
    expect(label.startsWith('http')).toBe(false)
    expect(label.startsWith('gitlab.example')).toBe(true)
  }
  expect(labelFor(url, 60).endsWith('merge_requests/138')).toBe(true)
})
