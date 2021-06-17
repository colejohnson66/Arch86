module.exports = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        if (isServer)
            require("./scripts/generateSitemap");
        return config;
    }
};
