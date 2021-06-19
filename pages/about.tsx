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
import { BreadcrumbProps, Code, H1, H2, UL } from "@blueprintjs/core";
import Layout, { Title } from "../components/Layout";

import A from "../components/A";
import React from "react";
import TOC from "../components/TOC";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: BreadcrumbProps[] = [
        { text: "About" },
    ];

    return (
        <Layout canonical="/about" navGroup="about" src="/pages/about.tsx" breadcrumbs={PageBreadcrumbs}>
            <Title title="About" />
            <TOC.Root>
                <TOC.Entry href="#headingStack" text="Software Stack" />
                <TOC.Entry href="#headingSource" text="Open Source" />
            </TOC.Root>
            <div id="content">
                <H1>About</H1>
                <p>
                    This website is designed to be a digital reference version of the x86 (and x86-64) processor architecture.
                </p>

                <H2 id="headingStack">Software Stack</H2>
                <p>
                    This site is build using <A href="https://nextjs.org/">Next.js</A> (itself built on <A href="https://reactjs.org/">React.js</A>) and deployed on <A href="https://vercel.com/">Vercel</A>.
                    {" "}<A href="https://blueprintjs.com/">Blueprint</A> is used for theming and layout.
                </p>
                <p>
                    Additionally, the following npm packages are (directly) used:
                </p>
                <UL>
                    <li>
                        <A href="https://www.npmjs.com/package/react-syntax-highlighter"><Code>react-syntax-highlighter</Code></A>
                        {": "}Any syntax highlighting used here.
                    </li>
                    <li>
                        <A href="https://www.npmjs.com/package/styled-jsx"><Code>styled-jsx</Code></A>
                        {": "}Localized CSS.
                    </li>
                    <li>
                        <A href="https://www.npmjs.com/package/yaml"><Code>yaml</Code></A>
                        {": "}Parsing YAML files used for data storage.
                    </li>
                </UL>

                <H2 id="headingSource">Open Source</H2>
                <p>
                    This site is open source and released under the <A href="https://opensource.org/licenses/AGPL-3.0">GNU AGPL 3.0 or later</A> license.
                    The source code is available on <A href="https://github.com/colejohnson66/80x86">GitHub</A>.
                </p>
            </div>
        </Layout>
    );
}
