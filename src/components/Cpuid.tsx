/* =============================================================================
 * File:   Cpuid.tsx
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

type CpuidProps = {
    featureID?: string;
    eax: number;
    ecx?: number;
    output: "eax" | "ebx" | "ecx" | "edx";
    bit: number;
    bitEnd?: number; // for ranges
};

export default function Cpuid(props: CpuidProps): React.ReactElement {
    const eax = `EAX=${props.eax.toString(16)}${props.eax > 9 ? "h" : ""}`;
    const ecx = props.ecx
        ? `,ECX=${props.ecx.toString(16)}${props.ecx > 9 ? "h" : ""}`
        : "";
    const bits = props.bitEnd !== undefined
        ? `bits ${props.bit}:${props.bitEnd}`
        : `bit ${props.bit}`;

    // TODO: lookup the feature and provide a link
    const featureID = props.featureID ? ` (${props.featureID.toUpperCase()})` : "";
    return (
        <code className="whitespace-nowrap">
            CPUID[{eax}{ecx}]:{props.output.toUpperCase()}[{bits}{featureID}]
        </code>
    );
}

export const CpuidFeatures = {
    Adx: <Cpuid featureID="adx" eax={7} ecx={0} output="ebx" bit={19} />,
};
