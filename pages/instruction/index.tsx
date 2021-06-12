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

import { BreadcrumbProps, Callout, H1, H2, H3, UL } from "@blueprintjs/core";

import A from "../../components/A";
import { GetStaticProps } from "next";
import IDictionary from "../../types/IDictionary";
import Instruction from "../../components/Instruction";
import InstructionTitles from "../../data/instructions/Titles";
import Layout from "../../components/Layout";
import MaybeArray from "../../types/MaybeArray";
import React from "react";
import TOC from "../../components/TOC";
import WIP from "../../components/WIP";
import { getGroupedInstructionList } from "../../lib/instruction";
import uppercaseMnemonic from "../../lib/uppercaseMnemonic";

function commaSeparatedLinks(list: string[]): JSX.Element {
    // list[0] is the name in `InstructionTitles`
    // list[1..] is the instructions
    const fragments = list.slice(1).map((item, idx, sliced) => (
        <React.Fragment key={idx}>
            <Instruction name={uppercaseMnemonic(item)} as={item} noTitle />
            {idx !== sliced.length - 1 && ", "}
        </React.Fragment>
    ));

    return (
        <>
            {fragments}
            {" - "}
            {InstructionTitles[list[0]]}
        </>
    );
}

function instructionListWithHeading(list: MaybeArray<string>[], char: string): JSX.Element {
    return (
        <React.Fragment key={char}>
            <H3 id={`headingList${char.toUpperCase()}`}>{char.toUpperCase()}</H3>
            <UL>
                {list.map((item) => {
                    // Join related instructions (`string[]` in the YAML)
                    if (Array.isArray(item)) {
                        return (
                            <li key={item[0]}>
                                {commaSeparatedLinks(item)}
                            </li>
                        );
                    }

                    return (
                        <li key={item}>
                            <Instruction name={uppercaseMnemonic(item)} as={item} useHyphen />
                        </li>
                    );
                })}
            </UL>
        </React.Fragment>
    );
}

type PageProps = {
    instructions: IDictionary<(string | string[])[]>;
};

export default function Page(props: PageProps): JSX.Element {
    const PageBreadcrumbs: BreadcrumbProps[] = [
        { text: "Instructions" },
    ];

    return (
        <Layout canonical="/instruction" navGroup="instruction" title="Instructions" src="/pages/instruction.tsx" breadcrumbs={PageBreadcrumbs}>
            <TOC.Root>
                <TOC.Entry href="#headingList" text="List">
                    {Object.keys(props.instructions).map((char) => (
                        char.toUpperCase()
                    )).map((char) => (
                        <TOC.Entry key={char} href={`#headingList${char}`} text={char} />
                    ))}
                </TOC.Entry>
            </TOC.Root>
            <div id="content">
                <H1>x86 Instructions</H1>
                <p>
                    x86 is home to a few hundred instructions with over 3,000 different encodings.
                    An up-to-date list is available in PDF form on <A href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html">Intel&apos;s website</A> (see volume 2).
                </p>

                <H2 id="headingList">List</H2>
                <WIP type="section" />
                <Callout intent="primary">
                    This list is updated manually, and, as such, may not be current.
                    It is currently being created to follow version 074 of the <A href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html">Intel SDM</A>.
                    In addition to the documented instructions in the software developer manual (SDM), undocumented and AMD-exclusive instructions (such as the XOP set) are included here.
                </Callout>

                {Object.keys(props.instructions).map((char) => (
                    instructionListWithHeading(props.instructions[char], char)
                ))}
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            instructions: getGroupedInstructionList(),
        },
    };
};
