# An Opinionated Vue and Supabase Boilerplate

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/f4982a72-e155-4fb3-86b1-0881d3fb170c/deploy-status)](https://app.netlify.com/sites/vue-and-supabase-boilerplate-demo/deploys)

Current branch deployed: `templates/with-manual-form-and-vee-validate`

## Introduction

This template should help get you started developing with Vue 3 in Vite.

It is an opinionated template that uses:

- Vue 3
- Vue Router with Unplugin Vue Router
- Pinia
- VeeValidate for the forms
- VueUse
- and the awesome Supabase for the backend

## Custom Commands

The boilerplate contains `.bashrc` file with handy commands for Supabase CLI and more. To use it, run:

```sh
source .bashrc
```

## Supabase

You can [install Supabase CLI with Scoop](https://scoop.sh/#/apps?q=supabase).

## Environment Variables

You'll need to create and fill a `.env` file from the `.env.prod` available.

You'll need to create an account on Supabase to fill the following variables.

The values for Supabase variables are found under `Project Settings blade > API blade` in your project dashboard:

- _URL_ = variable `VITE_SUPABASE_URL`
- _anon public_ = variable `VITE_SUPABASE_KEY`
- _service_role secret_ = variable `VITE_SUPABASE_PROJECT_SERVICE_ROLE`

IMPORTANT: [some changes are planned in 2025](https://github.com/orgs/supabase/discussions/29260) regarding API keys.

The `VITE_TESTING_USER_EMAIL` is used to seed the database.
The `SUPABASE_PROJECT_ID` is used to run the custom commands `sp-link-env` and `sp-gen-types` on your local machine. See `.bashrc`.
The `SUPABASE_PROJECT_PASSWORD` is used to run the custom command `sp-link-env` on your local machine. See `.bashrc`.

The values for hCaptcha variables are found on your account:

- _Secret_ under the settings page or at account creation = variable `VITE_HCAPTCHA_SECRET`
- _Site key_ under the sites page = variable `VITE_HCAPTCHA_SITEKEY`

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
# Or
npm i
```

### Compile and Hot-Reload for Development

```sh
npm run dev
# Or, if using the .bashrc
nd
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
# Or, if using the .bashrc
nb
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Releases

Releases follow [ADR-001](docs/decisions/adr-001-release-sh-pinned-script-release-workflow.md). `main` is the only long-lived branch and changes land by pull request.

- A push to `main` runs a dry-run preview of the next release (version and notes) in the `release` workflow run summary.
- To cut a release, push a `release/<date>` branch off the tip of `main`: `git switch -c release/2026-10-23 && git push -u origin release/2026-10-23`. The workflow tags the commit, creates the GitHub release and deletes the `release/*` branch. The version comes from the conventional commits.
- Once a release is cut, the workflow calls the `NETLIFY_BUILD_HOOK` repository Actions secret to deploy production. Netlify skips production builds that the hook did not start (see `netlify.toml`); deploy previews still build.
- The **Actions > release** workflow can also be run manually: `preview`, `publish` (from `main` or `release/*`) or `deploy-site` (redeploys without a release).
- `release.sh` is downloaded at the commit pinned in `RELEASE_SCRIPT_REF` in `.github/workflows/release.yml`; the comment above it explains how to move the pin.
- The history lives on the [GitHub releases](https://github.com/JeremieLitzler/VueSupabaseBoilerplate/releases) page.

## About Supabase

- Install it with [Scoop](https://scoop.sh/#/apps?q=supabase)
- Initialize your `.env`

  ```plaintext
  SUPABASE_PROJECT_ID=[set project id available on https://supabase.com/dashboard/project and by selecting the target project]
  SUPABASE_PROJECT_PASSWORD=[the password you chose when creating the project]
  VITE_SUPABASE_URL=https://[set project id].supabase.co
  VITE_SUPABASE_KEY=[see https://supabase.com/dashboard/project/[your project id]/settings/api-keys > "Publishable key"]
  VITE_TESTING_USER_EMAIL="[pick a working email, Yopmail works great => http://yopmail.com/]"
  VITE_SUPABASE_PROJECT_SERVICE_ROLE=[see https://supabase.com/dashboard/project/[your project id]/settings/api-keys > "Secret keys"]
  VITE_HCAPTCHA_SECRET=[see https://docs.hcaptcha.com/#integration-testing-test-keys]
  VITE_HCAPTCHA_SITEKEY=[see https://docs.hcaptcha.com/#integration-testing-test-keys]
  ```

- Run `source .bashrc` to load the bash aliases
- Run `sp-init` and select:

  ```plaintext
  Generate VS Code settings for Deno? [y/N] N
  Generate IntelliJ Settings for Deno? [y/N] N
  ```

- Run `sp-login` and follow the instructions.
  **⚠️ MAKE SURE THE DEFAULT BROWSER AND WINDOWS IS ALREADY LOGGED IN TO SUPABASE ⚠️**.

- Run `sp-link-env`

- Run `sp-db-rs` to reset and seed the database.
- Run `npm run dev`
- Navigate to Mail client (if [Yopmail](http://yopmail.com/) and load the inbox of the email you've set in the env variable `VITE_TESTING_USER_EMAIL`)
- Open the email recieved fron Supabase and click "Confirm" link
- Open the application and log in.
- You're done! ✨
