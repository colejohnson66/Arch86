/* This file is part of 80x86.
 * Copyright (c) 2020-2021 Cole Johnson
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
 * You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { getAllInstructionsArray } from "./instruction";
import globby from "globby";
import path from "path";

const pagesDirectory = path.join(process.cwd(), "pages");

export function getAllPages(): string[] {
    // basic pages
    const ret: string[] = globby.sync([
        "**/*",
        "!404",
        "!_*",
        "!api",
        "!instruction/[slug].tsx",
    ], {
        cwd: pagesDirectory,
    }).map((file) => {
        // remove `.tsx`
        let path = file.substr(0, file.length - ".tsx".length);
        if (path.endsWith("index"))
            path = path.substr(0, path.length - "index".length);
        return `/${path}`;
    });

    // instruction pages
    ret.push(...getAllInstructionsArray().map((instr) => `/instruction/${instr}`));

    return ret;
}
