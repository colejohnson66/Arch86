/* =============================================================================
 * File:   index.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021-2022 Cole Tobin
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
import InstructionList from "@data/InstructionList";
import InstructionTitles from "@data/InstructionTitles";
import Layout from "@components/Layout";
import React from "react";
import Toc from "@components/Toc";

function InstructionArrayEntry(title: string, list: string[]): React.ReactElement {
    const fragments = list.map((item, idx) => (
        <React.Fragment key={idx}>
            <Instruction name={item} noTitle />
            {idx !== list.length - 1 && ", "}
        </React.Fragment>
    ));

    return <>{fragments}{" - "}{InstructionTitles[title]}</>;
}

export default function Page(): React.ReactElement {
    return (
        <Layout.Root navGroup="instruction" pageTitle="Instructions" canonical="/instruction">
            <Layout.Title title="Instructions" />
            <Breadcrumb.Root>
                <Breadcrumb.Item>Instructions</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingList" text="Mnemonic List">
                        {Object.keys(InstructionList).map((char) => (
                            <Toc.Entry key={char} href={`#headingList${char.toUpperCase()}`} text={char.toUpperCase()} />
                        ))}
                    </Toc.Entry>
                </Toc.Root>
                <p>
                    x86 is home to a few hundred instructions with other 3,600 different encodings.
                    This page lists all of them.
                </p>
                <p>
                    Up-to-date lists are available from <A href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html">Intel</A> and <A href="https://developer.amd.com/resources/developer-guides-manuals/">AMD</A>, however, they may be incomplete;
                    Undocumented and removed instructions may be missing from these manuals.
                </p>
                <Clear />

                <h2 id="headingList">Mnemonic List</h2>
                {Object.entries(InstructionList).map((outer) => (
                    <React.Fragment key={outer[0]}>
                        <h3 id={`headingList${outer[0].toUpperCase()}`}>{outer[0].toUpperCase()}</h3>
                        <ul>
                            {outer[1].map((inner) => (
                                Array.isArray(inner)
                                    ? <li key={inner[0]}>{InstructionArrayEntry(inner[0], inner.slice(1))}</li>
                                    : <li key={inner}><Instruction name={inner} useHyphen useAliasForTitleCaseMapping /></li>
                            ))}
                        </ul>
                    </React.Fragment>))}
            </Layout.Content>
        </Layout.Root>
    );
}
