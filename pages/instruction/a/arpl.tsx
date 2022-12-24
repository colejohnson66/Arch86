/* =============================================================================
 * File:   arpl.tsx
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

import Canned from "@library/Canned";
import Exceptions from "@library/Exceptions";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "arpl",
    title: <>Adjust <code>RPL</code> Field of Segment Selector</>,
    titlePlain: "Adjust RPL Field of Segment Selector",
    opcodes: [
        {
            opcode: <>63 /r</>,
            mnemonic: <>ARPL <i>r/m16</i>, <i>r16</i></>,
            encoding: "mr",
            validity: {
                16: "invalid",
                32: "valid",
                64: "n/e",
            },
            description: <>Adjust the <code>RPL</code> field (bits 0 and 1) of <i>r/m16</i> to be greater than or equal to the <code>RPL</code> field of <i>r16</i>.</>,
        },
    ],
    encodings: {
        mr: ["ModRM.r/m[rw]", "ModRM.reg[r]"],
    },
    description: (
        <>
            <p>
                The <code>ARPL</code> instruction compares the <code>RPL</code> (requested privilege level) field (bits 0 and 1) of two segment selectors.
                The the <code>RPL</code> field of the destination operand is less than the <code>RPL</code> field of the source operand, <Register name="ZF" /> is set, and the <code>RPL</code> field of the destination is increased to match the source&apos;s.
                Otherwise, <Register name="ZF" /> is cleared and no change to the destination occurs.
            </p>
            <p>
                {Canned.NoLongNE("MOVSXD")}
            </p>
        </>
    ),
    operation:
        `public void ARPL(U16 dest, U16 src)
{
    if (dest.Bit[0..1] < src.Bit[0..1])
        dest.Bit[0..1] = src.Bit[0..1];
}`,
    flags: {
        CF: <>Unmodified.</>,
        PF: <>Unmodified.</>,
        AF: <>Unmodified.</>,
        ZF: <>Set if an adjustment is made. Cleared otherwise.</>,
        SF: <>Unmodified.</>,
        OF: <>Unmodified.</>,
    },
    exceptionsLegacy: {
        protected: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NonWritableSegment,
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
                Exceptions.NonWritableSegment,
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
