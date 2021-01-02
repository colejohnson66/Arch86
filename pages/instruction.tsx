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

import { Alert, Breadcrumb, Col, Container, Row } from "react-bootstrap";

import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Link from "next/link";
import TOC from "../components/TOC";
import WIP from "../components/WIP";
import constants from "../constants";
import { getAllInstructionsArray } from "../lib/instruction";

type PageProps = {
    instructions: string[],
};

const Page = (props: PageProps) => {
    return (
        <Layout navGroup="instruction" title="Instructions">
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item active>Instructions</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col {...constants.columns.toc}>
                        <TOC.Root>
                            <TOC.Entry href="#headingList" text="List" />
                        </TOC.Root>
                    </Col>
                    <Col {...constants.columns.content}>
                        <h1>x86 Instructions</h1>
                        <p>
                            x86 is home to a few hundred instructions with over 3,000 different encodings.
                            An up-to-date list is available in PDF form on <a href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html" className="external">Intel's website</a> (see volume 2).
                        </p>

                        <h2 id="headingList">List</h2>
                        <WIP type="section" />
                        <Alert variant="primary">
                            This list is updated manually, and, as such, may not be current;
                            It is current as of version 073 of the <a href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html" className="external">Intel SDM</a>.
                            In addition to the documented instructions in the software developer manual (SDM), undocumented and AMD-exclusive instructions are included here.
                        </Alert>
                        <ul>
                            {props.instructions.map((instr) => (
                                <li>
                                    <Link key={instr} href={`/instruction/${instr}`}><a>{instr.toUpperCase()}</a></Link>
                                </li>
                            ))}
                        </ul>
                        <pre>
                            {JSON.stringify(props, null, 2)}
                        </pre>
                    </Col>
                </Row>
            </Container>
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
