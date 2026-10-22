# Claude Mods

A marketplace of small mods for [Claude Code](https://code.claude.com): plugins that change
how Claude Code looks or behaves in your terminal.

## Mods

| Mod | What it does |
|---|---|
| [link-footer](plugins/link-footer) | Lists the URLs of each assistant reply under it as OSC 8 hyperlinks, clickable even when the terminal wraps them |

## Install a mod

In Claude Code:

```
/plugin install <mod> --marketplace javirub/claude-mods
```

The first time, answer `y` to add the marketplace, then choose the user scope. For example:

```
/plugin install link-footer --marketplace javirub/claude-mods
```

## Add a new mod

1. Create a folder under `plugins/<mod>/` with its `.claude-plugin/plugin.json` (same `name`
   as the folder), its code and its tests, plus a `README.md`.
2. Add an entry to `.claude-plugin/marketplace.json`:

   ```json
   { "name": "<mod>", "source": "./plugins/<mod>", "description": "..." }
   ```

3. Add a row to the table above.
4. Validate and test from the repository root:

   ```
   claude plugin validate .
   claude plugin validate plugins/<mod>
   claude plugin test plugins/<mod>
   ```

## License

[MIT](LICENSE)
