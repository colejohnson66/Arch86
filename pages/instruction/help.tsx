/* =============================================================================
 * File:   help.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021 Cole Tobin
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

import A from "@components/A";
import Breadcrumb from "@components/Breadcrumb";
import Clear from "@components/Clear";
import Instruction from "@components/Instruction";
import Layout from "@components/Layout";
import Toc from "@components/Toc";

export default function Page(): React.ReactElement {
    return (
        <Layout.Root navGroup="instruction" pageTitle="Instruction Help">
            <Layout.Title title="Instruction Help" />
            <Breadcrumb.Root>
                <Breadcrumb.Item href="/instruction">Instructions</Breadcrumb.Item>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingOverviewTable" text="Overview Table">
                        <Toc.Entry href="#headingOverviewTableVector" text="Interpreting VEX, EVEX, and XOP Opcodes" />
                    </Toc.Entry>
                    <Toc.Entry href="#headingEncoding" text="Encoding">
                        <Toc.Entry href="#headingEncodingOperand" text="Interpreting the Operand Value" />
                    </Toc.Entry>
                    <Toc.Entry href="#headingDescription" text="Description" />
                    <Toc.Entry href="#headingOperation" text="Operation" />
                    <Toc.Entry href="#headingExamples" text="Example(s)" />
                    <Toc.Entry href="#headingFlags" text="Flags Affected" />
                    <Toc.Entry href="#headingIntrinsics" text="Intrinsics" />
                </Toc.Root>
                <p>
                    This page details many of the sections of instruction pages.
                </p>

                <Clear />

                <h2 id="headingOverviewTable">Overview Table</h2>
                <p>
                    The overview table lists all the various forms (opcodes) that an instruction can take, along with how they are encoded.
                    Each row of the table consists of the following items, in order:
                </p>
                <dl>
                    <dt>Opcode and Mnemonic</dt>
                    <dd>
                        A single opcode listing both the encoding and assembly form.
                        Italics in the mnemonic (bottom) part signify operands.
                        {" "}<A href="#headingOverviewTableVector">See below</A> for an explanation on interpreting vector (VEX, EVEX, and XOP prefixed) opcodes.
                        <br className="mb-2" />
                        Some vector opcodes (such as <Instruction name="ADDPD" />) require that certain &quot;legacy&quot; prefixes be present (or none at all in some cases, such as with <Instruction name="ADDPS" />).
                        In these cases, using the wrong prefixes will change how the instruction is decoded, and will result in a different opcode.
                        For example, prefixing an <Instruction name="ADDPS" noLink noTitle /> instruction with <code>0x66</code> will change it into an <Instruction name="ADDPD" noLink noTitle /> instruction.
                        <br className="mb-2" />
                        EVEX forms commonly feature other bits of information such as: an indication mask registers are allowed (with <code>{"{k1}"}</code>), error masking (with <code>{"{er}"}</code>), and more.
                    </dd>
                    <dt>Encoding</dt>
                    <dd>
                        A code that is a reference into the <A href="#headingEncoding">encoding table</A>.
                        That table indicates <em>where</em> in the instruction stream the operands are encoded.
                    </dd>
                    <dt>## bit Mode <span className="font-normal">(multiple)</span></dt>
                    <dd>
                        Whether a given instruction form (opcode) is valid, invalid, or non-encodable in the specified processor mode.
                        &quot;Valid&quot; forms are allowed whereas &quot;invalid&quot; forms will (usually) raise a <code>#UD</code> exception if encountered.
                        &quot;N/E&quot; (not encodable) forms are also invalid, but, because they also encode a different (valid) opcode, they will be decoded incorrectly.
                        <br className="mb-2" />
                        For example, in <A href="/mode/long">Long Mode</A> (64 bit mode), the byte range <code>0x40</code> through <code>0x4F</code> was repurposed for the REX prefix.
                        This makes encoding <code>INC eax</code> as <code>0x40</code> impossible.
                        Should the processor encounter what the author thinks is that line of assembly, it will instead treat it as a REX prefix will all four bits cleared.
                        Hence, it&apos;s not just invalid, it&apos;s <em>not encodable</em>.
                        <br className="mb-2" />
                        In the &quot;64 bit Mode&quot; column, there are two other possible values are: &quot;N/P&quot; (not prefixable) and &quot;N/S&quot; (not supported).
                        Non-prefixable opcodes are ones where the REX prefix has no effect.
                        Non-selectable opcodes are ones where an address size override prefix would be required, but, as such, would not be supported.
                    </dd>
                    <dt>CPUID Feature Flag(s) <span className="font-normal">(optional)</span></dt>
                    <dd>
                        If present, the specified CPUID &quot;feature flags&quot; <em>must</em> be present (i.e. set) in order to decode.
                        However, the existence of these flags does not imply the ability to execute an opcode;
                        Some CPU features must be enabled (through various control registers) before use.
                        If the flags are not present, or they are but are not enabled, the opcode will cause a <code>#UD</code> exception to be raised.
                    </dd>
                    <dt>Description</dt>
                    <dd>
                        A short description of what the specific opcode does.
                        For most instructions, the various cells will be almost carbon copies of each other, but with minor changes.
                    </dd>
                </dl>

                <h3 id="headingOverviewTableVector">Interpreting VEX, EVEX, and XOP Opcodes</h3>
                <p>
                    Vector prefixed opcodes (through a VEX, EVEX, or XOP prefix) are written differently than normal instructions.
                    This is because the vector prefixes are multiple (two through four) bytes long and encode quite a bit of information.
                    All three prefixes take the form of <code>{"{prefix}.{length}.{opmap}.{legacy}.{w}"}</code> with each field representing a specific field in the encoded prefix.
                    The other fields in the prefix (such as <code>vvvv</code>) are unspecified as they are dependent on the operands.
                    The various fields are:
                </p>
                <dl>
                    <dt>prefix</dt>
                    <dd>
                        The actual vector prefix that this opcode uses.
                        This can be one of: VEX, EVEX, or XOP.
                        In the case of VEX prefixes, the choice of the <code>0xC4</code> or <code>0xC5</code> form is not specified.
                    </dd>
                    <dt>length</dt>
                    <dd>
                        The length of the vectors this opcode operates on.
                        This is encoded in the <code>L</code> bit for VEX and XOP prefixes, and <code>L&apos;L</code> bits for EVEX prefixes.
                        This can be one of: 128 (for <code>XMM</code>), 256 (for <code>YMM</code>), 512 (for <code>ZMM</code>), or <code>LIG</code> (&quot;length ignored&quot;).
                        For BMI opcodes, this value will be specified explicitly - either as <code>L0</code> or <code>L1</code>.
                        <br className="mb-2" />
                        For <code>LIG</code> opcodes on EVEX prefixes, the bits may be repurposed for &quot;rounding control&quot;.
                    </dd>
                    <dt>opmap</dt>
                    <dd>
                        The implied (&quot;compressed&quot;) opcode map that is stored in the <code>mm</code> bits of the vector prefix.
                        For example, for VEX and EVEX prefixes, a value of <code>0F38</code> implies a two byte <code>0F 38</code> opmap prefix being encoded as <code>10b</code> in the <code>mm</code> bits.
                        In the case of XOP prefixes, this value is simply the hex encoding of the <code>mmmmm</code> bits;
                        They do not correspond to an implied opmap bytes.
                    </dd>
                    <dt>legacy</dt>
                    <dd>
                        The implied (&quot;compressed&quot;) legacy vector prefix that is stored in the <code>pp</code> bits of the vector prefix.
                        For the cases where this opcode (in legacy SSE form) doesn&apos;t have any prefixes (i.e. <code>NP</code>), this field will not be present, which indicates a value of <code>00b</code> in the <code>pp</code> bits.
                    </dd>
                    <dt>w</dt>
                    <dd>
                        The single <code>W</code> bit in the vector prefix.
                        This is commonly used as an extra bit to specify the opcode.
                        {" "}<code>WIG</code> (&quot;W ignored&quot;) means just that - the <code>W</code> bit is ignored.
                    </dd>
                </dl>

                <h2 id="headingEncoding">Encoding</h2>
                <p>
                    The &quot;Encoding&quot; table lists the encoding of the operands for the various opcodes in the overview table.
                    Each row of the table consists of the following items, in order:
                </p>
                <dl>
                    <dt>Encoding</dt>
                    <dd>
                        The name of the encoding this row is for.
                    </dd>
                    <dt>Tuple Type <span className="font-normal">(optional)</span></dt>
                    <dd>
                        The EVEX encoding&apos;s tuple form.
                        {/* TODO: explain what it is */}
                        This column is only present if an EVEX encoding for this instruction exists.
                        If present, any encoding that does not use an EVEX prefix will contain &quot;N/A&quot;.
                    </dd>
                    <dt>Operand(s)</dt>
                    <dd>
                        The actual location the operand is encoded in.
                        Instructions that contain a different number of operands depending on the mnemonic (for example, vector instructions with a legacy encoding) will contain &quot;N/A&quot; for disallowed operands.
                    </dd>
                </dl>

                <h3 id="headingEncodingOperand">Interpreting the Operand Value</h3>
                <p>
                    The operand value cell takes the form <code>source[rw]</code> which represents a data, <code>source</code> that is both read from and written to (<code>[rw]</code>).
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
                <dl>
                    <dt><code>address##</code></dt>
                    <dd>
                        An immediate value with <code>##</code> bits that represents a &quot;direct&quot; address in the linear address space.
                        If multiple values of <code>##</code> are allowed, they will be separated by a slash.
                    </dd>
                    <dt><code>AL/AX/EAX/RAX</code></dt>
                    <dd>
                        The accumulator register.
                        Which portion is used depends on the operand size of the opcode.
                    </dd>
                    <dt><code>DS:SI</code></dt>
                    <dl>
                        Memory addressed by the <code>DS:SI</code> register pair.
                        {" "}<code>DS:ESI</code> and <code>DS:RSI</code> may be used instead depending on the operand size attribute.
                    </dl>
                    <dt><code>ES:DI</code></dt>
                    <dl>
                        Memory addressed by the <code>ES:DI</code> register pair.
                        {" "}<code>ES:EDI</code> and <code>ES:RDI</code> may be used instead depending on the operand size attribute.
                    </dl>
                    <dt><code>EVEX.vvvvv</code></dt>
                    <dl>
                        The <code>vvvvv</code> bits of an EVEX prefix encode the register.
                        These bits are stored in <em>inverted</em> form.
                        For example, <code>ZMM26</code> would be stored as <code>00101b</code> (<code>11010b</code> inverted).
                    </dl>
                    <dt><code>FLAGS</code></dt>
                    <dl>
                        The <A href="/register/flags">FLAGS</A> register.
                    </dl>
                    <dt><code>imm##</code></dt>
                    <dd>
                        An immediate value with <code>##</code> bits.
                        If multiple values of <code>##</code> are allowed, they will be separated by a slash.
                    </dd>
                    <dt><code>imm8(7..4)</code></dt>
                    <dd>
                        The upper four bits (the high nibble) of an eight bit immediate encode the register.
                    </dd>
                    <dt><code>ModRM.reg</code></dt>
                    <dd>
                        The <code>reg</code> field of a ModR/M byte encodes the register.
                        The three bits can be extended up to five through any of these prefixes: REX, VEX, EVEX, or XOP.
                    </dd>
                    <dt><code>ModRM.r/m</code></dt>
                    <dd>
                        If the <code>mod</code> field of a ModR/M byte signifies register form (<code>11b</code>), the <code>r/m</code> field encodes the register.
                        If, however, the <code>mod</code> field signifies memory form (not <code>11b</code>), the address is calculated (possibly with an SIB byte and a displacement) and used instead.
                        The three bits can be extended up to five through any of these prefixes: REX, VEX, EVEX, or XOP.
                    </dd>
                    <dt><code>offset##</code></dt>
                    <dd>
                        An immediate value with <code>##</code> bits that represents an offset from the <em>following</em> instruction.
                        If multiple values of <code>##</code> are allowed, they will be separated by a slash.
                        <br className="mb-2" />
                        For example, an infinite loop (<code>a: JMP a</code>) would be encoded as <code>EB FE</code> where <code>FE</code> represents negative 2.
                        This would jump <em>backwards</em> two bytes to the <code>a</code> label and begin again.
                        In fact, a &quot;nop&quot; could be encoded as <code>EB 00</code> which would be a simple jump to the following instruction (zero bytes ahead).
                    </dd>
                    <dt><code>VEX.vvvv</code></dt>
                    <dd>
                        The <code>vvvv</code> bits of an VEX prefix encode the register.
                        These bits are stored in <em>inverted</em> form.
                        For example, <code>XMM12</code> would be stored as <code>0011b</code> (<code>1100b</code> inverted).
                    </dd>
                    <dt><code>XOP.vvvv</code></dt>
                    <dd>
                        The <code>vvvv</code> bits of an XOP prefix encode the register.
                        These bits are stored in <em>inverted</em> form.
                        For example, <code>XMM4</code> would be stored as <code>1011b</code> (<code>0100b</code> inverted).
                    </dd>
                </dl>

                <h2 id="headingDescription">Description</h2>
                <p>
                    The &quot;Description&quot; section, as the name implies, contains a simplified description of the instruction&apos;s operation.
                </p>

                <h2 id="headingOperation">Operation</h2>
                <p>
                    The &quot;Operation&quot; section is pseudo-code that uses C#-like syntax.
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
                    The &quot;Intrinsics&quot; section(s) (if present) contain C function definitions that can be used in one&apos;s code to utilize the instruction without inline assembly.
                </p>

                <h2 id="headingExceptions">Exceptions</h2>
                <p>
                    The &quot;Exceptions&quot; section contains a list of the possible exceptions that can be raised, along with the criteria for doing so.
                </p>
            </Layout.Content>
        </Layout.Root>
    );
}
