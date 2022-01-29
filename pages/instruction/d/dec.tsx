/* =============================================================================
 * File:   dec.tsx
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
import Instruction from "@components/Instruction";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "dec",
    title: <>Decrement by One</>,
    titlePlain: "Decrement by One",
    opcodes: [
        {
            opcode: <>FE /1</>,
            mnemonic: <>DEC <i>r/m8</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Decrement <i>r/m8</i>.</>,
        },
        {
            opcode: <>REX FE /1</>,
            mnemonic: <>DEC <i>r/m8<sup>*</sup></i></>,
            encoding: "m",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>
                Decrement <i>r/m8</i>.
                {" "}{Canned.RexR8Encoding}
            </>,
        },
        {
            opcode: <>FF /1</>,
            mnemonic: <>DEC <i>r/m16</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Decrement <i>r/m16</i>.</>,
        },
        {
            opcode: <>FF /1</>,
            mnemonic: <>DEC <i>r/m32</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Decrement <i>r/m32</i>.</>,
        },
        {
            opcode: <>REX.W FF /1</>,
            mnemonic: <>DEC <i>r/m64</i></>,
            encoding: "m",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Decrement <i>r/m64</i>.</>,
        },
        {
            opcode: <>48+rw</>,
            mnemonic: <>DEC <i>r16</i></>,
            encoding: "o",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            description: <>Decrement <i>r16</i>.</>,
        },
        {
            opcode: <>48+rd</>,
            mnemonic: <>DEC <i>r32</i></>,
            encoding: "o",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            description: <>Decrement <i>r32</i>.</>,
        },
    ],
    encodings: {
        m: ["ModRM.r/m[rw]"],
        o: ["opcode(0..2)"],
    },
    description: (
        <>
            <p>
                The <code>DEC</code> instruction decrements the operand by one.
                It is equivalent to a <Instruction name="sub" /> instruction with an operand of <code>1</code>, but without touching the <Register name="EFLAGS.CF" /> flag.
            </p>
            <p>
                The opcode forms (bytes <code>0x48..0x4F</code>) were repurposed in Long Mode for the REX prefix.
                As such, they are only encodable outside of Long Mode.
                If they are encountered in Long Mode, they will be mistakenly interpretted as REX prefixes for the following byte.
            </p>
            <p>
                {Canned.Lockable}
            </p>
        </>
    ),
    operation:
        `public void DEC(ref U8 arg)
{
    arg--;
}
public void DEC(ref U16 arg)
{
    arg--;
}
public void DEC(ref U32 arg)
{
    arg--;
}
public void DEC(ref U64 arg)
{
    arg--;
}`,
    flags: {
        CF: <>Unmodified.</>,
        PF: <>Set according to the result.</>,
        AF: <>Set according to the result.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Set according to the result.</>,
    },
    exceptions: {
        real: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.LockNoMem,
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
            UD: Exceptions.LockNoMem,
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
            UD: Exceptions.LockNoMem,
            SS0: [
                Exceptions.NonCanonSS,
                Exceptions.SegLimitSS,
            ],
            GP0: [
                Exceptions.NonCanon,
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
