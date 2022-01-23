/* =============================================================================
 * File:   List.tsx
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

import MaybeArray from "@myTypes/MaybeArray";
import Titles from "@data/InstructionTitles";

const InstructionList: Record<string, MaybeArray<keyof typeof Titles>[]> = {
    a: [
        "aaa",
        "aad",
        "aam",
        "aas",
        "adc",
        "adcx",
        "add",
        ["addList", "addps", "addpd", "addss", "addsd"],
        ["addsubList", "addsubps", "addsubpd"],
        "adox",
        ["aesdecList", "aesdec", "aesdeclast"],
        ["aesdecklList", "aesdec128kl", "aesdec256kl"],
        ["aesdecwideklList", "aesdecwide128kl", "aesdecwide256kl"],
        ["aesencList", "aesenc", "aesenclast"],
        ["aesencklList", "aesenc128kl", "aesenc256kl"],
        ["aesencwideklList", "aesencwide128kl", "aesencwide256kl"],
        "aesimc",
        "aeskeygenassist",
        "and",
        ["andList", "andps", "andpd"],
        "andn",
        ["andnList", "andnps", "andnpd"],
        "arpl",
    ],
    b: [
        "bextr",
        ["blendList", "blendps", "blendpd"],
        ["blendvList", "blendvps", "blendvpd"],
        "blsi",
        "blsmsk",
        "blsr",
        "bndcl",
        "bndcu-bndcn",
        "bndldx",
        "bndmk",
        "bndmov",
        "bndstx",
        "bound",
        "bsf",
        "bsr",
        "bswap",
        "bt",
        "btc",
        "btr",
        "bts",
        "bzhi",
    ],
    c: [
        "call",
        "cbw-cwde-cdqe",
        "clac",
        "clc",
        "cld",
        "cldemote",
        "clflush",
        "clflushopt",
        "cli",
        "clrssbsy",
        "clts",
        "clwb",
        "cmc",
        "cmovcc",
        "cmp",
        ["cmpList", "cmpps", "cmppd", "cmpss", "cmpsd"],
        "cmps",
        "cmpxchg",
        "cmpxchg8b-cmpxchg16b",
        ["comiList", "comiss", "comisd"],
        "cpuid",
        "crc32",
        // ["cvtdqList", "cvtdq2ps", "cvtdq2pd"],
        // ["cvtpdList", "cvtpd2dq", "cvtpd2pi", "cvtpd2ps"],
        // ["cvtpiList", "cvtpi2ps", "cvtpi2pd"],
        // ["cvtpsList", "cvtps2dq", "cvtps2pd", "cvtps2pi"],
        // ["cvtsdList", "cvtsd2si", "cvtsd2ss"],
        // ["cvtsiList", "cvtsi2ss", "cvtsi2sd"],
        // ["cvtssList", "cvtss2sd", "cvtss2si"],
        // ["cvttpdList", "cvttpd2dq", "cvttpd2pi"],
        // ["cvttpsList", "cvttps2dq", "cvttps2pi"],
        // "cvttsd2si",
        // "cvttss2si",
    ]
};

export default InstructionList;
