/* =============================================================================
 * File:   page.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2023 Cole Tobin
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
"use client";

import A from "@/components/A";
import Breadcrumbs from "@/components/Breadcrumbs";
import Clear from "@/components/Clear";
import Exception from "@/components/Exception";
import Instruction from "@/components/Instruction";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import Toc from "@/components/Toc";

export const metadata: Metadata = {
    alternates: { canonical: "https://arch86.com/register/control" },
    title: "Control Registers",
};

export default function Page(): React.ReactElement {
    return <>
        <Layout.Header>Control Registers</Layout.Header>
        <Layout.Body>
            <Breadcrumbs>
                <li><A href="/register">Registers</A></li>
                <li>Control Registers</li>
            </Breadcrumbs>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingList" text="List of Control Registers">
                        <Toc.Entry href="#headingCR2" text="CR2" />
                        <Toc.Entry href="#headingCR8" text="CR8" />
                    </Toc.Entry>
                    <Toc.Entry href="#headingUndefinedRegisters" text="Undefined Registers" />
                    <Toc.Entry href="#headingAccess" text="Accessing the Registers" />
                </Toc.Root>
                <p>
                    The five control registers determine various characteristics of the currently executing program.
                    These registers are: <code>CR0</code>, <code>CR2</code>, <code>CR3</code>, <code>CR4</code>, and <code>CR8</code>.
                </p>

                <Clear />

                <h2 id="headingList">List of Control Registers</h2>
                <p>
                    The five registers are:
                </p>
                <ul>
                    <li>
                        <code><A href="/register/control/cr0">CR0</A></code>:
                        Flags controlling the <A href="/mode">operating mode</A> and status of the processor.
                    </li>
                    <li>
                        <code><A href="#headingCR2">CR2</A></code>:
                        The page fault linear address (the address that last caused a page fault).
                    </li>
                    <li>
                        <code><A href="/register/control/cr3">CR3</A></code>:
                        The physical address of the base of the paging structure.
                    </li>
                    <li>
                        <code><A href="/register/control/cr4">CR4</A></code>:
                        Flags to enable <A href="/extension">various processor extensions</A>.
                    </li>
                    <li>
                        <code><A href="#headingCR8">CR8</A></code>:
                        Access to the &quot;Task Priority Register&quot; (<code>TPR</code>).
                    </li>
                </ul>

                <h3 id="headingCR2">CR2</h3>
                TODO

                <h3 id="headingCR8">CR8</h3>
                TODO

                <h2 id="headingUndefinedRegisters">Undefined Registers</h2>
                <p>
                    Currently, only five registers are defined: <code>CR0</code>, <code>CR2</code>, <code>CR3</code>, <code>CR4</code>, and <code>CR8</code>.
                    Despite this, the <A href="#headingAccess">instruction encodings</A> allow the possibility of registers all the way through <code>CR15</code>;
                    Accessing any of the undefined registers will result in <Exception name="UD" />.
                </p>

                <h2 id="headingAccess">Accessing the Registers</h2>
                <p>
                    Control registers are accessed using two special forms of the <Instruction name="mov" noLink /> instruction.
                    These instructions are detailed on their specific page: <Instruction name="mov-cr" />.
                </p>
                <p>
                    Access to the control registers is only allowed through <A href="/register/gpr">general purpose registers</A>;
                    Memory forms of the <A href="/instruction/help/modRM">ModR/M</A> byte (i.e. where <code>mod</code> is not <code>0b11</code>) are not allowed.
                </p>
            </Layout.Content>
        </Layout.Body>
    </>;
}
