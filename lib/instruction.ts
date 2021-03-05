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

/**
 * Instructions are organized under `data/instructions` by folders named after
 *   the first letter in the instruction.
 * The files are named what the instruction is called, but in lowercase.
 * For example, `AAA` is located at `data/instructions/a/aaa.yaml`.
 *
 * For conditional instructions (eg. `CMOVcc`), the data file is simply
 *   `data/instructions/c/cmovcc.yaml`.
 * The `render` function in `/instruction` will keep `cc` lowercased.
 *
 * For exclusively vector instructions (ones where `V???` exist, but not `???`),
 *   the data files are stored at `data/instructions/?/???.yaml` (with no
 *   leading `v`).
 * For example, the nicely named `VCVTNEPS2BF16` is located at
 *   `data/instructions/c/cvtneps2bf16.yaml` (note the missing `v`).
 *
 * FMA instructions are handled similarly, but with an additional change.
 * Due to the multiple forms that only differ in parameter order (named with
 *   numerals 1, 2, and 3 in the mnemonic), they are stored the same as above,
 *   but with an additional change:
 * The three numbers are replaced with `nnn` (`/[123]{3}/nnn/` in regex).
 * The `render` function in `/instruction` will detect the `nnn` and replace
 *   them with three number symbols (`###`) (octothorpe for you fancy people).
 * This is to avoid issues with `#` in URLs.
 */

import IDictionary from "../types/IDictionary";
import YAML from "yaml";
import fs from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data", "instructions");

export function getAllInstructionsArray(): string[] {
    // gets all directories in `data/instructions`
    const ret: string[] = [];
    fs.readdirSync(dataDirectory).forEach((char) => {
        // skip anything that's not just a character
        if (char.length !== 1)
            return;
        // get all files in `data/instructions/${char}`, then remove `.yaml` from the end
        const newDir = path.join(dataDirectory, char);
        const files = fs.readdirSync(newDir).map((file) => (file.replace(/\.yaml$/, "")));
        ret.push(...files);
    });

    return ret;
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

type GetGroupedInstructionListReturnType = IDictionary<(string | string[])[]>;
export function getGroupedInstructionList(): GetGroupedInstructionListReturnType {
    const fullPath = path.join(dataDirectory, "list.yaml");
    const contents = fs.readFileSync(fullPath);
    const yaml = YAML.parse(contents.toString());
    return yaml as GetGroupedInstructionListReturnType;
}

export async function getInstructionData(id: string): Promise<unknown> {
    const fullPath = path.join(dataDirectory, id[0], `${id}.yaml`);
    const contents = fs.readFileSync(fullPath);
    const yaml = YAML.parse(contents.toString());
    return {
        id,
        ...yaml,
    };
}
