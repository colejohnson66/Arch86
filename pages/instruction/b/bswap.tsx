/* =============================================================================
 * File:   bswap.tsx
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

import A from "@components/A";
import Exceptions from "@library/Exceptions";
import Instruction from "@components/Instruction";
import Unit from "@components/Unit";

const PageData: InstructionPageLayoutProps = {
    id: "bswap",
    title: <>Byte Swap</>,
    titlePlain: "Byte Swap",
    opcodes: [
        {
            opcode: <>0F C8+rd</>,
            mnemonic: <>BSWAP <i>r32</i></>,
            encoding: "o",
            validity: {
                16: "valid1",
                32: "valid1",
                64: "valid",
            },
            description: <>Reverse the byte order (endianness) of <i>r32</i>.</>,
        },
        {
            opcode: <>REX.W 0F C8+rq</>,
            mnemonic: <>BSWAP <i>r64</i></>,
            encoding: "o",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            description: <>Reverse the byte order (endianness) of <i>r64</i>.</>,
        },
    ],
    opcodeNotes: <>This instruction is not supported on processors earlier than the <A href="/architecture/80486">80486</A>.</>,
    encodings: {
        o: ["opcode(0..2)"],
    },
    description: (
        <>
            <p>
                The <code>BSWAP</code> instruction reverses the byte order of the operand.
                This instruction can be used to change the endianness of the operand from little to big (or vice versa).
            </p>
            <p>
                This instruction is only valid on <Unit value={32} unit="bit" /> and <Unit value={64} unit="bit" /> operands.
                To operate on a <Unit value={16} unit="bit" /> operand, use the <Instruction name="xchg" /> instruction.
                Use of this instruction on a <Unit value={16} unit="bit" /> operand is undefined.
            </p>
        </>
    ),
    operation:
        `public void BSWAP((ref U32 arg)
{
    U32 temp = arg;
    arg.Bit[0..7] = temp.Bit[24..31];
    arg.Bit[8..15] = temp.Bit[16..23];
    arg.Bit[16..23] = temp.Bit[8..15];
    arg.Bit[24..31] = temp.Bit[0..7];
}

public void BSWAP((ref U64 arg)
{
    U64 temp = arg;
    arg.Bit[0..7] = temp.Bit[56..63];
    arg.Bit[8..15] = temp.Bit[48..55];
    arg.Bit[16..23] = temp.Bit[40..47];
    arg.Bit[24..31] = temp.Bit[32..39];
    arg.Bit[32..39] = temp.Bit[24..31];
    arg.Bit[40..47] = temp.Bit[16..23];
    arg.Bit[48..55] = temp.Bit[8..15];
    arg.Bit[56..63] = temp.Bit[0..7];
}`,
    flags: "none",
    exceptions: {
        real: {
            UD: Exceptions.Lock,
        },
        virtual: {
            UD: Exceptions.Lock,
        },
        protected: {
            UD: Exceptions.Lock,
        },
        compatibility: {
            UD: Exceptions.Lock,
        },
        long: {
            UD: Exceptions.Lock,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
