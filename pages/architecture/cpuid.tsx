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
import BitField from "@components/BitField";
import Breadcrumb from "@components/Breadcrumb";
import Clear from "@components/Clear";
import Cpuid from "@components/Cpuid";
import Instruction from "@components/Instruction";
import Layout from "@components/Layout";
import Ref from "@components/Ref";
import Register from "@components/Register";
import Toc from "@components/Toc";

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
                        <Toc.Entry href="#headingBasicLeaf-1" text="EAX=1" />
                        {/* <Toc.Entry href="#headingBasicLeaf-2" text="EAX=2" />
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
                <table className="w-full">
                    <tbody>
                        <tr>
                            <th id="leaf-basic-0-eax"><code>EAX</code></th>
                            <td>Maximum supported &quot;basic&quot; leaf</td>
                        </tr>
                        <tr>
                            <th id="leaf-basic-0-ebx"><code>EBX</code></th>
                            <td><code>PROC_IDENT_STR[0..3]</code></td>
                        </tr>
                        <tr>
                            <th id="leaf-basic-0-ecx"><code>ECX</code></th>
                            <td><code>PROC_IDENT_STR[8..11]</code></td>
                        </tr>
                        <tr>
                            <th id="leaf-basic-0-edx"><code>EDX</code></th>
                            <td><code>PROC_IDENT_STR[4..7]</code></td>
                        </tr>
                    </tbody>
                </table>
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

                <h3 id="headingBasicLeaf-1"><code>EAX=1</code></h3>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <th id="leaf-basic-1-eax"><code>EAX</code></th>
                            <td>
                                Processor Version Information:
                                <BitField.Root bits={32}>
                                    <BitField.Reserved bits={4} />
                                    <BitField.Entry bits={8}>Extended Family ID</BitField.Entry>
                                    <BitField.Entry bits={4}>Extended Model ID</BitField.Entry>
                                    <BitField.Reserved bits={2} />
                                    <BitField.Entry bits={2}>Processor Type</BitField.Entry>
                                    <BitField.Entry bits={4}>Family ID</BitField.Entry>
                                    <BitField.Entry bits={4}>Model</BitField.Entry>
                                    <BitField.Entry bits={4}>Stepping ID</BitField.Entry>
                                </BitField.Root>
                            </td>
                        </tr>
                        <tr>
                            <th id="leaf-basic-1-ebx"><code>EBX</code></th>
                            <td>
                                <dl>
                                    <dt>bits 31..24</dt>
                                    <dd>Initial APIC ID<Ref.Link name="eax-1-ebx-a" title="a" /></dd>
                                    <dt>bits 23..16</dt>
                                    <dd>Maximum number of addressable IDs for logical processors in this physical package<Ref.Link name="eax-1-ebx-b" title="b" /></dd>
                                    <dt>bits 15..8</dt>
                                    <dd><Instruction name="clflush" noTitle /> line size (in 64 bit increments; i.e. value&times;8 = cache line size in bytes; see <Instruction name="clflushopt" noTitle />)</dd>
                                    <dt>bits 7..0</dt>
                                    <dd>Brand Index</dd>
                                </dl>
                                <Ref.Root noHeading>
                                    <Ref.Entry name="eax-1-ebx-a" title="a">
                                        The 8 bit APIC ID is supperceded by the 32 bit x2APIC ID, in leafs <A href="#headingBasicLeaf-B"><code>EAX=B</code></A> and <A href="#headingBasicLeaf-1F"><code>EAX=1F</code></A>.
                                    </Ref.Entry>
                                    <Ref.Entry name="eax-1-ebx-b" title="b">
                                        The nearest power-of-two larger than this value is the number of unique APIC IDs reserved per physical processor package.
                                        In other words, if this value is, six, the first physical package will reserve values zero through seven, the second will reserve values eight through 15, and so on.
                                        This value is only valid if <Cpuid eax={1} output="edx" bit={28} featureID="htt" /> is set.
                                    </Ref.Entry>
                                </Ref.Root>
                            </td>
                        </tr>
                        <tr>
                            <th id="leaf-basic-1-ecx">ECX/EDX</th>
                            <td>
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th rowSpan={2} />
                                            <th colSpan={2}><code>ECX</code></th>
                                            <th colSpan={2}><code>EDX</code></th>
                                        </tr>
                                        <tr>
                                            <th>Name</th>
                                            <th>Feature</th>
                                            <th>Name</th>
                                            <th>Feature</th>
                                        </tr>
                                        <tr>
                                            <th>0</th>
                                            <td><code>sse3</code></td>
                                            <td>Streaming SIMD Extensions 3</td>
                                            <td><code>fpu</code></td>
                                            <td>Floating Point Coprocessor On-Chip</td>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <td><code>pclmulqdq</code></td>
                                            <td><Instruction name="pclmulqdq" /> support</td>
                                            <td><code>vme</code></td>
                                            <td>Virtual-8086 Mode enhancements</td>
                                        </tr>
                                        <tr>
                                            <th>2</th>
                                            <td><code>dtes64</code></td>
                                            <td>64 bit <Register name="DS" /> Area</td>
                                            <td><code>de</code></td>
                                            <td>Debugging Extensions; Support for I/O breakpoints</td>
                                        </tr>
                                        <tr>
                                            <th>3</th>
                                            <td><code>monitor</code></td>
                                            <td><Instruction name="monitor" />/<Instruction name="mwait" /> support</td>
                                            <td><code>pse</code></td>
                                            <td>Page Size Extensions (i.e. 4&nbsp;MiB page size support)</td>
                                        </tr>
                                        <tr>
                                            <th>4</th>
                                            <td><code>ds-cpl</code></td>
                                            <td>CPL Qualified Debug Store</td>
                                            <td><code>tsc</code></td>
                                            <td><Instruction name="rdtsc" /> and <Register name="CR4.TSD" /> support</td>
                                        </tr>
                                        <tr>
                                            <th>5</th>
                                            <td><code>vmx</code></td>
                                            <td>Virtual Machine Extensions</td>
                                            <td><code>msr</code></td>
                                            <td><Instruction name="rdmsr" />/<Instruction name="wrmsr" /> support</td>
                                        </tr>
                                        <tr>
                                            <th>6</th>
                                            <td><code>smx</code></td>
                                            <td>Safer Mode Extensions</td>
                                            <td><code>pae</code></td>
                                            <td>Physical Address Extensions</td>
                                        </tr>
                                        <tr>
                                            <th>7</th>
                                            <td><code>eist</code></td>
                                            <td>Enhanced Intel SpeedStep&reg;</td>
                                            <td><code>mce</code></td>
                                            <td>Machine Check Exception</td>
                                        </tr>
                                        <tr>
                                            <th>8</th>
                                            <td><code>tm2</code></td>
                                            <td>Themal Monitor 2</td>
                                            <td><code>cx8</code></td>
                                            <td><Instruction name="cmpxchg8b" /> support</td>
                                        </tr>
                                        <tr>
                                            <th>9</th>
                                            <td><code>ssse3</code></td>
                                            <td>Supplemental Streaming SIMD Extensions 3</td>
                                            <td><code>apic</code></td>
                                            <td>APIC On-Chip</td>
                                        </tr>
                                        <tr>
                                            <th>10</th>
                                            <td><code>cnxt-id</code></td>
                                            <td>L1 Cache Context ID</td>
                                            <td colSpan={2} className="bg-slate-300">Reserved</td>
                                        </tr>
                                        <tr>
                                            <th>11</th>
                                            <td><code>sdbg</code></td>
                                            <td><code>IA32_DEBUG_INTERFACE</code> MSR support</td>
                                            <td><code>sep</code></td>
                                            <td><Instruction name="sysenter" />/<Instruction name="sysexit" /> support</td>
                                        </tr>
                                        <tr>
                                            <th>12</th>
                                            <td><code>fma</code></td>
                                            <td>Fused Multiply-Add Extensions</td>
                                            <td><code>mtrr</code></td>
                                            <td>Memory Type Range Registers</td>
                                        </tr>
                                        <tr>
                                            <th>13</th>
                                            <td><code>cmpxchg16b</code></td>
                                            <td><Instruction name="cmpxchg16b" /> support</td>
                                            <td><code>pge</code></td>
                                            <td>Page Global Bit</td>
                                        </tr>
                                        <tr>
                                            <th>14</th>
                                            <td><code></code></td>
                                            <td>xTPR Update Control</td>
                                            <td><code>mca</code></td>
                                            <td>Machine Check Architecture</td>
                                        </tr>
                                        <tr>
                                            <th>15</th>
                                            <td><code>pdcm</code></td>
                                            <td>Perfmon and Debug Capability</td>
                                            <td><code>cmov</code></td>
                                            <td>
                                                <Instruction name="cmovcc" /> support;
                                                If FPU is present (see <code>fpu</code> above), then <Instruction name="fcmovcc" /> also supported
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>16</th>
                                            <td colSpan={2} className="bg-slate-300">Reserved</td>
                                            <td><code>pat</code></td>
                                            <td>Page Attribute Table</td>
                                        </tr>
                                        <tr>
                                            <th>17</th>
                                            <td><code>pcid</code></td>
                                            <td>Process-Context Identifiers</td>
                                            <td><code>pse-36</code></td>
                                            <td>36 bit Page Size Extensions</td>
                                        </tr>
                                        <tr>
                                            <th>18</th>
                                            <td><code>dca</code></td>
                                            <td></td>
                                            <td><code>psn</code></td>
                                            <td>96 bit Processor Serial Number Available</td>
                                        </tr>
                                        <tr>
                                            <th>19</th>
                                            <td><code>sse4_1</code></td>
                                            <td>Streaming SIMD Extensions 4.1</td>
                                            <td><code>clflush</code></td>
                                            <td><Instruction name="clflush" /> support</td>
                                        </tr>
                                        <tr>
                                            <th>20</th>
                                            <td><code>sse4_2</code></td>
                                            <td>Streaming SIMD Extensions 4.2</td>
                                            <td colSpan={2} className="bg-slate-300">Reserved</td>
                                        </tr>
                                        <tr>
                                            <th>21</th>
                                            <td><code>x2apic</code></td>
                                            <td>x2APIC support</td>
                                            <td><code>ds</code></td>
                                            <td>Debug Store</td>
                                        </tr>
                                        <tr>
                                            <th>22</th>
                                            <td><code>movbe</code></td>
                                            <td><Instruction name="movbe" /> support</td>
                                            <td><code>acpi</code></td>
                                            <td>Thermal Monitor and Software Controlled Clock (APIC)</td>
                                        </tr>
                                        <tr>
                                            <th>23</th>
                                            <td><code>popcnt</code></td>
                                            <td><Instruction name="popcnt" /> support</td>
                                            <td><code>mmx</code></td>
                                            <td>MMX instruction support</td>
                                        </tr>
                                        <tr>
                                            <th>24</th>
                                            <td><code></code></td>
                                            <td>One-shot support for APIC timer using the TSC deadline</td>
                                            <td><code>fxsr</code></td>
                                            <td><Instruction name="fxsave" />/<Instruction name="fxrstor" /> support</td>
                                        </tr>
                                        <tr>
                                            <th>25</th>
                                            <td><code>aes</code></td>
                                            <td>AES &quot;new instructions&quot; support</td>
                                            <td><code>sse</code></td>
                                            <td>Streaming SIMD Extensions</td>
                                        </tr>
                                        <tr>
                                            <th>26</th>
                                            <td><code>xsave</code></td>
                                            <td>
                                                <Instruction name="xsave" />/<Instruction name="xrstor" /> support;
                                                {" "}<Instruction name="xsetbv" />/<Instruction name="xgetbv" /> support;
                                                {" "}<Register name="XCR0" /> register
                                            </td>
                                            <td><code>sse2</code></td>
                                            <td>Streaming SIMD Extensions 2</td>
                                        </tr>
                                        <tr>
                                            <th>27</th>
                                            <td><code>osxsave</code></td>
                                            <td><code>xsave</code> feature set above has been enabled by the OS</td>
                                            <td><code>ss</code></td>
                                            <td>Self Snoop</td>
                                        </tr>
                                        <tr>
                                            <th>28</th>
                                            <td><code>avx</code></td>
                                            <td>Advanced Vector Extensions</td>
                                            <td><code>htt</code></td>
                                            <td>&quot;Max APIC value&quot; in <Cpuid eax={1} output="ebx" bit={23} bitEnd={16} /> is valid</td>
                                        </tr>
                                        <tr>
                                            <th>29</th>
                                            <td><code>f16c</code></td>
                                            <td>Half precision (16 bit) floating point conversions instructions</td>
                                            <td><code>tm</code></td>
                                            <td>Thermal Monitor</td>
                                        </tr>
                                        <tr>
                                            <th>30</th>
                                            <td><code>rdrand</code></td>
                                            <td><Instruction name="rdrand" /> support</td>
                                            <td><code>ia64</code></td>
                                            <td>Indicates that the processor is an IA-64 (Itanium) emulating x86</td>
                                        </tr>
                                        <tr>
                                            <th>31</th>
                                            <td><code>hypervisor</code></td>
                                            <td>Indicates that a hypervisor is present</td>
                                            <td><code>pbe</code></td>
                                            <td>Pending Break Enable</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </Layout.Content>
        </Layout.Root>
    );
}
