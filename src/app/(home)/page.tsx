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
import Layout from "@/components/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "https://arch86.com/" },
};

export default function Home() {
    return <>
        <Layout.Header>Arch86</Layout.Header>
        <Layout.Body>
            <Layout.Content>
                <p>
                    This is the Arch86 website;
                    A website for all things x86 related.
                </p>
                <p>
                    This website is designed to be a digital reference version of the x86 architecture family.
                    This includes everything from the venerable <A href="/architecture/8086">8086</A> to the Intel Core and AMD Ryzen families of today.
                </p>
            </Layout.Content>
        </Layout.Body>
    </>;
}
