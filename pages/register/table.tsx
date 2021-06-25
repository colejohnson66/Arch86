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
import SyntaxHighlighter from "react-syntax-highlighter";
import SyntaxHighlighterDarkTheme from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import TOC from "../../components/TOC";
import WIP from "../../components/WIP";

export default function Page(): JSX.Element {
    const idtrLayout = [
        "idtr:",
        "  .limit: dw ?",
        "  .base:  dd ?",
    ].join("\n");

    const idtLayout32 = [
        "struct idt",
        "  offsetLow:  resw 1",
        "  selector:   resw 1",
        "  zero:       resb 1",
        "  flags:      resb 1",
        "  offsetHigh: resw 1",
        "endstruc",
    ].join("\n");

    return (
        <Layout canonical="/register/table" navGroup="register" src="/pages/register/table.tsx">
            <Title title="Table Registers" />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item href="/register">Registers</Breadcrumb.Item>
                    <Breadcrumb.Item>Table Registers</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
                    <TOC.Root>
                        <TOC.Entry href="#headingGDTR" text="Global Descriptor Table" />
                        <TOC.Entry href="#headingIDTR" text="Interrupt Descriptor Table">
                            <TOC.Entry href="#headingIDTR32" text="Protected Mode" />
                            <TOC.Entry href="#headingIDTR64" text="Long Mode" />
                            <TOC.Entry href="#headingIVT" text="Interrupt Vector Table" />
                        </TOC.Entry>
                        <TOC.Entry href="#headingLDTR" text="Local Descriptor Table" />
                    </TOC.Root>
                    <ContentCol>
                        <h1>Table Registers</h1>
                        <WIP page wording />
                        <p>
                            x86 has three main &quot;table&quot; registers: the Global Descriptor Table Register (<code>GDTR</code>), the Interrupt Descriptor Table Register (<code>IDTR</code>), and the Local Descriptor Table Register (<code>LDTR</code>).
                            The Global Descriptor Table contains information about the various memory segments, the Interrupt Descriptor Table contains execution vectors for interrupts, and the Local Descriptor Table contains information about the currently executing task&apos;s segments.
                            Despite their names, these registers do not contain the actual table&apos;s data, but only a pointer to the data in memory.
                        </p>

                        <h2 id="headingGDTR">Global Descriptor Table</h2>
                        <p>
                            The Global Descriptor Table is a table detailing the memory segments of running threads.
                            It is an array of the following 8 byte structure:
                        </p>

                        <h2 id="headingIDTR">Interrupt Descriptor Table</h2>
                        <p>
                            In <A href="/mode/protected">Protected</A> and <A href="/mode/long">Long Mode</A>, the Interrupt Descriptor Table details where the Interrupt Service Routines (ISR) are located.
                            It is the counterpart to <A href="/mode/real">Real Mode</A>&apos;s <A href="#headingIVT">Interrupt Vector Table</A> (IVT).
                        </p>
                        <p>
                            Due to the limitations of the Interrupt Vector Table, Intel created the Interrupt Descriptor Table.
                            The big difference between the Interrupt Descriptor Table and the Interrupt Vector Table is the ability for privilege restrictions on code that calls an interrupt;
                            This was previously not possible.
                        </p>
                        <p>
                            The <Instruction name="LIDT" /> instruction takes a pointer to a memory location containing the following data:
                        </p>
                        <SyntaxHighlighter lang="x86asm" style={SyntaxHighlighterDarkTheme}>
                            {idtrLayout}
                        </SyntaxHighlighter>
                        <p>
                            These six bytes are what will be stored in the <code>IDTR</code> register.
                            In this layout, <code>idtr.limit</code> is the <em>byte</em> count of the pointed to structure <em>minus one</em>.
                            {" "}<code>limit.base</code> is the 32 bit <em>linear</em> address of the structure.
                            A quirk of this design allows Interrupt Descriptor Tables containing more than 256 entries (8192 or 16384 bytes depending on mode) despite the fact that there are a maximum of 256 interrupts.
                        </p>
                        <p>
                            The layout of the referenced table depends on the current operating mode of the processor.
                        </p>

                        <h3 id="headingIDTR32">Protected Mode</h3>
                        <p>
                            In Protected Mode, the <code>IDTR</code> register references a table of eight byte entries of the following layout:
                        </p>
                        <SyntaxHighlighter lang="x86asm" style={SyntaxHighlighterDarkTheme}>
                            {idtLayout32}
                        </SyntaxHighlighter>
                        <p>
                            The fields of which are:
                        </p>
                        <ul>
                            <li>
                                <b>offsetLow</b> (16 bits):
                                The 16 least significant bits of the 32 bit linear offset of the vector.
                                These will be combined with <b>offsetHigh</b> to form the address.
                            </li>
                            <li>
                                <b>selector</b> (16 bits):
                                An index into either the Global Descriptor Table or the Local Descriptor Table.
                            </li>
                            <li>
                                <b>zero</b> (8 bits):
                                A reserved byte.
                                Must be set to zero.
                            </li>
                            <li>
                                <b>flags</b> (8 bits):
                                A flag byte containing the following entries (from least significant to most significant bit):
                                <ul>
                                    <li>
                                        <b>type</b> (bits 3 to 0):
                                        The type of gate this interrupt is.
                                        Valid values are:
                                        <ul>
                                            <li><code>0b0101</code> (0x5): 32 bit task gate</li>
                                            <li><code>0b0110</code> (0x6): 16 bit interrupt gate</li>
                                            <li><code>0b0111</code> (0x7): 16 bit trap gate</li>
                                            <li><code>0b1110</code> (0xE): 32 bit interrupt gate</li>
                                            <li><code>0b1111</code> (0xF): 32 bit trap gate</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>s</b> (bit 4):
                                        Storage segment.
                                        Clear for interrupt and trap gates, but set otherwise.
                                    </li>
                                    <li>
                                        <b>dpl</b> (bits 6 and 5):
                                        Descriptor Privilege Level.
                                        The current task&apos;s processor ring must be equal to or less than this to call this interrupt.
                                    </li>
                                    <li>
                                        <b>p</b> (bit 7):
                                        Present.
                                        Must be set for used (present) interrupts.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <b>offsetHigh</b> (16 bits):
                                The 16 most significant bits of the 32 bit linear offset of the vector.
                                These will be combined with <b>offsetLow</b> to form the address.
                            </li>
                        </ul>

                        <h3 id="headingIDTR64">Long Mode</h3>
                        TODO

                        <h3 id="headingIVT">Interrupt Vector Table</h3>
                        TODO

                        <h2 id="headingLDTR">Local Descriptor Table</h2>
                        TODO
                    </ContentCol>
                </Row>
            </Container>
        </Layout>
    );
}
