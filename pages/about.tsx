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

import Layout from "../components/Layout";
import TOC from "../components/TOC";
import renderBreadcrumbs from "../lib/renderBreadcrumbs";

const Page = () => {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        { text: "About" },
    ];

    return (
        <Layout canonical="/about" navGroup="about" title="About">
            <Card className="breadcrumbs" interactive={true}>
                <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={PageBreadcrumbs} />
            </Card>
            <div id="main">
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
                        This site is build using <a href="https://nextjs.org/" className="external">Next.js</a> and deployed on <a href="https://vercel.com/" className="external">Vercel</a>.
                        {" "}<a href="https://react-bootstrap.github.io/" className="external">React Bootstrap</a> is used for theming and layout.
                    </p>
                    <p>
                        Additionally, the following npm packages are used:
                    </p>
                    <UL>
                        <li>
                            <a href="https://www.npmjs.com/package/react-syntax-highlighter" className="external"><code>react-syntax-highlighter</code></a>
                            {": "}Any syntax highlighting used here.
                        </li>
                        <li>
                            <a href="https://www.npmjs.com/package/yaml" className="external"><code>yaml</code></a>
                            {": "}Parsing YAML files used for data storage.
                        </li>
                    </UL>

                    <H2 id="headingSource">Open Source</H2>
                    <p>
                        This site is open source and released under the <a href="https://opensource.org/licenses/AGPL-3.0" className="external">GNU AGPL 3.0 or later</a> license.
                        The source code is available on <a href="https://github.com/colejohnson66/80x86" className="external">GitHub</a>.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Page;
