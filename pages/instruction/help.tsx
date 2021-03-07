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

import { Code, H1, H2, H3, H4, HTMLTable, IBreadcrumbProps, UL } from "@blueprintjs/core";

import A from "../../components/A";
import Instruction from "../../components/Instruction";
import Layout from "../../components/Layout";
import React from "react";
import Scrollable from "../../components/Scrollable";
import TOC from "../../components/TOC";

// Helper functions to cut down on repetitive lines
function tableHeaderRow(...cells: (string | JSX.Element)[]): JSX.Element {
    return (
        <tr>
            {cells.map((cell, idx) => (<th key={idx}>{cell}</th>))}
        </tr>
    );
}
function tableRow(...cells: (string | JSX.Element)[]): JSX.Element {
    return (
        <tr>
            {cells.map((cell, idx) => (<td key={idx}>{cell}</td>))}
        </tr>
    );
}

export default function Page(): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        {
            text: "Instructions",
            href: "/instruction",
        },
        { text: "Help" },
    ];

    return (
        <Layout canonical="/instruction/help" navGroup="instruction" title="Instruction Page Help" src="/pages/instruction/help.tsx" breadcrumbs={PageBreadcrumbs}>
            <TOC.Root>
                <TOC.Entry href="#headingOverviewTable" text="Overview Table">
                    <TOC.Entry href="#headingOverviewTableVex" text="Interpreting VEX and EVEX Opcodes" />
                </TOC.Entry>
                <TOC.Entry href="#headingEncoding" text="Encoding">
                    <TOC.Entry href="#headingEncodingOperand" text="Interpreting the Operand Value" />
                </TOC.Entry>
                <TOC.Entry href="#headingBitEncoding" text="Bit Encoding">
                    <TOC.Entry href="#headingBitEncodingBits" text="Interpreting Named Bits" />
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
                        {" "}<A href="#headingOverviewTableVex">See below</A> for an explanation on interpreting VEX and EVEX opcodes.
                        <br />
                        Some vector instructions (such as <Instruction name="ADDPS" />) require that <em>no</em> legacy prefixes (such as <Code>0x66</Code>) be present.
                        Including a prefix will change how the instruction is decoded.
                        For example, prefixing the <Instruction name="ADDPS" noLink noTitle /> instruction with <Code>0x66</Code> will change it into an <Instruction name="ADDPD" /> instruction.
                        These mandatory &quot;no prefix&quot; opcodes are notated with <Code>NP</Code> at the beginning of the opcode line.
                        <br />
                        EVEX forms commonly feature other bits of information such as the mask register (<Code>{"{k1}"}</Code>), error masking (<Code>{"{er}"}</Code>), and more.
                    </li>
                    <li>
                        <b>Encoding</b>:
                        A reference to the <A href="#headingEncoding">encoding table</A>.
                        This value represents <em>where</em> in the instruction the operands are encoded.
                    </li>
                    <li>
                        <b>## bit Mode</b> (multiple):
                        Whether a given instruction form is valid, invalid, or not encodable in the specified processor mode.
                        &quot;Valid&quot; forms are allowed while &quot;invalid&quot; forms will throw an exception if encountered.
                        &quot;Not encodable&quot; forms are disallowed in the specified mode, and will, in fact, be interpreted differently than expected.
                        <br />
                        For example, in <A href="/mode/long">64 bit mode</A>, the byte range <Code>40</Code> through <Code>4F</Code> was repurposed for the REX prefix.
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
                        For example, the <Instruction name="ADDSD" /> instruction is defined to be <Code>LIG</Code>, but Intel recommends setting <Code>L</Code> (and <Code>L&apos;</Code> for EVEX) to zero.
                    </li>
                    <li>
                        <b>prefixes</b>:
                        The implied prefix bytes that are encoded in the prefix.
                        Due to the nature of the VEX and EVEX prefixes, there can be up to two prefix fields specified in the opcode encoding: one for operand size and type prefixes (the <Code>pp</Code> field), and one for escape codes (the <Code>m</Code> bits).
                        If unspecified, a prefix group&apos;s bits must be all zeros (indicating no prefix).
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
                        If present, any encoding that does not use an EVEX prefix will contain &quot;N/A&quot;.
                    </li>
                    <li>
                        <b>Operand(s)</b>:
                        The actual encoding of each operand.
                        Instructions that contain a different number of operands depending on the mnemonic (for example, vector instructions with a legacy encoding) will contain &quot;N/A&quot; for disallowed operands.
                        In other words, &quot;legacy&quot; vector encodings will typically have the first source and the destination be the same operand (<Code>MNEMONIC dest, src</Code>), but VEX and EVEX versions with a &quot;non-destructive&quot; form (<Code>MNEMONIC dest, src1, src2</Code>) will not.
                        In these cases, the &quot;legacy&quot; form will only have two operands while the VEX and EVEX forms will have three.
                        As such, the &quot;Operand 3&quot; cell will be empty.
                        <br />
                        <A href="#headingEncodingOperand">See below</A> for an explanation on interpreting this value.
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
                        If multiple values of <Code>##</Code> are allowed, they will be separated with a slash.
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
                        The <A href="/register/flags">FLAGS</A> register.
                    </li>
                    <li>
                        <Code>imm##</Code>:
                        An immediate value of size <Code>##</Code>.
                        If multiple values of <Code>##</Code> are allowed, they will be separated with a slash.
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
                        If multiple values of <Code>##</Code> are allowed, they will be separated with a slash.
                        <br />
                        For example, an infinite loop (<Code>a: JMP a</Code>) would be encoded as <Code>EB FE</Code> where <Code>FE</Code> represents negative 2.
                        This would jump <em>backwards</em> two bytes to the <Code>a</Code> label and begin again.
                        In fact, a &quot;nop&quot; could be encoded as <Code>EB 00</Code> which would be a simple jump to the following instruction (zero bytes ahead).
                    </li>
                    <li>
                        <Code>VEX.vvvv</Code>:
                        The <Code>vvvv</Code> field of a VEX prefix represents the register.
                    </li>
                </UL>

                <H2 id="headingBitEncoding">Bit Encoding</H2>
                <p>
                    The &quot;Bit Encoding&quot; section details the actual bit representation of the various instruction forms.
                    These bits will be grouped per byte, and separated by a colon (<Code>:</Code>) to show the order in a byte stream they would appear.
                    Each byte will be written as either a two-hexdigit value (if possible) or as individual bits.
                    If the bits will be written out one-by-one, they will be grouped into either four (&quot;nibbles&quot;) or three bits (octal-like).
                </p>

                <H3 id="headingBitEncodingBits">Interpreting Named Bits</H3>
                <p>
                    Sometimes, individual bits are named to represent their function.
                    Generally, this is only used to show the individual bits of a byte (such as the two bit <Code>mod</Code> field of a ModR/M byte), or to show where registers are encoded.
                    However, sometimes, two forms of an instruction will differ only in a few bits, and those bits have a defined meaning.
                    For example, if a string of bits contains a character such as <Code>s</Code>, this would indicate if sign extension of an operand occurs.
                </p>
                <p>
                    These named bits will be one of the following:
                </p>
                <UL>
                    <li>
                        <Code>d</Code> (direction):
                        Specifies which direction data flows from and into.
                        This is commonly used for ALU instructions from the original <A href="/architecture/8086">8086</A>.
                        This can have one of two values:
                        <Scrollable>
                            <HTMLTable small>
                                <thead>
                                    {tableHeaderRow("Value", "Source", "Destination")}
                                </thead>
                                <tbody>
                                    {tableRow(
                                        <Code>0</Code>,
                                        <><Code>reg</Code> field</>,
                                        <><Code>r/m</Code> field with an optional SIB byte</>
                                    )}
                                    {tableRow(
                                        <Code>1</Code>,
                                        <><Code>r/m</Code> field with an optional SIB byte</>,
                                        <><Code>reg</Code> field</>
                                    )}
                                </tbody>
                            </HTMLTable>
                        </Scrollable>
                    </li>
                    <li>
                        <Code>eee</Code> (special register):
                        When control or debug registers are used in an instruction, they are represented using <Code>eee</Code>.
                        Whether a control or debug register is used depends on the instruction, but both will <em>never</em> be used at the same time.
                        This can have one of 16 values.
                        If REX.R, VEX.R, or EVEX.R is not present, only the first eight possible values are available.
                        <Scrollable>
                            <HTMLTable small>
                                <thead>
                                    {tableHeaderRow("Value", "Control Register", "Destination Register")}
                                </thead>
                                <tbody>
                                    {tableRow(<Code>0.000</Code>, <Code>CR0</Code>, <Code>DR0</Code>)}
                                    {tableRow(<Code>0.001</Code>, "reserved", <Code>DR1</Code>)}
                                    {tableRow(<Code>0.010</Code>, <Code>CR2</Code>, <Code>DR2</Code>)}
                                    {tableRow(<Code>0.011</Code>, <Code>CR3</Code>, <Code>DR3</Code>)}
                                    {tableRow(<Code>0.100</Code>, <Code>CR4</Code>, "reserved")}
                                    {tableRow(<Code>0.101</Code>, "reserved", "reserved")}
                                    {tableRow(<Code>0.110</Code>, "reserved", <Code>DR6</Code>)}
                                    {tableRow(<Code>0.111</Code>, "reserved", <Code>DR7</Code>)}
                                    {tableRow(<Code>1.000</Code>, <Code>CR8</Code>, "reserved")}
                                    {tableRow(<Code>1.001</Code>, "reserved", "reserved")}
                                    {tableRow(<Code>1.010</Code>, "reserved", "reserved")}
                                    {tableRow(<Code>1.011</Code>, "reserved", "reserved")}
                                    {tableRow(<Code>1.100</Code>, "reserved", "reserved")}
                                    {tableRow(<Code>1.101</Code>, "reserved", "reserved")}
                                    {tableRow(<Code>1.110</Code>, "reserved", "reserved")}
                                    {tableRow(<Code>1.111</Code>, "reserved", "reserved")}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3}>
                                            The first bit represents the <Code>R</Code> field in a REX, VEX, or EVEX prefix.
                                            The other three are the <Code>eee</Code> field.
                                            <br />
                                            Usage of reserved encodings will lead to a <Code>#UD</Code> exception.
                                        </td>
                                    </tr>
                                </tfoot>
                            </HTMLTable>
                        </Scrollable>
                    </li>
                    <li>
                        <Code>reg</Code> (general purpose register):
                        There are eight general purpose registers (16 in <A href="/mode/long">Long Mode</A>).
                        Which one is used depends on the bits of this <Code>reg</Code> field (combined with REX.R, VEX.R, or EVEX.R if present), the <Code>w</Code> field (if present), <em>and</em> the current processor mode.
                        <Scrollable>
                            <HTMLTable small>
                                <caption>Selected Register When <Code>w</Code> is not Present</caption>
                                <thead>
                                    {tableHeaderRow(
                                        "Value",
                                        "16 bit Operations",
                                        "32 bit Operations",
                                        "64 bit Operations"
                                    )}
                                </thead>
                                <tbody>
                                    {tableRow(<Code>000</Code>, <Code>AX</Code>, <Code>EAX</Code>, <Code>RAX</Code>)}
                                    {tableRow(<Code>001</Code>, <Code>CX</Code>, <Code>ECX</Code>, <Code>RCX</Code>)}
                                    {tableRow(<Code>010</Code>, <Code>DX</Code>, <Code>EDX</Code>, <Code>RDX</Code>)}
                                    {tableRow(<Code>011</Code>, <Code>BX</Code>, <Code>EBX</Code>, <Code>RBX</Code>)}
                                    {tableRow(<Code>100</Code>, <Code>SP</Code>, <Code>ESP</Code>, <Code>RSP</Code>)}
                                    {tableRow(<Code>101</Code>, <Code>BP</Code>, <Code>EBP</Code>, <Code>RBP</Code>)}
                                    {tableRow(<Code>110</Code>, <Code>SI</Code>, <Code>ESI</Code>, <Code>RSI</Code>)}
                                    {tableRow(<Code>111</Code>, <Code>DI</Code>, <Code>EDI</Code>, <Code>RDI</Code>)}
                                </tbody>
                            </HTMLTable>
                        </Scrollable>
                        <Scrollable>
                            <HTMLTable small>
                                <caption>Selected Register When <Code>w</Code> is Present</caption>
                                <thead>
                                    {tableHeaderRow(
                                        "Value",
                                        <><Code>w</Code> Unset</>,
                                        <><Code>w</Code> Set; 16 bit Operations</>,
                                        <><Code>w</Code> Set; 32 bit Operations</>
                                    )}
                                </thead>
                                <tbody>
                                    {tableRow(<Code>000</Code>, <Code>AL</Code>, <Code>AX</Code>, <Code>EAX</Code>)}
                                    {tableRow(<Code>001</Code>, <Code>CL</Code>, <Code>CX</Code>, <Code>ECX</Code>)}
                                    {tableRow(<Code>010</Code>, <Code>DL</Code>, <Code>DX</Code>, <Code>EDX</Code>)}
                                    {tableRow(<Code>011</Code>, <Code>BL</Code>, <Code>BX</Code>, <Code>EBX</Code>)}
                                    {tableRow(<Code>100</Code>, <Code>AH</Code>, <Code>SP</Code>, <Code>ESP</Code>)}
                                    {tableRow(<Code>101</Code>, <Code>CH</Code>, <Code>BP</Code>, <Code>EBP</Code>)}
                                    {tableRow(<Code>110</Code>, <Code>DH</Code>, <Code>SI</Code>, <Code>ESI</Code>)}
                                    {tableRow(<Code>111</Code>, <Code>BH</Code>, <Code>DI</Code>, <Code>EDI</Code>)}
                                </tbody>
                            </HTMLTable>
                        </Scrollable>
                        <style jsx>{`
                            caption {
                                font-size: large;
                                font-weight: bold;
                                padding-top: 6px;
                            }
                        `}</style>
                    </li>
                    <li>
                        <Code>s</Code> (sign extend):
                        Specifies whether an immediate is sign extended or left alone.
                        This can have one of two values:
                        <Scrollable>
                            <HTMLTable small>
                                <thead>
                                    {tableHeaderRow("Value", "Effect on 8 bit Data", "Effect on 16 or 32 bit Data")}
                                </thead>
                                <tbody>
                                    {tableRow(
                                        <Code>0</Code>,
                                        "none",
                                        "none"
                                    )}
                                    {tableRow(
                                        <Code>1</Code>,
                                        "sign extended to size of destination",
                                        "none"
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3}>
                                            A quirk of this field is that the opcodes beginning with <Code>82</Code> (8086 ALU operations) perform the same operation as ones beginning with <Code>80</Code>.
                                            For example, <A href="/instruction/add"><Code>ADD <i>r/m8</i>, <i>imm8</i></Code></A> is documented as being encoded as <Code>80 /0 <i>ib</i></Code>, but can also be encoded as <Code>82 /0 <i>ib</i></Code>.
                                            This has the effect of sign extending the 8 bit immediate to the size of the 8 bit destination (i.e. doing nothing).
                                            These encodings are undocumented and were removed in <A href="/mode/long">Long Mode</A> (a <Code>#UD</Code> exception will result).
                                        </td>
                                    </tr>
                                </tfoot>
                            </HTMLTable>
                        </Scrollable>
                    </li>
                    <li>
                        <Code>sreg#</Code> (segment register):
                        Either a two or three bit field specifying a segment register.
                        If <Code>sreg2</Code> is used, access to the <Code>FS</Code> and <Code>GS</Code> segments is unavailable.
                        If <Code>sreg3</Code> is used, access to all six segment registers is available:
                        <Scrollable>
                            <HTMLTable small>
                                <thead>
                                    {tableHeaderRow("Value", "Segment Register")}
                                </thead>
                                <tbody>
                                    {tableRow(<Code>0.00</Code>, <Code>ES</Code>)}
                                    {tableRow(<Code>0.01</Code>, <Code>CS</Code>)}
                                    {tableRow(<Code>0.10</Code>, <Code>SS</Code>)}
                                    {tableRow(<Code>0.11</Code>, <Code>DS</Code>)}
                                    {tableRow(<Code>1.00</Code>, <Code>FS</Code>)}
                                    {tableRow(<Code>1.01</Code>, <Code>GS</Code>)}
                                    {tableRow(<Code>1.10</Code>, "reserved")}
                                    {tableRow(<Code>1.11</Code>, "reserved")}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={2}>
                                            The first bit represents the most significant bit of an <Code>sreg3</Code> field.
                                            The other two are the <Code>sreg2</Code> field.
                                            <br />
                                            Usage of reserved encodings will lead to a <Code>#UD</Code> exception.
                                        </td>
                                    </tr>
                                </tfoot>
                            </HTMLTable>
                        </Scrollable>
                    </li>
                    <li>
                        <Code>tttn</Code> (condition test):
                        Conditional instructions have the condition encoded in this four bit field.
                        The first three (<Code>ttt</Code>) are the condition to test, and the fourth determines if the condition is used directly (<Code>n = 0</Code>), or its negated form (<Code>n = 1</Code>).
                        These four bits are encoded in the four least significant bits (bits 3, 2, 1, and 0) of the opcode byte for single byte opcodes, or the four least significant bits of the second opcode byte for two byte opcodes.
                        These bits have the following values:
                        <Scrollable>
                            <HTMLTable small>
                                <thead>
                                    {tableHeaderRow("Value", "Mnemonic Suffix", "Condition", "Check", "Signed or Unsigned")}
                                </thead>
                                <tbody>
                                    {tableRow(<Code>0000</Code>, "O", "Overflow", <Code>OF == 1</Code>, "Neither")}
                                    {tableRow(<Code>0001</Code>, "NO", "No overflow", <Code>OF == 0</Code>, "Neither")}
                                    {tableRow(<Code>0010</Code>, "B, NAE, C", "Below, Not above or equal, Carry", <Code>CF == 1</Code>, "Unsigned")}
                                    {tableRow(<Code>0011</Code>, "NB, AE, NC", "Not below, Above or equal, No carry", <Code>CF == 0</Code>, "Unsigned")}
                                    {tableRow(<Code>0100</Code>, "E, Z", "Equal, Zero", <Code>ZF == 1</Code>, "Neither")}
                                    {tableRow(<Code>0101</Code>, "NE, NZ", "Not equal, Not zero", <Code>ZF == 0</Code>, "Neither")}
                                    {tableRow(<Code>0110</Code>, "BE, NA", "Below or equal, Not above", <Code>(CF | OF) == 1</Code>, "Unsigned")}
                                    {tableRow(<Code>0111</Code>, "NBE, A", "Not below or equal, Above", <Code>(CF &amp; ZF) == 1</Code>, "Unsigned")}
                                    {tableRow(<Code>1000</Code>, "S", "Sign (MSB set)", <Code>SF == 1</Code>, "Neither")}
                                    {tableRow(<Code>1001</Code>, "NS", "No sign (MSB cleared)", <Code>SF == 0</Code>, "Neither")}
                                    {tableRow(<Code>1010</Code>, "P, PE", "Parity, Parity even", <Code>PF == 1</Code>, "Neither")}
                                    {tableRow(<Code>1011</Code>, "NP, PO", "No parity, Parity odd", <Code>PF == 0</Code>, "Neither")}
                                    {tableRow(<Code>1100</Code>, "L, NGE", "Less than, Not greater than or equal to", <Code>SF != OF</Code>, "Signed")}
                                    {tableRow(<Code>1101</Code>, "NL, GE", "Not less than, Greater than or equal to", <Code>SF == OF</Code>, "Signed")}
                                    {tableRow(<Code>1110</Code>, "LE, NG", "Less than or equal to, Not greater than", <Code>ZF == 1 || SF != OF</Code>, "Signed")}
                                    {tableRow(<Code>1111</Code>, "NLE, G", "Not less than or equal to, Greater than", <Code>ZF == 0 &amp;&amp; SF == OF</Code>, "Signed")}
                                </tbody>
                            </HTMLTable>
                        </Scrollable>
                    </li>
                    <li>
                        <Code>w</Code> (wide):
                        Determines if an operation is on 8 bits of the default operand width.
                        This can have one of two values:
                        <Scrollable>
                            <HTMLTable small>
                                <thead>
                                    {tableHeaderRow(
                                        "Value",
                                        "Operand Size when Operand Size Attribute is 16 bits",
                                        "Operand Size when Operand Size Attribute is 32 bits"
                                    )}
                                </thead>
                                <tbody>
                                    {tableRow(
                                        <Code>0</Code>,
                                        "8 bits",
                                        "8 bits"
                                    )}
                                    {tableRow(
                                        <Code>1</Code>,
                                        "16 bits",
                                        "32 bits"
                                    )}
                                </tbody>
                            </HTMLTable>
                        </Scrollable>
                    </li>
                    <li>
                        <Code>xmmreg</Code> (vector register):
                        There are 32 vector registers (only eight are accessible in <A href="/mode/protected">Protected Mode</A>).
                        This field represents the three least significant bits of the register number.
                        {/* TODO: How are the other 24 accessed */}
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
                    This mimics how arrays are laid out in memory (index 0 is at a lower address than index n), however, a string of bits follows <A href="https://en.wikipedia.org/wiki/Positional_notation">positional notation</A> with the most significant bit (MSB) at the <em>left</em>.
                    Due to this, bit position slices use a &quot;high to low&quot; (&quot;end to start&quot;) order.
                </p>

                <H3 id="headingOperationMode">MODE</H3>
                <p>
                    The <Code>MODE</Code> global variable represents the current operating mode of the processor thread.
                    It can be one of: <Code>16</Code>, <Code>32</Code>, or <Code>64</Code>, each representing the &quot;bit width&quot; of the current mode.
                    However, it is only compared against <Code>64</Code> for instructions that are illegal in <A href="/mode/long">long (64 bit) mode</A>.
                </p>

                <H3 id="headingOperationProcessor">PROCESSOR</H3>
                <p>
                    In some <em>rare</em> cases, the operation of an instruction depends on which processor version is being used.
                    In those (known) instances, the <Code>PROCESSOR</Code> global variable represents the current processor.
                    For example, the <Instruction name="AAA" /> instruction operates <em>slightly</em> differently on the 80186 and prior.
                </p>

                <H3 id="headingOperationRegisters">Registers</H3>
                <p>
                    Registers are accessed as if they were global variables.
                    Any aliasing, and the zero extension to <Code>RrX</Code> when setting <Code>ErX</Code>, is handled implicitly.
                </p>

                <H3 id="headingOperationFlags">Flags</H3>
                <p>
                    Flags are accessed as if they were global variables.
                    For example, <Code>OF</Code> would refer to the <A href="/register/flags">overflow flag</A> (which is either a zero or a one).
                    These single bit values, when used in <Code>if</Code> conditions, are implicitly coerced to a boolean.
                    The only multibit flag, <Code>IOPL</Code>, is a two bit value and, as such, <em>cannot</em> be coerced.
                </p>

                <H3 id="headingOperationInstructionBits">Instruction Bits</H3>
                <p>
                    Instruction prefixes are exposed as pseudo global variables.
                    For example, <Code>EVEX.b</Code> refers to the <Code>b</Code> (broadcast) bit in the <Code>EVEX</Code> prefix for the currently executing instruction.
                </p>

                <H3 id="headingOperationTypes">Types</H3>
                <H4 id="headingOperationTypesNumerics">Integer Types</H4>
                <p>
                    Rust&apos;s integer types, by default, do not allow access to the individual bits through slices.
                    The only way to do so (without external crates) is through bit shifts and masking operations.
                    Despite that, individual bits are exposed through slices.
                    For example, to get the lowest three bits of an integer, one would normally do something similar to <Code>data &amp; 7</Code>, but the operations show that as <Code>data[2..=0]</Code>.
                </p>

                <H4 id="headingOperationTypesSimd">Simd&lt;T&gt;</H4>
                <p>
                    The most used type in the pseudo-code (besides integers) is the <Code>Simd&lt;T&gt;</Code> type.
                    It represents an <A href="/register/vector">x86 vector register</A>.
                    Currently, <Code>Simd::max()</Code> is <Code>512</Code> to correspond with the <Code>ZMM</Code> registers, but this will change if an &quot;AVX-768&quot; or &quot;AVX-1024&quot; were to be created.
                </p>
                <p>
                    The <Code>T</Code> generic is a numeric type (integer or floating point) that represents what the <Code>ZMM</Code> register contains.
                    For example, <Code>Simd&lt;f64&gt;</Code> (on a machine supporting AVX-512) represents a <Code>ZMM</Code> register containing eight &quot;double precision&quot; floating point (64 bit) numbers.
                </p>
                <p>
                    Operations on <Code>Simd&lt;T&gt;</Code> are at the &quot;bit level&quot;.
                    In other words, even though <Code>T</Code> represents the type of data, <Code>data[0]</Code> does <em>not</em> represent the first data value, but the first <em>bit</em>.
                    For example, to access the second data value in a <Code>Simd&lt;u32&gt;</Code>, <Code>data[63..=32]</Code> would be used.
                </p>

                <H4 id="headingOperationTypesKMask">KMask</H4>
                <p>
                    In addition to the <Code>Simd&lt;T&gt;</Code> type for vector instructions, there also exists the <Code>KMask</Code> type.
                    It represents an <A href="/register/mask">x86 mask register</A> (<Code>k0</Code> through <Code>k7</Code>).
                    {" "}<Code>KMask</Code> is a 64 bit wide bit addressable type.
                    Each bit corresponds to the same bit in the x86 mask register with <Code>k[n]</Code> referring to the &quot;n-th&quot; bit of the underlying mask register.
                </p>

                <H4 id="headingOperationTypesBound">Bound</H4>
                <p>
                    Intel MPX (Memory Protection Extensions) created four <A href="/register/bound">bounds registers</A> that can be used to check if a memory address is within a specified range.
                    These registers are represented with the <Code>Bound</Code> type.
                    The <Code>Bound</Code> type contains two accessible values: <Code>lower</Code> (the 64 bit lower bound) and <Code>upper</Code> (the 64 bit upper bound).
                </p>
                <p>
                    In addition to the bounds registers, there also exists three configuration and status registers: <Code>BNDCFGS</Code>, <Code>BNDCFGU</Code>, and <Code>BNDSTATUS</Code>.
                    Each of those three are 64 bits wide and are accessed as if they were global variables.
                </p>

                <H2 id="headingExamples">Examples</H2>
                <p>
                    The &quot;Examples&quot; section (if present) contains one or more example assembly snippets that demonstrate the instruction.
                    Any examples provided use <A href="https://nasm.us/">NASM</A> (Intel) syntax.
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
