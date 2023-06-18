/* =============================================================================
 * File:   layout.tsx
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

import "./globals.css";

import { Inter } from "next/font/google";
import JustChildrenProps from "@/types/JustChildrenProps";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    authors: {
        name: "Cole Tobin",
        url: "https://coletobin.com",
    },
    creator: "Cole Tobin",
    icons: [
        {
            "rel": "shortcut icon",
            "type": "image/x-icon",
            "url": "/favicon.ico",
        },
    ],
    title: {
        default: "Arch86",
        template: "%s | Arch86",
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
    },
};

export default function Layout(props: JustChildrenProps): React.ReactElement {
    return (
        <html lang="en-US">
            <body className={inter.className}>
                <div className="flex min-h-full flex-col">
                    {/* header and content */}
                    {/* managed using route groups */}
                    {props.children}

                    {/* footer */}
                    <footer className="flex-initial bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 text-sm sm:px-6 lg:px-8">
                            <p>Website copyright &copy; Cole Tobin 2020-2023.</p>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
