module.exports = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        // `globby` now requires ESM
        // if (isServer)
        //     require("./scripts/generateSitemap");
        return config;
    }
};
