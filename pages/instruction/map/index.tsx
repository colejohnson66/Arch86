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

import { Breadcrumb, Container, ContentCol, Row } from "../../../components/Bootstrap";
import Layout, { Title } from "../../../components/Layout";

import A from "../../../components/A";
import Instruction from "../../../components/Instruction";
import React from "react";
import Ref from "../../../components/Ref";
import TOC from "../../../components/TOC";
import WIP from "../../../components/WIP";

export default function Page(): JSX.Element {
    return (
        <Layout canonical="/instruction/map" navGroup="instruction" src="/pages/instruction/map/index.tsx">
            <Title title="Opcode Map" />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item href="/instruction">Instructions</Breadcrumb.Item>
                    <Breadcrumb.Item>Opcode Map</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
                    <TOC.Root>
                        <TOC.Entry href="#headingUsing" text="Using the Tables" />
                        <TOC.Entry href="#headingKey" text="Key to Abbreviations">
                            <TOC.Entry href="#headingKeyAddressing" text="Operand Addressing Methods" />
                            <TOC.Entry href="#headingKeySize" text="Operand Size" />
                            <TOC.Entry href="#headingKeyRegister" text="Specific Register Access" />
                            <TOC.Entry href="#headingKeySuperscripts" text="Superscript Meaning" />
                        </TOC.Entry>
                        <TOC.Entry href="#headingDecode" text="Decoding an Instruction">
                            <TOC.Entry href="#headingDecode1" text="One Byte Instruction Example" />
                            <TOC.Entry href="#headingDecode2" text="Two Byte Instruction Example" />
                            <TOC.Entry href="#headingDecode3" text="Three Byte Instruction Example" />
                            <TOC.Entry href="#headingDecodeX87" text="x87 FPU Instruction Example" />
                            <TOC.Entry href="#headingDecodeVex" text="(E)VEX Prefixed Instruction Example" />
                        </TOC.Entry>
                        <TOC.Entry href="#headingTables" text="Links to Tables" />
                    </TOC.Root>
                    <ContentCol>
                        <h1>Opcode Map</h1>
                        <p>
                            As with almost all processors, instructions can be laid out into a table.
                            These tables can ease decoding unknown streams of instructions.
                        </p>

                        <h2 id="headingUsing">Using the Tables</h2>
                        <WIP section wording />
                        <p>
                            The tables <A href="#headingTables">linked to further down</A> are organized by their bits encoded in hex;
                            The lowest four bits determine the column, and the upper four determine the row.
                            For example, given the byte <code>0x90</code>, find the row corresponding to the upper four bits (the <code>9x</code> row), and move right to the column for the four three bits (the <code>0</code> column).
                            The cell located will either give instructions on what to do next (for example, <code>0x0F</code>/<code>0o017</code> in the one byte table), or tell you the specific opcode encoded by that byte.
                        </p>
                        <p>
                            Any blanks in the tables are reserved encodings and should not be used.
                            Similarly, any cells marked &quot; Reserved <code>NOP</code>&quot; are also reserved, but <em>may</em> behave as a <code>NOP</code> on certain processors.
                        </p>

                        <h2 id="headingKey">Key to Abbreviations</h2>
                        <p>
                            Operands are identified by a two or more character long code in the form of all uppercase characters followed by all lowercase characters.
                            The uppercase portion specifies an <A href="#headingKeyAddressing">addressing method</A> (i.e.where the operand is actually encoded).
                            The lowercase portion specifies the <A href="#headingKeySize">operand size</A>.
                            For example, the code <code>Rq</code> would specify that that specific operand <em>must</em> be a 64 bit (<code>q</code>) <A href="/register/gpr">general purpose register</A> encoded in the <code>r/m</code> field of the ModR/M byte (<code>R</code>).
                        </p>

                        <h3 id="headingKeyAddressing">Operand Addressing Methods</h3>
                        <p>
                            The addressing method of an operand determines where in the instruction an operand is encoded.
                        </p>
                        <dl className="row">
                            <dt className="col-sm-1"><code>A</code></dt>
                            <dd className="col-sm-11">
                                A direct address is encoded in the bytes following the instruction.
                                No ModR/M or SIB bytes are allowed.
                            </dd>
                            <dt className="col-sm-1"><code>B</code></dt>
                            <dd className="col-sm-11">
                                The <code>vvvv</code> field of the VEX (or EVEX) prefix selects a general purpose register.
                            </dd>
                            <dt className="col-sm-1"><code>C</code></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a control register.
                            </dd>
                            <dt className="col-sm-1"><code>D</code></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a debug register.
                            </dd>
                            <dt className="col-sm-1"><code>E</code></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects either a general purpose register or memory (depending on the <code>mod</code> field).
                            </dd>
                            <dt className="col-sm-1"><code>F</code></dt>
                            <dd className="col-sm-11">
                                An implicit encoding of the <code>FLAGS</code> register.
                            </dd>
                            <dt className="col-sm-1"><code>G</code></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a general purpose register.
                            </dd>
                            <dt className="col-sm-1"><code>H</code></dt>
                            <dd className="col-sm-11">
                                The <code>vvvv</code> field of the VEX (or EVEX) prefix selects a vector register.
                            </dd>
                            <dt className="col-sm-1"><code>I</code></dt>
                            <dd className="col-sm-11">
                                Immediate data encoded in the bytes following the instruction.
                            </dd>
                            <dt className="col-sm-1"><code>J</code></dt>
                            <dd className="col-sm-11">
                                The bytes following the instruction encode a relative offset to be added to the instruction pointer.
                                The computed address is the actual value used in the instruction.
                            </dd>
                            {/* No K */}
                            <dt className="col-sm-1"><code>L</code></dt>
                            <dd className="col-sm-11">
                                The upper nibble (the four upper bits) of an eight bit immediate selects a vector register.
                                In 32 bit mode, the most significant bit is ignored to enforce access only to the first eight registers.
                            </dd>
                            <dt className="col-sm-1"><code>M</code></dt>
                            <dd className="col-sm-11">
                                The ModR/M byte <em>must</em> refer to memory (i.e. the <code>mod</code> field cannot be <code>0b11</code>).
                            </dd>
                            <dt className="col-sm-1"><code>N</code></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects an MMX register.
                                The <code>mod</code> field <em>must not</em> refer to memory (i.e. it has to be <code>0b11</code>).
                            </dd>
                            <dt className="col-sm-1"><code>O</code></dt>
                            <dd className="col-sm-11">
                                The bytes following an instruction encode a relative offset to be added to the instruction pointer.
                                The computed address references data that will be used in the instruction.
                            </dd>
                            <dt className="col-sm-1"><code>P</code></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects an MMX register.
                            </dd>
                            <dt className="col-sm-1"><code>Q</code></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects either an MMX register or memory (depending on the <code>mod</code> field).
                            </dd>
                            <dt className="col-sm-1"><code>R</code></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects a general purpose register.
                                The <code>mod</code> field <em>must not</em> refer to memory (i.e. it has to be <code>0b11</code>).
                            </dd>
                            <dt className="col-sm-1"><code>S</code></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a segment register.
                            </dd>
                            {/* <dt className="col-sm-1"><code>T</code></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a test register.
                            </dd> */}
                            <dt className="col-sm-1"><code>U</code></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects a vector register.
                                The <code>mod</code> field <em>must not</em> refer to memory (i.e. it has to be <code>0b11</code>).
                            </dd>
                            <dt className="col-sm-1"><code>V</code></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a vector register.
                            </dd>
                            <dt className="col-sm-1"><code>W</code></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects either a vector register or memory (depending on the <code>mod</code> field).
                            </dd>
                            <dt className="col-sm-1"><code>X</code></dt>
                            <dd className="col-sm-11">
                                An implicit encoding of the memory referenced by the <code>DS:SI</code> (<code>DS:ESI</code> in 32 bit mode, and <code>DS:RSI</code> in 64 bit mode).
                            </dd>
                            <dt className="col-sm-1"><code>Y</code></dt>
                            <dd className="col-sm-11">
                                An implicit encoding of the memory referenced by the <code>ES:DI</code> (<code>ES:EDI</code> in 32 bit mode, and <code>ES:RDI</code> in 64 bit mode).
                            </dd>
                            <dt className="col-sm-1"><code>Z</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The lowest three bits of the opcode select a general purpose register.
                            </dd>
                            <dt className="col-sm-1"><code>BE</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects either a bounds register or memory (depending on the <code>mod</code> field).
                            </dd>
                            <dt className="col-sm-1"><code>BG</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a bounds register.
                            </dd>
                            <dt className="col-sm-1"><code>KE</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects either a mask register or memory (depending on the <code>mod</code> field).
                            </dd>
                            <dt className="col-sm-1"><code>KG</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a mask register.
                            </dd>
                            <dt className="col-sm-1"><code>KR</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects a mask register.
                                The <code>mod</code> field <em>must not</em> refer to memory (i.e. it has to be <code>0b11</code>).
                            </dd>
                            <dt className="col-sm-1"><code>TG</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The <code>reg</code> field of the ModR/M byte selects a tile register.
                            </dd>
                            <dt className="col-sm-1"><code>TH</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The <code>vvvv</code> field of the VEX (or EVEX) prefix selects a tile register.
                            </dd>
                            <dt className="col-sm-1"><code>TR</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                The <code>r/m</code> field of the ModR/M byte selects a tile register.
                                The <code>mod</code> field <em>must not</em> refer to memory (i.e. it has to be <code>0b11</code>).
                            </dd>
                        </dl>
                        {/* <p>
                            The whole list above can be summarized with the table below.
                            The columns signify which field the operand is encoded with, and the rows signify <em>what</em> (such as segment, vector, etc.).
                        </p>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <td />
                                    <th>ModR/M.reg</th>
                                    <th>ModR/M.r/m</th>
                                    <th>(E)VEX.vvvv</th>
                                    <th>Immediate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>GPR</th>
                                    <td><code>G</code></td>
                                    <td>
                                        <code>E</code> (memory allowed)
                                        <br />
                                        <code>R</code> (memory disallowed)
                                    </td>
                                    <td><code>B</code></td>
                                    <td />
                                </tr>
                            </tbody>
                        </Table> */}

                        <h3 id="headingKeySize">Operand Size</h3>
                        <dl className="row">
                            <dt className="col-sm-1"><code>a</code></dt>
                            <dd className="col-sm-11">
                                Two one-word or two doubleword operands (depending on the operand size attribute)
                            </dd>
                            <dt className="col-sm-1"><code>b</code></dt>
                            <dd className="col-sm-11">
                                A byte (eight bits).
                            </dd>
                            <dt className="col-sm-1"><code>c</code></dt>
                            <dd className="col-sm-11">
                                Either a byte or a word (depending on the operand size attribute).
                            </dd>
                            <dt className="col-sm-1"><code>d</code></dt>
                            <dd className="col-sm-11">
                                A doubleword (32 bits).
                            </dd>
                            <dt className="col-sm-1"><code>dq</code></dt>
                            <dd className="col-sm-11">
                                A doublequadword (128 bits).
                            </dd>
                            <dt className="col-sm-1"><code>dqq</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                A doublequadquadword (512 bits).
                            </dd>
                            <dt className="col-sm-1"><code>p</code></dt>
                            <dd className="col-sm-11">
                                A 32, 48, or 80 bit pointer (depending on the operand size attribute).
                                In other words, a 16 bit selector and a 16, 32, or 64 bit address.
                            </dd>
                            <dt className="col-sm-1"><code>pi</code></dt>
                            <dd className="col-sm-11">
                                A quadword MMX register
                            </dd>
                            <dt className="col-sm-1"><code>pv</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                A packed 128, 256, or 512 bit vector register (depending on the operand size attribute).
                            </dd>
                            <dt className="col-sm-1"><code>q</code></dt>
                            <dd className="col-sm-11">
                                A quadword (64 bits).
                            </dd>
                            <dt className="col-sm-1"><code>qq</code></dt>
                            <dd className="col-sm-11">
                                A quadquadword (256 bits).
                            </dd>
                            <dt className="col-sm-1"><code>qqq</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                A quadquadquadword (512 bits).
                            </dd>
                            <dt className="col-sm-1"><code>s</code></dt>
                            <dd className="col-sm-11">
                                A 32, 48, or 80 bit pseudo-descriptor (depending on the operand size attribute).
                                In other words, a 16 bit selector and a 16, 32, or 64 bit address.
                            </dd>
                            <dt className="col-sm-1"><code>sv</code><Ref.Link name="custom" /></dt>
                            <dd className="col-sm-11">
                                A scalar element from a vector register.
                                How many bits depends on the operand size.
                            </dd>
                            <dt className="col-sm-1"><code>v</code></dt>
                            <dd className="col-sm-11">
                                In 16 and 32 bit operand size: A word or doubleword (depending on the operand size attribute).
                                In 64 bit operand size: A quadword.
                            </dd>
                            <dt className="col-sm-1"><code>w</code></dt>
                            <dd className="col-sm-11">
                                A word (16 bits).
                            </dd>
                            <dt className="col-sm-1"><code>x</code></dt>
                            <dd className="col-sm-11">
                                A doublequadword or quadquadword (depending on the operand size attribute).
                            </dd>
                            <dt className="col-sm-1"><code>y</code></dt>
                            <dd className="col-sm-11">
                                A doubleword or quadword (depending on the operand size attribute).
                            </dd>
                            <dt className="col-sm-1"><code>z</code></dt>
                            <dd className="col-sm-11">
                                In 16 bit operand size: A word.
                                In 32 or 64 bit operand size: A doubleword.
                            </dd>
                        </dl>

                        <h3 id="headingKeyRegister">Specific Register Access</h3>
                        <p>
                            Sometimes, an opcode mandates a specific register as an operand.
                            For example, some arithmetic instructions have shorter encodings if the accumulator (<code>AX</code>/<code>EAX</code>/<code>RAX</code>) is used.
                            When this is the case, the table will call out the specific register by name.
                        </p>

                        <h3 id="headingKeySuperscripts">Superscript Meaning</h3>
                        <p>
                            Sometimes, instructions have specific requirements for their encoding to be valid.
                            For example, in 16 and 32 bit mode, opcodes in the <code>0x4x</code> (<code>0x40/0o100</code> through <code>0x4F/0o117</code>) encode single byte <Instruction name="INC" /> and <Instruction name="DEC" /> instructions.
                            In 64 bit mode, these bytes are repurposed for the REX prefix.
                            To denote this discrepency, the superscript <code>i64</code> is used.
                            A full list of superscripts that are used is below.
                        </p>
                        <dl className="row">
                            <dt className="col-sm-1"><code>i64</code></dt>
                            <dd className="col-sm-11">
                                This instruction is not encodable in 64 bit mode.
                            </dd>
                            <dt className="col-sm-1"><code>o64</code></dt>
                            <dd className="col-sm-11">
                                This instruction is only available in 64 bit mode.
                            </dd>
                            <dt className="col-sm-1"><code>d64</code></dt>
                            <dd className="col-sm-11">
                                When in 64 bit mode, this instruction defaults to an unchangeable 64 bit operand size attribute.
                            </dd>
                            <dt className="col-sm-1"><code>f64</code></dt>
                            <dd className="col-sm-11">
                                When in 64 bit mode, this instruction defaults to an unchangeable 64 bit operand size attribute.
                                The operand size override prefix, if present, will be ignored.
                            </dd>
                            <dt className="col-sm-1"><code>v</code></dt>
                            <dd className="col-sm-11">
                                No legacy SSE form of this instruction exists;
                                It must be encoded using a VEX (or EVEX) prefix.
                            </dd>
                            <dt className="col-sm-1"><code>v128</code></dt>
                            <dd className="col-sm-11">
                                Only legacy SSE and VEX.128 (or EVEX.128) forms of this instruction are valid.
                                The VEX.256 (or EVEX.256 or EVEX.512) form is invalid.
                            </dd>
                        </dl>

                        <h2 id="headingDecode">Decoding an Instruction</h2>
                        <WIP section />

                        <h3 id="headingDecode1">One Byte Instruction Example</h3>
                        <WIP section />

                        <h3 id="headingDecode2">Two Byte Instruction Example</h3>
                        <WIP section />

                        <h3 id="headingDecode3">Three Byte Instruction Example</h3>
                        <WIP section />

                        <h3 id="headingDecodeX87">x87 FPU Instruction Example</h3>
                        <WIP section />

                        <h3 id="headingDecodeVex">(E)VEX Prefixed Instruction Example</h3>
                        <WIP section />

                        <h2 id="headingTables">Links to Tables</h2>
                        <ul>
                            <li><A href="/instruction/map/oneByte">One Byte Opcode Map</A></li>
                            <li><A href="/instruction/map/twoByte">Two Byte Opcode Map</A></li>
                            <li><A href="/instruction/map/threeByte0F38">Three Byte (<code>0F 38</code>) Opcode Map</A></li>
                            <li><A href="/instruction/map/threeByte0F3A">Three Byte (<code>0F 3A</code>) Opcode Map</A></li>
                            <li><A href="/instruction/map/x87">x87 FPU (<code>ESC</code>) Opcode Map</A></li>
                            <li><A href="/instruction/map/vex">VEX Opcode Map</A></li>
                            <li><A href="/instruction/map/evex">EVEX Opcode Map</A></li>
                        </ul>
                    </ContentCol>
                </Row>
            </Container>
        </Layout>
    );
}
