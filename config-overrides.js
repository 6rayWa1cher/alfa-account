const rewireAliases = require("react-app-rewire-aliases");
const { paths } = require("react-app-rewired");
const path = require("path");

const getFile = (child) => path.resolve(__dirname, `${paths.appSrc}/${child}`);

const getFolder = (child) => getFile(child + "/");

/* config-overrides.js */
module.exports = function override(config, env) {
	config = rewireAliases.aliasesOptions({
		"@component": getFolder("component"),
		"@util": getFolder("util"),
		"@config": getFile("config")
	})(config, env);
	return config;
};