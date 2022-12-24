/* =============================================================================
 * File:   fadd.tsx
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
    id: "fadd",
    title: <>Floating-Point Add</>,
    titlePlain: "Floating-Point Add",
    opcodes: [
        {
            opcode: <>D8 /0</>,
            mnemonic: <>FADD <i>m32fp</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description:
                <>
                    Add <Register name="ST(0)" /> to <i>m32fp</i>.
                    Store the result in <Register name="ST(0)" />.
                </>,
        },
        {
            opcode: <>DC /0</>,
            mnemonic: <>FADD <i>m64fp</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description:
                <>
                    Add <Register name="ST(0)" /> to <i>m64fp</i>.
                    Store the result in <Register name="ST(0)" />.
                </>,
        },
        {
            opcode: <>D8 C0+i</>,
            mnemonic: <>FADD <i>ST(0)</i>, <i>ST(i)</i></>,
            encoding: "0m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description:
                <>
                    Add <Register name="ST(i)" /> to <Register name="ST(0)" />.
                    Store the result in <Register name="ST(0)" />.
                </>,
        },
        {
            opcode: <>DC C0+i</>,
            mnemonic: <>FADD <i>ST(i)</i>, <i>ST(0)</i></>,
            encoding: "m0",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description:
                <>
                    Add <Register name="ST(0)" /> to <Register name="ST(i)" />.
                    Store the result in <Register name="ST(i)" />.
                </>,
        },
        {
            opcode: <>DE C0+i</>,
            mnemonic: <>FADDP <i>ST(i)</i>, <i>ST(0)</i></>,
            encoding: "m0",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description:
                <>
                    Add <Register name="ST(0)" /> to <Register name="ST(i)" />.
                    Store the result in <Register name="ST(i)" />.
                    Pop the register stack.
                </>,
        },
        {
            opcode: <>DE /0</>,
            mnemonic: <>FIADD <i>m16int</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description:
                <>
                    Add <i>m16int</i> to <Register name="ST(0)" />.
                    Store the result in <Register name="ST(0)" />.
                </>,
        },
        {
            opcode: <>DA /0</>,
            mnemonic: <>FIADD <i>m32int</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description:
                <>
                    Add <i>m32int</i> to <Register name="ST(0)" />.
                    Store the result in <Register name="ST(0)" />.
                </>,
        },
    ],
    encodings: {
        "0m": ["ST(0)", "ModRM.r/m[r]"],
        m: ["ModRM.r/m[r]", "N/A"],
        m0: ["ModRM.r/m[rw]", "ST(0)"],
    },
    description: (
        <>
            <p>
                The <code>FADD</code> instruction (and the <code>FADDP</code> and <code>FIADD</code> variants) adds the source operand to the destination operand.
                Variants that reference memory implicitly use the <Register name="ST(0)" /> register as the destination.
                If the <code>FADDP</code> variant is used, the FPU stack is popped at the end.
            </p>
            <p>
                The table below summarizes the result of various operands.
                The two cells with asterisks in them (one operand is negative infinity and the other is positive infinity) result in a <code>#IA</code> exception.
            </p>
            <table>
                <tbody>
                    <tr>
                        <th rowSpan={2} colSpan={2} />
                        <th colSpan={7}>dest</th>
                    </tr>
                    <tr>
                        <th>-&infin;</th>
                        <th>-finite</th>
                        <th>-0</th>
                        <th>+0</th>
                        <th>+finite</th>
                        <th>+&infin;</th>
                        <th>NaN</th>
                    </tr>
                    <tr>
                        <th rowSpan={7}><div className="-rotate-90">src</div></th>
                        <th>-&infin;</th>
                        <td>-&infin;</td>
                        <td>-&infin;</td>
                        <td>-&infin;</td>
                        <td>-&infin;</td>
                        <td>-&infin;</td>
                        <td>*</td>
                        <td>NaN</td>
                    </tr>
                    <tr>
                        <th>-finite</th>
                        <td>-&infin;</td>
                        <td>-finite</td>
                        <td>src</td>
                        <td>src</td>
                        <td>&plusmn;finite or &plusmn;0</td>
                        <td>+&infin;</td>
                        <td>NaN</td>
                    </tr>
                    <tr>
                        <th>-0</th>
                        <td>-&infin;</td>
                        <td>dest</td>
                        <td>-0</td>
                        <td>&plusmn;0</td>
                        <td>dest</td>
                        <td>+&infin;</td>
                        <td>NaN</td>
                    </tr>
                    <tr>
                        <th>+0</th>
                        <td>-&infin;</td>
                        <td>dest</td>
                        <td>&plusmn;0</td>
                        <td>+0</td>
                        <td>dest</td>
                        <td>+&infin;</td>
                        <td>NaN</td>
                    </tr>
                    <tr>
                        <th>+finite</th>
                        <td>-&infin;</td>
                        <td>&plusmn;finite or &plusmn;0</td>
                        <td>src</td>
                        <td>src</td>
                        <td>+finite</td>
                        <td>+&infin;</td>
                        <td>NaN</td>
                    </tr>
                    <tr>
                        <th>+&infin;</th>
                        <td>*</td>
                        <td>+&infin;</td>
                        <td>+&infin;</td>
                        <td>+&infin;</td>
                        <td>+&infin;</td>
                        <td>+&infin;</td>
                        <td>NaN</td>
                    </tr>
                    <tr>
                        <th>NaN</th>
                        <td>NaN</td>
                        <td>NaN</td>
                        <td>NaN</td>
                        <td>NaN</td>
                        <td>NaN</td>
                        <td>NaN</td>
                        <td>NaN</td>
                    </tr>
                </tbody>
            </table>
        </>
    ),
    operation:
        `public void FADD(F32 src)
{
    ST(0) += src;
}
public void FADD(F64 src)
{
    ST(0) += src;
}

public void FADD(ref F80 dest, F80 src)
{
    dest += src;
}
public void FADDP(ref F80 dest, F80 src)
{
    dest += src;
    FpuPop();
}

public void FADD(I16 src)
{
    ST(0) += src;
}
public void FADD(I32 src)
{
    ST(0) += src;
}`,
    flags: {
        C0: <>Undefined.</>,
        C1: <>Set if the result was rounded up. Cleared otherwise, or if a stack overflow occurs.</>,
        C2: <>Undefined.</>,
        C3: <>Undefined.</>,
    },
    exceptionsLegacy: {
        fpu: {
            MF: [
                Exceptions.FpuDenormal,
                Exceptions.FpuInvalid,
                Exceptions.FpuStack,
                Exceptions.FpuOverflow,
                Exceptions.FpuPrecision,
                Exceptions.FpuUnderflow,
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
