# Renovate-specific `npmrc` will get committed when using `postUpgradeCommands`

When Renovate is configured with a [`npmrc`](https://docs.renovatebot.com/configuration-options/#npmrc), and a `postUpgradeCommands`, the `fileFilters` will commit the `.npmrc`, which has been overridden, and usually includes secrets.

For instance, given the following `config.js`:

```javascript
module.exports = {
	"secrets": {
		"NPMRC_STAGING" : `registry=${process.env.NPM_REGISTRY_STAGING}\n${process.env.NPM_REGISTRY_STAGING.replace('https:', '')}:_authToken=${process.env.NPM_REGISTRY_STAGING_TOKEN}`
	},
	"npmrc": "{{ secrets.NPMRC_STAGING }}",
	"allowedCommands": [
		"^go mod tidy$"
	],
}
```

And the Renovate configuration per this repo.

We then run:

```sh
env NPM_REGISTRY_STAGING=http://localhost NPM_REGISTRY_STAGING_TOKEN=not-a-valid-secret GITHUB_COM_TOKEN="$(gh auth token)" npx renovate@41.97.10 --token "$(gh auth token)" JamieTanna-Mend-testing/npmrc-post-upgrade-commit
```

(Note that the usage of the `allowedCommands` being `go ...` is irrelevant - the important thing is that Renovate executes a `postUpgradeCommand` and then commits).

## Current behavior

`.npmrc` is committed (whether it previously existed or is new)

## Expected behavior

`.npmrc` is not committed

## Link to the Renovate issue or Discussion

Put your link to the Renovate issue or Discussion here.
