/* =============================================================================
 * File:   Prebuild.mts
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022-2023 Cole Tobin
 *
 * This file is part of Arch86.
 *
 * Arch86 is free software: you can redistribute it and/or modify it under the
 *   terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * Arch86 is distributed in the hope that it will be useful, but WITHOUT ANY
 *   WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 *   FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
 *   more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 *   along with Arch86. If not, see <http://www.gnu.org/licenses/>.
 * =============================================================================
 */

import dir from "node-dir"; // TODO: replace this; seems to be a dead project
import fs from "fs";
import path from "path";

console.log("[SCRIPTS] Generating PageList.ts...");
console.log("[SCRIPTS] Generating sitemap.xml...");

const list: string[] = [];
const pagesDir = path.join(process.cwd(), "src", "app");
dir.files(pagesDir, { sync: true }).forEach(entry => {
    // cleanup directory separator for Windows; replaceAll doesn't exist at Vercel
    entry = entry.replace(/\\/g, "/");

    if (!entry.endsWith(".tsx")) return;

    // get just the URL part plus extension
    entry = entry.substring(pagesDir.length);

    // filter out non-page files
    if (entry === "/favicon.ico" ||
        entry === "/globals.css" ||
        entry === "/sitemap.xml" ||
        // (see <https://nextjs.org/docs/app/building-your-application/routing#file-conventions>)
        entry.endsWith("/error.tsx") ||
        entry.endsWith("/layout.tsx") ||
        entry.endsWith("/route.tsx") ||
        entry.endsWith("/template.tsx") ||
        entry === "/loading.tsx" ||
        entry === "/not-found.tsx" ||
        entry === "/default.tsx")
        return;

    // remove route groups (forward slash, open paren, text, close paren)
    entry = entry.replace(/\/\([a-z]+\)/g, "");

    // remove extension
    entry = entry.substring(0, entry.length - ".tsx".length);

    // cleanup indexes
    if (entry.endsWith("page")) {
        entry = entry.substring(0, entry.length - "/page".length);
        if (entry === "")
            entry = "/"; // webroot fix
    }

    list.push(entry);
});
list.sort();

const PageListLines = [
    "// Auto-generated by /scripts/Prebuild.mts",
    "// Any edits will be lost during the build process",
    "",
    "const List = [",
];
PageListLines.push(...list.map(entry => `    "${entry}",`));
PageListLines.push(
    "] as const;",
    "",

    "// this turns a const array into a string enum",
    "export type PageListType = typeof List[number];",
    "",
    "// this \"untypes\" the array into a generic string one",
    "const PageList: readonly string[] = List;",
    "export default PageList;",
    ""
);
fs.writeFileSync("src/data/PageList.ts", PageListLines.join("\n"));

const SiteMapLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];
SiteMapLines.push(
    ...list.map(entry => `    <url><loc>https://arch86.com${entry}</loc></url>`)
);
SiteMapLines.push("</urlset>", "");
fs.writeFileSync("src/app/sitemap.xml", SiteMapLines.join("\n"));

console.log("          Done.");
