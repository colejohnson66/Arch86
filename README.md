# 80x86

[80x86](https://80x86.dev/) is a digital reference of the x86 (and x86-64) processor architecture.

## Technology

80x86 is built on Node.js with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com).
TypeScript is used *extensively.*
The website's theme is built on [Blueprint](https://blueprintjs.com/), and data files are stored in [YAML](https://yaml.org/) (see below).

### Why YAML?

While JavaScript supports JSON "natively" (though `JSON.parse`), YAML was chosen instead for [data storage](https://github.com/colejohnson66/80x86/tree/main/data) for two reasons:

1. It supports multiline strings without any "hacks" (using `"\n"`, an array of singleline strings joined in code, nonstandard JSON, etc.).
For example, the "Operation" section of the [`ADDPD` instruction source](https://github.com/colejohnson66/80x86/blob/main/data/instructions/a/addpd.yaml) is about 100 lines long.
Encoding that in JSON while following the spec would be unwieldy.
2. Its syntax is much less verbose.
For some programmers, verbosity is desired as it avoids bugs, however, JSON's verbosity can be frustrating to work with when manually creating dozens or more files.
YAML's quirks (such as a value of a single (unquoted) `Y` character being interpreted as `true`) can be worked around with attention and a good syntax highlighter.

## Running a Copy

Whenever a change is pushed to GitHub, [80x86.dev](https://80x86.dev) is automatically updated.
Therefore, the code here is what is running *right now.*

However, should you want to run your own copy, follow the following steps:

* Install [Node.js](https://nodejs.org/en/)
* Install `yarn`:
```bash
$ npm i -g yarn
```
* Clone the repository:
```bash
$ git clone https://github.com/colejohnson66/80x86
$ cd 80x86
```
* Download the dependencies and run:
```bash
$ yarn install
$ yarn dev
```

After a few seconds, a message will appear in the console telling you the server is "live":
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```
Enter that URL into your favorite browser to begin browsing.
In some terminals, clicking the URL while holding `Ctrl` will open it for you.

## License

80x86 is licensed under [GNU Affero General Public License 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html) or later.
