# Point Buy Calculator

This is a massively over-engineered attribute point buy calculator for 3.5 edition D&amp;D.
It is implemented as an “isomorphic” (or “universal”) React JS application (meaning that the React-generated HTML is rendered server-side, rather than on page load).
The goal is to see how small I can make a (very simple) application as a measurement of the overhead of this technique.

## Development

Prequisite: nvm (install to `~/.nvm/nvm.sh` for the pre-commit hook)

To build:

```sh
nvm use
npm run build
```

Open `dist/index.html` in a web browser.

### Install the pre-commit hook

The pre-commit hook automatically updates `npm-shrinkwrap.json` when `package.json` changes.

```sh
ln -s ../../pre-commit .git/hooks/pre-commit
```
