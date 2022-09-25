/* =============================================================================
 * File:   InstructionPageLayout.tsx
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

import MaybeArray, { CoerceToArray } from "@myTypes/MaybeArray";

import A from "@components/A";
import Breadcrumb from "@components/Breadcrumb";
import Clear from "@components/Clear";
import Instruction from "@components/Instruction";
import Layout from "@components/Layout";
import React from "react";
import Scrollable from "@components/Scrollable";
import SyntaxHighlighter from "react-syntax-highlighter";
import SyntaxHighlighterTheme from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import Unit from "@components/Unit";

type OpcodeValiditySuperscripts = "1";
type OpcodeValidityValues = "valid" | `valid${OpcodeValiditySuperscripts}` | "invalid" | "n/e" | "n/p" | "n/s";
const OpcodeValidityMap: Record<OpcodeValidityValues, React.ReactNode> = {
    "valid": <td className="text-center bg-green-300">Valid</td>,
    "valid1": <td className="text-center bg-green-300">Valid<sup>1</sup></td>,
    "invalid": <td className="text-center bg-red-300">Invalid</td>,
    "n/e": <td className="text-center bg-red-300"><abbr title="Not Encodable">N/E</abbr></td>,
    "n/p": <td className="text-center bg-yellow-300"><abbr title="Not Prefixable">N/P</abbr></td>,
    "n/s": <td className="text-center bg-yellow-300"><abbr title="Not Supported">N/S</abbr></td>,
};
const OpcodeValidityMapString: Record<OpcodeValidityValues, React.ReactNode> = {
    "valid": "valid",
    "valid1": <>valid<sup>1</sup></>,
    "invalid": "invalid",
    "n/e": <abbr title="Not Encodable">N/E</abbr>,
    "n/p": <abbr title="Not Prefixable">N/P</abbr>,
    "n/s": <abbr title="Not Supported">N/S</abbr>,
};
type OpcodeEntryValidity = {
    16: OpcodeValidityValues;
    32: OpcodeValidityValues;
    64: OpcodeValidityValues;
}
type OpcodeEntry = {
    opcode: React.ReactNode;
    mnemonic: React.ReactNode;
    encoding: EncodingKey;
    validity: OpcodeEntryValidity;
    cpuid?: MaybeArray<string>;
    description: React.ReactNode;
};

// 0: ST(0)
// A: accumulator
// B: imm8(4..7)
// I: immediate
// M: ModRM.r/m
// O: opcode(0..2)
// P: pointer (imm16+imm)
// R: ModRM.reg
// V: VEX.vvvv / XOP.vvvv / EVEX.vvvvv
// ZO: none
type EncodingKeyNoEvex = "0m" | "ai" | "i" | "ii" | "m" | "m0" | "mi" | "mr"
    | "mri" | "o" | "p" | "rm" | "rmb" | "rmi" | "rmv" | "rvm" | "rvmb" | "rvmi"
    | "vm" | "zo";
type EncodingEntryNoEvex = Partial<Record<EncodingKeyNoEvex, string[]>>;
//
type EncodingKey = EncodingKeyNoEvex | `e${EncodingKeyNoEvex}`;
//
type EncodingTupleType = "full" | "half" | "full-mem" | "tuple1-scalar"
    | "tuple1-fixed" | "tuple2" | "tuple4" | "tuple8" | "half-mem"
    | "quarter-mem" | "eighth-mem" | "mem128" | "movddup";
type EncodingTupleNonEvexArrayType = ["n/a", string]
    | ["n/a", string, string]
    | ["n/a", string, string, string]
    | ["n/a", string, string, string, string];
type EncodingTupleArrayType = [EncodingTupleType, string]
    | [EncodingTupleType, string, string]
    | [EncodingTupleType, string, string, string]
    | [EncodingTupleType, string, string, string, string];
type EncodingEntryEvex = Partial<Record<EncodingKeyNoEvex, EncodingTupleNonEvexArrayType>> &
    Partial<Record<`e${EncodingKeyNoEvex}`, EncodingTupleArrayType>>;

type Flags = {
    CF?: React.ReactNode;
    PF?: React.ReactNode;
    AF?: React.ReactNode;
    ZF?: React.ReactNode;
    SF?: React.ReactNode;
    TF?: React.ReactNode;
    IF?: React.ReactNode;
    DF?: React.ReactNode;
    OF?: React.ReactNode;
    // IOPL?: React.ReactNode;
    NT?: React.ReactNode;
    RF?: React.ReactNode;
    VM?: React.ReactNode;
    AC?: React.ReactNode;
    VIF?: React.ReactNode;
    VIP?: React.ReactNode;
    ID?: React.ReactNode;
    //
    C0?: React.ReactNode;
    C1?: React.ReactNode;
    C2?: React.ReactNode;
    C3?: React.ReactNode;
};

// NMI (2) and CSO (9) are left out; 15, 22-27, and 31 are reserved
type ExceptionAbbr = "DE" | "DB" | "BP" | "OF" | "BR" | "UD" | "NM" | "DF0"
    | "TSSel" | "NPSel" | "SS0" | "SSSel" | "GP0" | "GPSel" | "PF" | "MF"
    | "AC0" | "MC" | "XM" | "VE" | "CP" | "HV" | "VC" | "SX";
type ExceptionList = Partial<Record<ExceptionAbbr, MaybeArray<React.ReactNode>>>;
type VexExceptions = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "11" | "12" | "13";
type EvexExceptions = "e1" | "e1nf" | "e2" | "e3" | "e3nf" | "e4" | "e4nf"
    | "e5" | "e5nf" | "e6" | "e6nf" | "e7nm" | "e9" | "e9nf" | "e10" | "e10nf"
    | "e11" | "e12" | "e12np" | "k20" | "k21"; // TODO: Should K20 and K21 be here or elsewhere?
type OtherExceptionList = {
    vex?: VexExceptions;
    evex?: EvexExceptions;
} & ExceptionList;
type ExceptionsList = {
    real?: ExceptionList | "none";
    virtual?: ExceptionList | "none";
    protected?: ExceptionList | "none";
    compatibility?: ExceptionList | "none";
    long?: ExceptionList | "none";
    //
    fpu?: ExceptionList | "none";
    simd?: ExceptionList | "none";
    other?: OtherExceptionList;
}

export type InstructionPageLayoutProps = {
    wip?: boolean;
    id: string;
    title: React.ReactNode;
    titlePlain: string;
    opcodes: (OpcodeEntry | "")[];
    opcodeNotes?: MaybeArray<React.ReactNode>;
    encodings: EncodingEntryNoEvex | EncodingEntryEvex;
    description: React.ReactNode;
    operation: string;
    operationNotes?: MaybeArray<React.ReactNode>;
    examples?: MaybeArray<string>;
    flags?: Flags | "none";
    intrinsics?: string[] | "autogen";
    exceptions: ExceptionsList;
};

const ExceptionAbbrMap: Record<ExceptionAbbr, React.ReactNode> = {
    DE: <abbr title="Divide-by-Zero Error">#DE</abbr>,
    DB: <abbr title="Debug Exception">#DB</abbr>,
    BP: <abbr title="Breakpoint">#BP</abbr>,
    OF: <abbr title="Overflow">#OF</abbr>,
    BR: <abbr title="BOUND Range Exceeded">#BR</abbr>,
    UD: <abbr title="Invalid/Undefined Opcode">#UD</abbr>,
    NM: <abbr title="Device Not Available / No Math Coprocessor">#NM</abbr>,
    DF0: <abbr title="Double Fault">#DF(0)</abbr>,
    TSSel: <abbr title="Invalid TSS">#TS(sel)</abbr>,
    NPSel: <abbr title="Segment Not Present">#NP(sel)</abbr>,
    SS0: <abbr title="Stack Segment">#SS(0)</abbr>,
    SSSel: <abbr title="Stack Segment Selector Not &quot;Present&quot;">#SS(sel)</abbr>,
    GP0: <abbr title="General Protection Fault">#GP(0)</abbr>,
    GPSel: <abbr title="General Protection Fault">#GP(sel)</abbr>,
    PF: <abbr title="Page Fault">#PF(fc)</abbr>,
    MF: <abbr title="FPU Floating Point Error / Math Fault">#MF</abbr>,
    AC0: <abbr title="Alignment Check Fault">#AC(0)</abbr>,
    MC: <abbr title="Machine Check">#MC</abbr>,
    XM: <abbr title="SIMD Floating Point Exception">#XM</abbr>,
    VE: <abbr title="Virtualization Exception (VT)">#VE</abbr>,
    CP: <abbr title="Control Protection Exception (CET)">#CP</abbr>,
    HV: <abbr title="Hypervisor Injection Exception (SVM)">#HV</abbr>,
    VC: <abbr title="VMM Communication Exception (SVM)">#VC</abbr>,
    SX: <abbr title="Security Exception (SVM)">#SX</abbr>,
};

function Plural<T>(value: number, singular: T, plural: T): T {
    if (value === 1)
        return singular;
    return plural;
}

function FormatCpuidListBreaks(list: string[]): React.ReactNode {
    if (list.length === 1)
        return <code>{list[0]}</code>;

    const ret: React.ReactNode[] = list.map((feature, idx) => {
        if (idx === list.length - 1)
            return <code key={idx}>{feature}</code>;
        return <React.Fragment key={idx}><code>{feature}</code><br /></React.Fragment>;
    });
    return <>{ret}</>;
}

function FormatCpuidListComma(list: string[]): React.ReactNode {
    if (list.length === 1)
        return <code>{list[0]}</code>;

    const ret: React.ReactNode[] = list.map((feature, idx) => {
        if (idx === list.length - 1)
            return <code key={idx}>{feature}</code>;
        return <React.Fragment key={idx}><code>{feature}</code>, </React.Fragment>;
    });
    return <>{ret}</>;
}

function FormatFlagEntry(name: string, description?: string, line?: React.ReactNode): React.ReactNode | undefined {
    if (!line)
        return undefined;

    if (description) {
        return (
            <>
                <dt><code>{name}</code> ({description})</dt>
                <dd>{line}</dd>
            </>);
    }

    return (
        <>
            <dt><code>{name}</code></dt>
            <dd>{line}</dd>
        </>
    );
}

function FormatNormalExceptionsList(list: ExceptionList | "none"): React.ReactNode {
    if (typeof list === "string" && list === "none")
        return <>None.</>;

    const ret: React.ReactNode[] = [];

    // each key is the exception code
    Object.entries(list).forEach((group) => {
        const key = group[0];
        const text = group[1];
        ret.push(<dt key={`${key}dt`}><code>{ExceptionAbbrMap[key]}</code></dt>);
        ret.push(
            <dd key={`${key}dd`}>
                <ul>
                    {CoerceToArray(text).map((description, idx) => (
                        <li key={idx}>{description}</li>
                    ))}
                </ul>
            </dd>
        );
    });
    return <>{ret}</>;
}

function FormatOtherExceptionsList(list: OtherExceptionList): React.ReactNode {
    const { vex, evex, ...rest } = list;
    return (
        <>
            <p>
                {vex &&
                    <>VEX Encoded Form: See <A href={`/instruction/help#headingExceptionsVex${vex.toUpperCase()}`}>Type {vex.toUpperCase()} Exception Conditions</A>.</>}
                {vex && evex &&
                    <br />}
                {evex &&
                    <>EVEX Encoded Form: See <A href={`/instruction/help#headingExceptionsEvex${evex.toUpperCase()}`}>Type {evex.toUpperCase()} Exception Conditions</A>.</>}
            </p>
            {rest &&
                FormatNormalExceptionsList(rest)}
        </>
    );
}

export default function InstructionPageLayout(props: InstructionPageLayoutProps): React.ReactElement {
    const hasCpuid = typeof props.opcodes[0] !== "string" && props.opcodes[0]?.cpuid !== undefined;
    const encodingHasTuple = Object.keys(props.encodings).includes("evex");
    const operandCount = Object.values(props.encodings)[0].length - (encodingHasTuple ? 1 : 0);
    return (
        <Layout.Root navGroup="instruction" pageTitle={props.title} canonical={`/instruction/${props.id[0]}/${props.id}`}>
            {/* TODO: include mnemonic here */}
            <Layout.Title title={props.titlePlain} />
            <Breadcrumb.Root>
                <Breadcrumb.Item href="/instruction">Instructions</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                {/* TODO: TOC */}
                {props.wip &&
                    <></>}
                <Scrollable>
                    <table className="instruction-overview">
                        <thead>
                            <tr className="hidden lg:table-row">
                                <th>Opcode</th>
                                <th><A href="#headingEncoding">Encoding</A></th>
                                <th><Unit value={16} unit="bit" /></th>
                                <th><Unit value={32} unit="bit" /></th>
                                <th><Unit value={64} unit="bit" /></th>
                                {hasCpuid && <th><Instruction name="cpuid" noTitle /> Feature Flag(s)</th>}
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.opcodes.map((row, idx) => {
                                if (typeof row === "string" && row === "") {
                                    return (
                                        <React.Fragment key={idx}>
                                            <tr className="hidden lg:table-row">
                                                <td colSpan={hasCpuid ? 7 : 6} />
                                            </tr>
                                            <tr className="lg:invisible" aria-hidden="true">
                                                <td />
                                            </tr>
                                        </React.Fragment>
                                    );
                                }

                                return (
                                    <React.Fragment key={idx}>
                                        <tr className="hidden lg:table-row">
                                            <td className="text-sm">
                                                <code className="px-1">{row.opcode}</code>
                                                <hr />
                                                <code className="px-1 whitespace-normal">{row.mnemonic}</code>
                                            </td>
                                            <td className="text-center"><code>{row.encoding}</code></td>
                                            {OpcodeValidityMap[row.validity[16]]}
                                            {OpcodeValidityMap[row.validity[32]]}
                                            {OpcodeValidityMap[row.validity[64]]}
                                            {row.cpuid &&
                                                <td className="text-center">{FormatCpuidListBreaks(CoerceToArray(row.cpuid))}</td>}
                                            <td>{row.description}</td>
                                        </tr>
                                        <tr className="lg:hidden" aria-hidden="true">
                                            <td>
                                                <span className="whitespace-nowrap">
                                                    <b>Opcode:</b>
                                                    {" "}<code className="text-sm">{row.opcode}</code>
                                                </span>
                                                <br />
                                                <span>
                                                    <b>Mnemonic:</b>
                                                    {" "}<code className="text-sm whitespace-normal">{row.mnemonic}</code>
                                                </span>
                                                <hr />
                                                <span className="whitespace-nowrap">
                                                    <b>Encoding:</b>
                                                    {" "}<code>{row.encoding}</code></span>
                                                <br />
                                                <span>
                                                    <b>Validity (16/32/64 bit):</b>
                                                    {" "}{OpcodeValidityMapString[row.validity[16]]},
                                                    {" "}{OpcodeValidityMapString[row.validity[32]]},
                                                    {" "}{OpcodeValidityMapString[row.validity[64]]}
                                                </span>
                                                <br />
                                                {hasCpuid &&
                                                    <>
                                                        <b><Instruction name="cpuid" noTitle /> Feature Flag(s):</b>
                                                        {" "}{FormatCpuidListComma(CoerceToArray(row.cpuid))}
                                                    </>}
                                                <hr />
                                                {row.description}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </Scrollable>
                {props.opcodeNotes &&
                    <ol className="ml-4">
                        {CoerceToArray(props.opcodeNotes).map((note, idx) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ol>}

                <h2 id="headingEncoding">Encoding</h2>
                <Scrollable>
                    <table className="instruction-table">
                        <thead>
                            <tr>
                                <th>Encoding</th>
                                {encodingHasTuple && <th>Tuple Type</th>}
                                {operandCount === 1
                                    ? <th>Operand</th>
                                    : [...Array(operandCount)].map((_, idx) => (
                                        <th key={idx}>Operand {idx + 1}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* TODO: this JSX is messy; use functions */}
                            {Object.entries(props.encodings).map((entry) => (
                                <tr key={entry[0]}>
                                    <td><code id={`#encoding${entry[0].toUpperCase()}`}>{entry[0]}</code></td>
                                    {entry[1].map((operand, idx) => (
                                        <td key={operand}>
                                            {/* is this an empty or a "tuple type" cell? */}
                                            {/* TODO: don't just wrap the cell in <code>, but selectively monospace and use <abbr> */}
                                            {operand === "" || operand.startsWith("None") || (encodingHasTuple && idx === 0)
                                                ? operand
                                                : <code>{operand}</code>}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Scrollable>
                <Clear />

                <h2 id="headingDescription">Description</h2>
                {props.description}

                <h2 id="headingOperation">Operation</h2>
                <div className="p-2">
                    <Scrollable>
                        <SyntaxHighlighter language="csharp" style={SyntaxHighlighterTheme}>
                            {props.operation}
                        </SyntaxHighlighter>
                    </Scrollable>
                </div>
                {props.operationNotes &&
                    <ol className="ml-4">
                        {CoerceToArray(props.operationNotes).map((note, idx) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ol>}

                {props.examples &&
                    <>
                        <h2 id="headingExamples">{Plural(props.examples.length, "Example", "Examples")}</h2>
                        {CoerceToArray(props.examples).map((example, idx) => (
                            <Scrollable key={idx}>
                                <SyntaxHighlighter language="x86asm" style={SyntaxHighlighterTheme}>
                                    {example}
                                </SyntaxHighlighter>
                            </Scrollable>
                        ))}
                    </>}

                {props.flags &&
                    <>
                        <h2 id="headingFlags">Flags Affected</h2>
                        {typeof props.flags === "string" && props.flags === "none"
                            ? <>None.</>
                            : <dl>
                                {FormatFlagEntry("CF", "carry flag", props.flags.CF)}
                                {FormatFlagEntry("PF", "parity flag", props.flags.PF)}
                                {FormatFlagEntry("AF", "auxiliary flag", props.flags.AF)}
                                {FormatFlagEntry("ZF", "zero flag", props.flags.ZF)}
                                {FormatFlagEntry("SF", "sign flag", props.flags.SF)}
                                {FormatFlagEntry("TF", "trap flag", props.flags.TF)}
                                {FormatFlagEntry("IF", "interrupt enable flag", props.flags.IF)}
                                {FormatFlagEntry("DF", "direction flag", props.flags.DF)}
                                {FormatFlagEntry("OF", "overflow flag", props.flags.OF)}
                                {/* {FormatFlagEntry("IOPL", "IO privilege level", props.flags.IOPL)} */}
                                {FormatFlagEntry("NT", "nested task flag", props.flags.NT)}
                                {FormatFlagEntry("RF", "resume flag", props.flags.RF)}
                                {FormatFlagEntry("VM", "virtual-8086 mode", props.flags.VM)}
                                {FormatFlagEntry("AC", "alignment check flag", props.flags.AC)}
                                {FormatFlagEntry("VIF", "virtual interrupt flag", props.flags.VIF)}
                                {FormatFlagEntry("VIP", "virtual interrupt pending", props.flags.VIP)}
                                {FormatFlagEntry("ID", "identification flag", props.flags.ID)}
                                {FormatFlagEntry("C0", undefined, props.flags.C0)}
                                {FormatFlagEntry("C1", undefined, props.flags.C1)}
                                {FormatFlagEntry("C2", undefined, props.flags.C2)}
                                {FormatFlagEntry("C3", undefined, props.flags.C3)}
                            </dl>}
                    </>}

                {props.intrinsics &&
                    <>
                        <h2 id="headingIntrinsics">Intrinsics</h2>
                        {typeof props.intrinsics === "string" && props.intrinsics === "autogen"
                            ? <p>
                                None. Auto-generated by compiler.
                            </p>
                            : <Scrollable>
                                <SyntaxHighlighter language="c-like" style={SyntaxHighlighterTheme}>
                                    {props.intrinsics.join("\n")}
                                </SyntaxHighlighter>
                            </Scrollable>}
                    </>}

                <h2 id="headingExceptions">Exceptions</h2>
                {props.exceptions.real &&
                    <>
                        <h3 id="headingExceptionsReal">Real-Address Mode</h3>
                        {FormatNormalExceptionsList(props.exceptions.real)}
                    </>}
                {props.exceptions.virtual &&
                    <>
                        <h3 id="headingExceptionsVirtual">Virtual-8086 Mode</h3>
                        {FormatNormalExceptionsList(props.exceptions.virtual)}
                    </>}
                {props.exceptions.protected &&
                    <>
                        <h3 id="headingExceptionsProtected">Protected Mode</h3>
                        {FormatNormalExceptionsList(props.exceptions.protected)}
                    </>}
                {props.exceptions.compatibility &&
                    <>
                        <h3 id="headingExceptionsCompatibility">Compatibility Mode</h3>
                        {FormatNormalExceptionsList(props.exceptions.compatibility)}
                    </>}
                {props.exceptions.long &&
                    <>
                        <h3 id="headingExceptionsLong">Long Mode</h3>
                        {FormatNormalExceptionsList(props.exceptions.long)}
                    </>}
                {props.exceptions.fpu &&
                    <>
                        <h3 id="headingExceptionsFpu">Legacy Floating-Point</h3>
                        {FormatNormalExceptionsList(props.exceptions.fpu)}
                    </>}
                {props.exceptions.simd &&
                    <>
                        <h3 id="headingExceptionsSimd">SIMD Floating-Point</h3>
                        {FormatNormalExceptionsList(props.exceptions.simd)}
                    </>}
                {props.exceptions.other &&
                    <>
                        <h3 id="headingExceptionsOther">Other Exceptions</h3>
                        {FormatOtherExceptionsList(props.exceptions.other)}
                    </>}
            </Layout.Content>
        </Layout.Root>
    );
}
