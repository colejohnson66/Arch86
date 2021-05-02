const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

module.exports = {
    future: {
        webpack5: true,
    },
    generateBuildId: async () => {
        const { stdout } = await exec("git rev-parse HEAD");
        return stdout.trim();
    },
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        if (isServer)
            require("./scripts/generateSitemap");
        return config;
    }
};
