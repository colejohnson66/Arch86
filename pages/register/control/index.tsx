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
import { BreadcrumbProps, Code, H1, H2, H3, UL } from "@blueprintjs/core";
import Layout, { Title } from "../../../components/Layout";

import A from "../../../components/A";
import Instruction from "../../../components/Instruction";
import React from "react";
import TOC from "../../../components/TOC";
import WIP from "../../../components/WIP";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: BreadcrumbProps[] = [
        {
            text: "Registers",
            href: "/register",
        },
        { text: "Control Registers" },
    ];

    return (
        <Layout canonical="/register/control" navGroup="register" src="/pages/register/control/index.tsx" breadcrumbs={PageBreadcrumbs}>
            <Title title="Control Registers" />
            <TOC.Root>
                <TOC.Entry href="#headingList" text="List of Control Registers">
                    <TOC.Entry href="#headingCR2" text="CR2" />
                    <TOC.Entry href="#headingCR8" text="CR8" />
                </TOC.Entry>
                <TOC.Entry href="#headingUndefinedRegisters" text="Undefined Registers" />
                <TOC.Entry href="#headingAccess" text="Accessing the Registers" />
            </TOC.Root>
            <div id="content">
                <H1>Control Registers</H1>
                <p>
                    The five control registers determine various characteristics of the currently executing program.
                    These registers are: <Code>CR0</Code>, <Code>CR2</Code>, <Code>CR3</Code>, <Code>CR4</Code>, and <Code>CR8</Code>.
                </p>

                <H2 id="headingList">List of Control Registers</H2>
                <p>
                    The five registers are:
                </p>
                <UL>
                    <li>
                        <Code><A href="/register/control/cr0">CR0</A></Code>:
                        Flags controlling the <A href="/mode">operating mode</A> and status of the processor.
                    </li>
                    <li>
                        <Code><A href="#headingCR2">CR2</A></Code>:
                        The page fault linear address (the address that last caused a page fault).
                    </li>
                    <li>
                        <Code><A href="/register/control/cr3">CR3</A></Code>:
                        The physical address of the base of the paging structure.
                    </li>
                    <li>
                        <Code><A href="/register/control/cr4">CR4</A></Code>:
                        Flags to enable <A href="/extension">various processor extensions</A>.
                    </li>
                    <li>
                        <Code><A href="#headingCR8">CR8</A></Code>:
                        Access to the &quot;Task Priority Register&quot; (<Code>TPR</Code>).
                    </li>
                </UL>

                <H3 id="headingCR2">CR2</H3>
                <WIP section />

                <H3 id="headingCR8">CR8</H3>
                <WIP section />

                <H2 id="headingUndefinedRegisters">Undefined Registers</H2>
                <p>
                    Currently, only five registers are defined: <Code>CR0</Code>, <Code>CR2</Code>, <Code>CR3</Code>, <Code>CR4</Code>, and <Code>CR8</Code>.
                    Despite this, the <A href="#headingAccess">instruction encodings</A> allow the possibility of registers all the way through <Code>CR15</Code>;
                    Accessing any of the undefined registers will result in a <Code>#UD</Code> exception being thrown.
                </p>

                <H2 id="headingAccess">Accessing the Registers</H2>
                <p>
                    Control registers are accessed using two special forms of the <Instruction name="MOV" noLink /> instruction.
                    These instructions are detailed on their specific page: <Instruction name="MOV (CR)" as="MOV_control" />.
                </p>
                <p>
                    Access to the control registers is only allowed through <A href="/register/gpr">general purpose registers</A>;
                    Memory forms of the <A href="/instruction/help/modRM">ModR/M</A> byte (i.e. where <Code>mod</Code> is not <Code>0b11</Code>) are not allowed.
                </p>
            </div>
        </Layout>
    );
}
