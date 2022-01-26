/* =============================================================================
 * File:   Categories.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022 Cole Tobin
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

import PageList, { PageListType } from "@data/PageList";

type Category = {
    name: React.ReactNode;
    namePlain: string;
    description?: React.ReactNode;
    pages: PageListType[];
    subcategories?: Category[];
};

const Adx: PageListType[] = [
    "/instruction/a/adcx",
    "/instruction/a/adox",
];
const Sse: PageListType[] = [
    "/instruction/a/addps",
    "/instruction/a/addss",
];
const Sse2: PageListType[] = [
    "/instruction/a/addpd",
    "/instruction/a/addsd",
];
const Sse3: PageListType[] = [
    "/instruction/a/addsubps",
    "/instruction/a/addsubpd",
];

const Categories: Category[] = [
    {
        name: <>Instructions</>,
        namePlain: "Instructions",
        pages: PageList.filter((page) => page.startsWith("/instruction")) as PageListType[],
        subcategories: [
            {
                name: <>BCD Arithmetic</>,
                namePlain: "BCD Arithmetic",
                pages: [
                    "/instruction/a/aaa",
                    "/instruction/a/aad",
                    "/instruction/a/aam",
                    "/instruction/a/aas",
                ],
            },
            {
                name: <>Basic ALU Operations</>,
                namePlain: "Basic ALU Operations",
                pages: [
                    "/instruction/a/adc",
                    "/instruction/a/add",
                    "/instruction/a/and",
                    "/instruction/c/cmp",
                    // "/instruction/o/or",
                    // "/instruction/s/sbb",
                    // "/instruction/s/sub",
                    // "/instruction/x/xor",
                ],
            },
            {
                name: <>ADX</>,
                namePlain: "ADX",
                pages: Adx,
            },
        ],
    }
];

export default Categories;
