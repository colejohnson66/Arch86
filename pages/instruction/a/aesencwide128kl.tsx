/* =============================================================================
 * File:   aesencwide128kl.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "aesencwide128kl",
    title: <>Perform 10 Rounds of AES-128 Encryption with Key Locker on Eight Blocks</>,
    titlePlain: "Perform 10 Rounds of AES-128 Encryption with Key Locker on Eight Blocks",
    opcodes: [
        {
            opcode: <>F3 0F 38 D8 !(11):000:bbb</>,
            mnemonic: <>AESENCWIDE128KL <i>m384</i></>,
            encoding: "m",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["kl", "aeskle", "wide_kl"],
            description:
                <>
                    Encrypt eight separate blocks (in <Register name="XMM0" /> through <Register name="XMM7" />) using a 128 bit AES key indicated by the handle in <i>m384</i>.
                    Store the results in <Register name="XMM0" /> through <Register name="XMM7" />
                </>,
        },
    ],
    encodings: {
        m: ["ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>AESENCWIDE128KL</code> instruction performs 10 rounds of AES-128 encryption against eight separate blocks stored in <Register name="XMM0" /> through <Register name="XMM7" />.
                The operand points to a 384 bit key locker handle containing the key.
                If the handle is legal and authentic, the results are stored in the register the data came from.
            </p>
        </>
    ),
    operation:
        `public void AESENCWIDE128KL(bit[] handle)
{
    bool illegal =
        HandleAnyReservedBitSet(handle) ||
        (handle[0] && CPL > 0) ||
        handle[2] ||
        HandleKeyType(handle) != HANDLE_KEY_TYPE_AES128;

    if (illegal)
    {
        EFLAGS.ZF = true;
    }
    else
    {
        bool authentic = UnwrapKeyAndAuthenticate384(handle, out U128 key);
        if (!authentic)
        {
            EFLAGS.ZF = true;
        }
        else
        {
            XMM0 = AES128Encrypt(XMM0, key);
            XMM1 = AES128Encrypt(XMM1, key);
            XMM2 = AES128Encrypt(XMM2, key);
            XMM3 = AES128Encrypt(XMM3, key);
            XMM4 = AES128Encrypt(XMM4, key);
            XMM5 = AES128Encrypt(XMM5, key);
            XMM6 = AES128Encrypt(XMM6, key);
            XMM7 = AES128Encrypt(XMM7, key);
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
        "unsigned char _mm_aesencwide128kl_u8(__m128i odata[8], __m128i idata[8], const void* h)",
    ],
    exceptions: {
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
