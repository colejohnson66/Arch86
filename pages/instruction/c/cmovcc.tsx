/* =============================================================================
 * File:   cmovcc.tsx
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
import MaybeArray from "@myTypes/MaybeArray";
import Register from "@components/Register";

// Needed to work around incompatible types error:
//   > Type 'string' is not assignable to type 'EncodingKey'.
type OpcodeGroupReturnType = {
    opcode: React.ReactNode;
    mnemonic: React.ReactNode;
    encoding: "rm";
    validity: {
        16: "valid" | "n/e";
        32: "valid" | "n/e";
        64: "valid";
    };
    description: React.ReactNode;
};
function OpcodeGroup(opcodeByte: string, suffix: string, condition: MaybeArray<React.ReactNode>): OpcodeGroupReturnType[] {
    return [
        {
            opcode: <>0F {opcodeByte} /r</>,
            mnemonic: <>CMOV{suffix} <i>r16</i>, <i>r/m16</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Move <i>r/m16</i> into <i>r16</i> if {condition}.</>,
        },
        {
            opcode: <>0F {opcodeByte} /r</>,
            mnemonic: <>CMOV{suffix} <i>r32</i>, <i>r/m32</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Move <i>r/m32</i> into <i>r32</i> if {condition}.</>,
        },
        {
            opcode: <>REX.W 0F {opcodeByte} /r</>,
            mnemonic: <>CMOV{suffix} <i>r64</i>, <i>r/m64</i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Move <i>r/m64</i> into <i>r64</i> if {condition}.</>,
        },
    ];
}

const PageData: InstructionPageLayoutProps = {
    id: "cmovcc",
    title: <>Conditional Move</>,
    titlePlain: "Conditional Move",
    opcodes: [
        ...OpcodeGroup("40", "O", <>&quot;overflow&quot; (<Register name="EFLAGS.OF" /> = <code>1</code>)</>),
        "",
        ...OpcodeGroup("41", "NO", <>&quot;not overflow&quot; (<Register name="EFLAGS.OF" /> = <code>0</code>)</>),
        "",
        ...OpcodeGroup("42", "B", <>&quot;below&quot; (<Register name="EFLAGS.CF" /> = <code>1</code>)</>),
        ...OpcodeGroup("42", "C", <>&quot;carry&quot; (<Register name="EFLAGS.CF" /> = <code>1</code>)</>),
        ...OpcodeGroup("42", "NAE", <>&quot;not above or equal&quot; (<Register name="EFLAGS.CF" /> = <code>1</code>)</>),
        "",
        ...OpcodeGroup("43", "AE", <>&quot;above or equal&quot; (<Register name="EFLAGS.CF" /> = <code>0</code>)</>),
        ...OpcodeGroup("43", "NB", <>&quot;not below&quot; (<Register name="EFLAGS.CF" /> = <code>0</code>)</>),
        ...OpcodeGroup("43", "NC", <>&quot;not carry&quot; (<Register name="EFLAGS.CF" /> = <code>0</code>)</>),
        "",
        ...OpcodeGroup("44", "E", <>&quot;equal&quot; (<Register name="EFLAGS.ZF" /> = <code>1</code>)</>),
        ...OpcodeGroup("44", "Z", <>&quot;zero&quot; (<Register name="EFLAGS.ZF" /> = <code>1</code>)</>),
        "",
        ...OpcodeGroup("45", "NE", <>&quot;not equal&quot; (<Register name="EFLAGS.ZF" /> = <code>0</code>)</>),
        ...OpcodeGroup("45", "NZ", <>&quot;not zero&quot; (<Register name="EFLAGS.ZF" /> = <code>0</code>)</>),
        "",
        ...OpcodeGroup("46", "BE", <>&quot;below or equal&quot; (<Register name="EFLAGS.CF" /> = <code>1</code> and <Register name="EFLAGS.ZF" /> = <code>1</code>)</>),
        ...OpcodeGroup("46", "NA", <>&quot;not above&quot; (<Register name="EFLAGS.CF" /> = <code>1</code> and <Register name="EFLAGS.ZF" /> = <code>1</code>)</>),
        "",
        ...OpcodeGroup("47", "A", <>&quot;above&quot; (<Register name="EFLAGS.CF" /> = <code>0</code> and <Register name="EFLAGS.ZF" /> = <code>0</code>)</>),
        ...OpcodeGroup("47", "NBE", <>&quot;not below or equal&quot; (<Register name="EFLAGS.CF" /> = <code>0</code> and <Register name="EFLAGS.ZF" /> = <code>0</code>)</>),
        "",
        ...OpcodeGroup("48", "S", <>&quot;sign&quot; (<Register name="EFLAGS.SF" /> = <code>1</code>)</>),
        "",
        ...OpcodeGroup("49", "NS", <>&quot;not sign&quot; (<Register name="EFLAGS.SF" /> = <code>0</code>)</>),
        "",
        ...OpcodeGroup("4A", "P", <>&quot;parity&quot; (<Register name="EFLAGS.PF" /> = <code>1</code>)</>),
        ...OpcodeGroup("4A", "PE", <>&quot;parity even&quot; (<Register name="EFLAGS.PF" /> = <code>1</code>)</>),
        "",
        ...OpcodeGroup("4B", "NP", <>&quot;not parity&quot; (<Register name="EFLAGS.PF" /> = <code>0</code>)</>),
        ...OpcodeGroup("4B", "PO", <>&quot;parity odd&quot; (<Register name="EFLAGS.PF" /> = <code>0</code>)</>),
        "",
        ...OpcodeGroup("4C", "L", <>&quot;less than&quot; (<Register name="EFLAGS.SF" /> &ne; <Register name="EFLAGS.OF" />)</>),
        ...OpcodeGroup("4C", "NGE", <>&quot;not greater than or equal&quot; (<Register name="EFLAGS.SF" /> &ne; <Register name="EFLAGS.OF" />)</>),
        "",
        ...OpcodeGroup("4D", "GE", <>&quot;greater than or equal&quot; (<Register name="EFLAGS.SF" /> = <Register name="EFLAGS.OF" />)</>),
        ...OpcodeGroup("4D", "NL", <>&quot;not less than&quot; (<Register name="EFLAGS.SF" /> = <Register name="EFLAGS.OF" />)</>),
        "",
        ...OpcodeGroup("4E", "LE", <>&quot;less than or equal&quot; (<Register name="EFLAGS.ZF" /> = <code>0</code> and <Register name="EFLAGS.SF" /> &ne; <Register name="EFLAGS.OF" /> )</>),
        ...OpcodeGroup("4E", "NG", <>&quot;not greater than or equal&quot; (<Register name="EFLAGS.ZF" /> = <code>0</code> and <Register name="EFLAGS.SF" /> &ne; <Register name="EFLAGS.OF" /> )</>),
        "",
        ...OpcodeGroup("4F", "G", <>&quot;greater than&quot; (<Register name="EFLAGS.ZF" /> = <code>1</code> and <Register name="EFLAGS.SF" /> = <Register name="EFLAGS.OF" /> )</>),
        ...OpcodeGroup("4F", "NLE", <>&quot;not less than or equal&quot; (<Register name="EFLAGS.ZF" /> = <code>1</code> and <Register name="EFLAGS.SF" /> = <Register name="EFLAGS.OF" /> )</>),

    ],
    encodings: {
        operands: 2,
        encodings: {
            "rm": ["ModRM.reg[w]", "ModRM.r/m[r]"],
        },
    },
    description: (
        <>
            <p>
                The <code>CMOVcc</code> set of instructions conditionally moves the source operand into the destination operand.
                The exact condition is determined by the condition code (<code>cc</code>) field of the opcode (bits <code>0..3</code>).
            </p>
            <p>
                The condition code&apos;s four bits are three bits determining the condition, and one bit that, if set, inverts the result of the condition.
                For example, <code>CMOVNE</code>&apos;s opcode (<code>0x45</code>) is simply <code>CMOVE</code>&apos;s opcode (<code>0x44</code>) with the least significant bit set (to invert the condition).
                As such, instead of checking if <Register name="EFLAGS.ZF" /> is set (as <code>CMOVE</code> would do), it is checked to see if it is <em>cleared</em>.
            </p>
            <p>
                The condition bits (bits <code>0..3</code>) determine the condition according to this table (<code>x</code> is the invert bit):
            </p>
            <table className="instruction-table">
                <thead>
                    <tr>
                        <th>Condition Code Bits</th>
                        <th>Condition if <code>x = 0</code></th>
                        <th>Condition if <code>x = 1</code></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>000x</code></td>
                        <td><Register name="EFLAGS.OF" /> = <code>1</code></td>
                        <td><Register name="EFLAGS.OF" /> = <code>0</code></td>
                    </tr>
                    <tr>
                        <td><code>001x</code></td>
                        <td><Register name="EFLAGS.CF" /> = <code>1</code></td>
                        <td><Register name="EFLAGS.CF" /> = <code>0</code></td>
                    </tr>
                    <tr>
                        <td><code>010x</code></td>
                        <td><Register name="EFLAGS.ZF" /> = <code>1</code></td>
                        <td><Register name="EFLAGS.ZF" /> = <code>0</code></td>
                    </tr>
                    <tr>
                        <td><code>011x</code></td>
                        <td><Register name="EFLAGS.CF" /> = <code>1</code> and <Register name="EFLAGS.ZF" /> = <code>1</code></td>
                        <td><Register name="EFLAGS.CF" /> = <code>0</code> and <Register name="EFLAGS.ZF" /> = <code>0</code></td>
                    </tr>
                    <tr>
                        <td><code>100x</code></td>
                        <td><Register name="EFLAGS.SF" /> = <code>1</code></td>
                        <td><Register name="EFLAGS.SF" /> = <code>0</code></td>
                    </tr>
                    <tr>
                        <td><code>101x</code></td>
                        <td><Register name="EFLAGS.PF" /> = <code>1</code></td>
                        <td><Register name="EFLAGS.PF" /> = <code>0</code></td>
                    </tr>
                    <tr>
                        <td><code>110x</code></td>
                        <td><Register name="EFLAGS.SF" /> &ne; <Register name="EFLAGS.OF" /></td>
                        <td><Register name="EFLAGS.SF" /> = <Register name="EFLAGS.OF" /></td>
                    </tr>
                    <tr>
                        <td><code>111x</code></td>
                        <td><Register name="EFLAGS.ZF" /> = <code>0</code> and <Register name="EFLAGS.SF" /> &ne; <Register name="EFLAGS.OF" /></td>
                        <td><Register name="EFLAGS.ZF" /> = <code>1</code> and <Register name="EFLAGS.SF" /> = <Register name="EFLAGS.OF" /></td>
                    </tr>
                </tbody>
            </table>
        </>
    ),
    operation:
        `void CMOVcc(ref U16 dest, U16 src, bool condition)
{
    if (condition)
        dest = src;
}
void CMOVcc(ref U32 dest, U32 src, bool condition)
{
    if (condition)
        dest = src;
}
void CMOVcc(ref U64 dest, U64 src, bool condition)
{
    if (condition)
        dest = src;
}

public void CMOVO(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.OF);
public void CMOVO(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.OF);
public void CMOVO(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.OF);

public void CMOVNO(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, !EFLAGS.OF);
public void CMOVNO(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, !EFLAGS.OF);
public void CMOVNO(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, !EFLAGS.OF);

// aliased as CMOVC and CMOVNAE
public void CMOVB(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.CF);
public void CMOVB(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.CF);
public void CMOVB(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.CF);

// aliased as CMOVNB aand CMOVNC
public void CMOVAE(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, !EFLAGS.CF);
public void CMOVAE(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, !EFLAGS.CF);
public void CMOVAE(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, !EFLAGS.CF);

// aliased as CMOVZ
public void CMOVE(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.ZF);
public void CMOVE(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.ZF);
public void CMOVE(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.ZF);

// aliased as CMOVNZ
public void CMOVNE(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, !EFLAGS.ZF);
public void CMOVNE(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, !EFLAGS.ZF);
public void CMOVNE(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, !EFLAGS.ZF);

// aliased as CMOVNA
public void CMOVBE(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.CF && EFLAGS.ZF);
public void CMOVBE(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.CF && EFLAGS.ZF);
public void CMOVBE(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.CF && EFLAGS.ZF);

// aliased as CMOVNBE
public void CMOVA(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, !EFLAGS.CF && !EFLAGS.ZF);
public void CMOVA(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, !EFLAGS.CF && !EFLAGS.ZF);
public void CMOVA(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, !EFLAGS.CF && !EFLAGS.ZF);

public void CMOVS(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.SF);
public void CMOVS(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.SF);
public void CMOVS(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.SF);

public void CMOVNS(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, !EFLAGS.SF);
public void CMOVNS(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, !EFLAGS.SF);
public void CMOVNS(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, !EFLAGS.SF);

// aliased as CMOVPE
public void CMOVP(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.PF);
public void CMOVP(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.PF);
public void CMOVP(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.PF);

// aliased as CMOVPO
public void CMOVNP(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, !EFLAGS.PF);
public void CMOVNP(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, !EFLAGS.PF);
public void CMOVNP(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, !EFLAGS.PF);

// aliased as CMOVNGE
public void CMOVL(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.SF != EFLAGS.OF);
public void CMOVL(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.SF != EFLAGS.OF);
public void CMOVL(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.SF != EFLAGS.OF);

// aliased as CMOVNL
public void CMOVGE(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.SF == EFLAGS.OF);
public void CMOVGE(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.SF == EFLAGS.OF);
public void CMOVGE(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.SF == EFLAGS.OF);

// aliased as CMOVNG
public void CMOVLE(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, !EFLAGS.ZF && EFLAGS.SF != EFLAGS.OF);
public void CMOVLE(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, !EFLAGS.ZF && EFLAGS.SF != EFLAGS.OF);
public void CMOVLE(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, !EFLAGS.ZF && EFLAGS.SF != EFLAGS.OF);

// aliased as CMOVNLE
public void CMOVG(ref U16 dest, U16 src) =>
    CMOVcc(dest, src, EFLAGS.ZF && EFLAGS.SF == EFLAGS.OF);
public void CMOVG(ref U32 dest, U32 src) =>
    CMOVcc(dest, src, EFLAGS.ZF && EFLAGS.SF == EFLAGS.OF);
public void CMOVG(ref U64 dest, U64 src) =>
    CMOVcc(dest, src, EFLAGS.ZF && EFLAGS.SF == EFLAGS.OF);`,
    flags: "none",
    intrinsics: "autogen",
    exceptions: {
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
        long: {
            UD: Exceptions.Lock,
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
