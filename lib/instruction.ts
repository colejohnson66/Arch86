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
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import YAML from "yaml";
import fs from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data", "instructions");

export function getAllInstructionsArray(): string[] {
    // gets all filenames in `data/instructions`, then removes `.yaml` from the end
    return fs.readdirSync(dataDirectory).map((filename) => (filename.replace(/\.yaml$/, "")));
}

type GetAllInstructionsAsParamsReturnType = {
    params: {
        slug: string;
    };
};
export function getAllInstructionsAsParams(): GetAllInstructionsAsParamsReturnType[] {
    return getAllInstructionsArray().map((filename) => (
        {
            params: {
                slug: filename,
            },
        }
    ));
}

export async function getInstructionData(id: string): Promise<unknown> {
    const fullPath = path.join(dataDirectory, `${id}.yaml`);
    const contents = fs.readFileSync(fullPath);
    const yaml = YAML.parse(contents.toString());
    return {
        id,
        ...yaml,
    };
}
