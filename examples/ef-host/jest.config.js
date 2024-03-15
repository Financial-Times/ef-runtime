module.exports = {
	testPathIgnorePatterns: [
		'/node_modules/',
	],
	transform: {
		'.js': '@sucrase/jest-plugin'
	},
};
