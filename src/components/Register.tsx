/* =============================================================================
 * File:   Register.tsx
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

// type RegisterValuesGprLow8 = "AL" | "CL" | "DL" | "BL" | "SPL" | "BPL" | "SIL" | "DIL";
// type RegisterValuesGprHigh8 = "AH" | "CH" | "DH" | "BH";
// type RegisterValuesGpr16 = "AX" | "CX" | "DX" | "BX" | "SP" | "BP" | "SI" | "DI" | "R8W" | "R9W" | "R10W" | "R11W" | "R12W" | "R13W" | "R14W" | "R15W";
// type RegisterValuesGpr32 = "EAX" | "ECX" | "EDX" | "EBX" | "ESP" | "EBP" | "ESI" | "EDI" | "R8" | "R9" | "R10" | "R11" | "R12" | "R13" | "R14" | "R15";
// type RegisterValuesGpr64 = "RAX" | "RCX" | "RDX" | "RBX" | "RSP" | "RBP" | "RSI" | "RDI" | "R8" | "R9" | "R10" | "R11" | "R12" | "R13" | "R14" | "R15";
// type RegisterValuesGpr = RegisterValuesGprLow8 | RegisterValuesGprHigh8 | RegisterValuesGpr16 | RegisterValuesGpr32 | RegisterValuesGpr64

type RegisterProps = {
    name: string;
};

export default function Register(props: RegisterProps): React.ReactElement {
    return (
        <code>{props.name}</code>
    );
}
