<p align="center">
  <img src="static/favicon.svg" alt="Favicon" width=150>
</p>

<h1 align="center">Ocean artUp</h1>

<h3 align="center">

[![Deployment](https://github.com/janosh/ocean-artup/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/janosh/ocean-artup/actions/workflows/gh-pages.yml)
[![Lighthouse](https://github.com/janosh/ocean-artup/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/janosh/ocean-artup/actions/workflows/lighthouse.yml)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/janosh/ocean-artup/main.svg)](https://results.pre-commit.ci/latest/github/janosh/ocean-artup/main)
![GitHub repo size](https://img.shields.io/github/repo-size/janosh/ocean-artup?label=Repo+Size)

</h3>

Ocean artUp is a research project funded by an [Advanced Grant](https://cordis.europa.eu/project/rcn/205206_en.html) of the European Research Council. It aims to study the feasibility, effectiveness, associated risks and potential side effects of artificial upwelling in increasing ocean productivity, raising fish production, and enhancing oceanic CO<sub>2</sub> sequestration.

This site is built with [Svelte](https://github.com/sveltejs/svelte) and [Contentful](https://contentful.com).

## Setup

Running this site locally requires [`git`](https://git-scm.com) and [`pnpm`](https://pnpm.io) (or [`npm`](https://npmjs.com)). With those installed, do:

1. Clone the repo and change into its directory.

   ```sh
   git clone https://github.com/janosh/ocean-artup && cd ocean-artup
   ```

2. (optional) Setup [`pre-commit` hooks](https://pre-commit.com).

   ```sh
   pre-commit install
   ```

3. Install dependencies.

   ```sh
   pnpm install
   ```

4. Copy `.env.example` to `.env`.

   ```sh
   cp .env.example .env
   ```

   Then open `.env` and insert your [Contentful space ID and access token](https://contentful.com/developers/docs/references/authentication). These are found in the settings menu of a Contentful space under 'API keys'.

5. Start the dev server.

   ```sh
   pnpm dev
   ```

## Deployment

This site is deployed as static HTML to [GitHub Pages](https://github.com/janosh/afara/deployments/activity_log) ([by this action](.github/workflows/gh-pages.yml)).
