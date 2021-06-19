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
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import Layout, { Title } from "../../components/Layout";

import A from "../../components/A";
import Cite from "../../components/Cite";
import LayoutConstants from "../../constants/Layout";
import React from "react";
import Ref from "../../components/Ref";
import TOC from "../../components/TOC";

export default function Page(): JSX.Element {
    return (
        <Layout canonical="/register/flags" navGroup="register" src="/pages/register/flags.tsx">
            <Title title="Flags Register" />
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item href="/register">Registers</Breadcrumb.Item>
                    <Breadcrumb.Item active>Flags Registers</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <TOC.Root>
                        <TOC.Entry href="#headingList" text="List of Fields">
                            <TOC.Entry href="#headingVKFlags" text="V and K Flags" />
                        </TOC.Entry>
                        <TOC.Entry href="#headingReferences" text="References" />
                    </TOC.Root>
                    <Col {...LayoutConstants.content}>
                        <h1>Flags Register</h1>
                        <p>
                            The flags register (<code>RFLAGS</code>) is a 64 bit bitfield register.
                            It contains a few bits of information that is designed to be accessible by any program, but not necessarily writable.
                        </p>
                        <p>
                            It is accessible through three overlapping &quot;registers&quot;: <code>FLAGS</code> for the lower 16 bits, <code>EFLAGS</code> for the lower 32, and <code>RFLAGS</code> for all 64.
                            Despite the fact that only bits 0 through 21 are defined, <code>RFLAGS</code> exists for consistency with the rest of the x86-64 register set.
                        </p>

                        <h2 id="headingList">List of Fields</h2>
                        <p>
                            In ascending order (least significant to most significant bit), the register contains the following bits of information:
                        </p>
                        <dl>
                            <dt><code>CF</code> - Carry Flag (bit 0)</dt>
                            <dd>
                                Indicates if an arithmetic operation generated a carry or borrow out of the most significant bit of the result.
                                It indicates an overflow or underflow for unsigned arithmetic.
                            </dd>
                            <dt><code>VF</code> - &quot;V&quot; Flag (bit 1)</dt>
                            <dd>
                                Reserved.
                                Always set.
                                <br />
                                <A href="#headingVKFlags">See below</A>.
                            </dd>
                            <dt><code>PF</code> - Parity Flag (bit 2)</dt>
                            <dd>
                                Indicates if the least significant byte of a result contains an even number of 1s (meaning there is parity), and cleared otherwise.
                                As its name implies, it is used for operations involving parity (such as data transmission).
                                For those situations, there exists two instructions: <A href="/instruction/jcc"><code>JP/JPE</code> - Jump If Parity (Even)</A> and <A href="/instruction/jcc"><code>JNP/JPO</code> - Jump If No Parity (Odd)</A>.
                                <br />
                                It is obsolete, but continues to exist for compatibility reasons.
                            </dd>
                            <dt>(bit 3)</dt>
                            <dd>
                                Reserved.
                                Always cleared.
                            </dd>
                            <dt><code>AF</code> - Auxiliary Cary Flag (bit 4)</dt>
                            <dd>
                                Sometimes referred to as the &quot;Half Carry Flag&quot; it is similar to the carry flag (bit 0), but always operates on overflow or underflow involving bit 3 of the result.
                                The purpose of this flag is for BCD instructions such as the <A href="/instruction/aaa"><code>AAA</code> - ASCII Adjust After Addition</A> instruction.
                                <br />
                                It is obsolete, but continues to exist for compatibility reasons.
                            </dd>
                            <dt><code>KF</code> - &quot;K&quot; Flag (bit 5)</dt>
                            <dd>
                                Reserved.
                                Always cleared.
                                <br />
                                <A href="#headingVKFlags">See below</A>.
                            </dd>
                            <dt><code>ZF</code> - Zero Flag (bit 6)</dt>
                            <dd>
                                As the name implies, this flag is set if the result is zero, and cleared otherwise.
                            </dd>
                            <dt><code>SF</code> - Sign Flag (bit 7)</dt>
                            <dd>
                                As the name implies, this flag is set to the most significant bit (the sign bit) of the result.
                            </dd>
                            <dt><code>TF</code> - Trap Flag (bit 8)</dt>
                            <dd>
                                Enables single-step debugging of a thread.
                            </dd>
                            <dt><code>IF</code> - Interrupt Enable Flag (bit 9)</dt>
                            <dd>
                                Controls whether the processor should respond to maskable interrupts or not.
                                It does <em>not</em> inhibit non-maskable interrupts.
                            </dd>
                            <dt><code>DF</code> - Direction Flag (bit 10)</dt>
                            <dd>
                                Controls the &quot;direction&quot; of string instructions.
                                When set, the instructions will decrement (process from high to low addressed), and when cleared, they will increment (low to high).
                            </dd>
                            <dt><code>OF</code> - Overflow Flag (bit 11)</dt>
                            <dd>
                                Indicates if an arithmetic operation generated a carry or borrow out of the <em>second</em> most significant bit of the result.
                                It indicates an overflow or underflow for signed arithmetic.
                            </dd>
                            <dt><code>IOPL</code> - I/O Privilege Level (bits 12 and 13)</dt>
                            <dd>
                                Indicates the <A href="https://en.wikipedia.org/wiki/Protection_ring">processor ring</A> of a thread.
                                A zero indicates the most privilege, while a three indicates the least.
                                <br />
                                On the 8086 and 80186, bit 12 is always set, and bit 13 is always cleared.
                            </dd>
                            <dt><code>NT</code> - Nested Task (bit 14)</dt>
                            <dd>
                                Controls if the current thread is linked to a previously executed thread.
                                <br />
                                On the 8086 and 80186, this is always set.
                            </dd>
                            <dt>(bit 15)</dt>
                            <dd>
                                Reserved.
                                <br />
                                On the 8086 and 80186, this is always set.
                                Later models have this always cleared.
                            </dd>
                            <dt><code>RF</code> - Resume Flag (bit 16)</dt>
                            <dd>
                                Controls whether the processor responds to debug exceptions.
                            </dd>
                            <dt><code>VM</code> - Virtual-8086 Mode (bit 17)</dt>
                            <dd>
                                Controls whether the processor is in Virtual-8086 mode (inside of Protected Mode).
                            </dd>
                            <dt><code>AC</code> - Alignment Check / Access Control (bit 18)</dt>
                            <dd>
                                A user-controllable flag that can mask the <code>AM</code> bit in the <A href="/register/control/cr0"><code>CR0</code> register</A>.
                                These flags (if both set) force alignment checking on data in memory.
                            </dd>
                            <dt><code>VIF</code> - Virtual Interrupt Flag (bit 19)</dt>
                            <dd>TODO</dd>
                            <dt><code>VIP</code> - Virtual Interrupt Pending (bit 20)</dt>
                            <dd>TODO</dd>
                            <dt><code>ID</code> - ID Flag (bit 21)</dt>
                            <dd>
                                Provides a method of checking for support of the <A href="/instruction/cpuid"><code>CPUID</code></A> instruction.
                                On the 80486 and older processors, attempts to set this bit will fail as the processor will just clear it.
                                However, Pentium (and newer) processors (which support <code>CPUID</code>) will allow writing to this bit.
                                <br />
                                Therefore, support for the <code>CPUID</code> instruction can be checked by setting this bit, storing it in the flags register, then rereading that register again.
                                If this bit is still set, the CPU supports <code>CPUID</code>.
                                If the bit is cleared when read back, the processor is an 80486 or older, and other methods must be used to determine which processor is running (and therefore, which features are available).
                            </dd>
                            <dt>(bits 22 and up)</dt>
                            <dd>
                                Reserved.
                                Always cleared.
                            </dd>
                            <style jsx>{`
                        dd {
                            margin-bottom: 8px;
                        }
                        br {
                            margin-bottom: 2px;
                        }
                    `}</style>
                        </dl>

                        <h3 id="headingVKFlags">V and K Flags</h3>
                        <p>
                            On the 8085 (the predecessor to the <A href="/architecture/8086">8086</A>), there exists an 8 bit flag register.
                            It is the basis for the x86 flags register of today, and, short of two changes, was the same as the lowest 8 bits of x86&apos;s <code>FLAGS</code> register.
                            Those two changes are: the undocumented &quot;V&quot; and the &quot;K&quot; flags.<Ref.Link name="VKFlags" />{" "}
                            These reside in bits 1 and 5, respectively.
                        </p>
                        <p>
                            The V flag resides in bit 1 of the flag register and simply indicated a signed overflow or underflow.
                        </p>
                        <blockquote className="blockquote">
                            The V flag is simply the exclusive-or of the carry into the top bit and the carry out of the top bit.
                            This is a standard formula for computing overflow for signed addition and subtraction.
                            <Ref.Link name="VKFlags" />
                        </blockquote>
                        <p>
                            The K flag resides in bit 5 of the flag register and stores the result of exclusive ORing (XOR) the V flag with the most significant bit of the result.
                        </p>
                        <blockquote className="blockquote">
                            One mystery was the purpose of the K flag: &quot;It does not resemble any normal flag bit.&quot;
                            Its use for increment and decrement is clear, but for arithmetic operations why would you want the exclusive-or of the overflow and sign?
                            It turns out the the K flag is useful for signed comparisons.
                            If you&apos;re comparing two signed values, the first is smaller if the exclusive-or of the sign and overflow is 1.
                            This is exactly what the K flag computes.
                            <Ref.Link name="VKFlags" />
                        </blockquote>
                        <p>
                            These bits were removed with the introduction of the 8086 and defined to be a 1 for the V flag (bit 1) and a 0 for the K flag (bit 5).
                            To this day, these fixed values have stayed, and attempts to change them, or any other reserved bits, is undefined.
                        </p>

                        <Ref.Root>
                            <Ref.Entry name="VKFlags">
                                <Cite.Web
                                    author="Shirriff, Ken"
                                    date="2013-02"
                                    url="http://www.righto.com/2013/02/looking-at-silicon-to-understanding.html"
                                    title="Silicon reverse engineering: The 8085's undocumented flags"
                                    website="Ken Shirriff's Blog"
                                    accessDate="2021-02-07"
                                    archiveUrl="https://web.archive.org/web/20210207185009/http://www.righto.com/2013/02/looking-at-silicon-to-understanding.html"
                                    archiveDate="2021-02-07" />
                            </Ref.Entry>
                        </Ref.Root>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
