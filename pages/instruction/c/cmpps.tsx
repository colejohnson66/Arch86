/* =============================================================================
 * File:   cmpps.tsx
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

import InstructionPageLayout, { InstructionPageLayoutProps } from "@components/InstructionPageLayout";

import A from "@components/A";
import Canned from "@library/Canned";
import Exceptions from "@library/Exceptions";
import Scrollable from "@components/Scrollable";
import Unit from "@components/Unit";

const k2z = "{k2}{z}";
const sae = "{sae}";

type TrueOrFalse = "t" | "f";
type SignalsQNaN = "y" | "n";
type Ops = `${TrueOrFalse}${TrueOrFalse}${TrueOrFalse}${TrueOrFalse}${SignalsQNaN}`;
function PredicateTableEntry(imm8: number, predicate: string, title: string, ops: Ops): React.ReactElement {
    const Ops = {
        "t": "true",
        "f": "false",
        "y": "yes",
        "n": "no",
    };
    return (
        <tr>
            <td><code>{imm8.toString(16).padStart(2, "0").toUpperCase()}h</code></td>
            <td><code>{predicate}</code></td>
            <td>{title}</td>
            <td>{Ops[ops[0]]}</td>
            <td>{Ops[ops[1]]}</td>
            <td>{Ops[ops[2]]}</td>
            <td>{Ops[ops[3]]}</td>
            <td>{Ops[ops[4]]}</td>
        </tr>
    );
}

function PseudoMnemonicLegacyTableEntry(suffix: string, imm8: number): React.ReactElement {
    return (
        <tr>
            <td><code>CMP<b>{suffix}</b>PS <i>src1</i>, <i>src2</i></code></td>
            <td><code>CMPPS <i>src1</i>, <i>src2</i>, {imm8.toString(16).padStart(2, "0").toUpperCase()}h</code></td>
        </tr>
    );
}

function PseudoMnemonicVectorTableEntry(suffix: string, imm8: number): React.ReactElement {
    return (
        <tr>
            <td><code>VCMP<b>{suffix}</b>PS <i>dest</i>, <i>src1</i>, <i>src2</i></code></td>
            <td><code>VCMPPS <i>dest</i>, <i>src1</i>, <i>src2</i>, {imm8.toString(16).padStart(2, "0").toUpperCase()}h</code></td>
        </tr>
    );
}

const PageData: InstructionPageLayoutProps = {
    id: "cmpps",
    title: <>Compare Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Compare Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>NP 0F C2 /r <i>ib</i></>,
            mnemonic: <>CMPPS <i>xmm1</i>, <i>xmm2/m128</i>, <i>imm8</i></>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse",
            description:
                <>
                    Compare packed single-precision floating-point values from <i>xmm1</i> and <i>xmm2/m128</i>.
                    Use bits <code>0..2</code> of <i>imm8</i> as a comparison predicate.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.NP.0F.WIG C2 /r <i>ib</i></>,
            mnemonic: <>VCMPPS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i>, <i>imm8</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Compare packed single-precision floating-point values from <i>xmm2</i> and <i>xmm3/m128</i>.
                    Use bits <code>0..4</code> of <i>imm8</i> as a comparison predicate.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.NP.0F.WIG C2 /r <i>ib</i></>,
            mnemonic: <>VCMPPS <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i>, <i>imm8</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Compare packed single-precision floating-point values from <i>ymm2</i> and <i>ymm3/m256</i>.
                    Use bits <code>0..4</code> of <i>imm8</i> as a comparison predicate.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.NP.0F.W0 C2 /r <i>ib</i></>,
            mnemonic: <>VCMPPS <i>k1</i> {k2z}, <i>xmm1</i>, <i>xmm2/m128/m64bcst</i>, <i>imm8</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Compare packed single-precision floating-point values from <i>xmm1</i> and <i>xmm2/m128/m64bcst</i>.
                    Use bits <code>0..4</code> of <i>imm8</i> as a comparison predicate.
                    Store the result in <i>k1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.NP.0F.W0 C2 /r <i>ib</i></>,
            mnemonic: <>VCMPPS <i>k1</i> {k2z}, <i>ymm1</i>, <i>ymm2/m256/m64bcst</i>, <i>imm8</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Compare packed single-precision floating-point values from <i>ymm1</i> and <i>ymm2/m256/m64bcst</i>.
                    Use bits <code>0..4</code> of <i>imm8</i> as a comparison predicate.
                    Store the result in <i>k1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.NP.0F.W0 C2 /r <i>ib</i></>,
            mnemonic: <>VCMPPS <i>k1</i> {k2z}, <i>zmm1</i>, <i>zmm2/m512/m64bcst{sae}</i>, <i>imm8</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Compare packed single-precision floating-point values from <i>zmm1</i> and <i>zmm2/m512/m64bcst</i>.
                    Use bits <code>0..4</code> of <i>imm8</i> as a comparison predicate.
                    Store the result in <i>k1</i>.
                </>,
        },
    ],
    encodings: {
        operands: 4,
        hasTuple: true,
        encodings: {
            legacy: ["n/a", "ModRM.reg[rw]", "ModRM.r/m[r]", "imm8", ""],
            vex: ["n/a", "ModRM.reg[rw]", "VEX.vvvv[r]", "ModRM.r/m[r]", "imm8"],
            evex: ["full", "ModRM.reg[rw]", "EVEX.vvvvv[r]", "ModRM.r/m[r]", "imm8"],
        },
    },
    description: (
        <>
            <p>
                The <code>(V)CMPPS</code> instruction compares four, eight, or 16 single-precision floating-point values from the two source operands.
                The eight bit immediate determines the operation.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
            <p>
                For the legacy SSE and VEX versions, the results will all be a <Unit value={32} unit="bit" /> <em>integer</em> (not a single-precision floating-point) of either all zeros or ones.
                For the EVEX versions, the destination is a <A href="/register/vector">mask register</A> where each <em>bit</em> contains an individual comparison result.
            </p>
            <p>
                For the legacy SSE version, bits <code>0..2</code> are used to determine the operation.
                For the VEX and EVEX encoded versions, bits <code>0..4</code> are used.
                The other bits are reserved.
                The operation is determined from the table below (an empty row indicates the division between allowed predicates from legacy SSE and VEX/EVEX encoded forms):
            </p>
            <Scrollable>
                <table className="instruction-table">
                    <thead>
                        <tr>
                            <th rowSpan={2}><i>imm8</i> Value</th>
                            <th rowSpan={2}>Predicate</th>
                            <th rowSpan={2}>Description</th>
                            <th colSpan={4}>Result<sup>1</sup></th>
                            <th rowSpan={2}>QNaN Signals <code>#IA</code></th>
                        </tr>
                        <tr>
                            <th className="whitespace-nowrap">A &lt; B</th>
                            <th className="whitespace-nowrap">A = B</th>
                            <th className="whitespace-nowrap">A &gt; B</th>
                            <th>Unordered<sup>2</sup></th>
                        </tr>
                    </thead>
                    <tbody>
                        {PredicateTableEntry(0, "EQ_OQ (EQ)", "Equal (ordered, non-signaling)", "ftffn")}
                        {PredicateTableEntry(1, "LT_OS (LT)", "Less-than (ordered, signaling)", "tfffy")}
                        {PredicateTableEntry(2, "LE_OS (LE)", "Less-than-or-equal (ordered, signaling)", "ttffy")}
                        {PredicateTableEntry(3, "UNORD_Q (UNORD)", "Unordered (non-signaling)", "ffftn")}
                        {PredicateTableEntry(4, "NEQ_UQ (NEQ)", "Not-equal (unordered, non-signaling)", "tfttn")}
                        {PredicateTableEntry(5, "NLT_US (NLT)", "Not-less-than (unordered, signaling)", "fttty")}
                        {PredicateTableEntry(6, "NLE_US (NLE)", "Not-less-than-or-equal (unordered, signaling)", "fftty")}
                        {PredicateTableEntry(7, "ORD_Q (ORD)", "Ordered (non-signaling)", "tttfn")}
                        <tr>
                            <td colSpan={8} />
                        </tr>
                        {PredicateTableEntry(8, "EQ_UQ", "Equal (unordered, non-signaling)", "ftftn")}
                        {PredicateTableEntry(9, "NGE_US (NGE)", "Not-greater-than-or-equal (unordered, signaling)", "tffty")}
                        {PredicateTableEntry(10, "NGT_US (NGT)", "Not-greater-than (unordered, signaling)", "ttfty")}
                        {PredicateTableEntry(11, "FALSE_OQ (FALSE)", "False (ordered, non-signaling)", "ffffn")}
                        {PredicateTableEntry(12, "NEQ_OQ", "Not-equal (ordered, non-signaling)", "tftfn")}
                        {PredicateTableEntry(13, "GE_OS (GE)", "Greater-than-or-equal (ordered, signaling)", "fttfy")}
                        {PredicateTableEntry(14, "GT_OS (GT)", "Greater-than (ordered, signaling)", "fftfy")}
                        {PredicateTableEntry(15, "TRUE_UQ (TRUE)", "True (unordered, non-signaling)", "ttttn")}
                        {PredicateTableEntry(16, "EQ_OS", "Equal (ordered, signaling)", "ftffy")}
                        {PredicateTableEntry(17, "LT_OQ", "Less-than (ordered, non-signaling)", "tfffn")}
                        {PredicateTableEntry(18, "LE_OQ", "Less-than-or-equal (ordered, non-signaling)", "ttffn")}
                        {PredicateTableEntry(19, "UNORD_S", "Unordered (signaling)", "fffty")}
                        {PredicateTableEntry(20, "NEQ_US", "Not-equal (unordered, signaling)", "tftty")}
                        {PredicateTableEntry(21, "NLT_UQ", "Not-less-than (unordered, non-signaling)", "ftttn")}
                        {PredicateTableEntry(22, "NLE_UQ", "Not-less-than-or-equal (unordered, non-signaling)", "ffttn")}
                        {PredicateTableEntry(23, "ORD_S", "Ordered (signaling)", "tttfy")}
                        {PredicateTableEntry(24, "EQ_US", "Equal (unordered, signaling)", "ftfty")}
                        {PredicateTableEntry(25, "NGE_UQ", "Not-greater-than-or-equal (unordered, non-signaling)", "tfftn")}
                        {PredicateTableEntry(26, "NGT_UQ", "Not-greater-than (unordered, non-signaling)", "ttftn")}
                        {PredicateTableEntry(27, "FALSE_OS", "False (ordered, signaling)", "ffffy")}
                        {PredicateTableEntry(28, "NEQ_OS", "Not-equal (ordered, signaling)", "tftfy")}
                        {PredicateTableEntry(29, "GE_OQ", "Greater-than-or-equal (ordered, non-signaling)", "fttfn")}
                        {PredicateTableEntry(30, "GT_OQ", "Greater-than (ordered, non-signaling)", "fftfn")}
                        {PredicateTableEntry(31, "TRUE_US", "True (unordered, signaling)", "tttty")}
                    </tbody>
                </table>
                <ol className="ml-4 pb-4">
                    <li><code>A</code> is 1<sup>st</sup> operand; <code>B</code> is 2<sup>nd</sup> operand</li>
                    <li>If either A or B is NaN.</li>
                </ol>
            </Scrollable>
            <p>
                Assemblers may implement the following pseudo-mnemonics for the various predicate values:
            </p>
            <Scrollable>
                <table className="instruction-table">
                    <thead>
                        <tr>
                            <th>Pseudo-Mnemonic Form</th>
                            <th>Encoded Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PseudoMnemonicLegacyTableEntry("EQ", 0)}
                        {PseudoMnemonicLegacyTableEntry("LT", 1)}
                        {PseudoMnemonicLegacyTableEntry("LE", 2)}
                        {PseudoMnemonicLegacyTableEntry("UNORD", 3)}
                        {PseudoMnemonicLegacyTableEntry("NEQ", 4)}
                        {PseudoMnemonicLegacyTableEntry("NLT", 5)}
                        {PseudoMnemonicLegacyTableEntry("NLE", 6)}
                        {PseudoMnemonicLegacyTableEntry("ORD", 7)}
                        <tr>
                            <td colSpan={2} />
                        </tr>
                        {PseudoMnemonicVectorTableEntry("EQ", 0)}
                        {PseudoMnemonicVectorTableEntry("LT", 1)}
                        {PseudoMnemonicVectorTableEntry("LE", 2)}
                        {PseudoMnemonicVectorTableEntry("UNORD", 3)}
                        {PseudoMnemonicVectorTableEntry("NEQ", 4)}
                        {PseudoMnemonicVectorTableEntry("NLT", 5)}
                        {PseudoMnemonicVectorTableEntry("NLE", 6)}
                        {PseudoMnemonicVectorTableEntry("ORD", 7)}
                        {PseudoMnemonicVectorTableEntry("EQ_UQ", 8)}
                        {PseudoMnemonicVectorTableEntry("NGE", 9)}
                        {PseudoMnemonicVectorTableEntry("NGT", 10)}
                        {PseudoMnemonicVectorTableEntry("FALSE", 11)}
                        {PseudoMnemonicVectorTableEntry("NEQ_OQ", 12)}
                        {PseudoMnemonicVectorTableEntry("GE", 13)}
                        {PseudoMnemonicVectorTableEntry("GT", 14)}
                        {PseudoMnemonicVectorTableEntry("TRUE", 15)}
                        {PseudoMnemonicVectorTableEntry("EQ_OS", 16)}
                        {PseudoMnemonicVectorTableEntry("LT_OQ", 17)}
                        {PseudoMnemonicVectorTableEntry("LE_OQ", 18)}
                        {PseudoMnemonicVectorTableEntry("UNORD_S", 19)}
                        {PseudoMnemonicVectorTableEntry("NEQ_US", 20)}
                        {PseudoMnemonicVectorTableEntry("NLT_UQ", 21)}
                        {PseudoMnemonicVectorTableEntry("NLE_UQ", 22)}
                        {PseudoMnemonicVectorTableEntry("ORD_SPD", 23)}
                        {PseudoMnemonicVectorTableEntry("EQ_US", 24)}
                        {PseudoMnemonicVectorTableEntry("NGE_UQ", 25)}
                        {PseudoMnemonicVectorTableEntry("NGT_UQ", 26)}
                        {PseudoMnemonicVectorTableEntry("FALSE_OS", 27)}
                        {PseudoMnemonicVectorTableEntry("NEQ_OS", 28)}
                        {PseudoMnemonicVectorTableEntry("GE_OQ", 29)}
                        {PseudoMnemonicVectorTableEntry("GT_OQ", 30)}
                        {PseudoMnemonicVectorTableEntry("TRUE_US", 31)}
                    </tbody>
                </table>
            </Scrollable>
        </>
    ),
    operation:
        `ComparisonFunc[] PredicateMapping8 = new[]
{
    EQ_OQ, //   0 - equal                  (ordered, non-signaling)
    LT_OS, //   1 - less-than              (ordered, signaling)
    LE_OS, //   2 - less-than-or-equal     (ordered, signaling)
    UNORD_Q, // 3 - unordered              (non-signaling)
    NEQ_UQ, //  4 - not-equal              (unordered, non-signaling)
    NLT_US, //  5 - not-less-than          (unordered, signaling)
    NLE_US, //  6 - not-less-than-or-equal (unordered, signaling)
    ORD_Q, //   7 - ordered                (non-signaling)
};
ComparisonFunc[] PredicateMapping32 = new[]
{
    EQ_OQ, //     0 - equal                     (ordered, non-signaling)
    LT_OS, //     1 - less-than                 (ordered, signaling)
    LE_OS, //     2 - less-than-or-equal        (ordered, signaling)
    UNORD_Q, //   3 - unordered                 (non-signaling)
    NEQ_UQ, //    4 - not-equal                 (unordered, non-signaling)
    NLT_US, //    5 - not-less-than             (unordered, signaling)
    NLE_US, //    6 - not-less-than-or-equal    (unordered, signaling)
    ORD_Q, //     7 - ordered                   (non-signaling)
    EQ_UQ, //     8 - equal                     (unordered, non-signaling)
    NGE_US, //    9 - not-greater-than-or-equal (unordered, signaling)
    NGT_US, //   10 - not-greater-than          (unordered, signaling)
    FALSE_OQ, // 11 - false                     (ordered, non-signaling)
    NEQ_OQ, //   12 - not-equal                 (ordered, non-signaling)
    GE_OS, //    13 - greater-than-or-equal     (ordered, signaling)
    GT_OS, //    14 - greater-than              (ordered, signaling)
    TRUE_UQ, //  15 - true                      (unordered, non-signaling)
    EQ_OS, //    16 - equal                     (ordered, signaling)
    LT_OQ, //    17 - less-than                 (ordered, non-signaling)
    LE_OQ, //    18 - less-than-or-equal        (ordered, non-signaling)
    UNORD_S, //  19 - unordered                 (signaling)
    NEQ_US, //   20 - not-equal                 (unordered, signaling)
    NLT_UQ, //   21 - not-less-than             (unordered, non-signaling)
    NLE_UQ, //   22 - not-less-than-or-equal    (unordered, non-signaling)
    ORD_S, //    23 - ordered                   (signaling)
    EQ_US, //    24 - equal                     (unordered, signaling)
    NGE_UQ, //   25 - not-greater-than-or-equal (unordered, non-signaling)
    NGT_UQ, //   26 - not-greater-than          (unordered, non-signaling)
    FALSE_OS, // 27 - false                     (ordered, signaling)
    NEQ_OS, //   28 - not-equal                 (ordered, signaling)
    GE_OQ, //    29 - greater-than-or-equal     (ordered, non-signaling)
    GT_OQ, //    30 - greater-than              (ordered, non-signaling)
    TRUE_US, //  31 - true                      (unordered, signaling)
};

public void CMPPS(SimdU32 dest, SimdF32 src, U8 predicate)
{
    ComparisonFunc func = PredicateMapping8[predicate];
    dest[0] = func(dest[0], src[0]) ? 0xFFFF_FFFF_FFFF_FFFFul : 0;
    dest[1] = func(dest[1], src[1]) ? 0xFFFF_FFFF_FFFF_FFFFul : 0;
    dest[2] = func(dest[2], src[2]) ? 0xFFFF_FFFF_FFFF_FFFFul : 0;
    dest[3] = func(dest[3], src[3]) ? 0xFFFF_FFFF_FFFF_FFFFul : 0;
    // dest[4..] is unmodified
}

void VCMPPS_Vex(SimdU32 dest, SimdF32 src1, SimdF32 src2, U8 predicate, int kl)
{
    ComparisonFunc func = PredicateMapping32[predicate];
    for (int n = 0; n < kl; n++)
        dest[n] = func(src1[n], src2[n]) ? 0xFFFF_FFFF_FFFF_FFFFul : 0;
    dest[kl..] = 0;
}
public void VCMPPS_Vex128(SimdU32 dest, SimdF32 src1, SimdF32 src2, U8 predicate) =>
    VCMPPS_Vex(dest, src1, src2, predicate, 4);
public void VCMPPS_Vex256(SimdU32 dest, SimdF32 src1, SimdF32 src2, U8 predicate) =>
    VCMPPS_Vex(dest, src1, src2, predicate, 8);

void VCMPPS_EvexMemory(KMask dest, SimdF32 src1, SimdF32 src2, U8 predicate, KMask k, int kl)
{
    ComparisonFunc func = PredicateMapping32[predicate];
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = func(src1[n], src2[n]) ? 1 : 0;
        else
            dest[n] = 0;
        // no merge masking - EVEX.z is implicit (zero masking)
    }
    dest[kl..] = 0;
}
public void VCMPPS_Evex128Memory(KMask dest, SimdF32 src1, SimdF32 src2, U8 predicate, KMask k) =>
    VCMPPS_EvexMemory(dest, src1, src2, predicate, 4);
public void VCMPPS_Evex256Memory(KMask dest, SimdF32 src1, SimdF32 src2, U8 predicate, KMask k) =>
    VCMPPS_EvexMemory(dest, src1, src2, predicate, 8);
public void VCMPPS_Evex512Memory(KMask dest, SimdF32 src1, SimdF32 src2, U8 predicate, KMask k) =>
    VCMPPS_EvexMemory(dest, src1, src2, predicate, 16);

void VCMPPS_EvexRegister(KMask dest, SimdF32 src1, SimdF32 src2, U8 predicate, KMask k, int kl)
{
    ComparisonFunc func = PredicateMapping32[predicate];
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = func(src1[n], EVEX.b ? src2[0] : src2[n]) ? 1 : 0;
        else
            dest[n] = 0;
        // no merge masking - EVEX.z is implicit (zero masking)
    }
    dest[kl..] = 0;
}
public void VCMPPS_Evex128Register(KMask dest, SimdF32 src1, SimdF32 src2, U8 predicate, KMask k) =>
    VCMPPS_EvexRegister(dest, src1, src2, predicate, 4);
public void VCMPPS_Evex256Register(KMask dest, SimdF32 src1, SimdF32 src2, U8 predicate, KMask k) =>
    VCMPPS_EvexRegister(dest, src1, src2, predicate, 8);
public void VCMPPS_Evex512Register(KMask dest, SimdF32 src1, SimdF32 src2, U8 predicate, KMask k) =>
    VCMPPS_EvexRegister(dest, src1, src2, predicate, 16);`,
    intrinsics: [
        "__m128 _mm_cmp_ps(__m128d a, __m128d b, const int predicate)",
        "__mmask8 _mm_cmp_ps_mask(__m128d a, __m128d b, const int predicate)",
        "__mmask8 _mm_mask_cmp_ps_mask(__mmask8 k1, __m128d a, __m128d b, const int predicate)",
        "",
        "__m256 _mm256_cmp_ps(__m256d a, __m256d b, const int predicate)",
        "__mmask8 _mm256_cmp_ps_mask(__m256d a, __m256d b, const int predicate)",
        "__mmask8 _mm256_mask_cmp_ps_mask(__mmask8 k1, __m256d a, __m256d b, const int predicate)",
        "",
        "__mmask16 _mm512_cmp_ps_mask(__m512d a, __m512d b, const int predicate)",
        "__mmask16 _mm512_cmp_round_ps_mask(__m512d a, __m512d b, const int predicate, const int rounding)",
        "__mmask16 _mm512_mask_cmp_ps_mask(__mmask8 k1, __m512d a, __m512d b, const int predicate)",
        "__mmask16 _mm512_mask_cmp_round_ps_mask(__mmask8 k1, __m512d a, __m512d b, const int predicate, const int rounding)",
    ],
    exceptions: {
        simd: {
            XM: [
                Exceptions.SimdDenormal,
                Exceptions.SimdInvalid,
            ],
        },
        other: {
            vex: "2",
            evex: "e2",
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
