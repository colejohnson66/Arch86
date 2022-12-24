/* =============================================================================
 * File:   cpuid.tsx
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
import Instruction from "@components/Instruction";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "cpuid",
    title: <>CPU Identification</>,
    titlePlain: "CPU Identification (CPUID)",
    opcodes: [
        {
            opcode: <>0F A2</>,
            mnemonic: <>CPUID</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Using the value in <Register name="EAX" /> (and sometimes also <Register name="ECX" />), get information about the processor and supported features.
                    The results are returned in <Register name="EAX" />, <Register name="EBX" />, <Register name="ECX" />, and <Register name="EDX" />.
                </>,
        },
    ],
    encodings: {
        zo: ["N/A"],
    },
    description: (
        <>
            <p>
                The <code>CPUID</code> instruction, using the value in <Register name="EAX" /> (and sometimes also <Register name="ECX" />), returns information about the processor and supported features.
                The results are stored in <Register name="EAX" />, <Register name="EBX" />, <Register name="ECX" />, and <Register name="EDX" />.
            </p>
            <p>
                This instruction was introduced in 1993 with the Pentium and SL-enhanced 80486 processors.
                Support for it is indicated by the ability to toggle the <A href="/register/flags">ID bit</A> (bit 21) in <Register name="EFLAGS" />.
                On unsupported processors, setting of that bit will be ignored by the processor while executing a <Instruction name="popf" /> instruction.
            </p>
            <p>
                The supported values of <Register name="EAX" /> may vary between processors, but the <code>EAX=0</code> &quot;leaf&quot; will always be supported, and is used to determine the maximum supported leaf.
                A list of the returned values is available <A href="/architecture/cpuid">on a dedicated page</A>.
            </p>
            <p>
                {Canned.Serializing}
            </p>
        </>
    ),
    operation:
        `public void CPUID()
{
    // "extended" leafs are ones with the MSB set
    bool extended = (EAX & 0x8000_0000) != 0;

    // only Pentium 4 and newer support extended leafs
    extended &= ProcessorSupportsExtendedLeafs();

    if (ProcessorSupportsLeaf(EAX, ECX))
    {
        (EAX, EBX, ECX, EDX) = CPUIDCore(EAX, ECX);
    }
    else if ((extended && EAX < MAX_EXTENDED_LEAF) ||
        (!extended && EAX < MAX_LEAF))
    {
        // less than the maximum supported leaf, but this specific leaf is unsupported
        // e.g. leaf 0x11 does not exist
        EAX = 0;
        EBX = 0;
        ECX = 0;
        EDX = 0;
    }
    else
    {
        // greater than the maximum supported leaf

        // return the maximum
        U32 leaf = extended ? MAX_EXTENDED_LEAF : MAX_LEAF;
        (EAX, EBX, ECX, EDX) = CPUIDCore(leaf, ECX);
    }
}`,
    examples: [
        `; bool IsCpuidSupported();
; Determine if the CPUID instruction is supported.
;
; Clobbers: EBX
IsCpuidSupported:
    pushfd              ; EAX = EFLAGS
    pop eax
    mov ebx, eax        ; save a copy
    xor eax, 0x00200000 ; toggle bit 21
    push eax            ; EFLAGS = EAX
    popfd               ;   if CPUID is unsupported, the change to bit 21 is ignored
    pushfd              ; EAX = EFLAGS
    pop eax
    cmp eax, ebx        ; has bit 21 changed?
    jne .unsupported

    mov eax, 1
    ret

.unsupported:
    mov eax, 0
    ret`,
        `; bool IsCpuFromIntel();
; Determine if the current CPU is from Intel.
;
; Clobbers: EBX, ECX, EDX
IsCpuFromIntel:
    mov eax, 0 ; CPUID leaf 0
    cpuid
    cmp ebx, 'Genu' ; in little endian; 'uneG' in big endian
    jne .notIntel
    cmp ecx, 'ineI' ; ditto
    jne .notIntel
    cmp edx, 'ntel' ; ditto
    jne .notIntel

    mov eax, 1
    ret

.notIntel:
    mov eax, 0
    ret`,
        `; bool IsCpuFromAMD();
; Determine if the current CPU is from AMD.
;
; Clobbers: EBX, ECX, EDX
IsCpuFromAMD:
    mov eax, 0 ; CPUID leaf 0
    cpuid
    cmp ebx, 'Auth' ; in little endian; 'htuA' in big endian
    jne .notAMD
    cmp ecx, 'enti' ; ditto
    jne .notAMD
    cmp edx, 'cAMD' ; ditto
    jne .notAMD

    mov eax, 1
    ret

.notAMD:
    mov eax, 0
    ret`,
    ],
    flags: "none",
    intrinsics: [
        "// Microsoft specific",
        "void __cpuid(int cpuInfo[4], int function_id)",
        "void __cpuindex(int cpuInfo[4], int function_id, int subfunction_id)",
    ],
    exceptionsLegacy: {
        real: {
            "UD": Exceptions.Lock,
        },
        virtual: {
            "UD": Exceptions.Lock,
        },
        protected: {
            "UD": Exceptions.Lock,
        },
        compatibility: {
            "UD": Exceptions.Lock,
        },
        long: {
            "UD": Exceptions.Lock,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
