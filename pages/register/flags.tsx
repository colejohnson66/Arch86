/* =============================================================================
 * File:   flags.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021-2022 Cole Tobin
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
import Cite from "@components/Cite";
import Clear from "@components/Clear";
import Instruction from "@components/Instruction";
import Layout from "@components/Layout";
import Ref from "@components/Ref";
import Toc from "@components/Toc";

export default function Page(): React.ReactElement {
    return (
        <Layout.Root navGroup="register" pageTitle="Flags Register">
            <Layout.Title title="Flags Register" />
            <Breadcrumb.Root>
                <Breadcrumb.Item href="/register">Registers</Breadcrumb.Item>
                <Breadcrumb.Item>Flags Register</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingList" text="List of Fields" />
                    <Toc.Entry href="#headingReferences" text="References" />
                </Toc.Root>
                <p>
                    The flags register (<code>RFLAGS</code>) is a 64 bit bitfield register, of which the first 21 are defined.
                    It contains a few bits of information that are accessible to any running program, but not all of them are writeable.
                </p>
                <p>
                    This register is accessible through three overlapping &quot;registers&quot;: <code>FLAGS</code> for the lowest 16 bits, <code>EFLAGS</code> for the lower 32, and <code>RFLAGS</code> for the whole register.
                    Despite the fact that only bits 0 through 21 are defined, <code>RFLAGS</code> exists for consistency with the rest of the x86-64 <A href="/register/gpr">general purpose register</A> set.
                </p>

                <Clear />

                <h2 id="headingList">List of Fields</h2>
                <p>
                    In ascending order (least significant bit to most significant), <code>RFLAGS</code> contains the following bits of information:
                </p>
                <dl>
                    <dt><code>CF</code> - Carry Flag (bit 0)</dt>
                    <dd>
                        Indicates if an arithmetic operation generated a carry out of (or borrowed into) the most significant bit of the result.
                        It signals an overflow or underflow for <em>unsigned</em> arithmetic.
                        <br />
                        Some other (non-arithmetic) instructions overload this bit for various results.
                    </dd>
                    <dt><code>VF</code> - &quot;V&quot; Flag (bit 1)</dt>
                    <dd>
                        Reserved.
                        Always set.
                        <br />
                        Historically, this <em>undocumented</em> flag signaled an overflow or underflow for 8 bit signed arithmetic.
                        <Ref.Link name="vkFlags" />
                    </dd>
                    <dt><code>PF</code> - Parity Flag (bit 2)</dt>
                    <dd>
                        Indicates if the least significant byte of a result contains an even number of set (&quot;1&quot;) bits (indicating even parity), and cleared otherwise.
                        Due to the result only being based on the least significant byte, it is considered obsolete and does not have much usage today.
                        However, in situations where it is used, there exists two &quot;jump&quot; instructions: <A href="/instruction/jcc"><code>JP/JPE</code> - Jump If Parity (Even)</A> and <A href="/instruction/jcc"><code>JNP/JPO</code> - Jump If No Parity (Odd)</A>.
                        {/* TODO: use <Instruction /> */}
                        <br />
                        Some other (non-arithmetic) instructions overload this bit for various results.
                    </dd>
                    <dt>(bit 3)</dt>
                    <dd>
                        Reserved.
                        Always cleared.
                    </dd>
                    <dt><code>AF</code> - Auxiliary Carry Flag (bit 4)</dt>
                    <dd>
                        Sometimes referred to as the &quot;Half Carry Flag&quot;, it is similar to the carry flag (bit 0), but always operating on overflow or underflow with bit 3 of the result.
                        This obsolete flag is used for the obsolete BCD instructions such as <Instruction name="AAA" />.
                        <br />
                        Some other (non-arithmetic) instructions overload this bit for various results.
                    </dd>
                    <dt><code>KF</code> - &quot;K&quot; Flag (bit 5)</dt>
                    <dd>
                        Reserved.
                        Always cleared.
                        <br />
                        Historically, this <em>undocumented</em> flag would signal that the first value of a signed comparison is smaller than the second.
                        <Ref.Link name="vkFlags" />
                    </dd>
                    <dt><code>ZF</code> - Zero Flag (bit 6)</dt>
                    <dd>
                        As the name imples, this flag is set if the result of an arithmetic operation is zero, and cleared otherwise.
                        <br />
                        Some other (non-arithmetic) instructions overload this bit for various results.
                    </dd>
                    <dt><code>SF</code> - Sign Flag (bit 7)</dt>
                    <dd>
                        As the name imples, this flag is set if the most significant bit of an arithmetic operation is set, and cleared otherwise.
                        <br />
                        Some other (non-arithmetic) instructions overload this bit for various results.
                    </dd>
                    <dt><code>TF</code> - Trap Flag (bit 8)</dt>
                    <dd>
                        When set, single-step debugging of the executing thread is enabled.
                    </dd>
                    <dt><code>IF</code> - Interrupt Enable Flag (bit 9)</dt>
                    <dd>
                        When set, the processor will ignore maskable interrupts.
                        Non-maskable interrupts are uninhibited by this flag, and will execute regardless.
                    </dd>
                    <dt><code>DF</code> - Direction Flag (bit 10)</dt>
                    <dd>
                        Controls the direction of string instructions.
                        When set, the instructions will operate by decrementing the address each iteration (for processing from high to low address).
                        When cleared, they will operate by incrementing it (from low to high address).
                    </dd>
                    <dt><code>OF</code> - Overflow Flag (bit 11)</dt>
                    <dd>
                        Similar to the carry flag (bit 0), except that this flag indicates an overflow out of (or borrow into) the <em>second</em> most significant bit of the result.
                        It signals an overflow or underflow for <em>signed</em> arithmetic.
                        <br />
                        Some other (non-arithmetic) instructions overload this bit for various results.
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
                        Indicates if the current thread is linked to a previously executed thread.
                        <br />
                        On the 8086 and 80186, this is always set.
                    </dd>
                    <dt>(bit 15)</dt>
                    <dd>
                        Reserved.
                        Always cleared.
                        <br />
                        On the 8086 and 80186, this is, instead, always set.
                    </dd>
                    <dt><code>RF</code> - Resume Flag (bit 16)</dt>
                    <dd>
                        Controls if the processor will respond to debug exceptions.
                    </dd>
                    <dt><code>VM</code> - Virtual-8086 Mode (bit 17)</dt>
                    <dd>
                        Controls if the processor is in Virtual-8086 mode (inside of Protected Mode).
                    </dd>
                    <dt><code>AC</code> - Alignment Check / Access Control Flag (bit 18)</dt>
                    <dd>
                        A user-controllable flag that can mask the <code>AM</code> bit in the <A href="/register/control/cr0"><code>CR0</code> register</A>.
                        If both of these flags are set, alignment checking is enforced on all memory accesses.
                    </dd>
                    <dt><code>VIF</code> - Virtual Interrupt Flag (bit 19)</dt>
                    <dd>TODO</dd>
                    <dt><code>VIP</code> - Virtual Interrupt Pending (bit 20)</dt>
                    <dd>TODO</dd>
                    <dt><code>ID</code> - &quot;ID&quot; Flag (bit 21)</dt>
                    <dd>
                        Provides a method of checking for support of the <Instruction name="CPUID" /> instruction.
                        On the 80486 and older processors, attempts to set this bit will be unsuccessful as the processor will clear it upon load into the register.
                        However, Pentium (and newer) processors (which support <Instruction name="CPUID" noTitle />) will allow setting and clearing this bit.
                    </dd>
                    <dt>(bits 22 and up)</dt>
                    <dd>
                        Reserved.
                        Always cleared.
                    </dd>
                </dl>

                <Ref.Root>
                    <Ref.Entry name="vkFlags">
                        <Cite.Web
                            title="Silicon reverse engineering: The 8085's undocumented flags"
                            date="2013-02"
                            author="Ken Shirriff"
                            website="Ken Shirriff's Blog"
                            url="http://www.righto.com/2013/02/looking-at-silicon-to-understanding.html"
                            accessDate="2022-01-09" />
                    </Ref.Entry>
                </Ref.Root>
            </Layout.Content>
        </Layout.Root>
    );
}
