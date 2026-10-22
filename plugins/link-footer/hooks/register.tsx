import type { Register } from 'claude-code'

// http(s) URLs, stopping at whitespace and at what closes markdown or quotes them.
const URL_PATTERN = /https?:\/\/[^\s<>()`"'\[\]{}|\^]+/g
// Sentence punctuation that follows a URL rather than belonging to it.
const TRAILING = /[.,;:!?*_~]+$/
// Room taken on each row by the indent and the arrow before the label.
const ROW_PREFIX = 4

export function extractUrls(text: string): string[] {
  const urls = (text.match(URL_PATTERN) ?? []).map(url => url.replace(TRAILING, ''))

  return [...new Set(urls)]
}

// What the row shows for a URL: no scheme, so the terminal does not detect it as a URL of
// its own (it would open only the part on one row), and short enough to fit on one row,
// cutting the middle of the path. The hyperlink itself always carries the whole URL.
export function labelFor(url: string, width: number): string {
  const bare = url.replace(/^https?:\/\//, '')

  if (bare.length <= width) {
    return bare
  }

  const host = bare.split('/')[0] ?? bare
  const room = width - host.length - 2

  if (room < 8) {
    return `${bare.slice(0, width - 1)}…`
  }

  return `${host}/…${bare.slice(-room)}`
}

export const register: Register = on => {
  // The reply is drawn as always; below it, each URL again as one hyperlink (OSC 8) with a
  // short label, so a click on it opens the whole address.
  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    const drawn = await next(e)
    const urls = e.surface === 'terminal' ? extractUrls(e.props.text) : []

    if (urls.length === 0) {
      return drawn
    }

    const { Box, Text, Link } = $.ui.resolve(e)
    const width = Math.max((e.viewport?.columns ?? 80) - ROW_PREFIX, 20)

    return (
      <Box flexDirection="column">
        {drawn}
        <Box flexDirection="column" marginLeft={2}>
          {urls.map(url => (
            <Text key={url} dimColor wrap="truncate-end">
              ↗ <Link href={url} label={labelFor(url, width)} />
            </Text>
          ))}
        </Box>
      </Box>
    )
  })
}
