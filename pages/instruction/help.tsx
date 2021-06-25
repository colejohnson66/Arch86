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
 * You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Breadcrumb, Container, ContentCol, Row } from "../../components/Bootstrap";
import Layout, { Title } from "../../components/Layout";

import A from "../../components/A";
import Instruction from "../../components/Instruction";
import React from "react";
import TOC from "../../components/TOC";

export default function Page(): JSX.Element {
    return (
        <Layout canonical="/instruction/help" navGroup="instruction" src="/pages/instruction/help.tsx">
            <Title title="Instruction Page Help" />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item href="/instruction">Instructions</Breadcrumb.Item>
                    <Breadcrumb.Item>Help</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
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
                                <TOC.Entry href="#headingOperationTypesNumerics" text="Integer Types" />
                                <TOC.Entry href="#headingOperationTypesSimd" text="Simd<T>" />
                                <TOC.Entry href="#headingOperationTypesKMask" text="KMask" />
                                <TOC.Entry href="#headingOperationTypesBound" text="Bound" />
                            </TOC.Entry>
                        </TOC.Entry>
                        <TOC.Entry href="#headingExamples" text="Examples" />
                        <TOC.Entry href="#headingFlags" text="Flags Affected" />
                        <TOC.Entry href="#headingIntrinsics" text="Intrinsics" />
                        <TOC.Entry href="#headingExceptions" text="Exceptions" />
                    </TOC.Root>
                    <ContentCol>
                        <h1>Instruction Page Help</h1>
                        <p>
                            This page details many of the features of the instruction pages.
                        </p>

                        <h2 id="headingOverviewTable">Overview Table</h2>
                        <p>
                            The overview table lists all the various forms that an instruction can take.
                            Each row of the table consists of the following items, in order:
                        </p>
                        <ul>
                            <li>
                                <b>Opcode and Mnemonic</b>:
                                A single form of the instruction listing both the binary encoding and assembly form.
                                Italics in the mnemonic part signify operands.
                                {" "}<A href="#headingOverviewTableVex">See below</A> for an explanation on interpreting VEX and EVEX opcodes.
                                <br />
                                Some vector instructions (such as <Instruction name="ADDPS" />) require that <em>no</em> legacy prefixes (such as <code>0x66</code>) be present.
                                Including a prefix will change how the instruction is decoded.
                                For example, prefixing the <Instruction name="ADDPS" noLink noTitle /> instruction with <code>0x66</code> will change it into an <Instruction name="ADDPD" /> instruction.
                                These mandatory &quot;no prefix&quot; opcodes are notated with <code>NP</code> at the beginning of the opcode line.
                                <br />
                                EVEX forms commonly feature other bits of information such as the mask register (<code>{"{k1}"}</code>), error masking (<code>{"{er}"}</code>), and more.
                            </li>
                            <li>
                                <b>Encoding</b>:
                                A reference to the <A href="#headingEncoding">encoding table</A>.
                                This value represents <em>where</em> in the instruction the operands are encoded.
                            </li>
                            <li>
                                <b>## bit Mode</b> (multiple):
                                Whether a given instruction form is valid, invalid, or not encodable in the specified processor mode.
                                &quot;Valid&quot; forms are allowed while &quot;invalid&quot; forms will usually throw an exception if encountered.
                                &quot;Not encodable&quot; forms are also invalid, but because they also encode a different (valid) instruction, they will be interpreted incorrectly.
                                <br />
                                For example, in <A href="/mode/long">64 bit mode</A>, the byte range <code>40</code> through <code>4F</code> was repurposed for the REX prefix.
                                This makes encoding <code>INC eax</code> as <code>40</code> impossible.
                                Should the processor encounter what the author thinks is <code>INC eax</code>, it will treat it as a REX prefix with the lower four bits set to 0.
                                The correct encoding would be <code>FF C0</code>.
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
                        </ul>

                        <h3 id="headingOverviewTableVex">Interpreting VEX and EVEX Opcodes</h3>
                        <p>
                            VEX and EVEX opcodes are written differently than normal instructions.
                            This is because the prefixes are multiple (two to four) bytes long and encode quite a bit of information.
                            Both prefixes take the form of <code>{"(E)VEX.{length}.{prefixes}.{w}"}</code> with each field representing a specific field in the VEX or EVEX prefix.
                            The other fields in the prefix are unspecified here and are dependent on the operands.
                            The various fields in the opcode prefix encoding are:
                        </p>
                        <ul>
                            <li>
                                <b>length</b>:
                                The amount of bits this instruction operates on.
                                This is encoded in the <code>L</code> and (for EVEX) <code>L&apos;</code> bits.
                                This can be one of: 128 (<code>XMM</code>), 256 (<code>YMM</code>), 512 (<code>ZMM</code>), or <code>LIG</code>.
                                {" "}<code>LIG</code> stands for &quot;length ignored&quot; and means just that - the length field is ignored.
                                This is typically used in situations involving scalars as only a single piece of data is operated on, not the whole register.
                                <br />
                                In some situations, despite an instruction being defined with <code>LIG</code>, Intel may recommend a specific value is used instead for future proofing.
                                For example, the <Instruction name="ADDSD" /> instruction is defined to be <code>LIG</code>, but Intel recommends setting <code>L</code> (and <code>L&apos;</code> for EVEX) to zero.
                            </li>
                            <li>
                                <b>prefixes</b>:
                                The implied prefix bytes that are encoded in the prefix.
                                Due to the nature of the VEX and EVEX prefixes, there can be up to two prefix fields specified in the opcode encoding: one for operand size and type prefixes (the <code>pp</code> field), and one for escape codes (the <code>m</code> bits).
                                If unspecified, a prefix group&apos;s bits must be all zeros (indicating no prefix).
                            </li>
                            <li>
                                <b>w</b>:
                                The single <code>W</code> bit in the VEX or EVEX prefix.
                                This is commonly used as an extra bit to specify the opcode, but will sometimes be used as its predecessor, <code>REX.W</code>, meant - expanding the operand size to 64 bits.
                                {" "}<code>WIG</code> stands for &quot;W ignored&quot; and means just that - the <code>W</code> bit is ignored.
                            </li>
                        </ul>

                        <h2 id="headingEncoding">Encoding</h2>
                        <p>
                            The &quot;Encoding&quot; section is a table listing the encoding of the operands for the various opcodes in the overview table at the start.
                            Each row of the table consists of the following items, in order:
                        </p>
                        <ul>
                            <li>
                                <b>Encoding</b>:
                                The name of the encoding this row is for.
                                For example, if the &quot;Encoding&quot; cell of a mnemonic in the overview table contains <code>RM</code>, the row containing <code>RM</code> in this cell would list how the operands are encoded.
                            </li>
                            <li>
                                <b>Tuple Type</b> (optional):
                                The EVEX encoding&apos;s tuple form.
                                {/* TODO: What is it? */}
                                This column is only present if an EVEX encoding for this instruction exists.
                                If present, any encoding that does not use an EVEX prefix will contain &quot;N/A&quot;.
                            </li>
                            <li>
                                <b>Operand(s)</b>:
                                The actual encoding of each operand.
                                Instructions that contain a different number of operands depending on the mnemonic (for example, vector instructions with a legacy encoding) will contain &quot;N/A&quot; for disallowed operands.
                                In other words, &quot;legacy&quot; vector encodings will typically have the first source and the destination be the same operand (<code>MNEMONIC dest, src</code>), but VEX and EVEX versions with a &quot;non-destructive&quot; form (<code>MNEMONIC dest, src1, src2</code>) will not.
                                In these cases, the &quot;legacy&quot; form will only have two operands while the VEX and EVEX forms will have three.
                                As such, the &quot;Operand 3&quot; cell will be empty.
                                <br />
                                <A href="#headingEncodingOperand">See below</A> for an explanation on interpreting this value.
                            </li>
                        </ul>

                        <h3 id="headingEncodingOperand">Interpreting the Operand Value</h3>
                        <p>
                            The operand value cell takes the form of <code>source[rw]</code> which represents a data, <code>source</code>, that is both read from and written to (<code>[rw]</code>).
                            Read only or write only data is signified by <code>[r]</code> and <code>[w]</code>, respectively.
                        </p>
                        <p>
                            <code>source</code> only specifies <em>where</em> the register number is encoded.
                            It does <em>not</em> specify which register file is used (general purpose, segment, vector, etc.);
                            That is specified by the mnemonic&apos;s encoding.
                        </p>
                        <p>
                            <code>source</code> will be one of the following values:
                        </p>
                        <ul>
                            <li>
                                <code>address##</code>:
                                An immediate value of size <code>##</code> that represents a &quot;direct&quot; address in the address space.
                                If multiple values of <code>##</code> are allowed, they will be separated with a slash.
                            </li>
                            <li>
                                <code>AL/AX/EAX/RAX</code>:
                                The accumulator register.
                            </li>
                            <li>
                                <code>DS:SI</code>:
                                Memory addressed by the <code>DS:SI</code> register pair.
                                {" "}<code>DS:ESI</code> and <code>DS:RSI</code> may be used instead depending on the processor&apos;s mode.
                            </li>
                            <li>
                                <code>ES:DI</code>:
                                Memory addressed by the <code>ES:DI</code> register pair.
                                {" "}<code>ES:EDI</code> and <code>ES:RDI</code> may be used instead depending on the processor&apos;s mode.
                            </li>
                            <li>
                                <code>EVEX.vvvv</code>:
                                The <code>vvvv</code> field of an EVEX prefix represents the register.
                            </li>
                            <li>
                                <code>FLAGS</code>:
                                The <A href="/register/flags">FLAGS</A> register.
                            </li>
                            <li>
                                <code>imm##</code>:
                                An immediate value of size <code>##</code>.
                                If multiple values of <code>##</code> are allowed, they will be separated with a slash.
                            </li>
                            <li>
                                <code>imm8(7..4)</code>:
                                The upper four bits of an 8 bit immediate represents the register.
                                In 32 bit &quot;protected&quot; mode, the most significant bit (MSB; bit 7) is ignored and treated as if it were 0.
                            </li>
                            <li>
                                <code>ModRM.reg</code>:
                                The <code>reg</code> field of a ModR/M byte represents the register.
                                The three bits can be extended to four using one of the following prefixes: REX, VEX, or EVEX.
                            </li>
                            <li>
                                <code>ModRM.r/m</code>:
                                If the <code>mod</code> field of a ModR/M byte signifies a register, the <code>r/m</code> field represents the register.
                                The three bits can be extended to four using one of the following prefixes: REX, VEX, or EVEX.
                                If, however, the <code>mod</code> field of a ModR/M byte signifies memory, the address is calculated and used instead.
                            </li>
                            <li>
                                <code>offset##</code>:
                                An immediate value of size <code>##</code> that represents an offset from the <em>following</em> instruction.
                                If multiple values of <code>##</code> are allowed, they will be separated with a slash.
                                <br />
                                For example, an infinite loop (<code>a: JMP a</code>) would be encoded as <code>EB FE</code> where <code>FE</code> represents negative 2.
                                This would jump <em>backwards</em> two bytes to the <code>a</code> label and begin again.
                                In fact, a &quot;nop&quot; could be encoded as <code>EB 00</code> which would be a simple jump to the following instruction (zero bytes ahead).
                            </li>
                            <li>
                                <code>VEX.vvvv</code>:
                                The <code>vvvv</code> field of a VEX prefix represents the register.
                            </li>
                        </ul>

                        <h2 id="headingDescription">Description</h2>
                        <p>
                            The &quot;Description&quot; section, as the name implies, contains a simplified description of the instruction&apos;s operation.
                            In some cases, graphics will be used for illustrative purposes.
                        </p>

                        <h2 id="headingOperation">Operation</h2>
                        <p>
                            The &quot;Operation&quot; section is pseudo-code that uses a Rust-like syntax.
                            While attempts are made to mimic Rust&apos;s syntax, some things are &quot;incorrect&quot;.
                            For example, Rust&apos;s ranges follow other programming languages with a &quot;start to end&quot; order.
                            This mimics how arrays are laid out in memory (index 0 is at a lower address than index n), however, a string of bits follows <A href="https://en.wikipedia.org/wiki/Positional_notation">positional notation</A> with the most significant bit (MSB) at the <em>left</em>.
                            Due to this, bit position slices use a &quot;high to low&quot; (&quot;end to start&quot;) order.
                        </p>

                        <h3 id="headingOperationMode">MODE</h3>
                        <p>
                            The <code>MODE</code> global variable represents the current operating mode of the processor thread.
                            It can be one of: <code>16</code>, <code>32</code>, or <code>64</code>, each representing the &quot;bit width&quot; of the current mode.
                            However, it is only compared against <code>64</code> for instructions that are illegal in <A href="/mode/long">long (64 bit) mode</A>.
                        </p>

                        <h3 id="headingOperationProcessor">PROCESSOR</h3>
                        <p>
                            In some <em>rare</em> cases, the operation of an instruction depends on which processor version is being used.
                            In those (known) instances, the <code>PROCESSOR</code> global variable represents the current processor.
                            For example, the <Instruction name="AAA" /> instruction operates <em>slightly</em> differently on the 80186 and prior.
                        </p>

                        <h3 id="headingOperationRegisters">Registers</h3>
                        <p>
                            Registers are accessed as if they were global variables.
                            Any aliasing, and the zero extension to <code>RrX</code> when setting <code>ErX</code>, is handled implicitly.
                        </p>

                        <h3 id="headingOperationFlags">Flags</h3>
                        <p>
                            Flags are accessed as if they were global variables.
                            For example, <code>OF</code> would refer to the <A href="/register/flags">overflow flag</A> (which is either a zero or a one).
                            These single bit values, when used in <code>if</code> conditions, are implicitly coerced to a boolean.
                            The only multibit flag, <code>IOPL</code>, is a two bit value and, as such, <em>cannot</em> be coerced.
                        </p>

                        <h3 id="headingOperationInstructionBits">Instruction Bits</h3>
                        <p>
                            Instruction prefixes are exposed as pseudo global variables.
                            For example, <code>EVEX.b</code> refers to the <code>b</code> (broadcast) bit in the <code>EVEX</code> prefix for the currently executing instruction.
                        </p>

                        <h3 id="headingOperationTypes">Types</h3>
                        <h4 id="headingOperationTypesNumerics">Integer Types</h4>
                        <p>
                            Rust&apos;s integer types, by default, do not allow access to the individual bits through slices.
                            The only way to do so (without external crates) is through bit shifts and masking operations.
                            Despite that, individual bits are exposed through slices.
                            For example, to get the lowest three bits of an integer, one would normally do something similar to <code>data &amp; 7</code>, but the operations show that as <code>data[2..=0]</code>.
                        </p>

                        <h4 id="headingOperationTypesSimd">Simd&lt;T&gt;</h4>
                        <p>
                            The most used type in the pseudo-code (besides integers) is the <code>Simd&lt;T&gt;</code> type.
                            It represents an <A href="/register/vector">x86 vector register</A>.
                            Currently, <code>Simd::max()</code> is <code>512</code> to correspond with the <code>ZMM</code> registers, but this will change if an &quot;AVX-768&quot; or &quot;AVX-1024&quot; were to be created.
                        </p>
                        <p>
                            The <code>T</code> generic is a numeric type (integer or floating point) that represents what the <code>ZMM</code> register contains.
                            For example, <code>Simd&lt;f64&gt;</code> (on a machine supporting AVX-512) represents a <code>ZMM</code> register containing eight &quot;double precision&quot; floating point (64 bit) numbers.
                        </p>
                        <p>
                            Operations on <code>Simd&lt;T&gt;</code> are at the &quot;bit level&quot;.
                            In other words, even though <code>T</code> represents the type of data, <code>data[0]</code> does <em>not</em> represent the first data value, but the first <em>bit</em>.
                            For example, to access the second data value in a <code>Simd&lt;u32&gt;</code>, <code>data[63..=32]</code> would be used.
                        </p>

                        <h4 id="headingOperationTypesKMask">KMask</h4>
                        <p>
                            In addition to the <code>Simd&lt;T&gt;</code> type for vector instructions, there also exists the <code>KMask</code> type.
                            It represents an <A href="/register/mask">x86 mask register</A> (<code>k0</code> through <code>k7</code>).
                            {" "}<code>KMask</code> is a 64 bit wide bit addressable type.
                            Each bit corresponds to the same bit in the x86 mask register with <code>k[n]</code> referring to the &quot;n-th&quot; bit of the underlying mask register.
                        </p>

                        <h4 id="headingOperationTypesBound">Bound</h4>
                        <p>
                            Intel MPX (Memory Protection Extensions) created four <A href="/register/bound">bounds registers</A> that can be used to check if a memory address is within a specified range.
                            These registers are represented with the <code>Bound</code> type.
                            The <code>Bound</code> type contains two accessible values: <code>lower</code> (the 64 bit lower bound) and <code>upper</code> (the 64 bit upper bound).
                        </p>
                        <p>
                            In addition to the bounds registers, there also exists three configuration and status registers: <code>BNDCFGS</code>, <code>BNDCFGU</code>, and <code>BNDSTATUS</code>.
                            Each of those three are 64 bits wide and are accessed as if they were global variables.
                        </p>

                        <h2 id="headingExamples">Examples</h2>
                        <p>
                            The &quot;Examples&quot; section (if present) contains one or more example assembly snippets that demonstrate the instruction.
                            Any examples provided use <A href="https://nasm.us/">NASM</A> (Intel) syntax.
                        </p>

                        <h2 id="headingFlags">Flags Affected</h2>
                        <p>
                            The &quot;Flags Affected&quot; section (if present) contains a description of how the processor&apos;s arithmetic flags are affected by the instruction.
                            If this section is not present, then no arithmetic flags are changed.
                        </p>

                        <h2 id="headingIntrinsics">Intrinsics</h2>
                        <p>
                            The &quot;Intrinsics&quot; section(s) (if present) contain C or Rust function definitions that can be used in one&apos;s code to utilize the instruction without inline assembly.
                        </p>

                        <h2 id="headingExceptions">Exceptions</h2>
                        <p>
                            The &quot;Exceptions&quot; sections contain a list of possible processor exceptions that can result from execution of the instruction.
                            For regular (non-vector) instructions, each subsection will be for the various processor modes.
                            Vector instructions, on the other hand, will typically only have two subsections: &quot;SIMD Floating-Point&quot; and &quot;Other&quot;.
                        </p>
                    </ContentCol>
                </Row>
            </Container>
        </Layout>
    );
}
