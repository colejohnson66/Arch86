const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

module.exports = {
    generateBuildId: async () => {
        const { stdout } = await exec("git rev-parse HEAD");
        return stdout.trim();
    },
    reactStrictMode: true,
};
