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

import A from "../../components/A";
import Layout from "../../components/Layout";
import React from "react";
import TOC from "../../components/TOC";

type RegisterInfo = {
    number: number;
    name?: string;

    rrx: string;
    erx: string;
    rx: string;
    rh?: string;
    rl: string;
    rl64Only?: boolean;
};
function registerListItem(info: RegisterInfo): JSX.Element {
    return (
        <li>
            <Code>{info.rrx}</Code> ({info.name && `${info.name}, `}register {info.number})
            <br />
            Also accessible as:
            <UL>
                <li><Code>{info.erx}</Code> - lower 32 bits</li>
                <li><Code>{info.rx}</Code> - lowest 16 bits</li>
                {info.rh &&
                    <li><Code>{info.rh}</Code> - the higher 8 bits of <Code>{info.rx}</Code></li>
                }
                <li><Code>{info.rl}</Code> - lowest 8 bits{info.rl64Only && " (Long Mode only)"}</li>
            </UL>
        </li>
    );
}

function longModeRegisterListItem(register: number): JSX.Element {
    return registerListItem({
        number: register,
        rrx: `R${register}`,
        erx: `R${register}D`,
        rx: `R${register}W`,
        rl: `R${register}L`,
    });
}

export default function Page(): JSX.Element {
    const PageBreadcrumbs: BreadcrumbProps[] = [
        {
            text: "Registers",
            href: "/register",
        },
        { text: "General Purpose Registers" },
    ];

    return (
        <Layout canonical="/register/gpr" navGroup="register" title="General Purpose Registers" src="/pages/register/gpr.tsx" breadcrumbs={PageBreadcrumbs}>
            <TOC.Root>
                <TOC.Entry href="#headingList" text="Register List" />
            </TOC.Root>
            <div id="content">
                <H1>General Purpose Registers</H1>
                <p>
                    x86 has 16 general purpose registers that can be used for any kind of data, however, only eight are accessible outside of <A href="/mode/long">Long Mode</A>.
                    In addition, despite the name &quot;general purpose&quot;, some registers have defined functionality.
                    For example, instructions operating on the stack will implicitly utilize register 4 (stack pointer), and there is no way to change this.
                </p>

                <H2 id="headingList">Register List</H2>
                <p>
                    This is a list of the general purpose registers.
                    The register number listed alongside each one is the number that would be encoded in an instruction to access it.
                    For example, if an instruction calls for an operand to be encoded into <Code>ModRM.reg</Code>, and the provided operand is <Code>EBX</Code>, <Code>ModRM.reg</Code> will be set to 4 (<Code>100</Code> in binary).
                </p>
                <div className="columns">
                    <div className="column">
                        <UL>
                            {registerListItem({
                                number: 0,
                                name: "accumulator",
                                rrx: "RAX",
                                erx: "EAX",
                                rx: "AX",
                                rh: "AH",
                                rl: "AL",
                            })}
                            {registerListItem({
                                number: 1,
                                name: "counter",
                                rrx: "RCX",
                                erx: "ECX",
                                rx: "CX",
                                rh: "CH",
                                rl: "CL",
                            })}
                            {registerListItem({
                                number: 2,
                                name: "data",
                                rrx: "RDX",
                                erx: "EDX",
                                rx: "DX",
                                rh: "DH",
                                rl: "DL",
                            })}
                            {registerListItem({
                                number: 3,
                                name: "base",
                                rrx: "RBX",
                                erx: "EBX",
                                rx: "BX",
                                rh: "BH",
                                rl: "BL",
                            })}
                            {registerListItem({
                                number: 4,
                                name: "stack pointer",
                                rrx: "RSP",
                                erx: "ESP",
                                rx: "SP",
                                rl: "SPL",
                                rl64Only: true,
                            })}
                            {registerListItem({
                                number: 5,
                                name: "base pointer",
                                rrx: "RBP",
                                erx: "EBP",
                                rx: "BP",
                                rl: "BPL",
                                rl64Only: true,
                            })}
                            {registerListItem({
                                number: 6,
                                name: "source index",
                                rrx: "RSI",
                                erx: "ESI",
                                rx: "SI",
                                rl: "SIL",
                                rl64Only: true,
                            })}
                            {registerListItem({
                                number: 7,
                                name: "destination index",
                                rrx: "RDI",
                                erx: "EDI",
                                rx: "DI",
                                rl: "DIL",
                                rl64Only: true,
                            })}
                        </UL>
                    </div>
                    <div className="column">
                        <p>
                            These registers are only accessible in <A href="/mode/long">Long Mode</A>.
                        </p>
                        <UL>
                            {longModeRegisterListItem(8)}
                            {longModeRegisterListItem(9)}
                            {longModeRegisterListItem(10)}
                            {longModeRegisterListItem(11)}
                            {longModeRegisterListItem(12)}
                            {longModeRegisterListItem(13)}
                            {longModeRegisterListItem(14)}
                            {longModeRegisterListItem(15)}
                        </UL>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
