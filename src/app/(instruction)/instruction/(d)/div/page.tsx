/* =============================================================================
 * File:   page.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022-2023 Cole Tobin
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

import InstructionPageLayout, { InstructionPageLayoutProps } from "@/components/InstructionPageLayout";

import Canned from "@/library/Canned";
import Exception from "@/components/Exception";
import Exceptions from "@/library/Exceptions";
import NoWrap from "@/components/NoWrap";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "div",
    title: <>Unsigned Divide</>,
    titlePlain: "Unsigned Divide",
    opcodes: [
        {
            opcode: <>F6 /6</>,
            mnemonic: <>DIV <i>r/m8</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Perform an unsigned divide of <Register name="AX" /> by <i>r/m8</i>.
                    Store the quotient in <Register name="AL" /> and the remainder in <Register name="AH" />.
                </>,
        },
        {
            opcode: <>REX F6 /6</>,
            mnemonic: <>DIV <i>r/m8<sup>*</sup></i></>,
            encoding: "m",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Perform an unsigned divide of <Register name="AX" /> by <i>r/m8</i>.
                    Store the quotient in <Register name="AL" /> and the remainder in <Register name="AH" />.
                    {" "}{Canned.RexR8Encoding}
                </>,
        },
        {
            opcode: <>F7 /6</>,
            mnemonic: <>DIV <i>r/m16</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Perform an unsigned divide of <Register name="DX:AX" /> by <i>r/m16</i>.
                    Store the quotient in <Register name="AX" /> and the remainder in <Register name="DX" />.
                </>,
        },
        {
            opcode: <>F7 /6</>,
            mnemonic: <>DIV <i>r/m32</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Perform an unsigned divide of <Register name="EDX:EAX" /> by <i>r/m32</i>.
                    Store the quotient in <Register name="EAX" /> and the remainder in <Register name="EDX" />.
                </>,
        },
        {
            opcode: <>REX.W F7 /6</>,
            mnemonic: <>DIV <i>r/m64</i></>,
            encoding: "m",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Perform an unsigned divide of <Register name="RDX:RAX" /> by <i>r/m64</i>.
                    Store the quotient in <Register name="RAX" /> and the remainder in <Register name="RDX" />.
                </>,
        },
    ],
    encodings: {
        m: ["ModRM.r/m[rw]"],
    },
    description: (
        <>
            <p>
                The <code>DIV</code> instruction performs an unsigned divide by the operand.
                For <NoWrap>8-bit</NoWrap> operand size, the dividend is located <Register name="AH" />, and the quotient is stored <Register name="AL" /> and the remainder in <Register name="AH" />.
                For non-<NoWrap>8-bit</NoWrap> operand sizes, the located in the <Register name="rDX:rAX" /> register pair, and the quotient is stored in <Register name="rAX" /> and the remainder in <Register name="rDX" />.
            </p>
            <p>
                Non-integral results are truncated (&quot;chopped&quot;) towards zero.
                Overflow is indicated by the <Exception name="DE" /> exception rather than <Register name="EFLAGS.CF" />.
            </p>
        </>
    ),
    operation:
        `public void DIV(U8 divisor)
{
    if (divisor is 0)
        #DE;

    U16 al = AX / divisor;
    U16 ah = AX % divisor;
    if (ah > 0xFF)
        #DE;
    AL = (U8)al;
    AH = (U8)ah;
}
public void DIV(U16 divisor)
{
    if (divisor is 0)
        #DE;

    U32 ax = DX:AX / divisor;
    U32 dx = DX:AX % divisor;
    if (ax > 0xFFFF)
        #DE;
    AX = (U16)ax;
    DX = (U16)dx;
}
public void DIV(U32 divisor)
{
    if (divisor is 0)
        #DE;

    U64 eax = EDX:EAX / divisor;
    U64 edx = EDX:EAX % divisor;
    if (eax > 0xFFFF_FFFF)
        #DE;
    EAX = (U32)eax;
    EDX = (U32)edx;
}
public void DIV(U64 divisor)
{
    if (divisor is 0)
        #DE;

    U128 rax = RDX:RAX / divisor;
    U128 rdx = RDX:RAX % divisor;
    if (rax > 0xFFFF_FFFF_FFFF_FFFF)
        #DE;
    RAX = (U64)rax;
    RDX = (U64)rdx;
}`,
    flags: {
        CF: <>Undefined.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Undefined.</>,
        SF: <>Undefined.</>,
        OF: <>Undefined.</>,
    },
    intrinsics: "autogen",
    exceptionsLegacy: {
        real: {
            DE: [
                <>If the source operand (divisor) is <code>0</code>.</>,
                <>If the quotient (result) is too large for the destination register.</>,
            ],
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            DE: [
                <>If the source operand (divisor) is <code>0</code>.</>,
                <>If the quotient (result) is too large for the destination register.</>,
            ],
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            DE: [
                <>If the source operand (divisor) is <code>0</code>.</>,
                <>If the quotient (result) is too large for the destination register.</>,
            ],
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
            DE: [
                <>If the source operand (divisor) is <code>0</code>.</>,
                <>If the quotient (result) is too large for the destination register.</>,
            ],
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
            DE: [
                <>If the source operand (divisor) is <code>0</code>.</>,
                <>If the quotient (result) is too large for the destination register.</>,
            ],
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
