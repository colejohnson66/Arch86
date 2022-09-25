/* =============================================================================
 * File:   cpuid.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022 Cole Tobin
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
import Instruction from "@components/Instruction";
import Layout from "@components/Layout";
import Register from "@components/Register";
import Toc from "@components/Toc";

type LeafEntryArgs = {
    eax: string | React.ReactNode,
    ebx: string | React.ReactNode,
    ecx: string | React.ReactNode,
    edx: string | React.ReactNode,
}
function LeafEntry(args: LeafEntryArgs): React.ReactElement {
    return (
        <table className="w-full">
            <tbody>
                <tr>
                    <th><code>EAX</code></th>
                    <td>{args.eax}</td>
                </tr>
                <tr>
                    <th><code>EBX</code></th>
                    <td>{args.ebx}</td>
                </tr>
                <tr>
                    <th><code>ECX</code></th>
                    <td>{args.ecx}</td>
                </tr>
                <tr>
                    <th><code>EDX</code></th>
                    <td>{args.edx}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default function Page(): React.ReactElement {
    return (
        <Layout.Root navGroup="architecture" pageTitle="CPUID" canonical="/architecture/cpuid">
            <Layout.Title title="CPUID" />
            <Breadcrumb.Root>
                <Breadcrumb.Item href="/architecture">Microarchitecture</Breadcrumb.Item>
                <Breadcrumb.Item>CPUID</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingBasicLeafs" text="List of Basic Leafs">
                        <Toc.Entry href="#headingBasicLeaf-0" text="EAX=0" />
                        {/* <Toc.Entry href="#headingBasicLeaf-1" text="EAX=1" />
                        <Toc.Entry href="#headingBasicLeaf-2" text="EAX=2" />
                        <Toc.Entry href="#headingBasicLeaf-3" text="EAX=3" />
                        <Toc.Entry href="#headingBasicLeaf-4" text="EAX=4" />
                        <Toc.Entry href="#headingBasicLeaf-5" text="EAX=5" />
                        <Toc.Entry href="#headingBasicLeaf-6" text="EAX=6" />
                        <Toc.Entry href="#headingBasicLeaf-7" text="EAX=7">
                            <Toc.Entry href="#headingLead-7-0" text="ECX=0" />
                            <Toc.Entry href="#headingLead-7-1" text="ECX=1" />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-8" text="EAX=8" />
                        <Toc.Entry href="#headingBasicLeaf-9" text="EAX=9" />
                        <Toc.Entry href="#headingBasicLeaf-A" text="EAX=A" />
                        <Toc.Entry href="#headingBasicLeaf-B" text="EAX=B" />
                        <Toc.Entry href="#headingBasicLeaf-C" text="EAX=C" />
                        <Toc.Entry href="#headingBasicLeaf-D" text="EAX=D">
                            <Toc.Entry href="#headingBasicLeaf-D-0" text="ECX=0" />
                            <Toc.Entry href="#headingBasicLeaf-D-gte1" text={"ECX\u22651"} />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-E" text="EAX=E" />
                        <Toc.Entry href="#headingBasicLeaf-F" text="EAX=F">
                            <Toc.Entry href="#headingBasicLeaf-F-0" text="ECX=0" />
                            <Toc.Entry href="#headingBasicLeaf-F-1" text="ECX=1" />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-10" text="EAX=10">
                            <Toc.Entry href="#headingBasicLeaf-10-0" text="ECX=0" />
                            <Toc.Entry href="#headingBasicLeaf-10-1" text="ECX=1" />
                            <Toc.Entry href="#headingBasicLeaf-10-2" text="ECX=2" />
                            <Toc.Entry href="#headingBasicLeaf-10-3" text="ECX=3" />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-11" text="EAX=11" />
                        <Toc.Entry href="#headingBasicLeaf-12" text="EAX=12">
                            <Toc.Entry href="#headingBasicLeaf-12-0" text="ECX=0" />
                            <Toc.Entry href="#headingBasicLeaf-12-1" text="ECX=1" />
                            <Toc.Entry href="#headingBasicLeaf-12-gte2" text={"ECX\u22652"} />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-13" text="EAX=13" />
                        <Toc.Entry href="#headingBasicLeaf-14" text="EAX=14">
                            <Toc.Entry href="#headingBasicLeaf-14-0" text="ECX=0" />
                            <Toc.Entry href="#headingBasicLeaf-14-1" text="ECX=1" />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-15" text="EAX=15" />
                        <Toc.Entry href="#headingBasicLeaf-16" text="EAX=16" />
                        <Toc.Entry href="#headingBasicLeaf-17" text="EAX=17">
                            <Toc.Entry href="#headingBasicLeaf-17-0" text="ECX=0" />
                            <Toc.Entry href="#headingBasicLeaf-17-1" text="ECX=1" />
                            <Toc.Entry href="#headingBasicLeaf-17-2" text="ECX=2" />
                            <Toc.Entry href="#headingBasicLeaf-17-3" text="ECX=3" />
                            <Toc.Entry href="#headingBasicLeaf-17-gte4" text={"ECX\u22654"} />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-18" text="EAX=18">
                            <Toc.Entry href="#headingBasicLeaf-18-0" text="ECX=0" />
                            <Toc.Entry href="#headingBasicLeaf-18-gte1" text={"ECX\u22651"} />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-19" text="EAX=19" />
                        <Toc.Entry href="#headingBasicLeaf-1A" text="EAX=1A">
                            <Toc.Entry href="#headingBasicLeaf-1A-0" text="ECX=0" />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-1B" text="EAX=1B" />
                        <Toc.Entry href="#headingBasicLeaf-1C" text="EAX=1C">
                            <Toc.Entry href="#headingBasicLeaf-1C-0" text="ECX=0" />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-1D" text="EAX=1D" />
                        <Toc.Entry href="#headingBasicLeaf-1E" text="EAX=1E" />
                        <Toc.Entry href="#headingBasicLeaf-1F" text="EAX=1F" />
                        <Toc.Entry href="#headingBasicLeaf-20" text="EAX=20">
                            <Toc.Entry href="#headingBasicLeaf-20-0" text="ECX=0" />
                        </Toc.Entry>
                        <Toc.Entry href="#headingBasicLeaf-21" text="EAX=21" /> */}
                    </Toc.Entry>
                    {/* <Toc.Entry href="#headingExtendedLeafs" text="List of Extended Leafs">
                        <Toc.Entry href="#headingExtendedLeaf-0" text="EAX=8000_0000" />
                        <Toc.Entry href="#headingExtendedLeaf-1" text="EAX=8000_0001" />
                        <Toc.Entry href="#headingExtendedLeaf-2" text="EAX=8000_0002" />
                        <Toc.Entry href="#headingExtendedLeaf-3" text="EAX=8000_0003" />
                        <Toc.Entry href="#headingExtendedLeaf-4" text="EAX=8000_0004" />
                        <Toc.Entry href="#headingExtendedLeaf-5" text="EAX=8000_0005" />
                        <Toc.Entry href="#headingExtendedLeaf-6" text="EAX=8000_0006" />
                        <Toc.Entry href="#headingExtendedLeaf-7" text="EAX=8000_0007" />
                        <Toc.Entry href="#headingExtendedLeaf-8" text="EAX=8000_0008" />
                        <Toc.Entry href="#headingExtendedLeaf-amd-easter-egg" text="EAX=8FFF_FFFF" />
                    </Toc.Entry> */}
                </Toc.Root>
                <p>
                    The <Instruction name="cpuid" /> instruction was introduced in 1993 with the Pentium and SL-enhanced 80486 processors.
                    It returns information about the processor and supported features based on the value in <Register name="EAX" /> (and sometimes also <Register name="ECX" />).
                </p>
                <p>
                    This page lists all the known leafs.
                </p>

                <Clear />

                <h2 id="headingBasicLeafs">List of Basic Leafs</h2>

                <h3 id="headingBasicLeaf-0"><code>EAX=0</code></h3>
                <p>
                    The <code>EAX=0</code> leaf returns the largest basic leaf in <Register name="EAX" /> and a 12 byte processor identification string in the other three registers.
                </p>
                {LeafEntry({
                    eax: "Maximum supported \"basic\" leaf",
                    ebx: <code>PROC_IDENT_STR[0..4]</code>,
                    ecx: <code>PROC_IDENT_STR[4..8]</code>,
                    edx: <code>PROC_IDENT_STR[8..12]</code>,
                })}
                <p>
                    The value of <code>PROC_IDENT_STR</code> is the 12 byte processor identification string.
                    A list of known values is enumerated below:
                </p>
                <ul>
                    <li>&quot;<code className="whitespace-pre">AMDisbetter!</code>&quot; - early samples of the <A href="/architecture/amd/k5">AMD K5</A></li>
                    <li>&quot;<code className="whitespace-pre">AuthenticAMD</code>&quot; - <A href="/architecture/amd">AMD</A></li>
                    <li>&quot;<code className="whitespace-pre">CentaurHauls</code>&quot; - Centaur</li>
                    <li>&quot;<code className="whitespace-pre">CyrixInstead</code>&quot; - Cyrix</li>
                    <li>&quot;<code className="whitespace-pre">GenuineIntel</code>&quot; - <A href="/architecture/intel">Intel</A></li>
                    <li>&quot;<code className="whitespace-pre">TransmetaCPU</code>&quot; - Transmeta</li>
                    <li>&quot;<code className="whitespace-pre">GenuineTMx86</code>&quot; - Transmeta</li>
                    <li>&quot;<code className="whitespace-pre">Geode by NSC</code>&quot; - National Semiconductor</li>
                    <li>&quot;<code className="whitespace-pre">NexGenDriven</code>&quot; - NexGen</li>
                    <li>&quot;<code className="whitespace-pre">RiseRiseRise</code>&quot; - Rise</li>
                    <li>&quot;<code className="whitespace-pre">SiS SiS SiS </code>&quot; - SiS</li>
                    <li>&quot;<code className="whitespace-pre">UMC UMC UMC </code>&quot; - UMC</li>
                    <li>&quot;<code className="whitespace-pre">VIA VIA VIA </code>&quot; - VIA</li>
                    <li>&quot;<code className="whitespace-pre">Vortex86 SOC</code>&quot; - DM&amp;P Vortex86</li>
                    <li>&quot;<code className="whitespace-pre">  Shanghai  </code>&quot; - Zhaoxin</li>
                    <li>&quot;<code className="whitespace-pre">HygonGenuine</code>&quot; - Hygon</li>
                    {/* <li>&quot;<code className="whitespace-pre">E2K MACHINE</code>&quot; - MCST Elbrus</li> - only 11 characters */}
                    <li>&quot;<code className="whitespace-pre">MiSTer A0486</code>&quot; - MiSTer ao486 core</li>
                    <li>&quot;<code className="whitespace-pre">GenuineIntel</code>&quot; - MiSTer v586 core</li>
                    <li>&quot;<code className="whitespace-pre">bhyve bhyve </code>&quot; - bhyve</li>
                    <li>&quot;<code className="whitespace-pre"> KVMKVMKVM  </code>&quot; - Linux KVM</li>
                    <li>&quot;<code className="whitespace-pre">TCGTCGTCGTCG</code>&quot; - QEMU</li>
                    <li>&quot;<code className="whitespace-pre">Microsoft Hv</code>&quot; - Microsoft Hyper-V</li>
                    <li>&quot;<code className="whitespace-pre">MicrosoftXTA</code>&quot; - Microsoft x86-to-ARM</li>
                    <li>&quot;<code className="whitespace-pre"> lrpepyh  vr</code>&quot; - Parallels (should be <code>prl hyperv </code>, but the endianness is wrong</li>
                    <li>&quot;<code className="whitespace-pre">VMwareVMware</code>&quot; - VMware</li>
                    <li>&quot;<code className="whitespace-pre">XenVMMXenVMM</code>&quot; - Xen HVM</li>
                    <li>&quot;<code className="whitespace-pre">ACRNACRNACRN</code>&quot; - Project ACRN</li>
                    <li>&quot;<code className="whitespace-pre"> QNXQVMBSQG </code>&quot; - QNX Hypervisor</li>
                    <li>&quot;<code className="whitespace-pre">GenuineIntel</code>&quot; - older versions of Apple Rosetta 2</li>
                    <li>&quot;<code className="whitespace-pre">VirtualApple</code>&quot; - newer versions of Apple Rosetta 2</li>
                </ul>

            </Layout.Content>
        </Layout.Root>
    );
}
