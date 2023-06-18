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

import Exceptions from "@/library/Exceptions";
import NoWrap from "@/components/NoWrap";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "bndmk",
    title: <>Make Bounds</>,
    titlePlain: "Make Bounds",
    opcodes: [
        {
            // TODO: is an SIB byte required?
            opcode: <>F3 0F 1B mem/r</>,
            mnemonic: <>BNDMK <i>bnd</i>, <i>m32</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            cpuid: "mpx",
            description: <>Make lower and upper bounds from <i>m32</i> and store them into <i>bnd</i>.</>,
        },
        {
            opcode: <>F3 0F 1B mem/r</>,
            mnemonic: <>BNDMK <i>bnd</i>, <i>m64</i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            cpuid: "mpx",
            description: <>Make lower and upper bounds from <i>m64</i> and store them into <i>bnd</i>.</>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "ModRM.r/m"],
    },
    description: (
        <>
            <p>
                The <code>BNDMK</code> instruction makes lower and upper bounds from the source operand&apos;s effective address.
                The result is stored in the destination register.
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
        `public void BNDMK_Sib(Bound dest, Sib addr)
{
    dest.Lower = addr.Base;
    dest.Upper = ~lea(addr);
}`,
    flags: "none",
    intrinsics: [
        "void *_bnd_set_ptr_bounds(const void *address, size_t size)",
    ],
    exceptionsLegacy: {
        real: {
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
        virtual: {
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
        protected: {
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
        compatibility: {
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
        },
        long: {
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
