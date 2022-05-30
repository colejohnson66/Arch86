/* =============================================================================
 * File:   f2xm1.tsx
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
    id: "f2xm1",
    title: <>Compute 2<sup>x</sup> - 1</>,
    titlePlain: "Compute 2^x - 1",
    opcodes: [
        {
            opcode: <>D9 F0</>,
            mnemonic: <>F2XM1</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description: <>Replace <Register name="ST(0)" /> with <code>(2<sup>ST(0)</sup> - 1)</code></>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>F2XM1</code> instruction computes the value of 2 to the power of the source operand, then subtracts 1.
                The result is stored in the destination operand.
                The source and destination operands are implicitly <code>ST(0)</code>.
                The value of the source operand must lie between <code>-1</code> and <code>1</code>; Values outside this range produce undefined results.
            </p>
        </>
    ),
    operation:
        `public void F2XM1()
{
    F80 x = FpuPop();
    x = Math.Pow(2, x) - 1;
    FpuPush(x);
}`,
    flags: {
        C0: <>Undefined.</>,
        C1: <>Aet if the result was rounded up. Cleared otherwise or if a stack overflow occurs.</>,
        C2: <>Undefined.</>,
        C3: <>Undefined.</>,
    },
    exceptions: {
        real: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        virtual: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        protected: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        compatibility: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        long: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        fpu: {
            MF: [
                Exceptions.FpuDenormal,
                Exceptions.FpuInvalid,
                Exceptions.FpuStack,
                Exceptions.FpuOverflow,
                Exceptions.FpuPrecision,
                Exceptions.FpuUnderflow,
                Exceptions.FpuDivideBy0,
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
