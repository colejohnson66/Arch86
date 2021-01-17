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

import { Breadcrumbs, Callout, Card, H1, H2, IBreadcrumbProps, UL } from "@blueprintjs/core";

import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Link from "next/link";
import TOC from "../components/TOC";
import WIP from "../components/WIP";
import { getAllInstructionsArray } from "../lib/instruction";
import renderBreadcrumbs from "../lib/renderBreadcrumbs";

const PageBreadcrumbs: IBreadcrumbProps[] = [
    { text: "Instructions" },
];

type PageProps = {
    instructions: string[],
};

const Page = (props: PageProps) => {
    return (
        <Layout navGroup="instruction" title="Instructions">
            <Card className="breadcrumbs" interactive={true}>
                <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={PageBreadcrumbs} />
            </Card>
            <div id="main">
                <TOC.Root>
                    <TOC.Entry href="#headingList" text="List" />
                </TOC.Root>
                <div id="content">
                    <H1>x86 Instructions</H1>
                    <p>
                        x86 is home to a few hundred instructions with over 3,000 different encodings.
                        An up-to-date list is available in PDF form on <a href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html" className="external">Intel's website</a> (see volume 2).
                    </p>

                    <H2 id="headingList">List</H2>
                    <WIP type="section" />
                    <Callout intent="primary">
                        This list is updated manually, and, as such, may not be current;
                        It is current as of version 073 of the <a href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html" className="external">Intel SDM</a>.
                        In addition to the documented instructions in the software developer manual (SDM), undocumented and AMD-exclusive instructions are included here.
                    </Callout>
                    <UL>
                        {props.instructions.map((instr) => (
                            <li key={instr}>
                                <Link href={`/instruction/${instr}`}><a>{instr.toUpperCase()}</a></Link>
                            </li>
                        ))}
                    </UL>
                </div>
            </div>
        </Layout>
    );
};

export default Page;

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            instructions: getAllInstructionsArray(),
        },
    };
}
