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
import { Code, H1, H2, IBreadcrumbProps, UL } from "@blueprintjs/core";

import Layout from "../components/Layout";
import Link from "../components/Link";
import React from "react";
import TOC from "../components/TOC";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        { text: "Registers" },
    ];

    return (
        <Layout canonical="/register" navGroup="register" title="Registers" breadcrumbs={PageBreadcrumbs}>
            <TOC.Root>
                <TOC.Entry href="#headingFiles" text="Register Files" />
            </TOC.Root>
            <div id="content">
                <H1>Registers</H1>
                <p>
                    x86 is home to <em>many</em> different registers.
                    They are generally organized into a few different &quot;register files&quot;.
                </p>

                <H2 id="headingFiles">Register Files</H2>
                <p>
                    This is a list of the various register files for x86.
                    Any configuration registers are listed with the register file that accompany them.
                    For example, <Code>MXCSR</Code> is used with vector instructions, and would be listed with the other vector registers.
                </p>
                <UL>
                    <li><Link href="/register/gpr">General purpose registers</Link> (<Code>EAX</Code>, <Code>EBX</Code>, etc.)</li>
                    <li><Link href="/register/flags">Flags register</Link> (<Code>(ER)FLAGS</Code>)</li>
                    <li><Link href="/register/segment">Segment registers</Link> (<Code>CS</Code>, <Code>DS</Code>, etc.)</li>
                    <li><Link href="/register/control">Control registers</Link> (<Code>CR0</Code>, <Code>CR2</Code>, etc.)</li>
                    <li><Link href="/register/debug">Debug registers</Link> (<Code>DR0</Code>, <Code>DR1</Code>, etc.)</li>
                    <li><Link href="/register/fpu">Floating point registers</Link> (<Code>ST(0)</Code>, <Code>ST(1)</Code>, etc.)</li>
                    <li><Link href="/register/table">Table registers</Link> (<Code>GDTR</Code>, <Code>IDTR</Code>, etc.)</li>
                    <li><Link href="/register/mmx">Multimedia Extension registers</Link> (<Code>MM0</Code>, <Code>MM1</Code>, etc.)</li>
                    <li><Link href="/register/vector">Vector registers</Link> (<Code>XMM0</Code>, <Code>YMM0</Code>, etc.)</li>
                    <li><Link href="/register/mask">Vector mask registers</Link> (<Code>K0</Code>, <Code>K1</Code>, etc.)</li>
                    <li><Link href="/register/bound">Bound registers</Link> (<Code>BND0</Code>, <Code>BND1</Code>, etc.)</li>
                    <li><Link href="/register/tile">Tile registers</Link> (<Code>TMM0</Code>, <Code>TMM1</Code>, etc.)</li>
                    <li><Link href="/register/msr">Model specific registers</Link></li>
                </UL>
            </div>
        </Layout>
    );
}
