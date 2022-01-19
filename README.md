# Arch86

[Arch86](https://arch86.com/) is a digital reference of the x86 (and x86-64) processor architecture.

## Technology

Arch86 is built on Node.js with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com).
The website's theme is custom built with [Tailwind CSS](https://tailwindcss.com).

## Running a Copy

Whenever a change is pushed to GitHub, [arch86.com](https://arch86.com) is automatically updated.
Therefore, the code here is what is running *right now.*

However, should you want to run your own copy, follow the following steps:

* Install [Node.js](https://nodejs.org/en/)
* Install `yarn` (on Linux, your package manager may have it):
```shell
$ npm i -g yarn
```
* Clone the repository:
```shell
$ git clone https://github.com/colejohnson66/Arch86
$ cd Arch86
```
* Download the dependencies and run:
```shell
$ yarn install
$ yarn dev
```

After a few seconds, a message will appear in the console telling you the server is ready:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```
Enter that URL into your favorite browser to begin browsing.
In some terminals, clicking the URL while holding `Ctrl` will open it for you.

## License

Arch86 is licensed under [GNU Affero General Public License 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html) or later.
