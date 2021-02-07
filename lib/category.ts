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

import IDictionary from "../types/IDictionary";
import YAML from "yaml";
import fs from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data");

type CategoryEntry = {
    description: string;
    list: string[];
    subcategories?: CategoryEntry[];
}
type GetCategoryDataReturnType = IDictionary<CategoryEntry>;
export function getCategoryData(): GetCategoryDataReturnType {
    const fullPath = path.join(dataDirectory, "categories.yaml");
    const contents = fs.readFileSync(fullPath);
    const yaml = YAML.parse(contents.toString());
    return yaml as GetCategoryDataReturnType;
}
