/* =============================================================================
 * File:   lock.tsx
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
import Exception from "@components/Exception";
import Instruction from "@components/Instruction";

const exceptions = [
    <>If this prefix is used on an instruction without a memory operand for the destination.</>,
    <>
        If this prefix is used on an instruction <em>with</em> a memory operand for the destination, but the instruction is not one of:
        {" "}<Instruction name="adc" noTitle />, <Instruction name="add" noTitle />, <Instruction name="and" noTitle />,
        {" "}<Instruction name="btc" noTitle />, <Instruction name="btr" noTitle />, <Instruction name="cmpxchg" noTitle />,
        {" "}<Instruction name="cmpxchg8b-cmpxchg16b" noTitle />, <Instruction name="dec" noTitle />, <Instruction name="inc" noTitle />,
        {" "}<Instruction name="neg" noTitle />, <Instruction name="not" noTitle />, <Instruction name="or" noTitle />,
        {" "}<Instruction name="sbb" noTitle />, <Instruction name="sub" noTitle />, <Instruction name="xor" noTitle />,
        {" "}<Instruction name="xadd" noTitle />, or <Instruction name="xchg" noTitle />.
    </>,
];

const PageData: InstructionPageLayoutProps = {
    id: "lock",
    title: <>Assert <code>LOCK#</code> Pin</>,
    titlePlain: "Assert LOCK# Pin",
    opcodes: [
        {
            opcode: <>F0</>,
            mnemonic: <>LOCK</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Assert the <code>LOCK#</code> for the duration of the instruction.
                </>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>LOCK</code> prefix asserts the processor&apos;s <code>LOCK#</code> pin for the duration of the prefixed instruction.
                This has the effect of making any memory accesses in the instruction atomic.
            </p>
            <p>
                In a multiprocessor environment, the <code>LOCK#</code> pin ensures that the processor has exclusive access to any shared memory.
            </p>
            <p>
                Beginning with the <A href="/architecture/p6">Pentium P6</A>, when the <code>LOCK</code> prefix is used with memory in the core&apos;s local cache, the <code>LOCK#</code> pin may not always be asserted.
                Instead, only the core&apos;s local cache line is locked (resulting in the same effect due to cache coherency).
            </p>
            <p>
                This prefix may only be used with the following instructions:
            </p>
            <ul>
                <li><Instruction name="adc" useHyphen /></li>
                <li><Instruction name="add" useHyphen /></li>
                <li><Instruction name="and" useHyphen /></li>
                <li><Instruction name="btc" useHyphen /></li>
                <li><Instruction name="btr" useHyphen /></li>
                <li><Instruction name="cmpxchg" useHyphen /></li>
                <li><Instruction name="cmpxchg8b-cmpxchg16b" useHyphen /></li>
                <li><Instruction name="dec" useHyphen /></li>
                <li><Instruction name="inc" useHyphen /></li>
                <li><Instruction name="neg" useHyphen /></li>
                <li><Instruction name="not" useHyphen /></li>
                <li><Instruction name="or" useHyphen /></li>
                <li><Instruction name="sbb" useHyphen /></li>
                <li><Instruction name="sub" useHyphen /></li>
                <li><Instruction name="xor" useHyphen /></li>
                <li><Instruction name="xadd" useHyphen /></li>
                <li><Instruction name="xchg" useHyphen /></li>
            </ul>
            <p className="pt-2">
                Even then, those instructions may only be &quot;locked&quot; with a memory operand.
                Using the <code>LOCK</code> prefix with those instructions when using only register operands, or on any other instruction will raise a <Exception name="UD" /> exception.
            </p>
            <p>
                Of historical note, the infamous <A href="https://en.wikipedia.org/wiki/Pentium_F00F_bug">Pentium &quot;F00F&quot; bug</A> was a bug caused by this prefix.
                Normally, when encountering the invalid encoding of the <Instruction name="cmpxchg8b" noTitle /> instruction (one using a register operand), the processor would raise a <Exception name="UD" /> exception.
                However, when prefixed with <code>LOCK</code>, the <code>LOCK#</code> pin would be asserted when reading the exception handler.
                As locked reads must be paired with a write, the processor&apos;s bus interface would forbid all other memory access until the next write, but the paired write would not arrive.
                This would ultimately lock up the processor&apos;s external bus and prevent any other memory access.
                The only way to recover from this is to reset the processor.
            </p>
        </>
    ),
    operation:
        `public void LOCK()
{
    AssertLockThroughThisInstruction();
}`,
    flags: "none",
    exceptions: {
        real: {
            UD: exceptions,
        },
        virtual: {
            UD: exceptions,
        },
        protected: {
            UD: exceptions,
        },
        compatibility: {
            UD: exceptions,
        },
        long: {
            UD: exceptions,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
