/** @type {import("next").NextConfig} */
const nextConfig = {
    // experimental: {
    //     mdxRs: true,
    // }

    async redirects() {
        return [
            {
                source: "/instruction/a/:slug",
                destination: "/instruction/:slug",
                permanent: true,
            },
            {
                source: "/instruction/b/:slug",
                destination: "/instruction/:slug",
                permanent: true,
            },
            {
                source: "/instruction/c/:slug",
                destination: "/instruction/:slug",
                permanent: true,
            },
            {
                source: "/instruction/d/:slug",
                destination: "/instruction/:slug",
                permanent: true,
            },
            {
                source: "/instruction/e/:slug",
                destination: "/instruction/:slug",
                permanent: true,
            },
            {
                source: "/instruction/f/:slug",
                destination: "/instruction/:slug",
                permanent: true,
            },
            {
                source: "/instruction/l/:slug",
                destination: "/instruction/:slug",
                permanent: true,
            },
        ];
    },
};

// package.json:
// "@mdx-js/loader": "^2.3.0",
// "@mdx-js/react": "^2.3.0",
// "@next/mdx": "^13.4.6",
// "@types/mdx": "^2.0.5",

// const withMDX = require("@next/mdx")();
// module.exports = withMDX(nextConfig);
module.exports = nextConfig;
