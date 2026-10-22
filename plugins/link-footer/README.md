# link-footer

Under each assistant reply in the terminal, lists every URL of the reply again as a
clickable [OSC 8](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda)
hyperlink with a short label:

```
  ↗ github.com/javirub/claude-mods
  ↗ gitlab.com/group/…/-/merge_requests/138
```

## Why

A long URL in a reply wraps across several terminal rows. Terminals that detect URLs on
their own (Windows Terminal among them) only see the part on one row, so a click opens a
truncated, broken address. Copying it by hand drags in the line breaks.

link-footer adds one row per URL below the reply:

- The row's label has **no scheme** (`github.com/...`, not `https://github.com/...`), so the
  terminal does not detect it as a URL of its own.
- The label is **cut to fit one row** (the middle of the path is elided), so it never wraps.
- The hyperlink behind the label always carries the **full URL**.

The reply itself is drawn exactly as before. URLs are deduplicated, and trailing sentence
punctuation and markdown delimiters are not taken as part of them.

## Cost

Zero tokens. The mod only changes how the reply is drawn in your terminal; it never touches
the prompt, the conversation or the model. Everything runs locally.

## Install

```
/plugin install link-footer --marketplace javirub/claude-mods
```

Answer `y` to add the marketplace, then choose the user scope.

## Usage

Nothing to configure. In Windows Terminal, **Ctrl+click** a row under a reply to open the full
URL. Any terminal that supports OSC 8 hyperlinks works the same way (the modifier key may differ).

## Development

Run the tests from the repository root:

```
claude plugin test plugins/link-footer
```

`tsconfig.json` extends `.claude-plugin/types/tsconfig.json`, which Claude Code generates when
it loads the mod (it is gitignored).
