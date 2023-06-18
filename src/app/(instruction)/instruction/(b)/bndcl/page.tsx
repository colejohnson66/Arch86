/* =============================================================================
 * File:   page.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022-2023 Cole Tobin
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

import InstructionPageLayout, { InstructionPageLayoutProps } from "@/components/InstructionPageLayout";

import Exception from "@/components/Exception";
import Exceptions from "@/library/Exceptions";
import Instruction from "@/components/Instruction";
import NoWrap from "@/components/NoWrap";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "bndcl",
    title: <>Check Lower Bound</>,
    titlePlain: "Check Lower Bound",
    opcodes: [
        {
            opcode: <>F3 0F 1A /r</>,
            mnemonic: <>BNDCL <i>bnd</i>, <i>r/m32</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            cpuid: "mpx",
            description:
                <>Raise a <Exception name="BR" /> exception if the address in <i>r/m32</i> is lower than the lower bound of <i>bnd</i>.</>,
        },
        {
            opcode: <>F3 0F 1A /r</>,
            mnemonic: <>BNDCL <i>bnd</i>, <i>r/m64</i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            cpuid: "mpx",
            description:
                <>Raise a <Exception name="BR" /> exception if the address in <i>r/m64</i> is lower than the lower bound of <i>bnd</i>.</>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>BNDCL</code> instruction compares the address in the second source operand against the lower bound in the first source operand.
                If the second source is lower (outside the bounds), a <Exception name="BR" /> exception is raised and <Register name="BNDSTATUS" /> is set to <code>1</code>.
            </p>
            <p>
                If the second source operand is a general purpose register, the value contained in it is treated as the address to compare against.
                If, however, it is a memory location, the effective address is calculated (see <Instruction name="lea" useHyphen />) and used in the comparison.
                At no time is memory accessed.
            </p>
            <p>
                Which instruction form is used depends on the operating mode of the processor.
                In <NoWrap>16-bit</NoWrap> and <NoWrap>32-bit</NoWrap> modes, the <NoWrap>32-bit</NoWrap> form is used.
                In <NoWrap>64-bit</NoWrap> mode, the <NoWrap>64-bit</NoWrap> form is used.
            </p>
        </>
    ),
    operation:
        `public void BNDCL(Bound bnd, IntPtr addr)
{
    if (addr < bnd.Lower)
    {
        BNDSTATUS.Abd = 0;
        BNDSTATUS.EC = 1; // bounds violation
        #BR;
    }
}`,
    flags: "none",
    intrinsics: [
        "void _bnd_chk_ptr_lbounds(const void *address)",
    ],
    exceptionsLegacy: {
        real: {
            BR: "If the bounds test fails.",
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
        virtual: {
            BR: "If the bounds test fails.",
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
        protected: {
            BR: "If the bounds test fails.",
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
        compatibility: {
            BR: "If the bounds test fails.",
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
        long: {
            BR: "If the bounds test fails.",
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
