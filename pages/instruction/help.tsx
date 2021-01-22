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

import { Breadcrumbs, Card, H1, H2, IBreadcrumbProps } from "@blueprintjs/core";

import Layout from "../../components/Layout";
import React from "react";
import TOC from "../../components/TOC";
import WIP from "../../components/WIP";
import renderBreadcrumbs from "../../lib/renderBreadcrumbs";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        { text: "Instructions",
            href: "/instruction" },
        { text: "Help" },
    ];

    return (
        <Layout canonical="/instruction/help" navGroup="instruction" title="Instruction Page Help">
            <Card className="breadcrumbs" interactive>
                <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={PageBreadcrumbs} />
            </Card>
            <div id="main">
                <TOC.Root>
                    <TOC.Entry href="#headingOverviewTable" text="Overview Table" />
                    <TOC.Entry href="#headingEncoding" text="Encoding" />
                    <TOC.Entry href="#headingDescription" text="Description" />
                    <TOC.Entry href="#headingOperation" text="Operation" />
                    <TOC.Entry href="#headingExamples" text="Examples" />
                    <TOC.Entry href="#headingFlags" text="Flags Affected" />
                    <TOC.Entry href="#headingIntrinsics" text="Intrinsics" />
                    <TOC.Entry href="#headingExceptions" text="Exceptions" />
                </TOC.Root>
                <div id="content">
                    <H1>Instruction Page Help</H1>
                    <WIP type="page" />
                    <p>
                        This page details many of the features of the instruction pages.
                    </p>

                    <H2 id="headingOverviewTable">Overview Table</H2>
                    TODO

                    <H2 id="headingEncoding">Encoding</H2>
                    TODO

                    <H2 id="headingDescription">Description</H2>
                    TODO

                    <H2 id="headingOperation">Operation</H2>
                    TODO

                    <H2 id="headingExamples">Examples</H2>
                    TODO

                    <H2 id="headingFlags">Flags Affected</H2>
                    TODO

                    <H2 id="headingIntrinsics">Intrinsics</H2>
                    TODO

                    <H2 id="headingExceptions">Exceptions</H2>
                    TODO
                </div>
            </div>
        </Layout>
    );
}
