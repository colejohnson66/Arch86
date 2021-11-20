/* =============================================================================
 * File:   index.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021 Cole Tobin
 *
 * This file is part of 80x86.
 *
 * 80x86 is free software: you can redistribute it and/or modify it under the
 *   terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * 80x86 is distributed in the hope that it will be useful, but WITHOUT ANY
 *   WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 *   FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
 *   more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 *   along with 80x86. If not, see <http://www.gnu.org/licenses/>.
 * =============================================================================
 */

import A from "@components/A";
import Breadcrumb from "@components/Breadcrumb";
import Clear from "@components/Clear";
import { GetGroupedInstructionList } from "@library/Instruction";
import { GetStaticProps } from "next";
import Instruction from "@components/Instruction";
import InstructionTitles from "@data/instructions/Titles";
import Layout from "@components/Layout";
import MaybeArray from "@myTypes/MaybeArray";
import React from "react";
import Toc from "@components/Toc";
import UppercaseMnemonic from "@library/UppercaseMnemonic";

function CommaSeparatedLinks(list: string[]): React.ReactElement {
    // list[0] is the name in `InstructionTitles`
    // list[1..] is the instructions
    const fragments = list.slice(1).map((item, idx) => (
        <React.Fragment key={idx}>
            <Instruction name={UppercaseMnemonic(item)} as={item} noTitle />
            {idx !== list.length - 2 && ", " /* 2 because: 1 as always, and one for the slice offset */}
        </React.Fragment>
    ));

    return <>{fragments}{" - "}{InstructionTitles[list[0]]}</>;
}

function InstructionListWithHeading(list: MaybeArray<string>[], char: string): React.ReactElement {
    // each entry in `list` is either a mnemonic, or an array
    // if it's an array, the first element is a key into `InstructionTitles`, and the rest are mnemonics
    char = char.toUpperCase();
    return (
        <React.Fragment key={char}>
            <h3 id={`headingList${char}`}>{char}</h3>
            <ul>
                {list.map((item) => (
                    Array.isArray(item)
                        ? <li key={item[0]}>{CommaSeparatedLinks(item)}</li>
                        : <li key={item}><Instruction name={UppercaseMnemonic(item)} as={item} useHyphen /></li>
                ))}
            </ul>
        </React.Fragment>
    );
}

type PageProps = {
    instructions: Record<string, MaybeArray<string>[]>;
};

export default function Page(props: PageProps): React.ReactElement {
    return (
        <Layout.Root navGroup="instruction" pageTitle="Instructions">
            <Layout.Title title="Instructions" />
            <Breadcrumb.Root>
                <Breadcrumb.Item>Instructions</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingList" text="Mnemonic List">
                        {Object.keys(props.instructions).map((char) => (
                            char.toUpperCase()
                        )).map((char) => (
                            <Toc.Entry key={char} href={`#headingList${char}`} text={char} />
                        ))}
                    </Toc.Entry>
                </Toc.Root>
                <p>
                    x86 is home to a few hundred instructions with other 3,600 different encodings.
                    Up-to-date lists are available from <A href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html">Intel</A> and <A href="https://developer.amd.com/resources/developer-guides-manuals/">AMD</A>, however, they may be incomplete;
                    Undocumented and removed instructions may be missing from these manuals.
                </p>
                <Clear />

                <h2 id="headingList">Mnemonic List</h2>
                {Object.keys(props.instructions).map((char) => InstructionListWithHeading(props.instructions[char], char))}
            </Layout.Content>
        </Layout.Root>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            instructions: GetGroupedInstructionList(),
        },
    };
};
