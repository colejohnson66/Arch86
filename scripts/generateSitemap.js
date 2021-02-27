/* This file is part of 80x86.
 * Copyright (c) 2021 Cole Johnson
 *
 * This program is free software: you can redistribute it and/or modify it under
 *   the terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 *   ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 *   for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */
const chalk = require("chalk");
const { execFileSync } = require("child_process");
const fs = require("fs");
const globby = require("globby");

console.log(chalk`[SCRIPTS] {yellow Generating sitemap.xml...}`);

const siteMapLines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
];

globby.sync([
    "pages/**/*",
    "!pages/404*",
    "!pages/_*",
    "!pages/api",
    "!pages/instruction/[slug].tsx",
]).forEach((file) => {
    // match `pages/$1.tsx`
    let path = file.match(/pages\/([^\.]+)\.tsx/)[1];
    if (path.endsWith("index"))
        path = path.substr(0, path.length - "index".length);
    newUrl(path, file);
});

// handle "/instruction/[slug]"
globby.sync([
    "data/instructions/**/*",
    "!data/instructions/list.yaml",
]).forEach((file) => {
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
