/* =============================================================================
 * File:   bndmov.tsx
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
import Unit from "@components/Unit";

const PageData: InstructionPageLayoutProps = {
    id: "bndmov",
    title: <>Move Bounds</>,
    titlePlain: "Move Bounds",
    opcodes: [
        {
            opcode: <>66 0F 1A /r</>,
            mnemonic: <>BNDMOV <i>bnd1</i>, <i>bnd2/m64</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            cpuid: "mpx",
            description: <>Move a lower and upper bound from <i>bnd2/m64</i> into <i>bnd1</i>.</>,
        },
        {
            opcode: <>66 0F 1A /r</>,
            mnemonic: <>BNDMOV <i>bnd1</i>, <i>bnd2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            cpuid: "mpx",
            description: <>Move a lower and upper bound from <i>bnd2/m128</i> into <i>bnd1</i>.</>,
        },
        {
            opcode: <>66 0F 1B /r</>,
            mnemonic: <>BNDMOV <i>bnd1/m64</i>, <i>bnd2</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            cpuid: "mpx",
            description: <>Move a lower and upper bound from <i>bnd2</i> into <i>bnd1/m64</i>.</>,
        },
        {
            opcode: <>66 0F 1B /r</>,
            mnemonic: <>BNDMOV <i>bnd1/m128</i>, <i>bnd2</i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            cpuid: "mpx",
            description: <>Move a lower and upper bound from <i>bnd2</i> into <i>bnd1/m128</i>.</>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "ModRM.r/m[r]"],
        mr: ["ModRM.r/m[w]", "ModRM.reg[r]"],
    },
    description: (
        <>
            <p>
                The <code>BNDMOV</code> instruction moves a pair of lower and upper bounds from the source operand into the destination operand.
            </p>
            <p>
                Which instruction form is used depends on the operating mode of the processor.
                In <Unit value={16} unit="bit" /> and <Unit value={32} unit="bit" /> modes, the <Unit value={32} unit="bit" /> form is used (<Unit value={64} unit="bit" /> are moved).
                In <Unit value={64} unit="bit" /> mode, the <Unit value={64} unit="bit" /> form is used (<Unit value={128} unit="bits" /> are moved).
            </p>
            <p>
                {Canned.Lockable}
            </p>
        </>
    ),
    operation:
        `public void BNDMOV(ref Bound dest, Bound src)
{
    dest = src;
}`,
    flags: "none",
    intrinsics: [
        "void *_bnd_copy_ptr_bounds(const void *dest, const void *src)",
    ],
    exceptionsLegacy: {
        real: {
            UD: [
                Exceptions.LockNoMem,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: [
                Exceptions.LockNoMem,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: [
                Exceptions.LockNoMem,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
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
            UD: [
                Exceptions.LockNoMem,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        long: {
            UD: [
                Exceptions.LockNoMem,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND15" />.</>,
            ],
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
