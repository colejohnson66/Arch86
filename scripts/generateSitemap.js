const chalk = require("chalk");
const { execFileSync } = require("child_process");
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
].concat(ignore)).forEach((file) => {
    // match `pages/$1.tsx`
    let path = file.match(/pages\/([^\.]+)\.tsx/)[1];
    if (path.endsWith("index"))
        path = path.substr(0, path.length - "index".length);
    newUrl(path, file);
});

// handle "/instruction/[slug]"
globby.sync([
    "data/instructions/**/*"
].concat(ignore)).forEach((file) => {
    // match `data/instructions/./$1.yaml`
    const slug = file.match(/data\/instructions\/[a-z]\/([^\.]+)\.yaml/)[1];
    newUrl(`instruction/${slug}`, file);
});

siteMapLines.push(`</urlset>`);

fs.writeFileSync("public/sitemap.xml", siteMapLines.join("\n"));

console.log(chalk`[SCRIPTS] {green sitemap.xml generated!}`);

function newUrl(slug, file) {
    const args = [
        "log",
        "-1",
        "--format=%aI", // "author date, strict ISO 8601 format"
        file,
    ];
    const date = execFileSync("git", args).toString().trim();

    siteMapLines.push(
        "  <url>",
        `    <loc>https://80x86.dev/${slug}</loc>`,
        `    <lastmod>${date}</lastmod>`,
        "  </url>"
    );
}
