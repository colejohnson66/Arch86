/* This file is part of 80x86.
 * Copyright (c) 2020-2021 Cole Johnson
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
import { Breadcrumbs, Card, H1, IBreadcrumbProps, UL } from "@blueprintjs/core";

import Layout from "../components/Layout";
import renderBreadcrumbs from "../lib/renderBreadcrumbs";

const Page = () => {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        { text: "Contact" },
    ];

    return (
        <Layout canonical="/contact" title="Contact">
            <Card className="breadcrumbs" interactive={true}>
                <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={PageBreadcrumbs} />
            </Card>
            <div id="main">
                <div id="content">
                    <H1>Contact</H1>
                    <p>
                        To contact me, please use the following method:
                    </p>
                    <UL>
                        <li>Email: <i>coleharrisjohnson at gmail dot com</i></li>
                    </UL>
                </div>
            </div>
        </Layout>
    );
};

export default Page;
