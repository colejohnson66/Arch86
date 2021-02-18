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
import { H1, H2, IBreadcrumbProps, UL } from "@blueprintjs/core";

import Layout from "../components/Layout";
import Link from "../components/Link";
import React from "react";
import TOC from "../components/TOC";
import Unit from "../components/Unit";

export default function Page(): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        { text: "Processor Modes" },
    ];

    return (
        <Layout canonical="/mode" navGroup="mode" title="Processor Modes" src="/pages/mode.tsx" breadcrumbs={PageBreadcrumbs}>
            <TOC.Root>
                <TOC.Entry href="#headingList" text="List of Modes" />
            </TOC.Root>
            <div id="content">
                <H1>Processor Modes</H1>
                <p>
                    x86 has a variety of operating modes.
                    On startup, the processor begins execution in Real Mode as if it were a simple 16-bit processor from 30 plus years ago.
                    It is up to the user (generally the operating system developer) to determine if the processor supports certain modes, and then force the processor into one of them.
                </p>

                <H2 id="headingList">List of Modes</H2>
                <p>
                    There exist three main modes of processor operation:
                </p>
                <UL>
                    <li><Link href="/mode/real">Real Mode</Link> (16-bit)</li>
                    <li><Link href="/mode/protected">Protected Mode</Link> (32-bit) with option for <Link href="/mode/virtual">Virtual-8086 Mode</Link> (16-bit) on individual threads</li>
                    <li><Link href="/mode/long">Long Mode</Link> (64-bit) with option for <Link href="/mode/compatibility">Compatibility Mode</Link> (32-bit) on individual threads</li>
                </UL>
                <p>
                    In addition to those three, there exist two other modes that are generally unused by user facing software:
                </p>
                <UL>
                    <li><Link href="/mode/unreal">Unreal Mode</Link> - a variant of Real Mode, but with access to a <Unit value={4} unit="GiB" /> address space</li>
                    <li><Link href="/mode/smm">System Management Mode</Link> - intended for BIOSes and other very low level system initialization routines</li>
                </UL>
            </div>
        </Layout>
    );
}
