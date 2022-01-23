/* =============================================================================
 * File:   bound.tsx
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
import Exception from "@components/Exception";
import Exceptions from "@library/Exceptions";

const PageData: InstructionPageLayoutProps = {
    id: "bound",
    title: <>Check Array Index Against Bounds</>,
    titlePlain: "Check Array Index Against Bounds",
    opcodes: [
        {
            opcode: <>62 mem/r</>,
            mnemonic: <>BOUND <i>r16</i>, <i>m16&amp;16</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            description: <>Check if <i>r16</i> (an array index) is within the bounds specified by <i>m16&amp;16</i>.</>,
        },
        {
            opcode: <>62 mem/r</>,
            mnemonic: <>BOUND <i>r32</i>, <i>m32&amp;32</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            description: <>Check if <i>r32</i> (an array index) is within the bounds specified by <i>m32&amp;32</i>.</>,
        },
    ],
    encodings: {
        operands: 2,
        encodings: {
            mi: ["ModRM.reg[r]", "ModRM.r/m[r]"],
        },
    },
    description: (
        <>
            <p>
                The <code>BOUND</code> instruction determines if the first operand (an array index) is within the bounds of an array specified in the second operand.
                The array index is a signed integer located in a register, and the bounds are a memory location containing either two consecutive words (in 16 bit mode) or two consecutive double words (in 32 bit mode).
                From these two memory values, the first is the lower bound of the array and the second is the upper bound of the array.
            </p>
            <p>
                If the index is within the bounds specified, this instruction executes with no side effects.
                If, however, the index is <em>not</em> within the bounds, a <Exception name="BR" /> exception is raised.
            </p>
            <p>
                {Canned.NoLongNE("EVEX")}
            </p>
        </>
    ),
    operation:
        // TODO: if #BR and "equation for PL enabled" is true, BNDSTATUS becomes 0
        `public void BOUND_16(ushort index, IntPtr bounds)
{
    if (index < Mem16[bounds] || index > Mem16[bounds + 2])
        #BR;
}

public void BOUND_32(uint index, IntPtr bounds)
{
    if (index < Mem16[bounds] || index > Mem16[bounds + 4])
        #BR;
}`,
    flags: {
        CF: <>Unmodified.</>,
        PF: <>Unmodified.</>,
        AF: <>Unmodified.</>,
        ZF: <>Unmodified.</>,
        SF: <>Unmodified.</>,
        OF: <>Unmodified.</>,
    },
    intrinsics: "autogen",
    exceptions: {
        real: {
            BR: "If the bounds test fails.",
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            BR: "If the bounds test fails.",
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            BR: "If the bounds test fails.",
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
            BR: "If the bounds test fails.",
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
