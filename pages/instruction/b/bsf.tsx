/* =============================================================================
 * File:   bsf.tsx
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

import InstructionPageLayout, { InstructionPageLayoutProps } from "@components/InstructionPageLayout";

import Exceptions from "@library/Exceptions";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "bsf",
    title: <>Bit Scan Forward</>,
    titlePlain: "Bit Scan Forward",
    opcodes: [
        {
            opcode: <>0F BC /r</>,
            mnemonic: <>BSF <i>r16</i>, <i>r/m16</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Stores the bit position of the least significant set bit from <i>r/m16</i> into <i>r16</i>.</>,
        },
        {
            opcode: <>0F BC /r</>,
            mnemonic: <>BSF <i>r32</i>, <i>r/m32</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Stores the bit position of the least significant set bit from <i>r/m32</i> into <i>r32</i>.</>,
        },
        {
            opcode: <>REX.W 0F BC /r</>,
            mnemonic: <>BSF <i>r64</i>, <i>r/m64</i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Stores the bit position of the least significant set bit from <i>r/m64</i> into <i>r64</i>.</>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>BSF</code> instruction searches the source operand for the least significant set bit.
                The zero-based index of this bit is stored in the destination operand.
            </p>
            <p>
                <Register name="ZF" /> is set (due to the source being zero), the result in the destination operand is undefined.
            </p>
        </>
    ),
    operation:
        `public void BSF(ref U16 dest, U16 src)
{
    if (src == 0)
        return; // \`dest\` is undefined

    U16 idx = 0;
    while (src.Bit[idx] == 0)
        idx++;
    dest = idx;
}

public void BSF(ref U32 dest, U32 src)
{
    if (src == 0)
        return; // \`dest\` is undefined

    U32 idx = 0;
    while (src.Bit[idx] == 0)
        idx++;
    dest = idx;
}

public void BSF(ref U64 dest, U64 src)
{
    if (src == 0)
        return; // \`dest\` is undefined

    U64 idx = 0;
    while (src.Bit[idx] == 0)
        idx++;
    dest = idx;
}`,
    flags: {
        CF: <>Undefined.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Set according to the source.</>,
        SF: <>Undefined.</>,
        OF: <>Undefined.</>,
    },
    exceptionsLegacy: {
        real: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        compatibility: {
            // same as protected
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        long: {
            UD: Exceptions.Lock,
            SS0: [
                Exceptions.NonCanonSS,
                Exceptions.SegLimitSS,
            ],
            GP0: [
                Exceptions.NonCanon,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
