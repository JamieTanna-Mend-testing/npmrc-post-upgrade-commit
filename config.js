module.exports = {
	"secrets": {
		"NPMRC_STAGING" : `registry=${process.env.NPM_REGISTRY_STAGING}\n${process.env.NPM_REGISTRY_STAGING.replace('https:', '')}:_authToken=${process.env.NPM_REGISTRY_STAGING_TOKEN}`
	},
	"npmrc": "{{ secrets.NPMRC_STAGING }}",
	"allowedCommands": [
		"^go mod tidy$"
	],
}
