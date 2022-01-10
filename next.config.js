module.exports = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            require("./scripts/GeneratePageList.js");
        }
        return config;
    }
};
