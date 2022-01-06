/* =============================================================================
 * File:   index.tsx
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
import Layout from "@components/Layout";
import Toc from "@components/Toc";
import Unit from "@components/Unit";

export default function Page(): React.ReactElement {
    return (
        <Layout.Root navGroup="register" pageTitle="Registers">
            <Layout.Title title="Registers" />
            <Breadcrumb.Root>
                <Breadcrumb.Item>Registers</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingTypes" text="Register Types" />
                </Toc.Root>
                <p>
                    The x86 (and x86-64) architecture contains many different types of registers.
                    These range in size from a dozen or so bits, all the way to <Unit value={1024} unit="byte" /> <A href="/register/tile">&quot;tiles&quot;</A> with <A href="/extension/amx">AMX</A>.
                </p>

                <h2 id="headingTypes">Register Types</h2>
                <p>
                    This is a list of the various types of registers in the x86 architecture.
                    Any configuration registers are listed with the group that they are associated with.
                    For example, <code>MXCSR</code> is used with vector instructions, and would therefore be listed with the other vector registers.
                </p>
                <ul>
                    <li><A href="/register/gpr">General purpose registers</A> (<code>EAX</code>, <code>EBX</code>, etc.)</li>
                    <li><A href="/register/flags">Flags register</A> (<code>EFLAGS</code>)</li>
                    <li><A href="/register/segment">Segment registers</A> (<code>CS</code>, <code>DS</code>, etc.)</li>
                    <li><A href="/register/control">Control registers</A> (<code>CR0</code>, <code>CR2</code>, etc.)</li>
                    <li><A href="/register/debug">Debug registers</A> (<code>DR0</code>, <code>DR1</code>, etc.)</li>
                    <li><A href="/register/test">Test registers</A> (<code>TR6</code>, <code>TR7</code>, etc.)</li>
                    <li><A href="/register/fpu">Floating point registers</A> (<code>ST(0)</code>, <code>ST(1)</code>, etc.)</li>
                    <li><A href="/register/table">Table registers</A> (<code>GDTR</code>, <code>IDTR</code>, etc.)</li>
                    <li><A href="/register/mmx">Multimedia Extension registers</A> (<code>MM0</code>, <code>MM1</code>, etc.)</li>
                    <li><A href="/register/vector">Vector (and mask) registers</A> (<code>XMM0</code>, <code>K0</code>, etc.)</li>
                    <li><A href="/register/bound">Bound registers</A> (<code>BND0</code>, <code>BND1</code>, etc.)</li>
                    <li><A href="/register/tile">Tile registers</A> (<code>TMM0</code>, <code>TMM1</code>, etc.)</li>
                    <li><A href="/register/msr">Model specific registers</A></li>
                </ul>
            </Layout.Content>
        </Layout.Root>
    );
}
