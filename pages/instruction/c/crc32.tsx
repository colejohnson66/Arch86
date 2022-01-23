/* =============================================================================
 * File:   crc32.tsx
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

import Canned from "@library/Canned";
import Exceptions from "@library/Exceptions";

const PageData: InstructionPageLayoutProps = {
    id: "crc32",
    title: <>Accumulate CRC32 Value</>,
    titlePlain: "Accumulate CRC32 Value",
    opcodes: [
        {
            opcode: <>F2 0F 38 F0 /r</>,
            mnemonic: <>CRC32 <i>r32</i>, <i>r/m8</i></>,
            encoding: "RM",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4.2",
            description: <>Accumulate CRC32 on <i>r/m8</i> into <i>r32</i>.</>,
        },
        {
            opcode: <>F2 REX 0F 38 F0 /r</>,
            mnemonic: <>CRC32 <i>r32</i>, <i>r/m8<sup>*</sup></i></>,
            encoding: "RM",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            cpuid: "sse4.2",
            description:
                <>
                    Accumulate CRC32 on <i>r/m8</i> into <i>r32</i>.
                    {" "}{Canned.RexR8Encoding}
                </>,
        },
        {
            opcode: <>F2 REX.W 0F 38 F0 /r</>,
            mnemonic: <>CRC32 <i>r64</i>, <i>r/m8<sup>*</sup></i></>,
            encoding: "RM",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            cpuid: "sse4.2",
            description:
                <>
                    Accumulate CRC32 on <i>r/m8</i> into <i>r64</i>.
                    {" "}{Canned.RexR8Encoding}
                </>,
        },
        {
            opcode: <>F2 0F 38 F1 /r</>,
            mnemonic: <>CRC32 <i>r32</i>, <i>r/m16</i></>,
            encoding: "RM",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4.2",
            description: <>Accumulate CRC32 on <i>r/m16</i> into <i>r32</i>.</>,
        },
        {
            opcode: <>F2 0F 38 F1 /r</>,
            mnemonic: <>CRC32 <i>r32</i>, <i>r/m32</i></>,
            encoding: "RM",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4.2",
            description: <>Accumulate CRC32 on <i>r/m32</i> into <i>r32</i>.</>,
        },
        {
            opcode: <>F2 REX.W 0F 38 F1 /r</>,
            mnemonic: <>CRC32 <i>r64</i>, <i>r/m64</i></>,
            encoding: "RM",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            cpuid: "sse4.2",
            description: <>Accumulate CRC32 on <i>r/m64</i> into <i>r64</i>.</>,
        },
    ],
    encodings: {
        operands: 2,
        encodings: {
            "MR": ["ModRM.r/m[rw]", "ModRM.reg[r]"],
        },
    },
    description: (
        <>
            <p>
                The <code>CRC32</code> instruction accumulates a CRC32 (with polynomial <code>0x11EDC6F41</code>) on the source operand into the destination operand.
            </p>
            <p>
                The polynomial used (<code>0x11EDC6F41</code>) is the &quot;Castagnoli&quot; polynomial.
                Of note is that this polynomial is <em>not</em> the one used in many places such as Ethernet, SATA, ZIP, PNG, etc.
                That polynomial (<code>0x04C11DB7</code>) cannot be computed using this instruction.
            </p>
        </>
    ),
    operation:
        `// \`BitReflect(...)\` reverses the bits in the parameter (i.e. \`BitReflect(0xAA)\` returns \`0x55\`)

const U40 POLYNOMIAL = 0x11EDC6F41;

public void CRC32(ref uint dest, byte src)
{
    U40 temp1 = BitReflect(src) << 32;
    U40 temp2 = BitReflect(dest) << 8;
    U40 temp3 = temp1 ^ temp2;
    uint temp4 = PolynomialDivisionMod2(temp3, POLYNOMIAL);
    dest = BitReflect(temp4);
}

public void CRC32(ref uint dest, ushort src)
{
    U48 temp1 = BitReflect(src) << 32;
    U48 temp2 = BitReflect(dest) << 16;
    U48 temp3 = temp1 ^ temp2;
    uint temp4 = PolynomialDivisionMod2(temp3, POLYNOMIAL);
    dest = BitReflect(temp4);
}

public void CRC32(ref uint dest, uint src)
{
    ulong temp1 = BitReflect(src) << 32;
    ulong temp2 = BitReflect(dest) << 32;
    ulong temp3 = temp1 ^ temp2;
    uint temp4 = PolynomialDivisionMod2(temp3, POLYNOMIAL);
    dest = BitReflect(temp4);
}

public void CRC32(ref ulong dest, byte src)
{
    U40 temp1 = BitReflect(src) << 32;
    U40 temp2 = BitReflect((uint)(dest & 0xFFFFFFFFul)) << 8;
    U40 temp3 = temp1 ^ temp2;
    uint temp4 = PolynomialDivisionMod2(temp3, POLYNOMIAL);
    dest = SignExtend(BitReflect(temp4));
}

public void CRC32(ref ulong dest, ulong src)
{
    U96 temp1 = BitReflect(src) << 32;
    U96 temp2 = BitReflect((uint)(dest & 0xFFFFFFFFul)) << 64;
    U96 temp3 = temp1 ^ temp2;
    uint temp4 = PolynomialDivisionMod2(temp3, POLYNOMIAL);
    dest = SignExtend(BitReflect(temp4));
}`,
    flags: {
        CF: <>Unmodified.</>,
        PF: <>Unmodified.</>,
        AF: <>Unmodified.</>,
        ZF: <>Unmodified.</>,
        SF: <>Unmodified.</>,
        OF: <>Unmodified.</>,
    },
    intrinsics: [
        "uint32_t _mm_crc32_u8(uint32_t crc, uint8_t data)",
        "uint32_t _mm_crc32_u16(uint32_t crc, uint16_t data)",
        "uint32_t _mm_crc32_u32(uint32_t crc, uint32_t data)",
        "uint64_t _mm_crc32_u64(uint64_t crc, uint64_t data)",
    ],
    exceptions: {
        real: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        compatibility: {
            // same as protected
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        long: {
            UD: Exceptions.Lock,
            SS0: [
                Exceptions.NonCanonSS,
                Exceptions.SegLimitSS,
            ],
            GP0: [
                Exceptions.NonCanon,
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
