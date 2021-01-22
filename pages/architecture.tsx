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
import { Breadcrumbs, Card, H1, H2, IBreadcrumbProps, UL } from "@blueprintjs/core";

import DateTime from "../components/DateTime";
import Layout from "../components/Layout";
import Link from "../components/Link";
import React from "react";
import TOC from "../components/TOC";
import WIP from "../components/WIP";
import renderBreadcrumbs from "../lib/renderBreadcrumbs";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        { text: "Microarchitecture" },
    ];

    return (
        <Layout canonical="/architecture" navGroup="architecture" title="Microarchitecture">
            <Card className="breadcrumbs" interactive={true}>
                <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={PageBreadcrumbs} />
            </Card>
            <div id="main">
                <TOC.Root>
                    <TOC.Entry href="#headingHistory" text="History" />
                    <TOC.Entry href="#headingRegisters" text="Registers" />
                </TOC.Root>
                <div id="content">
                    <H1>Microarchitecture</H1>
                    <p>
                        Over the years, there have been many versions of the x86 microarchitecture.
                        It began with the <Link href="/architecture/8086">8086</Link> (released <DateTime dateTime="1979-06-08" />), and continues to this day with the various &quot;Intel Core&quot; microarchitectures.
                    </p>

                    <H2 id="headingHistory">History</H2>
                    <WIP type="section" />
                    <UL>
                        <li><Link href="/architecture/8086">8086</Link></li>
                        <li><Link href="/architecture/80186">80186</Link></li>
                        <li><Link href="/architecture/80286">80286</Link></li>
                        <li><Link href="/architecture/80386">80386</Link></li>
                        <li><Link href="/architecture/80486">80486</Link></li>
                        <li><Link href="/architecture/p5">P5</Link></li>
                        <li><Link href="/architecture/p5">P6</Link></li>
                        <li>...</li>
                    </UL>
                </div>
            </div>
        </Layout>
    );
}
