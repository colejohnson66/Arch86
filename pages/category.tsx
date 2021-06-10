/* This file is part of 80x86.
 * Copyright (c) 2021 Cole Johnson
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

import { BreadcrumbProps, H1, ITreeNode, Tree } from "@blueprintjs/core";

import { GetStaticProps } from "next";
import IDictionary from "../types/IDictionary";
import Layout from "../components/Layout";
import React from "react";
import { strict as assert } from "assert";
import { getCategoryData } from "../lib/category";

function buildTreeNode(entry: CategoryEntry, path: string): ITreeNode[] {
    const ret: ITreeNode[] = [];

    entry.list.forEach((item, idx) => {
        ret.push({
            id: `${path}/${idx}`,
            label: item,
        });
    });

    if (entry.subcategories) {
        Object.keys(entry.subcategories).forEach((name) => {
            // This assert is needed to shut the Typescript compiler up
            assert(entry.subcategories);
            const data = entry.subcategories[name];
            ret.push(...buildTreeNode(data, `${path}/${name}`));
        });
    }
    return ret;
}

type CategoryEntry = {
    description: string;
    list: string[];
    subcategories?: IDictionary<CategoryEntry>;
}
type PageProps = {
    data: IDictionary<CategoryEntry>
};

export default function Page(props: PageProps): JSX.Element {
    const PageBreadcrumbs: BreadcrumbProps[] = [
        { text: "Categories" },
    ];

    const TreeNodes: ITreeNode[] = [];
    Object.keys(props.data).forEach((category) => {
        TreeNodes.push({
            id: category,
            label: category,
            isExpanded: true,
            childNodes: buildTreeNode(props.data[category], category),
        });
    });

    return (
        <Layout canonical="/category" title="Categories" src="/pages/category.tsx" breadcrumbs={PageBreadcrumbs}>
            <div id="content">
                <H1>Categories</H1>
                <pre>{JSON.stringify(TreeNodes, null, 2)}</pre>
                <Tree contents={TreeNodes} />
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            data: getCategoryData(),
        },
    };
};
