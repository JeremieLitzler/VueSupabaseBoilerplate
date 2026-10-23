# ADR-001: Pinned External `release.sh`, Single-Trunk Push-Triggered Release

**Date:** 2026-10-23
**Status:** Accepted

## Context

Releases need a version derived from the conventional commits, a tag and a GitHub release. `semantic-release` does this but pulls five npm packages into the dependency tree, needs a GitHub App and its secrets to push to protected branches, and commits generated files back to the repository.

The release logic lives in its own repository, [semantic-release-script](https://github.com/JeremieLitzler/semantic-release-script), as `release.sh`, tagged `v1.0.0`. It already runs in [SocialMediaPublisherApp](https://github.com/JeremieLitzler/SocialMediaPublisherApp/blob/main/.github/workflows/release.yml) from a pinned SHA without any local modification. This repository uses the same model, with `main` as the trunk.

## Decision

`.github/workflows/release.yml` downloads `release.sh` at a pinned commit SHA (`RELEASE_SCRIPT_REF`, tag `v1.0.0`) at run time and runs that copy, never the copy on the commit being released. The SHA is pinned rather than the tag, since a tag can be moved. Moving the pin is a reviewed commit.

The release model is single-trunk and push-triggered:

- `main` is the only long-lived branch; changes land by pull request, checked by `pr-build.yml`.
- A push to `main` previews the release (`release.sh --dry-run`, written to the run summary).
- A release is cut by pushing a `release/<date>` branch off `main`; that runs the `publish` job (tag + GitHub release), which then deletes the spent `release/*` branch. The `guard` job refuses any ref but `main` or `release/*`.
- Publish runs on `GITHUB_TOKEN` (`contents: write`). No GitHub App token is needed.
- There is no `test` job: the repository has no test suite, so `guard` is the only gate on `publish`. The `pr-build.yml` build check runs on pull requests to `main`.
- A `deploy-site` job calls `NETLIFY_BUILD_HOOK` after a release is cut, kept separate so a Netlify outage never turns a published release red.
- Production is deployed by that build hook only. `netlify.toml` skips any production build not started by the hook (`CONTEXT` is `production` and `INCOMING_HOOK_TITLE` is empty), while deploy previews and branch deploys still build.
- The version is left to the commits; no level is forced.
- The repository holds no changelog file and no release tooling; the GitHub releases hold the history.

## Consequences

### Positive

- No `semantic-release` dependency chain to keep patched; no GitHub App or its secrets to provision.
- No local copy of the script to sync: it is used unmodified from upstream.
- A bug in a commit cannot break its own release, since the script is not taken from that commit.
- No release commit is written back to the repository: one trunk, nothing to sync.
- A merge to `main` does not deploy production: a release is a deliberate act.

### Negative

- Every run depends on `raw.githubusercontent.com` and the upstream repository being reachable.
- Trust moves to the upstream repository: the pin must be moved by a deliberate, reviewed change, because the script runs unattended with `--yes`.
- `release/**` is unprotected: anyone who can push to the repository can cut a release. The publish job's containment check (the ref must be contained in `main`) and the optional required reviewer on the `CI` environment are the only gates.
- A release created with `GITHUB_TOKEN` triggers no further workflow; any future `on: release` or `on: push: tags` automation must restore an App or PAT token first.
- A release can be published without a test or build run on the release ref, since no test job gates it; the build is only checked on pull requests.
- No history file in the repository; release notes live on the GitHub releases page.
- `release.sh` does not write `package.json`, so the version there stays `0.0.0`.

## Alternatives Considered

- **`semantic-release`**: rejected; heavier toolchain and an App token to maintain.
- **Vendor `release.sh` in the repository**: rejected; every upstream fix would need a reviewed re-sync.
- **Pin the tag name instead of the SHA**: rejected; a tag can be moved, a SHA cannot.
- **Let every push to `main` deploy production**: rejected; production is deployed by the release build hook only.

## Notes

- Modelled on ADR-009 of the SocialMediaPublisherApp repository.
