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

/* The rules for capitalizing instruction mnemonics are:
 *
 * If it's a conditional instruction (ends in `cc`), uppercase it, but
 *   keep `cc` lowercase.
 *
 * If it's an FMA instruction (contains `nnn`), replace `nnn` with `###`,
 *   then uppercase.
 *
 * Otherwise, simply uppercase it.
 */

const ccInstr = [
    "cmovcc",
    "fcmovcc",
    "jcc",
    "setcc",
];

export default function uppercaseMnemonic(mnemonic: string): string {
    if (ccInstr.includes(mnemonic))
        return `${mnemonic.substr(0, mnemonic.length - 2).toUpperCase()}cc`;

    if (mnemonic.includes("nnn"))
        return mnemonic.replace("nnn", "###").toUpperCase();

    return mnemonic.toUpperCase();
}
