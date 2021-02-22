/* This file is part of 80x86.
 * Copyright (c) 2020-2021 Cole Johnson
 *
 * This program is free software: you can redistribute it and/or modify it under
 *   the terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 *   ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 *   for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import A from "../components/A";
import { H1 } from "@blueprintjs/core";
import Layout from "../components/Layout";
import React from "react";

export default function Page(): JSX.Element {
    return (
        <Layout title="404">
            <div id="content">
                <H1>404</H1>
                <p>
                    That means whatever you were trying to reach doesn&apos;t exist.
                </p>
                <p>
                    This site is currently under active development, so many pages may not exist yet.
                    If you believe you were linked here <em>in error</em>, please <A href="/contact">contact me</A> to report the problem.
                </p>
            </div>
        </Layout>
    );
}
