# GitHub Pages deployment

[← Home](../README.md) · [Contributing](../CONTRIBUTING.md)

The public project URL is `https://byby221b.github.io/Awesome-CTR-Scaling/`.

## One-time repository setup

In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Do not select a branch-based Jekyll build. Review any repository-specific environment protection rules if deployment waits for approval.

## Build and publish

The [Pages workflow](../.github/workflows/pages.yml) runs on pushes to `main`, pull requests and manual dispatch:

1. Checks that every generated output matches the canonical dataset and current frontend sources
2. Runs the offline validation, migration-retention, cross-view equality, link, count and determinism tests
3. Checks JavaScript syntax and runs dependency-free frontend state/search unit tests
4. On `main` only, uploads the generated `site/` directory as the Pages artifact and deploys it

The build job has read-only repository access. Only the deployment job receives `pages: write` and `id-token: write`. Actions are pinned to full commit SHAs; checkout disables credential persistence. No personal tokens, external fonts, analytics or runtime servers are needed.

## Verify the release

Check the workflow for the exact main commit. Then fetch the deployed `catalog.json` at the project URL and compare `meta.catalog_sha256` with `catalog_sha256` in the committed [generated-manifest.json](../generated-manifest.json). Both are SHA256 of the exact UTF-8 bytes of `data/papers.json`. The HTML also exposes the same value in the `catalog-sha256` meta tag.

The dataset fingerprint establishes content equality independently of paper counts. `meta.source_commit` is historical migration provenance and must not be used as a current release identifier. Browser/CDN cache can delay a visible update; retry with a cache-busting query after the exact workflow succeeds.

Verify the homepage, combined search/filters, a direct paper anchor and a mobile viewport. Relative CSS, JavaScript and JSON paths are intentional; do not replace them with root-absolute `/...` asset paths that would bypass the project prefix.

## Troubleshooting

- **Generated drift:** run the generation/check/test commands in [CONTRIBUTING.md](../CONTRIBUTING.md) and commit the entire synchronized update
- **Pages deployment fails:** confirm Source is GitHub Actions and inspect the failed deploy step/environment approval; do not add broader credentials as a workaround
- **404 after successful workflow:** confirm the artifact has `index.html` at its root and use the exact case-sensitive project URL
- **Library cannot load:** serve over HTTP(S), verify `catalog.json` exists beside `index.html`, and check browser errors

To roll back, revert the relevant canonical-data/frontend-source commit together with its generated outputs and allow a new main workflow to deploy. Do not roll back only the website or only the README.
