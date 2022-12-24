/* =============================================================================
 * File:   cmps.tsx
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
    id: "cmps",
    title: <>Compare Strings</>,
    titlePlain: "Compare Strings",
    opcodes: [
        {
            opcode: <>A6</>,
            mnemonic: <>CMPSB</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    In legacy modes, compare the byte at <Register name="DS:eSI" /> with the byte at <Register name="ES:eDI" />.
                    In Long Mode, compare the byte at <Register name="RSI" /> with the byte at <Register name="RDI" />.
                    Set the flags and discard the result.
                    Increment/Decrement (based on <Register name="EFLAGS.DF" />) <Register name="rSI" /> and <Register name="rDI" /> by one.
                </>,
        },
        {
            opcode: <>A7</>,
            mnemonic: <>CMPSW</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    In legacy modes, compare the word at <Register name="DS:eSI" /> with the word at <Register name="ES:eDI" />.
                    In Long Mode, compare the word at <Register name="rSI" /> with the word at <Register name="rDI" />.
                    Set the flags and discard the result.
                    Increment/Decrement (based on <Register name="EFLAGS.DF" />) <Register name="rSI" /> and <Register name="rDI" /> by two.
                </>,
        },
        {
            opcode: <>A7</>,
            mnemonic: <>CMPSD</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    In legacy modes, compare the doubleword at <Register name="DS:eSI" /> with the doubleword at <Register name="ES:eDI" />.
                    In Long Mode, compare the doubleword at <Register name="rSI" /> with the doubleword at <Register name="rDI" />.
                    Set the flags and discard the result.
                    Increment/Decrement (based on <Register name="EFLAGS.DF" />) <Register name="rSI" /> and <Register name="rDI" /> by four.
                </>,
        },
        {
            opcode: <>REX.W A7</>,
            mnemonic: <>CMPSQ</>,
            encoding: "zo",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            description:
                <>
                    In legacy modes, compare the quadword at <Register name="DS:eSI" /> with the quadword at <Register name="ES:eDI" />.
                    In Long Mode, compare the quadword at <Register name="rSI" /> with the quadword at <Register name="rDI" />.
                    Set the flags and discard the result.
                    Increment/Decrement (based on <Register name="EFLAGS.DF" />) <Register name="rSI" /> and <Register name="rDI" /> by eight.
                </>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                In legacy modes, the <code>CMPS</code> set of instructions subtracts the byte, word, doubleword, or quadword at <Register name="DS:eSI" /> with the byte, word, doubleword, or quadword <Register name="ES:eDI" />.
                In Long Mode, the same operation is performed, but without the segment register offset.
                The flags are updated and the result discarded.
                Afterwards, <Register name="rSI" /> and <Register name="rDI" /> are incremented (if <Register name="EFLAGS.DF" /> is cleared) or decremented (if <Register name="EFLAGS.DF" /> is set) by the operand size.
            </p>
            <p>
                For legacy modes, the implied <Register name="DS" /> segment may be changed with a segment prefix.
                The <Register name="ES" /> segment, however, may not be changed.
            </p>
            <p>
                This set of instructions can be prefixed by a <Instruction name="rep" /> prefix for block comparisons.
            </p>
        </>
    ),
    operation:
        `// The implied \`DS\` segment may be changed with an explicit segment override prefix byte

public void CMPSB()
{
    if (MODE == 64)
        _ = Mem8[rSI] - Mem8[rDI];
    else
        _ = Mem8[DS:eSI] - Mem8[ES:eDI]

    rSI += EFLAGS.DF ? -1 : 1;
    rDI += EFLAGS.DF ? -1 : 1;
}

public void CMPSW()
{
    if (MODE == 64)
        _ = Mem16[rSI] - Mem16[rDI];
    else
        _ = Mem16[DS:eSI] - Mem16[ES:eDI]

    rSI += EFLAGS.DF ? -2 : 2;
    rDI += EFLAGS.DF ? -2 : 2;
}

public void CMPSD()
{
    if (MODE == 64)
        _ = Mem32[rSI] - Mem32[rDI];
    else
        _ = Mem32[DS:eSI] - Mem32[ES:eDI]

    rSI += EFLAGS.DF ? -4 : 4;
    rDI += EFLAGS.DF ? -4 : 4;
}

public void CMPSQ()
{
    _ = Mem64[rSI] - Mem64[rDI];

    rSI += EFLAGS.DF ? -8 : 8;
    rDI += EFLAGS.DF ? -8 : 8;
}`,
    flags: {
        CF: <>Set according to the temporary result.</>,
        PF: <>Set according to the temporary result.</>,
        AF: <>Set according to the temporary result.</>,
        ZF: <>Set according to the temporary result.</>,
        SF: <>Set according to the temporary result.</>,
        OF: <>Set according to the temporary result.</>,
    },
    exceptionsLegacy: {
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
