/* =============================================================================
 * File:   UppercaseMnemonic.ts
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2020-2021 Cole Tobin
 *
 * This file is part of 80x86.
 *
 * 80x86 is free software: you can redistribute it and/or modify it under the
 *   terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * 80x86 is distributed in the hope that it will be useful, but WITHOUT ANY
 *   WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 *   FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
 *   more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 *   along with 80x86. If not, see <http://www.gnu.org/licenses/>.
 * =============================================================================
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

export default function UppercaseMnemonic(mnemonic: string): string {
    if (mnemonic.endsWith("cc"))
        return `${mnemonic.substring(0, mnemonic.length - 2).toUpperCase()}cc`;

    if (mnemonic.includes("nnn"))
        return mnemonic.replace("nnn", "###").toUpperCase();

    return mnemonic.toUpperCase();
}
