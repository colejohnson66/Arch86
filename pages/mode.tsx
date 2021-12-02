/* =============================================================================
 * File:   mode.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021 Cole Tobin
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

import A from "@components/A";
import Breadcrumb from "@components/Breadcrumb";
import Clear from "@components/Clear";
import Layout from "@components/Layout";
import Toc from "@components/Toc";
import Unit from "@components/Unit";

export default function Page(): React.ReactElement {
    return (
        <Layout.Root navGroup="mode" pageTitle="Operating Modes">
            <Layout.Title title="Operating Modes" />
            <Breadcrumb.Root>
                <Breadcrumb.Item>Operating Modes</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingList" text="List of Modes" />
                </Toc.Root>
                <p>
                    x86 has a variety of operating modes.
                    For historical compatibility reasons, the processor starts up in Real Mode pretending to be a simple 16&nbsp;bit processor from three decades ago.
                    It is up to the user (generally the operating system developer) to determine if the processor supports certain modes, and then switch the processor into one of them.
                </p>
                <Clear />

                <h2 id="headingList">List of Modes</h2>
                <p>
                    There exist three main modes of processor operation:
                </p>
                <ul>
                    <li><A href="/mode/real">Real Mode</A> (16&nbsp;bit)</li>
                    <li><A href="/mode/protected">Protected Mode</A> (32&nbsp;bit) with the option for <A href="/mode/virtual8086">Virtual-8086 Mode</A> (16&nbsp;bit) on individual threads</li>
                    <li><A href="/mode/long">Long Mode</A> (64&nbsp;bit) with the option for <A href="/mode/compatibility">Compatibility Mode</A> (32&nbsp;bit) on individual threads</li>
                </ul>
                <p>
                    In addition to those three, there exist two other modes that are unused by user facing software:
                </p>
                <ul>
                    <li><A href="/mode/unreal">Unreal Mode</A> - a variant of Real Mode, but with access to a <Unit value={4} unit="GiB" /> address space</li>
                    <li><A href="/mode/smm">System Management Mode</A> - intended for BIOSes and other very low level system initialization routines</li>
                </ul>
            </Layout.Content>
        </Layout.Root>
    );
}
