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

import A from "@components/A";
import InstructionTitles from "@data/InstructionTitles";

// convert a link to an instruction (key) to the correct URL
export const Aliases: Record<string, keyof typeof InstructionTitles> = {
    bndcu: "bndcu-bndcn",
    bndcn: "bndcu-bndcn",
    //
    cbw: "cbw-cwde-cdqe",
    cwde: "cbw-cwde-cdqe",
    cdqe: "cbw-cwde-cdqe",
    //
    cmova: "cmovcc",
    cmovae: "cmovcc",
    cmovb: "cmovcc",
    cmovbe: "cmovcc",
    cmovc: "cmovcc",
    cmove: "cmovcc",
    cmovg: "cmovcc",
    cmovge: "cmovcc",
    cmovl: "cmovcc",
    cmovle: "cmovcc",
    cmovna: "cmovcc",
    cmovnae: "cmovcc",
    cmovnb: "cmovcc",
    cmovnbe: "cmovcc",
    cmovnc: "cmovcc",
    cmovne: "cmovcc",
    cmovng: "cmovcc",
    cmovnge: "cmovcc",
    cmovnl: "cmovcc",
    cmovnle: "cmovcc",
    cmovno: "cmovcc",
    cmovnp: "cmovcc",
    cmovns: "cmovcc",
    cmovnz: "cmovcc",
    cmovp: "cmovcc",
    cmovpe: "cmovcc",
    cmovpo: "cmovcc",
    cmovs: "cmovcc",
    cmovz: "cmovcc",
    //
    cmpxchg8b: "cmpxchg8b-cmpxchg16b",
    cmpxchg16b: "cmpxchg8b-cmpxchg16b",
    //
    incsspd: "incsspd-incsspq",
    incsspq: "incsspd-incsspq",
    //
    ja: "jcc",
    jae: "jcc",
    jb: "jcc",
    jbe: "jcc",
    jc: "jcc",
    je: "jcc",
    jg: "jcc",
    jge: "jcc",
    jl: "jcc",
    jle: "jcc",
    jna: "jcc",
    jnae: "jcc",
    jnb: "jcc",
    jnbe: "jcc",
    jnc: "jcc",
    jne: "jcc",
    jng: "jcc",
    jnge: "jcc",
    jnl: "jcc",
    jnle: "jcc",
    jno: "jcc",
    jnp: "jcc",
    jns: "jcc",
    jnz: "jcc",
    jp: "jcc",
    jpe: "jcc",
    jpo: "jcc",
    js: "jcc",
    jz: "jcc",
    //
    kaddb: "kaddn",
    kaddw: "kaddn",
    kaddd: "kaddn",
    kaddq: "kaddn",
    //
    kandb: "kandn",
    kandw: "kandn",
    kandd: "kandn",
    kandq: "kandn",
    //
    kandnb: "kandnn",
    kandnw: "kandnn",
    kandnd: "kandnn",
    kandnq: "kandnn",
    //
    kmovb: "kmovn",
    kmovw: "kmovn",
    kmovd: "kmovn",
    kmovq: "kmovn",
    //
    knotb: "knotn",
    knotw: "knotn",
    knotd: "knotn",
    knotq: "knotn",
    //
    korb: "korn",
    korw: "korn",
    kord: "korn",
    korq: "korn",
    //
    kortestb: "kortestn",
    kortestw: "kortestn",
    kortestd: "kortestn",
    kortestq: "kortestn",
    //
    kshiftlb: "kshiftln",
    kshiftlw: "kshiftln",
    kshiftld: "kshiftln",
    kshiftlq: "kshiftln",
    //
    kshiftrb: "kshiftrn",
    kshiftrw: "kshiftrn",
    kshiftrd: "kshiftrn",
    kshiftrq: "kshiftrn",
    //
    ktestb: "ktestn",
    ktestw: "ktestn",
    ktestd: "ktestn",
    ktestq: "ktestn",
    //
    kunpckbw: "kunpcknn",
    kunpckwd: "kunpcknn",
    kunpckdq: "kunpcknn",
    //
    kxnorb: "kxnorn",
    kxnorw: "kxnorn",
    kxnord: "kxnorn",
    kxnorq: "kxnorn",
    //
    kxorb: "kxorn",
    kxorw: "kxorn",
    kxord: "kxorn",
    kxorq: "kxorn",
    //
    lds: "lds-les-lfs-lgs-lss",
    les: "lds-les-lfs-lgs-lss",
    lfs: "lds-les-lfs-lgs-lss",
    lgs: "lds-les-lfs-lgs-lss",
    lss: "lds-les-lfs-lgs-lss",
    //
    lgdt: "lgdt-lidt-lldt",
    lidt: "lgdt-lidt-lldt",
    lldt: "lgdt-lidt-lldt",
    //
    loop: "loop-loopcc",
    loopcc: "loop-loopcc",
    loope: "loop-loopcc",
    loopne: "loop-loopcc",
};

// when simple capitalization isn't enough
export const TitleCaseMapping: Partial<Record<keyof typeof InstructionTitles, string>> = {
    "bndcu-bndcn": "BNDCN/BNDCU",
    "cbw-cwde-cdqe": "CBW/CWDE/CDQE",
    "cmpxchg8b-cmpxchg16b": "CMPXCHG8B/CMPXCHG16B",
    "cmovcc": "CMOVcc",
    "fcmovcc": "FCMOVcc",
    "incsspd-incsspq": "INCSSPD/INCSSPQ",
    "jcc": "Jcc",
    "kaddn": "KADDn",
    "kandn": "KANDn",
    "kandnn": "KANDNn",
    "kmovn": "KMOVn",
    "knotn": "KNOTn",
    "korn": "KORn",
    "kortestn": "KORTESTn",
    "kshiftln": "KSHIFTLn",
    "kshiftrn": "KSHIFTRn",
    "ktestn": "KTESTn",
    "kunpcknn": "KUNPCKnn",
    "kxnorn": "KXNORn",
    "kxorn": "KXORn",
    "lds-les-lfs-lgs-lss": "LDS/LES/LFS/LGS/LSS",
    "lgdt-lidt-lldt": "LGDT/LIDT/LLDT",
    "loop-loopcc": "LOOP/LOOPcc",
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
