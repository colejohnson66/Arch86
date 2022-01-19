/* =============================================================================
 * File:   Titles.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021-2022 Cole Tobin
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

import Register from "@components/Register";

const pdpfp = "Packed Double-Precision Floating-Point Values";
const pspfp = "Packed Single-Precision Floating-Point Values";
const sdpfp = "Scalar Double-Precision Floating-Point Value";
const sspfp = "Scalar Single-Precision Floating-Point Value";

const pdwi = "Packed Doubleword Integers";
const dwi = /* Scalar */ "Doubleword Integer";

// These are duplicated from the actual pages
const InstructionTitles = {
    aaa: <>ASCII Adjust <Register name="AL" /> After Addition</>,
    aad: <>ASCII Adjust <Register name="AX" /> Before Division</>,
    aam: <>ASCII Adjust <Register name="AX" /> After Multiplication</>,
    aas: <>ASCII Adjust <Register name="AL" /> After Subtraction</>,
    adc: <>Add with Carry</>,
    adcx: <>Unsigned Integer Addition with Carry Flag</>,
    add: <>Add</>,
    addList: <>Add (Vector)</>,
    addpd: <>Add {pspfp}</>,
    addps: <>Add {pdpfp}</>,
    addsd: <>Add {sdpfp}</>,
    addss: <>Add {sspfp}</>,
    addsubList: <>Add/Subtract (Vector)</>,
    addsubpd: <>Add/Subtract {pdpfp}</>,
    addsubps: <>Add/Subtract {pspfp}</>,
    adox: <>Unsigned Integer Addition with Overflow Flag</>,
    aesdecList: <>Perform AES Decryption</>,
    aesdec: <>Perform One Round of AES Decryption</>,
    aesdeclast: <>Perform Last Round of AES Decryption</>,
    aesdecklList: <>Perform AES Decryption With Key Locker</>,
    aesdec128kl: <>Perform Ten Rounds of AES Decryption With Key Locker</>,
    aesdec256kl: <>Perform 14 Rounds of AES Decryption With Key Locker</>,
    aesdecwideklList: <>Perform AES Decryption With Key Locker on Eight Blocks</>,
    aesdecwide128kl: <>Perform Ten Rounds of AES Decryption With Key Locker on Eight Blocks</>,
    aesdecwide256kl: <>Perform 14 Rounds of AES Decryption With Key Locker on Eight Blocks</>,
    aesencList: <>Perform AES Encryption</>,
    aesenc: <>Perform One Round of AES Encryption</>,
    aesencklList: <>Perform AES Encryption With Key Locker</>,
    aesenc128kl: <>Perform Ten Rounds of AES Encryption With Key Locker</>,
    aesenc256kl: <>Perform 14 Rounds of AES Encryption With Key Locker</>,
    aesenclast: <>Perform Last Round of AES Encryption</>,
    aesencwideklList: <>Perform AES Encryption With Key Locker on Eight Blocks</>,
    aesencwide128kl: <>Perform Ten Rounds of AES Encryption With Key Locker on Eight Blocks</>,
    aesencwide256kl: <>Perform 14 Rounds of AES Encryption With Key Locker on Eight Blocks</>,
    aesimc: <>Perform the AES "Inverse Mix Columns" Transformation</>,
    aeskeygenassist: <>AES Round Key Generation Assist</>,
    and: <>Logical AND</>,
    andList: <>Logical AND (Vector)</>,
    andpd: <>Logical AND {pdpfp}</>,
    andps: <>Logical AND {pspfp}</>,
    andn: <>Logical AND NOT</>,
    andnList: <>Logical AND NOT (Vector)</>,
    andnpd: <>Logical AND NOT {pdpfp}</>,
    andnps: <>Logical AND NOT {pspfp}</>,
    arpl: <>Adjust <code>RPL</code> Field of Segment Selector</>,

    bextr: <>Bit Extract Field</>,
    blendList: <>Blend (Vector)</>,
    blendpd: <>Blend {pdpfp}</>,
    blendps: <>Blend {pspfp}</>,
    blendvList: <>Variable Blend (Vector)</>,
    blendvpd: <>Variable Blend {pdpfp}</>,
    blendvps: <>Variable Blend {pspfp}</>,
    blsi: <>Extract Lowest Set Bit</>,
    blsmsk: <>Get Mask Up to Lowest Set Bit</>,
    blsr: <>Clear Lowest Set Bit</>,
    bndcl: <>Check Lower Bound</>,
    "bndcu-bndcn": <>Check Upper Bound</>,
    bndldx: <>Load Extended Bounds Using Address Translation</>,
    bndmk: <>Make Bounds</>,
    bndmov: <>Move Bounds</>,
    bndstx: <>Store Extended Bounds Using Address Translation</>,
    bound: <>Check Array Index Against Bounds</>,
    bsf: <>Bit Scan Forward</>,
    bsr: <>Bit Scan Reverse</>,
    bswap: <>Byte Swap</>,
    bt: <>Bit Test</>,
    btc: <>Bit Test and Complement</>,
    btr: <>Bit Test and Reset</>,
    bts: <>Bit Test and Set</>,
    bzhi: <>Zero High Bits From Index</>,

    call: <>Call Procedure</>,
    "cbw-cwde-cdqe": <>Sign Extend Accumulator</>,
    clac: <>Clear Alignment Check Flag</>,
    clc: <>Clear Carry Flag</>,
    cld: <>Clear Direction Flag</>,
    cldemote: <>Demote Cache Line</>,
    clflush: <>Flush Cache Line</>,
    clflushopt: <>Flush Cache Line (Optimized)</>,
    cli: <>Clear Interrupt Enable Flag</>,
    clrssbsy: <>Clear Busy Flag in a Supervisor Shadow Stack Token</>,
    clts: <>Clear Task-Switched Flag in <Register name="CR0" /></>,
    clwb: <>Write Back Cache Line</>,
    cmc: <>Complement Carry Flag</>,
    cmovcc: <>Conditional Move</>,
    cmp: <>Compare</>,
    cmpList: <>Compare (Vector)</>,
    cmppd: <>Compare {pdpfp}</>,
    cmpps: <>Compare {pspfp}</>,
    cmpsd: <>Compare {sdpfp}</>,
    cmpss: <>Compare {sspfp}</>,
    cmps: <>Compare Strings</>,
    cmpxchg: <>Compare and Exchange</>,
    cmpxchg8b: <>Compare and Exchange 8 Bytes</>,
    cmpxchg16b: <>Compare and Exchange 16 Bytes</>,
    comiList: <>Compare Ordered</>,
    comisd: <>Compare Ordered {sdpfp} and Set <Register name="EFLAGS" /></>,
    comiss: <>Compare Ordered {sspfp} and Set <Register name="EFLAGS" /></>,
    cpuid: <>CPU Identification</>,
    crc32: <>Accumulate CRC32 Value</>,
    cvtdqList: <>Convert {pdwi} (Vector)</>,
    cvtdq2pd: <>Convert {pdwi} to {pdpfp}</>,
    cvtdq2ps: <>Convert {pdwi} to {pspfp}</>,
    cvtpdList: <>Convert {pdpfp} (Vector)</>,
    cvtpd2dq: <>Convert {pdpfp} to {pdwi}</>,
    cvtpd2pi: <>Convert {pdpfp} to {pdwi} (MMX)</>,
    cvtpd2ps: <>Convert {pdpfp} to {pspfp}</>,
    cvtpiList: <>Convert {pdwi} (Vector/MMX)</>,
    cvtpi2pd: <>Convert {pdwi} to {pdpfp} (MMX)</>,
    cvtpi2ps: <>Convert {pdwi} to {pspfp} (MMX)</>,
    cvtpsList: <>Convert {pspfp} (Vector)</>,
    cvtps2dq: <>Convert {pspfp} to {pdwi}</>,
    cvtps2pd: <>Convert {pspfp} to {pdpfp}</>,
    cvtps2pi: <>Convert {pspfp} {pdwi} (MMX)</>,
    cvtsdList: <>Convert {sdpfp} (Vector)</>,
    cvtsd2si: <>Convert {sdpfp} to {dwi}</>,
    cvtsd2ss: <>Convert {sdpfp} to {sspfp}</>,
    cvtsiList: <>Convert {dwi} (Vector)</>,
    cvtsi2sd: <>Convert {dwi} to {sdpfp}</>,
    cvtsi2ss: <>Convert {dwi} to {sspfp}</>,
    cvtssList: <>Convert {sspfp} (Vector)</>,
    cvtss2sd: <>Convert {sspfp} to {sdpfp}</>,
    cvtss2si: <>Convert {sspfp} to {dwi}</>,
    cvttpdList: <>Convert with Truncation {pdpfp} (Vector)</>,
    cvttpd2dq: <>Convert with Truncation {pdpfp} to {pdwi}</>,
    cvttpd2pi: <>Convert with Truncation {pdpfp} to {pdwi} (MMX)</>,
    cvttpsList: <>Convert with Truncation {pspfp} (Vector)</>,
    cvttps2dq: <>Convert with Truncation {pspfp} to {pdwi}</>,
    cvttps2pi: <>Convert with Truncation {pspfp} to {pdwi} (MMX)</>,
    // cvttsdList: <> Convert with Truncation {sdpfp} (Vector)</>,
    cvttsd2si: <>Convert with Truncation {sdpfp} to {dwi}</>,
    // cvttssList: <> Convert with Truncation {sspfp} (Vector)</>,
    cvttss2si: <>Convert with Truncation {sspfp} to {dwi}</>,
    cwd: <>Convert Word to Doubleword Through DX</>,
    cdq: <>Convert Doubleword to Quadword Through EDX</>,
    cqo: <>Convert Quadword to Octoword Through RDX</>,

    daa: <>Decimal Adjust <Register name="AL" /> After Addition</>,
    das: <>Decimal Adjust <Register name="AL" /> After Subtraction</>,
    dec: <>Decrement by One</>,
    div: <>Unsigned Divide</>,
    divList: <>Divide (Vector)</>,
    divpd: <>Divide {pdpfp}</>,
    divps: <>Divide {pspfp}</>,
    divsd: <>Divide {sdpfp}</>,
    divss: <>Divide {sspfp}</>,
    dpList: <>Dot Product (Vector)</>,
    dppd: <>Dot Product of {pdpfp}</>,
    dpps: <>Dot Product of {pspfp}</>,

    emms: <>Empty MMX Technology State</>,
    encodekey128: <>Encode 128 bit Key with Key Locker</>,
    encodekey256: <>Encode 256 bit Key with Key Locker</>,
    endbr32: <>Terminate an Indirect Branch in 32 bit Mode</>,
    endbr64: <>Terminate an Indirect Branch in 64 bit Mode</>,
    enter: <>Make Stack Frame for Procedure Parameters</>,
    extractps: <>Extract {pspfp}</>,
};

export default InstructionTitles;