/* =============================================================================
 * File:   bndmk.tsx
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
import Register from "@components/Register";
import Unit from "@components/Unit";

const PageData: InstructionPageLayoutProps = {
    id: "bndmk",
    title: <>Make Bounds</>,
    titlePlain: "Make Bounds",
    opcodes: [
        {
            // TODO: is an SIB byte required?
            opcode: <>F3 0F 1B !11:rrr:bbb</>,
            mnemonic: <>BNDMK <i>bnd</i>, <i>m32</i></>,
            encoding: "RM",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            cpuid: "mpx",
            description: <>Make lower and upper bounds from <i>m32</i> and store them into <i>bnd</i>.</>,
        },
        {
            opcode: <>F3 0F 1B !11:rrr:bbb</>,
            mnemonic: <>BNDMK <i>bnd</i>, <i>m64</i></>,
            encoding: "RM",
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
        operands: 2,
        encodings: {
            "RM": ["ModRM.reg[w]", "ModRM.r/m"],
        },
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
                In <Unit value={16} unit="bit" /> and <Unit value={32} unit="bit" /> modes, the <Unit value={32} unit="bit" /> form is used.
                In <Unit value={64} unit="bit" /> mode, the <Unit value={64} unit="bit" /> form is used.
            </p>
        </>
    ),
    operation:
        `public void BNDMK_Sib(Bound dest, Sib addr)
{
    dest.Lower = addr.Base;
    dest.Upper = ~lea(addr);
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
        "void *_bnd_set_ptr_bounds(const void *address, size_t size)",
    ],
    exceptions: {
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
