/* This file is part of 80x86.
 * Copyright (c) 2021 Cole Johnson
 *
 * This program is free software: you can redistribute it and/or modify it under
 *   the terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 *   ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 *   for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { Code, H1, H2, H3, H4, IBreadcrumbProps, UL } from "@blueprintjs/core";

import Layout from "../../components/Layout";
import Link from "../../components/Link";
import React from "react";
import TOC from "../../components/TOC";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        {
            text: "Instructions",
            href: "/instruction",
        },
        { text: "Help" },
    ];

    return (
        <Layout canonical="/instruction/help" navGroup="instruction" title="Instruction Page Help" breadcrumbs={PageBreadcrumbs}>
            <TOC.Root>
                <TOC.Entry href="#headingOverviewTable" text="Overview Table">
                    <TOC.Entry href="#headingOverviewTableVex" text="Interpreting VEX and EVEX Opcodes" />
                </TOC.Entry>
                <TOC.Entry href="#headingEncoding" text="Encoding">
                    <TOC.Entry href="#headingEncodingOperand" text="Interpreting the Operand Value" />
                </TOC.Entry>
                <TOC.Entry href="#headingDescription" text="Description" />
                <TOC.Entry href="#headingOperation" text="Operation">
                    <TOC.Entry href="#headingOperationMode" text="MODE" />
                    <TOC.Entry href="#headingOperationProcessor" text="PROCESSOR" />
                    <TOC.Entry href="#headingOperationRegisters" text="Registers" />
                    <TOC.Entry href="#headingOperationFlags" text="Flags" />
                    <TOC.Entry href="#headingOperationInstructionBits" text="Instruction Bits" />
                    <TOC.Entry href="#headingOperationTypes" text="Types">
                        <TOC.Entry href="#headingOperationTypesSimd" text="Simd<T>" />
                        <TOC.Entry href="#headingOperationTypesKMask" text="KMask" />
                    </TOC.Entry>
                </TOC.Entry>
                <TOC.Entry href="#headingExamples" text="Examples" />
                <TOC.Entry href="#headingFlags" text="Flags Affected" />
                <TOC.Entry href="#headingIntrinsics" text="Intrinsics" />
                <TOC.Entry href="#headingExceptions" text="Exceptions" />
            </TOC.Root>
            <div id="content">
                <H1>Instruction Page Help</H1>
                <p>
                    This page details many of the features of the instruction pages.
                </p>

                <H2 id="headingOverviewTable">Overview Table</H2>
                <p>
                    The overview table lists all the various forms that an instruction can take.
                    Each row of the table consists of the following items, in order:
                </p>
                <UL>
                    <li>
                        <b>Opcode and Mnemonic</b>:
                        A single form of the instruction listing both the binary encoding and assembly form.
                        Italics in the mnemonic part signify operands.
                        {" "}<Link href="#headingOverviewTableVex">See below</Link> for an explanation on interpreting VEX and EVEX opcodes.
                        <br />
                        EVEX forms commonly feature other bits of information such as the mask register (<Code>{"{k1}"}</Code>), error masking (<Code>{"{er}"}</Code>), and more.
                    </li>
                    <li>
                        <b>Encoding</b>:
                        A reference to the <Link href="#headingEncoding">encoding table</Link>.
                        This value represents <em>where</em> in the instruction the operands are encoded.
                    </li>
                    <li>
                        <b>##-bit Mode</b> (multiple):
                        Whether a given instruction form is valid, invalid, or not encodable in the specified processor mode.
                        &quot;Valid&quot; forms are allowed while &quot;invalid&quot; forms will throw an exception if encountered.
                        &quot;Not encodable&quot; forms are disallowed in the specified mode, and will, in fact, be interpreted differently than expected.
                        <br />
                        For example, in <Link href="/architecture/mode/long">64-bit mode</Link>, the byte range <Code>40</Code> through <Code>4F</Code> was repurposed for the REX prefix.
                        This makes encoding <Code>INC eax</Code> as <Code>40</Code> impossible.
                        Should the processor encounter what the author thinks is <Code>INC eax</Code>, it will treat it as a REX prefix with the lower four bits set to 0.
                        The correct encoding would be <Code>FF C0</Code>.
                    </li>
                    <li>
                        <b>CPUID Feature Flag</b> (optional):
                        If present, these CPUID &quot;feature flags&quot; <em>must</em> be present (set).
                        The existence of these flags does not necessarily imply the ability to execute the instruction;
                        Some CPU features must be enabled before use.
                        Failure to do so will result in a processor exception being thrown.
                    </li>
                    <li>
                        <b>Description</b>:
                        A short description of what the instruction form does.
                        For most instructions, the various &quot;Description&quot; cells will be almost carbon copies of each other with minor changes.
                    </li>
                </UL>

                <H3 id="headingOverviewTableVex">Interpreting VEX and EVEX Opcodes</H3>
                <p>
                    VEX and EVEX opcodes are written differently than normal instructions.
                    This is because the prefixes are multiple (two to four) bytes long and encode quite a bit of information.
                    Both prefixes take the form of <Code>{"(E)VEX.{length}.{prefixes}.{w}"}</Code> with each field representing a specific field in the VEX or EVEX prefix.
                    The other fields in the prefix are unspecified here and are dependent on the operands.
                    The various fields in the opcode prefix encoding are:
                </p>
                <UL>
                    <li>
                        <b>length</b>:
                        The amount of bits this instruction operates on.
                        This is encoded in the <Code>L</Code> and (for EVEX) <Code>L&apos;</Code> bits.
                        This can be one of: 128 (<Code>XMM</Code>), 256 (<Code>YMM</Code>), 512 (<Code>ZMM</Code>), or <Code>LIG</Code>.
                        {" "}<Code>LIG</Code> stands for &quot;length ignored&quot; and means just that - the length field is ignored.
                        This is typically used in situations involving scalars as only a single piece of data is operated on, not the whole register.
                        <br />
                        In some situations, despite an instruction being defined with <Code>LIG</Code>, Intel may recommend a specific value is used instead for future proofing.
                        For example, the <Link href="/instruction/addsd"><Code>ADDSD</Code> instruction</Link> is defined to be <Code>LIG</Code>, but Intel recommends setting <Code>L</Code> (and <Code>L&apos;</Code> for EVEX) to zero.
                    </li>
                    <li>
                        <b>prefixes</b>:
                        The implied prefix bytes that are encoded in the prefix.
                        Due to the nature of the VEX and EVEX prefixes, there can be up to two prefix fields specified in the opcode encoding: one for operand size and type prefixes (the <Code>pp</Code> field), and one for escape codes (the <Code>m</Code> bits).
                        If unspecified, a prefix group is to be set to all zeros.
                    </li>
                    <li>
                        <b>w</b>:
                        The single <Code>W</Code> bit in the VEX or EVEX prefix.
                        This is commonly used as an extra bit to specify the opcode, but will sometimes be used as its predecessor, <Code>REX.W</Code>, meant - expanding the operand size to 64 bits.
                        {" "}<Code>WIG</Code> stands for &quot;W ignored&quot; and means just that - the <Code>W</Code> bit is ignored.
                    </li>
                </UL>

                <H2 id="headingEncoding">Encoding</H2>
                <p>
                    The &quot;Encoding&quot; section is a table listing the encoding of the operands for the various opcodes in the overview table at the start.
                    Each row of the table consists of the following items, in order:
                </p>
                <UL>
                    <li>
                        <b>Encoding</b>:
                        The name of the encoding this row is for.
                        For example, if the &quot;Encoding&quot; cell of a mnemonic in the overview table contains <Code>RM</Code>, the row containing <Code>RM</Code> in this cell would list how the operands are encoded.
                    </li>
                    <li>
                        <b>Tuple Type</b> (optional):
                        The EVEX encoding&apos;s tuple form.
                        {/* TODO: What is it? */}
                        This column is only present if an EVEX encoding for this instruction exists.
                    </li>
                    <li>
                        <b>Operand(s)</b>:
                        The actual encoding of each operand.
                        Instructions that contain a different number of operands depending on the mnemonic (for example, vector instructions with a legacy encoding) will contain &quot;N/A&quot; for disallowed operands.
                        In other words, &quot;legacy&quot; vector encodings will typically have the first source and the destination be the same operand (<Code>MNEMONIC dest, src</Code>), but VEX and EVEX versions with a &quot;non-destructive&quot; form (<Code>MNEMONIC dest, src1, src2</Code>) will not.
                        In these cases, the &quot;legacy&quot; form will only have two operands while the VEX and EVEX forms will have three.
                        As such, the &quot;Operand 3&quot; cell will contain &quot;N/A&quot;.
                        <br />
                        <Link href="#headingEncodingOperand">See below</Link> for an explanation on interpreting this value.
                    </li>
                </UL>

                <H3 id="headingEncodingOperand">Interpreting the Operand Value</H3>
                <p>
                    The operand value cell takes the form of <Code>source[rw]</Code> which represents a data, <Code>source</Code>, that is both read from and written to (<Code>[rw]</Code>).
                    Read only or write only data is signified by <Code>[r]</Code> and <Code>[w]</Code>, respectively.
                </p>
                <p>
                    <Code>source</Code> only specifies <em>where</em> the register number is encoded.
                    It does <em>not</em> specify which register file is used (general purpose, segment, vector, etc.);
                    That is specified by the mnemonic&apos;s encoding.
                </p>
                <p>
                    <Code>source</Code> will be one of the following values:
                </p>
                <UL>
                    <li>
                        <Code>address##</Code>:
                        An immediate value of size <Code>##</Code> that represents a &quot;direct&quot; address in the address space.
                    </li>
                    <li>
                        <Code>AL/AX/EAX/RAX</Code>:
                        The accumulator register.
                    </li>
                    <li>
                        <Code>DS:SI</Code>:
                        Memory addressed by the <Code>DS:SI</Code> register pair.
                        {" "}<Code>DS:ESI</Code> and <Code>DS:RSI</Code> may be used instead depending on the processor&apos;s mode.
                    </li>
                    <li>
                        <Code>ES:DI</Code>:
                        Memory addressed by the <Code>ES:DI</Code> register pair.
                        {" "}<Code>ES:EDI</Code> and <Code>ES:RDI</Code> may be used instead depending on the processor&apos;s mode.
                    </li>
                    <li>
                        <Code>EVEX.vvvv</Code>:
                        The <Code>vvvv</Code> field of an EVEX prefix represents the register.
                    </li>
                    <li>
                        <Code>FLAGS</Code>:
                        The <Link href="/architecture/register/flags">FLAGS</Link> register.
                    </li>
                    <li>
                        <Code>imm##</Code>:
                        An immediate value of size <Code>##</Code>.
                    </li>
                    <li>
                        <Code>imm8(7..4)</Code>:
                        The upper four bits of an 8 bit immediate represents the register.
                        In 32 bit &quot;protected&quot; mode, the most significant bit (MSB; bit 7) is ignored and treated as if it were 0.
                    </li>
                    <li>
                        <Code>ModRM.reg</Code>:
                        The <Code>reg</Code> field of a ModR/M byte represents the register.
                        The three bits can be extended to four using one of the following prefixes: REX, VEX, or EVEX.
                    </li>
                    <li>
                        <Code>ModRM.r/m</Code>:
                        If the <Code>mod</Code> field of a ModR/M byte signifies a register, the <Code>r/m</Code> field represents the register.
                        The three bits can be extended to four using one of the following prefixes: REX, VEX, or EVEX.
                        If, however, the <Code>mod</Code> field of a ModR/M byte signifies memory, the address is calculated and used instead.
                    </li>
                    <li>
                        <Code>offset##</Code>:
                        An immediate value of size <Code>##</Code> that represents an offset from the <em>following</em> instruction.
                        For example, an infinite loop (<Code>a: JMP a</Code>) would be encoded as <Code>EB FE</Code> where <Code>FE</Code> represents negative 2.
                        This would jump <em>backwards</em> two bytes to the <Code>a</Code> label and begin again.
                        In fact, a &quot;nop&quot; could be encoded as <Code>EB 00</Code> which would be a simple jump to the following instruction (zero bytes ahead).
                    </li>
                    <li>
                        <Code>VEX.vvvv</Code>:
                        The <Code>vvvv</Code> field of a VEX prefix represents the register.
                    </li>
                </UL>

                <H2 id="headingDescription">Description</H2>
                <p>
                    The &quot;Description&quot; section, as the name implies, contains a simplified description of the instruction&apos;s operation.
                    In some cases, graphics will be used for illustrative purposes.
                </p>

                <H2 id="headingOperation">Operation</H2>
                <p>
                    The &quot;Operation&quot; section is pseudo-code that uses a Rust-like syntax.
                    While attempts are made to mimic Rust&apos;s syntax, some things are &quot;incorrect&quot;.
                    For example, Rust&apos;s ranges follow other programming languages with a &quot;start to end&quot; order.
                    This mimics how arrays are laid out in memory (index 0 is at a lower address than index n), however, a string of bits follows <Link href="https://en.wikipedia.org/wiki/Positional_notation">positional notation</Link> with the most significant bit (MSB) at the <em>left</em>.
                    Due to this, bit position slices use a &quot;high to low&quot; (&quot;end to start&quot;) order.
                </p>

                <H3 id="headingOperationMode">MODE</H3>
                <p>
                    The <Code>MODE</Code> global variable represents the current operating mode of the processor thread.
                    It can be one of: <Code>16</Code>, <Code>32</Code>, or <Code>64</Code>, each representing the &quot;bit width&quot; of the current mode.
                    However, it is only compared against <Code>64</Code> for instructions that are illegal in <Link href="/architecture/mode/long">long (64 bit) mode</Link>.
                </p>

                <H3 id="headingOperationProcessor">PROCESSOR</H3>
                <p>
                    In some <em>rare</em> cases, the operation of an instruction depends on which processor version is being used.
                    In those (known) instances, the <Code>PROCESSOR</Code> global variable represents the current processor.
                    For example, the <Link href="/instruction/aaa"><Code>AAA</Code> instruction</Link> operates <em>slightly</em> differently on the 80186 and prior.
                </p>

                <H3 id="headingOperationRegisters">Registers</H3>
                <p>
                    Registers are accessed as if they were global variables.
                    Any aliasing, and the zero extension to <Code>RrX</Code> when setting <Code>ErX</Code>, is handled implicitly.
                </p>

                <H3 id="headingOperationFlags">Flags</H3>
                <p>
                    Flags are accessed as if they were global variables.
                    For example, <Code>OF</Code> would refer to the <Link href="/architecture/register/flags">overflow flag</Link> (which is either a zero or a one).
                    These single bit values, when used in <Code>if</Code> conditions, are implicitly coerced to a boolean.
                    The only multibit flag, <Code>IOPL</Code>, is a two bit value and, as such, <em>cannot</em> be coerced.
                </p>

                <H3 id="headingOperationInstructionBits">Instruction Bits</H3>
                <p>
                    Instruction prefixes are exposed as pseudo global variables.
                    For example, <Code>EVEX.b</Code> refers to the <Code>b</Code> (broadcast) bit in the <Code>EVEX</Code> prefix for the currently executing instruction.
                </p>

                <H3 id="headingOperationTypes">Types</H3>
                <H4 id="headingOperationTypesSimd">Simd&lt;T&gt;</H4>
                <p>
                    The most used type in the pseudo-code is the <Code>Simd&lt;T&gt;</Code> type.
                    It represents an <Link href="/architecture/register/vector">x86 vector register</Link>.
                    Currently, <Code>Simd::max()</Code> is <Code>512</Code> to correspond with the <Code>ZMM</Code> registers, but this will change if an &quot;AVX-1024&quot; were to be created.
                </p>
                <p>
                    The <Code>T</Code> generic is a numeric type (integer or floating point) that represents what the <Code>ZMM</Code> register contains.
                    For example, <Code>Simd&lt;f64&gt;</Code> represents a <Code>ZMM</Code> register containing eight &quot;double precision&quot; floating point (64-bit) numbers.
                </p>
                <p>
                    Operations on <Code>Simd&lt;T&gt;</Code> are at the &quot;bit level&quot;.
                    In other words, even though <Code>T</Code> represents the type of data, <Code>data[0]</Code> does <em>not</em> represent the first data value, but the first <em>bit</em>.
                    For example, to access the second data value in a <Code>Simd&lt;u32&gt;</Code>, <Code>data[63..=32]</Code> would be used.
                </p>

                <H4 id="headingOperationTypesKMask">KMask</H4>
                <p>
                    In addition to the <Code>Simd&lt;T&gt;</Code> type for vector instructions, there also exists the <Code>KMask</Code> type.
                    It represents an <Link href="/architecture/register/mask">x86 mask register</Link> (<Code>k0</Code> through <Code>k7</Code>).
                    {" "}<Code>KMask</Code> is a 64 bit wide bit addressable type.
                    Each bit corresponds to the same bit in the x86 mask register with <Code>k[n]</Code> referring to the &quot;n-th&quot; bit of the underlying mask register.
                </p>

                <H2 id="headingExamples">Examples</H2>
                <p>
                    The &quot;Examples&quot; section (if present) contains one or more example assembly snippets that demonstrate the instruction.
                    Any examples provided use <Link href="https://nasm.us/">NASM</Link> (Intel) syntax.
                </p>

                <H2 id="headingFlags">Flags Affected</H2>
                <p>
                    The &quot;Flags Affected&quot; section (if present) contains a description of how the processor flags are affected by the instruction.
                </p>

                <H2 id="headingIntrinsics">Intrinsics</H2>
                <p>
                    The &quot;Intrinsics&quot; section(s) (if present) contain C or Rust function definitions that can be used in one&apos;s code to utilize the instruction without inline assembly.
                </p>

                <H2 id="headingExceptions">Exceptions</H2>
                <p>
                    The &quot;Exceptions&quot; sections contain a list of possible processor exceptions that can result from execution of the instruction.
                    For regular (non-vector) instructions, each subsection will be for the various processor modes.
                    Vector instructions, on the other hand, will typically only have two subsections: &quot;SIMD Floating-Point&quot; and &quot;Other&quot;.
                </p>
            </div>
        </Layout>
    );
}
