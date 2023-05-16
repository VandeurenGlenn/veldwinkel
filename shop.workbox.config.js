module.exports = {
	globDirectory: 'www/shop',
	globPatterns: [
		'**/*.{webp,png,xml,ico,svg,html,json,js}'
	],
	swDest: 'www/shop/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};