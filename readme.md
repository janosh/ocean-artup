<p align="center">
  <a href="https://ocean-artup.eu"><img src="static/favicon.svg" alt="Favicon" width=150></a>
</p>

<h1 align="center">
  <a href="https://ocean-artup.eu">Ocean artUp</a>
</h1>

<h3 align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/209f70e1-0a07-4d82-b642-55c77f2af40f/deploy-status)](https://app.netlify.com/sites/ocean-artup/deploys)
[![CI](https://github.com/janosh/ocean-artup/workflows/CI/badge.svg)](https://github.com/janosh/ocean-artup/actions)
[![License](https://img.shields.io/github/license/janosh/ocean-artup?label=License)](/license)
![GitHub repo size](https://img.shields.io/github/repo-size/janosh/ocean-artup?label=Repo+Size)
[![GitHub last commit](https://img.shields.io/github/last-commit/janosh/ocean-artup?label=Last+Commit)](https://github.com/janosh/ocean-artup/commits/main)

</h3>

Ocean artUp is a research project funded by an [Advanced Grant](https://cordis.europa.eu/project/rcn/205206_en.html) of the European Research Council. It aims to study the feasibility, effectiveness, associated risks and potential side effects of artificial upwelling in increasing ocean productivity, raising fish production, and enhancing oceanic CO<sub>2</sub> sequestration.

This site is built with [Svelte](https://github.com/sveltejs/svelte) and [Contentful](https://contentful.com).

## Setup

Running this site locally requires [`git`](https://git-scm.com) and [`yarn`](https://yarnpkg.com) (or [`npm`](https://npmjs.com)). With those installed, do:

1. Clone the repo and change into its directory.

   ```sh
   git clone https://github.com/janosh/ocean-artup && cd ocean-artup
   ```

2. (optional) Setup [`git` hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) by setting `core.hooksPath` and granting execute permission.

   ```sh
   git config core.hooksPath src/utils/gitHooks
   && chmod -R u+x src/utils/gitHooks
   ```

3. Install dependencies.

   ```sh
   yarn
   ```

4. Copy `.env.example` to `.env`.

   ```sh
   cp .env.example .env
   ```

   Then open `.env` and insert your [Contentful space ID and access token](https://contentful.com/developers/docs/references/authentication). These are found in the settings menu of a Contentful space under 'API keys'.

5. Start the dev server.

   ```sh
   yarn dev
   ```

## Deploy

To publish this site to netlify:

1. Create an account with [netlify](https://netlify.com).
2. Install the [`netlify-cli`](https://netlify.com/docs/cli).
3. Login to your account.

   ```sh
   netlify login
   ```

4. Connect your GitHub repo with your netlify account for [continuous deployment](https://netlify.com/docs/cli/#continuous-deployment).

   ```sh
   netlify init
   ```

5. Create a production build.

   ```sh
   yarn build
   ```

6. Finally deploy the site with

   ```sh
   netlify deploy
   ```
