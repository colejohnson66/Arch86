/* This file is part of 80x86.
 * Copyright (c) 2021 Cole Tobin
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
 * You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { formatStringPlaintext, formatStringToJsx } from "../lib/FormatStringToJsx";

import A from "./A";
import InstructionTitles from "../data/instructions/Titles";
import React from "react";

function getInstructionName(name: string): string | undefined {
    const nameLower = name.toLowerCase();
    if (Object.keys(InstructionTitles).indexOf(nameLower) !== -1)
        return InstructionTitles[nameLower];
    return undefined;
}

type InstructionProps = {
    /**
     * The instruction name to display
     *
     * This string will appear unedited inside a \<code> block.
     * Any required capitalization (whether upper or lower) *must* be put here.
     * The default link will be to `/instruction/${name.toLowerCase()}`, but can
     *   be overridden with `as` (which will also be forced to lowercase).
     *
     * For example, to link to `Jcc`, `"Jcc"` would be put here.
     * When the link is generated, `/instruction/jcc` will be linked to.
     */
    name: string;
    /**
     * Override the instruction name in the `href`
     *
     * Used if the displayed instruction name is *not* the same as where the <A>
     *   will link to.
     * For example, a link to `VADDPD` would put `"addpd"` here.
     *
     * Ignored if `noLink` is `true`.
     */
    as?: string;
    /**
     * Don't implicitly create a link
     *
     * Used if an instruction is named multiple times in the same region of text
     *   (generally the same paragraph).
     */
    noLink?: boolean;
    /**
     * Suppress the display of a title
     *
     * Used if an instruction is named multiple times in the same region of text
     *   (generally the same paragraph).
     */
    noTitle?: boolean;
    /**
     * Don't format the instruction name (clean it)
     *
     * By default, instructions titles containing formatting directives are ran
     *   through a formatter (see `/lib/FormatStringToJsx.tsx`).
     * Set this prop to format "cleanly".
     * In other words, `formatStringPlaintext` is used if this prop is set.
     *
     * Ignored if the title is not shown (suppressed by `noLink` or `noTitle`)
     */
    clean?: boolean;
    /**
     * Use a hyphen instead of parenthesis for the instruction title
     *
     * By default, the instruction will be formatted as: `{name} ({title})`.
     * This changes that to `{name} - {title}`.
     */
    useHyphen?: boolean;
}

/**
 * A thin wrapper to generate links to instruction pages
 *
 * By default, the `name` is the linked instruction, but in some cases (ex. FMA),
 *   this is undesirable.
 * For these situations, the `name` will be what is displayed and the `as` will
 *   be what is linked.
 *
 * If a link is not desired, the `noLink` prop can be set to `true`.
 * This is desireable if the instruction is referenced multiple times in the same
 *   region (such as the same paragraph).
 * If that is the situation, it is recommended that `noTitle` be set as well.
 *
 * If a title is not desired, the `noTitle` prop can be set to `true`.
 *
 * If the title and name should be separated with a hyphen (instead of the title
 *   appearing in parenthesis), the `useHyphen` prop should be set to `true`.
 *
 * @example
 * // (href, text, titleShown)
 * <Instruction name="ADDPD" />                        // ("/instruction/addpd", "ADDPD", true)
 * <Instruction name="AND" noLink />                   // (undefined, "AND", false)
 * <Instruction name="BOUND" noTitle />                // ("/instruction/bound", "BOUND", false)
 * <Instruction name="CALL" noLink forceTitle />       // (undefined, "CALL", true)
 * <Instruction name="Jcc" />                          // ("/instruction/jcc", "Jcc", true)
 * <Instruction name="VFMADD132PD" as="vfmaddnnnpd" /> // ("/instruction/vfmaddnnnpd", "VFMADD132PD", true)
 */
export default function Instruction(props: InstructionProps): JSX.Element {
    const name = getInstructionName(props.name);
    let nameJsx: JSX.Element = <></>;
    if (name) {
        if (props.useHyphen) {
            if (props.clean)
                nameJsx = <> - {formatStringPlaintext(name)}</>;
            else
                nameJsx = <> - {formatStringToJsx(name)}</>;
        } else {
            if (props.clean)
                nameJsx = <> ({formatStringPlaintext(name)})</>;
            else
                nameJsx = <> ({formatStringToJsx(name)})</>;
        }
    }
    if (props.noLink) {
        if (props.noTitle)
            return <code>{props.name}</code>;
        return <><code>{props.name}</code>{nameJsx}</>;
    }

    const href = props.as
        ? `/instruction/${props.as.toLowerCase()}`
        : `/instruction/${props.name.toLowerCase()}`;
    if (props.noTitle)
        return <A href={href}><code>{props.name}</code></A>;
    return <A href={href}><code>{props.name}</code>{nameJsx}</A>;
}
