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
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "aesenc256kl",
    title: <>Perform 14 Rounds of AES-256 Encryption with Key Locker</>,
    titlePlain: "Perform 14 Rounds of AES-256 Encryption with Key Locker",
    opcodes: [
        {
            opcode: <>F3 0F 38 DE !(11):rrr:bbb</>,
            mnemonic: <>AESENC256KL <i>xmm1</i>, <i>m512</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["kl", "aeskle"],
            description:
                <>
                    Encrypt <i>xmm1</i> using a 256 bit AES key indicated by the handle in <i>m512</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        mr: ["ModRM.reg[rw]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>AESENC256KL</code> instruction performs 14 rounds of AES-256 to encrypt the first operand.
                The second operand points to a 512 bit key locker handle containing the key.
                If the handle is legal and authentic, the result is stored in the first operand.
            </p>
        </>
    ),
    operation:
        `public void AESENC256KL(ref U128 dest, bit[] handle)
{
    bool illegal =
        HandleAnyReservedBitSet(handle) ||
        (handle[0] && CPL > 0) ||
        handle[2] ||
        HandleKeyType(handle) != HANDLE_KEY_TYPE_AES256;

    if (illegal)
    {
        EFLAGS.ZF = true;
    }
    else
    {
        bool authentic = UnwrapKeyAndAuthenticate512(handle, out U256 key);
        if (!authentic)
        {
            EFLAGS.ZF = true;
        }
        else
        {
            dest = AES256Encrypt(dest, key);
            EFLAGS.ZF = false;
        }
    }

    EFLAGS.CF = false;
    EFLAGS.PF = false;
    EFLAGS.AF = false;
    // EFLAGS.ZF handled above
    EFLAGS.SF = false;
    EFLAGS.OF = false;
}`,
    flags: {
        CF: <>Cleared.</>,
        PF: <>Cleared.</>,
        AF: <>Cleared.</>,
        ZF: <>Cleared if the handle was legal and authentic. Set otherwise.</>,
        SF: <>Cleared.</>,
        OF: <>Cleared.</>,
    },
    intrinsics: [
        "unsigned char _mm_aesenc256kl_u8(__m128i* odata, __m128i idata, const void* h)",
    ],
    exceptionsLegacy: {
        real: {
            // TODO is this correct?
            "UD": Exceptions.InReal,
        },
        virtual: {
            "UD": Exceptions.InVirtual8086,
        },
        protected: {
            "UD": [
                Exceptions.CpuidFeatureFlags,
                Exceptions.Lock,
                <>If <Register name="CR0.EM" /> is set.</>,
                <>If <Register name="CR0.TS" /> is set.</>,
                <>If <Register name="CR4.OSFXSR" /> is cleared.</>,
                <>If <Register name="CR4.KL" /> is cleared.</>,
            ],
            "NM": <>If <Register name="CR0.TS" /> is set.</>,
            "SS0": [
                Exceptions.NullSelector,
                Exceptions.SegLimitSS,
            ],
            "GP0": [
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            "PF": Exceptions.PF,
        },
        compatibility: {
            // same as protected
            "UD": [
                Exceptions.CpuidFeatureFlags,
                Exceptions.Lock,
                <>If <Register name="CR0.EM" /> is set.</>,
                <>If <Register name="CR0.TS" /> is set.</>,
                <>If <Register name="CR4.OSFXSR" /> is cleared.</>,
                <>If <Register name="CR4.KL" /> is cleared.</>,
            ],
            "NM": <>If <Register name="CR0.TS" /> is set.</>,
            "SS0": [
                Exceptions.NullSelector,
                Exceptions.SegLimitSS,
            ],
            "GP0": [
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            "PF": Exceptions.PF,
        },
        long: {
            "UD": [
                Exceptions.CpuidFeatureFlags,
                Exceptions.Lock,
                <>If <Register name="CR0.EM" /> is set.</>,
                <>If <Register name="CR0.TS" /> is set.</>,
                <>If <Register name="CR4.OSFXSR" /> is cleared.</>,
                <>If <Register name="CR4.KL" /> is cleared.</>,
            ],
            "NM": <>If <Register name="CR0.TS" /> is set.</>,
            "SS0": [
                Exceptions.NonCanonSS,
                Exceptions.NullSelector,
                Exceptions.SegLimitSS,
            ],
            "GP0": [
                Exceptions.NonCanon,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            "PF": Exceptions.PF,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
