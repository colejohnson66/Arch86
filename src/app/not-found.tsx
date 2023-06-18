/* =============================================================================
 * File:   not-found.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2023 Cole Tobin
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

import Navbar from "@/components/Navbar";
import Page from "@/components/Layout";

export default function NotFound(): React.ReactElement {
    return (
        <>
            <Navbar />
            <Page.Header>404</Page.Header><Page.Body>
                <Page.Content>
                    <p>
                        That means whatever you were trying to reach doesn&apos;t exist.
                    </p>
                    <p>
                        This website is in active development, so many pages may not exist yet.
                    </p>
                </Page.Content>
            </Page.Body>
        </>
    );
}
