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
import { Code, H1, H2, IBreadcrumbProps } from "@blueprintjs/core";

import Layout from "../../components/Layout";
import Link from "../../components/Link";
import React from "react";
import TOC from "../../components/TOC";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        {
            text: "Registers",
            href: "/register",
        },
        { text: "Table Registers" },
    ];

    return (
        <Layout canonical="/register/table" navGroup="register" title="Table Registers" breadcrumbs={PageBreadcrumbs}>
            <TOC.Root>
                <TOC.Entry href="#headingGDTR" text="Global Descriptor Table" />
                <TOC.Entry href="#headingIDTR" text="Interrupt Descriptor Table" />
                <TOC.Entry href="#headingLDTR" text="Local Descriptor Table" />
            </TOC.Root>
            <div id="content">
                <H1>Table Registers</H1>
                <p>
                    x86 has three main &quot;table&quot; registers: the Global Descriptor Table Register (<Code>GDTR</Code>), the Interrupt Descriptor Table Register (<Code>IDTR</Code>), and the Local Descriptor Table Register (<Code>LDTR</Code>).
                    The Global Descriptor Table contains information about the various memory segments, the Interrupt Descriptor Table contains execution vectors for interrupts, and the Local Descriptor Table contains information about the currently executing task&apos;s segments.
                    Despite their names, these registers do not contain the actual table&apos;s data, but only a pointer to the data in memory.
                </p>

                <H2 id="headingGDTR">Global Descriptor Table</H2>
                TODO

                <H2 id="headingIDTR">Interrupt Descriptor Table</H2>
                TODO

                <H2 id="headingLDTR">Local Descriptor Table</H2>
                TODO
            </div>
        </Layout>
    );
}
