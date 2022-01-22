/* =============================================================================
 * File:   Instruction.tsx
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

import A from "./A";
import InstructionTitles from "@data/InstructionTitles";

// convert a link to an instruction (key) to the correct URL
const Aliases: Record<string, keyof typeof InstructionTitles> = {
    cbw: "cbw-cwde-cdqe",
    cwde: "cbw-cwde-cdqe",
    cdqe: "cbw-cwde-cdqe",
    cmpxchg8b: "cmpxchg8b-cmpxchg16b",
    cmpxchg16b: "cmpxchg8b-cmpxchg16b",
};

// when simple capitalization isn't enough
const TitleCaseMapping: Partial<Record<keyof typeof InstructionTitles, string>> = {
    "bndcu-bndcn": "BNDCN/BNDCU",
    "cbw-cwde-cdqe": "CBW/CWDE/CDQE",
    "cmpxchg8b-cmpxchg16b": "CMPXCHG8B/CMPXCHG16B",
    "cmovcc": "CMOVcc",
    // ...
};

type InstructionProps = {
    /**
     * The (lowercased) mnemonic name to display.
     *
     * For example, to link to `Jcc`, `"jcc"` would be put here.
     */
    name: string;
    /**
     * Suppress the creation of a link.
     *
     * Used if an instruction is named multiple times in the same region of text
     *   (generally the same paragraph).
     */
    noLink?: boolean;
    /**
     * Suppress the display of a title.
     *
     * Used if an instruction is named multiple times in the same region of text
     *   (generally the same paragraph).
     */
    noTitle?: boolean;
    /**
     * Use a hyphen instead of parenthesis for the instruction title.
     *
     * By default, the instruction will be formatted as: `{name} ({title})`.
     * This changes that to `{name} - {title}`.
     */
    useHyphen?: boolean;
    /**
     * Use the aliased version for title case mapping.
     *
     * By default, the unaliased version is used for title case mapping.
     * This overrides that.
     *
     * This is designed for use on `/instruction`.
     */
    useAliasForTitleCaseMapping?: boolean;
}

/**
 * A wrapper to generate links to instruction pages.
 *
 * If a link is not desired, the `noLink` prop can be set to `true`.
 * This is desireable if the instruction is referenced multiple times in the
 *   same region (such as the same paragraph).
 *
 * If a title is not desired, the `noTitle` prop can be set to `true`.
 *
 * If the title and name should be separated with a hyphen (instead of appearing
 *   appearing in parenthesis), the `useHyphen` prop should be set to `true`.
 */
export default function Instruction(props: InstructionProps): React.ReactElement {
    const name = props.name;
    const aliasedName = Object.keys(Aliases).includes(name) ? Aliases[name] : name;

    let uppercased: string;
    if (props.useAliasForTitleCaseMapping)
        uppercased = Object.keys(TitleCaseMapping).includes(aliasedName) ? TitleCaseMapping[aliasedName] : aliasedName.toUpperCase();
    else
        uppercased = Object.keys(TitleCaseMapping).includes(name) ? TitleCaseMapping[name] : name.toUpperCase();

    let title: React.ReactElement = undefined;
    if (Object.keys(InstructionTitles).includes(aliasedName)) {
        title = props.useHyphen
            ? <> - {InstructionTitles[aliasedName]}</>
            : <> ({InstructionTitles[aliasedName]})</>;
    }

    if (props.noLink) {
        if (props.noTitle)
            return <code>{uppercased}</code>;
        return <><code>{uppercased}</code>{title}</>;
    }

    const href = `/instruction/${aliasedName[0]}/${aliasedName}`;
    if (props.noTitle)
        return <A href={href}><code>{uppercased}</code></A>;
    return <A href={href}><code>{uppercased}</code>{title}</A>;
}
