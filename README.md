# jupyterlab-git

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jupyterlab/jupyterlab-git/main?urlpath=lab/tree/examples/demo.ipynb) [![Github Actions Status](https://github.com/jupyterlab/jupyterlab-git/actions/workflows/build.yml/badge.svg)](https://github.com/jupyterlab/jupyterlab-git/actions/workflows/build.yml) [![Version](https://img.shields.io/npm/v/@jupyterlab/git.svg)](https://www.npmjs.com/package/@jupyterlab/git) [![Version](https://img.shields.io/pypi/v/jupyterlab-git.svg)](https://pypi.org/project/jupyterlab-git/) [![Downloads](https://img.shields.io/npm/dm/@jupyterlab/git.svg)](https://www.npmjs.com/package/@jupyterlab/git) [![Version](https://img.shields.io/conda/vn/conda-forge/jupyterlab-git.svg)](https://anaconda.org/conda-forge/jupyterlab-git) [![Downloads](https://img.shields.io/conda/dn/conda-forge/jupyterlab-git.svg)](https://anaconda.org/conda-forge/jupyterlab-git)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-30-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

A JupyterLab extension for version control using Git

![ui_glow_up](https://raw.githubusercontent.com/jupyterlab/jupyterlab-git/main/docs/figs/preview.gif)

To see the extension in action, open the example notebook included in the Binder [demo](https://mybinder.org/v2/gh/jupyterlab/jupyterlab-git/main?urlpath=lab/tree/examples/demo.ipynb).

## Requirements

- JupyterLab >= 4.0 ([older version] available for 2.x)
- Git (version `>=2.x`)

For older versions of JupyterLab, go to:

- [3.x branch](https://github.com/jupyterlab/jupyterlab-git/tree/jlab-3)
- [2.x branch](https://github.com/jupyterlab/jupyterlab-git/tree/jlab-2)

## Usage

- Open the Git extension from the _Git_ tab on the left panel
- [Set up authentication](#authentication-to-remote-repository-hosts)

## Install

To install perform the following steps, with _pip_:

```bash
pip install --upgrade "jupyterlab<4" jupyterlab-git
```

or with _conda_:

```bash
conda install -c conda-forge "jupyterlab<4" jupyterlab-git
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_git
```

or with _conda_:

```bash
conda remove jupyterlab-git
```

## Settings

### Authentication to remote repository hosts

If you are seeing errors similar to `[E yyyy-mm-dd hh:mm:ss ServerApp] 500 POST /git/<clone|push|pull|status>` on the console which is running the JupyterLab server, you probably need to set up a credentials store for your local Git repository.

This extension tries to handle credentials for HTTP(S) connections (if you don't have set up a credential manager). But not for other SSH connections.

> For Windows users, it is recommended to install [git for windows](https://gitforwindows.org/). It will automatically set up a credential manager.
> In order to connect to a remote host, it is recommended to use SSH.

#### HTTP(S) protocol

The extension can cache temporarily (by default for an hour) credentials. To use the caching, you will need to
check the option _Save my login temporarily_ in the dialog asking your credentials.

> You can set a longer cache timeout; see [Server Settings](#server-settings).

> This is a new feature since v0.37.0

#### SSH protocol

Here are the steps to follow to set up SSH authentication (skip any that is already accomplished for your project):

1. [Create a SSH key](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
2. Register the public part of it to your Git server:
   - [GitHub](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
   - [GitLab](https://docs.gitlab.com/ee/ssh/index.html#add-an-ssh-key-to-your-gitlab-account)
3. Optionally, if you have more than one key managed by your ssh agent: [Create a config file for the ssh-agent](https://stackoverflow.com/a/21938804)
4. Tell your local Git repository to [connect to remote via ssh](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#switching-remote-urls-from-https-to-ssh)

You should now be able to pull and push committed changes to and from your remote repository using the respective buttons on the top of the extension's panel.

### UI Settings

Once installed, extension behavior can be modified via the following settings which can be set in JupyterLab's advanced settings editor:

- **blockWhileCommandExecutes**: suspend JupyterLab user interaction until Git commands (e.g., `commit`, `pull`, `reset`, `revert`) finish executing. Setting this to `true` helps mitigate potential race conditions leading to data loss, conflicts, and a broken Git history. Unless running a slow network, UI suspension should not interfere with standard workflows. Setting this to `false` allows for actions to trigger multiple concurrent Git actions.
- **cancelPullMergeConflict**: cancel pulling changes from a remote repository if there exists a merge conflict. If set to `true`, when fetching and integrating changes from a remote repository, a conflicting merge is canceled and the working tree left untouched.
- **commitAndPush**: Whether to trigger or not a push for each commit; default is `false`.
- **disableBranchWithChanges**: disable all branch operations, such as creating a new branch or switching to a different branch, when there are changed/staged files. When set to `true`, this setting guards against overwriting and/or losing uncommitted changes.
- **displayStatus**: display Git extension status updates in the JupyterLab status bar. If `true`, the extension displays status updates in the JupyterLab status bar, such as when pulling and pushing changes, switching branches, and polling for changes. Depending on the level of extension activity, some users may find the status updates distracting. In which case, setting this to `false` should reduce visual noise.
- **doubleClickDiff**: double click a file in the Git extension panel to open a diff of the file instead of opening the file for editing.
- **historyCount**: number of commits shown in the history log, beginning with the most recent. Displaying a larger number of commits can lead to performance degradation, so use caution when modifying this setting.
- **promptUserIdentity**: Whether to prompt for user name and email on every commit.
- **refreshIfHidden**: whether to refresh even if the Git tab is hidden; default to `false` (i.e. refresh is turned off if the Git tab is hidden).
- **refreshInterval**: number of milliseconds between polling the file system for changes. In order to ensure that the UI correctly displays the current repository status, the extension must poll the file system for changes. Longer polling times increase the likelihood that the UI does not reflect the current status; however, longer polling times also incur less performance overhead.
- **simpleStaging**: enable a simplified concept of staging. When this setting is `true`, all files with changes are automatically staged. When we develop in JupyterLab, we often only care about what files have changed (in the broadest sense) and don't need to distinguish between "tracked" and "untracked" files. Accordingly, this setting allows us to simplify the visual presentation of changes, which is especially useful for those less acquainted with Git.

### Server Settings

- `JupyterLabGit.actions.post_init`: Set post _git init_ actions.
  It is possible to provide a list of commands to be executed in a folder after it is initialized as Git repository.
- `JupyterLabGit.credential_helper`: Git credential helper to set to cache the credentials.
  The default value is `cache --timeout=3600` to cache the credentials for an hour. If you want to cache them for 10 hours, set `cache --timeout=36000`.
- `JupyterLabGit.excluded_paths`: Set path patterns to exclude from this extension. You can use wildcard and interrogation mark for respectively everything or any single character in the pattern.
- `JupyterLabGit.git_command_timeout_s`: Set the timeout for git operations. Defaults to 20 seconds.
<details>
<summary><b>How to set server settings?</b></summary>

In `$HOME/.jupyter/jupyter_notebook_config.py` (on Windows `%USERPROFILE%/.jupyter/jupyter_notebook_config.py`):

```python
c.JupyterLabGit.actions = {"post_init": ["touch dummy_init.dat"]}
c.JupyterLabGit.credential_helper = 'cache --timeout=3600'
```

Or equivalently in `$HOME/.jupyter/jupyter_notebook_config.json` (on Windows `%USERPROFILE%/.jupyter/jupyter_notebook_config.json`):

```json
{
  "JupyterLabGit": {
    "actions": {
      "post_init": ["touch dummy_init.dat"]
    },
    "credential_helper": "cache --timeout=3600"
  }
}
```

</details>

## Troubleshoot

If you are seeing the frontend extension, but it is not working, check
that the server extension is enabled:

```bash
jupyter server extension list
```

If the server extension is installed and enabled, but you are not seeing
the frontend extension, check the frontend extension is installed:

```bash
jupyter labextension list
```

If they do not match or one is missing, please [reinstall the package](README.md#Install).

<details><summary>the Git panel does not recognize that you are in a Git repository.</summary>

Possible fixes:

- Be sure to be in a Git repository in the filebrowser tab

- Check the server log. If you see a warning with a 404 code similar to:
  `[W 00:27:41.800 LabApp] 404 GET /git/settings?version=0.20.0`

  Explicitly enable the server extension by running:

  ```bash
  jupyter server extension enable --py jupyterlab_git
  ```

- If you are using JupyterHub or some other technologies requiring an initialization script which includes the jupyterlab-git extension, be sure to install both the frontend and the server extension **before** launching JupyterLab.
</details>

<details>
<summary>the Git panel is not visible.</summary>

Possible fixes:

- Check that the JupyterLab extension is installed:

      ```bash
      jupyter labextension list
      ```

      If you don't see `@jupyterlab/git v... enabled OK` in the list, explicitly install the jupyter labextension by running:

      ```bash
      jupyter labextension install @jupyterlab/git
      ```

      If you see `@jupyterlab/git` under `Uninstalled core extensions: `, your installation may have been corrupted. You can run `jupyter lab clean --all` and
      reinstall all your extensions.

</details>

## Contributing

If you would like to contribute to the project, please read our [contributor documentation](https://github.com/jupyterlab/jupyterlab/blob/main/CONTRIBUTING.md).

JupyterLab follows the official [Jupyter Code of Conduct](https://github.com/jupyter/governance/blob/main/conduct/code_of_conduct.md).

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
git clone https://github.com/jupyterlab/jupyterlab-git.git
# Change directory to the jupyterlab-git directory
cd jupyterlab-git
# Install package in development mode
pip install -e ".[dev,test]"
pre-commit install
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Server extension must be manually installed in develop mode
jupyter server extension enable jupyterlab_git
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
# Server extension must be manually disabled in develop mode
jupyter server extension disable jupyterlab_git
pip uninstall jupyterlab_git
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `@jupyterlab/git` within that folder.

### Testing the extension

#### Server tests

This extension is using [Pytest](https://docs.pytest.org/) for Python code testing.

Install test dependencies (needed only once):

```sh
pip install -e ".[test]"
# Each time you install the Python package, you need to restore the front-end extension link
jupyter labextension develop . --overwrite
```

To execute them, run:

```sh
pytest -vv -r ap --cov jupyterlab_git
```

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)

## Contributors ✨

The Jupyter Git extension is part of [Project Jupyter](http://jupyter.org/) and is developed by an open community of contributors. To see who has been active recently, please look at the ["Contributors"](https://github.com/jupyterlab/jupyterlab-git/graphs/contributors) tab. Below we list the people and entities who contributed in different ways to the project ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://amazon.com/aws"><img src="https://avatars3.githubusercontent.com/u/2232217?v=4?s=100" width="100px;" alt="Amazon Web Services"/><br /><sub><b>Amazon Web Services</b></sub></a><br /><a href="#financial-aws" title="">🤝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ashutoshbondre"><img src="https://avatars0.githubusercontent.com/u/13174154?v=4?s=100" width="100px;" alt="Ashutosh Bondre"/><br /><sub><b>Ashutosh Bondre</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=ashutoshbondre" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Aashutoshbondre" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/stdlib-js/stdlib"><img src="https://avatars0.githubusercontent.com/u/2643044?v=4?s=100" width="100px;" alt="Athan"/><br /><sub><b>Athan</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=kgryte" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Akgryte" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-kgryte" title="Project Management">📆</a> <a href="#design-kgryte" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://basokant.com"><img src="https://avatars.githubusercontent.com/u/70033855?v=4?s=100" width="100px;" alt="Ben Asokanthan"/><br /><sub><b>Ben Asokanthan</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=basokant" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/BoscoCHW"><img src="https://avatars.githubusercontent.com/u/45115214?v=4?s=100" width="100px;" alt="Bosco Chan"/><br /><sub><b>Bosco Chan</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=BoscoCHW" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ellisonbg"><img src="https://avatars3.githubusercontent.com/u/27600?v=4?s=100" width="100px;" alt="Brian E. Granger"/><br /><sub><b>Brian E. Granger</b></sub></a><br /><a href="#projectManagement-ellisonbg" title="Project Management">📆</a> <a href="#design-ellisonbg" title="Design">🎨</a> <a href="#ideas-ellisonbg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#fundingFinding-ellisonbg" title="Funding Finding">🔍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Damans227"><img src="https://avatars.githubusercontent.com/u/61474540?v=4?s=100" width="100px;" alt="Daman Arora"/><br /><sub><b>Daman Arora</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=Damans227" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://dquach.dev"><img src="https://avatars.githubusercontent.com/u/6735818?v=4?s=100" width="100px;" alt="Dat Quach"/><br /><sub><b>Dat Quach</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=quachtridat" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fcollonval"><img src="https://avatars1.githubusercontent.com/u/8435071?v=4?s=100" width="100px;" alt="Frédéric Collonval"/><br /><sub><b>Frédéric Collonval</b></sub></a><br /><a href="#maintenance-fcollonval" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hzarea"><img src="https://avatars1.githubusercontent.com/u/27518229?v=4?s=100" width="100px;" alt="Hana Zarea"/><br /><sub><b>Hana Zarea</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=hzarea" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Ahzarea" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ianhi.github.io"><img src="https://avatars0.githubusercontent.com/u/10111092?v=4?s=100" width="100px;" alt="Ian Hunt-Isaak"/><br /><sub><b>Ian Hunt-Isaak</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=ianhi" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Aianhi" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jaipreet-s"><img src="https://avatars1.githubusercontent.com/u/43826141?v=4?s=100" width="100px;" alt="Jaipreet Singh"/><br /><sub><b>Jaipreet Singh</b></sub></a><br /><a href="#projectManagement-jaipreet-s" title="Project Management">📆</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Ajaipreet-s" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=jaipreet-s" title="Code">💻</a> <a href="#design-jaipreet-s" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zzhangjii"><img src="https://avatars3.githubusercontent.com/u/11495372?v=4?s=100" width="100px;" alt="Ji Zhang"/><br /><sub><b>Ji Zhang</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=zzhangjii" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Azzhangjii" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kentarolim10"><img src="https://avatars.githubusercontent.com/u/61769040?v=4?s=100" width="100px;" alt="Kentaro Lim"/><br /><sub><b>Kentaro Lim</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=kentarolim10" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://taletskiy.com"><img src="https://avatars0.githubusercontent.com/u/8834829?v=4?s=100" width="100px;" alt="Konstantin Taletskiy"/><br /><sub><b>Konstantin Taletskiy</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=ktaletsk" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Aktaletsk" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kostyafarber.github.io/"><img src="https://avatars.githubusercontent.com/u/73378227?v=4?s=100" width="100px;" alt="Kostya Farber"/><br /><sub><b>Kostya Farber</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=kostyafarber" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.lindaful.com"><img src="https://avatars.githubusercontent.com/u/68607795?v=4?s=100" width="100px;" alt="Linda Ngoc Nguyen"/><br /><sub><b>Linda Ngoc Nguyen</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=iflinda" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fellowship.mlh.io/"><img src="https://avatars.githubusercontent.com/u/65834464?s=200&v=4?s=100" width="100px;" alt="Major League Hacking"/><br /><sub><b>Major League Hacking</b></sub></a><br /><a href="#financial-mlh" title="">🤝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/max-klein-b514419"><img src="https://avatars2.githubusercontent.com/u/2263641?v=4?s=100" width="100px;" alt="Max Klein"/><br /><sub><b>Max Klein</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=telamonian" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Atelamonian" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-telamonian" title="Project Management">📆</a> <a href="#design-telamonian" title="Design">🎨</a> <a href="#infra-telamonian" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://linkedin.com/in/michal-krassowski/"><img src="https://avatars.githubusercontent.com/u/5832902?v=4?s=100" width="100px;" alt="Michał Krassowski"/><br /><sub><b>Michał Krassowski</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=krassowski" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Akrassowski" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jupyterlab/jupyterlab-git/issues?q=author%3Akrassowski" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://navn.me"><img src="https://avatars.githubusercontent.com/u/59669957?v=4?s=100" width="100px;" alt="Navinn Ravindaran"/><br /><sub><b>Navinn Ravindaran</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=navn-r" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/neelamgehlot"><img src="https://avatars2.githubusercontent.com/u/15882916?v=4?s=100" width="100px;" alt="Neelam Gehlot"/><br /><sub><b>Neelam Gehlot</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=neelamgehlot" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Aneelamgehlot" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://noahstapp.com/"><img src="https://avatars0.githubusercontent.com/u/30483654?v=4?s=100" width="100px;" alt="Noah Stapp"/><br /><sub><b>Noah Stapp</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=NoahStapp" title="Code">💻</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3ANoahStapp" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.saulshanabrook.com/"><img src="https://avatars1.githubusercontent.com/u/1186124?v=4?s=100" width="100px;" alt="Saul Shanabrook"/><br /><sub><b>Saul Shanabrook</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=saulshanabrook" title="Code">💻</a> <a href="#projectManagement-saulshanabrook" title="Project Management">📆</a> <a href="https://github.com/jupyterlab/jupyterlab-git/pulls?q=is%3Apr+reviewed-by%3Asaulshanabrook" title="Reviewed Pull Requests">👀</a> <a href="#infra-saulshanabrook" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shawnesquivel"><img src="https://avatars.githubusercontent.com/u/94336773?v=4?s=100" width="100px;" alt="Shawn Esquivel"/><br /><sub><b>Shawn Esquivel</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=shawnesquivel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sheezaaziz.com"><img src="https://avatars.githubusercontent.com/u/47278108?v=4?s=100" width="100px;" alt="Sheeza Aziz"/><br /><sub><b>Sheeza Aziz</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=sheezaaziz" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sinakhalili.com"><img src="https://avatars.githubusercontent.com/u/20732540?v=4?s=100" width="100px;" alt="Sina Khalili"/><br /><sub><b>Sina Khalili</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=SinaKhalili" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.deshaw.com/"><img src="https://avatars0.githubusercontent.com/u/2298205?v=4?s=100" width="100px;" alt="The D. E. Shaw Group"/><br /><sub><b>The D. E. Shaw Group</b></sub></a><br /><a href="#financial-deshaw" title="">🤝</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ZeshanFayyaz"><img src="https://avatars.githubusercontent.com/u/43391249?v=4?s=100" width="100px;" alt="Zeshan Fayyaz"/><br /><sub><b>Zeshan Fayyaz</b></sub></a><br /><a href="https://github.com/jupyterlab/jupyterlab-git/commits?author=ZeshanFayyaz" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jupytercalpoly"><img src="https://avatars0.githubusercontent.com/u/19445175?v=4?s=100" width="100px;" alt="jupytercalpoly"/><br /><sub><b>jupytercalpoly</b></sub></a><br /><a href="#financial-jupytercalpoly" title="">🤝</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcomed!

To add yourself, or someone else, to this list you can either [use the bot](https://allcontributors.org/docs/en/bot/usage) (`@all-contributors please add <username> for <contributions>`) or [the CLI](https://allcontributors.org/docs/en/cli/usage) (`jlpm all-contributors add <username> <contributions>`).

If you manually edit the `.all-contributorsrc` config file, run `yarn run contributors:generate`.
