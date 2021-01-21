const chalk = require("chalk");
const fs = require("fs");
const globby = require("globby");

const ignore = [
    "!pages/404*",
    "!pages/_*",
    "!pages/api",
    "!pages/instruction/[slug].tsx",
];

const siteMapLines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
];

console.log(chalk`[SCRIPTS] {yellow Generating sitemap.xml...}`);

globby.sync([
    "pages/**/*"
].concat(ignore)).forEach((page) => {
    // match `pages/$1.tsx`
    page = page.match(/pages\/([^\.]+)\.tsx/)[1];
    if (page.endsWith("index"))
        page = page.substr(0, page.length - "index".length);
    newUrl(page);
});

// handle "/instruction/[slug]"
globby.sync([
    "data/instructions/*"
].concat(ignore)).forEach((data) => {
    // match `data/instructions/$1.yaml`
    data = data.match(/data\/instructions\/([^\.]+)\.yaml/)[1];
    newUrl(`instruction/${data}`);
});

siteMapLines.push(`</urlset>`);

fs.writeFileSync("public/sitemap.xml", siteMapLines.join("\n"));

console.log(chalk`[SCRIPTS] {green sitemap.xml generated!}`);

function newUrl(slug) {
    siteMapLines.push(
        `  <url>`,
        `    <loc>https://80x86.dev/${slug}</loc>`,
        `  </url>`
    );
}
