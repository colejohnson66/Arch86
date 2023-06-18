/* =============================================================================
 * File:   page.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2023 Cole Tobin
 *
 * This file is part of Arch86.
 *
 * Arch86 is free software: you can redistribute it and/or modify it under the
 *   terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * Arch86 is distributed in the hope that it will be useful, but WITHOUT ANY
 *   WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 *   FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
 *   more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 *   along with Arch86. If not, see <http://www.gnu.org/licenses/>.
 * =============================================================================
 */

import A from "@/components/A";
import Breadcrumbs from "@/components/Breadcrumbs";
import DateTime from "@/components/DateTime";
import Layout from "@/components/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "https://arch86.com/architecture" },
    title: "Microarchitecture",
};

export default function Page(): React.ReactElement {
    return <>
        <Layout.Header>Microarchitecture</Layout.Header>
        <Layout.Body>
            <Breadcrumbs>
                <li>Microarchitecture</li>
            </Breadcrumbs>
            <Layout.Content>
                {/* <Toc.Root>
                    <Toc.Entry href="#headingHistory" text="History">
                        <Toc.Entry href="#headingHistoryIntel" text="Intel" />
                        <Toc.Entry href="#headingHistoryAmd" text="AMD" />
                    </Toc.Entry>
                </Toc.Root> */}
                <p>
                    Over the years, there have been many versions of the x86 microarchitecture.
                    It began with the <A href="/architecture/8086">8086</A> (released <DateTime dt="1979-06-08" />), and continues to this day with the various Intel Core and AMD Ryzen microarchitectures.
                </p>
            </Layout.Content>
        </Layout.Body>
    </>;
}
