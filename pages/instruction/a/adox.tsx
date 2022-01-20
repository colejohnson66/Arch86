/* =============================================================================
 * File:   adox.tsx
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

import Exceptions from "@library/Exceptions";
import Instruction from "@components/Instruction";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "adox",
    title: <>Unsigned Integer Addition With Overflow Flag</>,
    titlePlain: "Unsigned Integer Addition With Overflow Flag",
    opcodes: [
        {
            opcode: <>F3 0F 38 F6 /r</>,
            mnemonic: <>ADOX <i>r32</i>, <i>r/m32</i></>,
            encoding: "RM",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "adx",
            description:
                <>
                    Add <i>r32</i>, the overflow flag, and <i>r/m32</i> into <i>r32</i>.
                    Sets only the overflow flag for overflow.
                </>,
        },
        {
            opcode: <>F3 REX.W 0F 38 F6 /r</>,
            mnemonic: <>ADOX <i>r64</i>, <i>r/m64</i></>,
            encoding: "RM",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            cpuid: "adx",
            description:
                <>
                    Add <i>r64</i>, the overflow flag, and <i>r/m64</i> into <i>r64</i>.
                    Sets only the overflow flag for overflow.
                </>,
        },
    ],
    encodings: {
        operands: 2,
        encodings: {
            "RM": ["ModRM.reg[rw]", "ModRM.r/m[rw]"],
        },
    },
    description: (
        <>
            <p>
                The <code>ADCX</code> instruction adds the source operand, the destination operand, and the overflow flag.
                The result is stored in the destination operand.
                Only the overflow flag is affected.
            </p>
            <p>
                This instruction is designed for use in multibyte additions such as in arbitrary precision arithmetic.
                The difference between this instruction and <Instruction name="adc" /> is that this one allows the creation of two &quot;carry chains&quot; &ndash; one using <Register name="OF" /> (this one) and one using <Register name="CF" /> (<Instruction name="adcx" />).
            </p>
        </>
    ),
    operation:
        `public void ADOX_32(ref uint dest, uint src)
{
    dest += src + EFLAGS.OF;
}

public void ADOX_64(ref ulong dest, ulong src)
{
    dest += src + EFLAGS.OF;
}`,
    flags: {
        CF: <>Unmodified.</>,
        PF: <>Unmodified.</>,
        AF: <>Unmodified.</>,
        ZF: <>Unmodified.</>,
        SF: <>Unmodified.</>,
        OF: <>Set if an unsigned overflow occurs. Cleared otherwise.</>,
    },
    intrinsics: [
        "uint8_t _addcarryx_u32(uint8_t c_in, uint32_t src1, uint32_t src2, uint32_t *sum_out)",
        "uint8_t _addcarryx_u64(uint8_t c_in, uint64_t src1, uint64_t src2, uint64_t *sum_out)",
    ],
    exceptions: {
        real: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.LockNoMem,
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
            UD: Exceptions.LockNoMem,
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
            UD: Exceptions.LockNoMem,
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
