# Google Ads Managed Component

Find out more about Managed Components [here](https://blog.cloudflare.com/zaraz-open-source-managed-components-and-webcm/) for inspiration and motivation details.

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Released under the Apache license.](https://img.shields.io/badge/license-apache-blue.svg)](./LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## 🚀 Quickstart local dev environment

1. Make sure you're running node version >=18.
2. Install dependencies with `npm i`
3. Run unit test watcher with `npm run test:dev`

## ⚙️ Tool Settings

> Settings are used to configure the tool in a Component Manager config file

### Conversion ID `string` _required_

`conversionId` - Google Ads conversion tags help to build reports that show you what happens after a customer clicks on your ads.

### Google Analytics Account `string` _required_

`gaAccount` - Enter your Google Analytics tracking ID to link to the conversion to your Google analytics account.

### Tag Firing Options `string` _required_

`tagFiringOptions` - Use `once-per-page` to avoid firing this tag more than once.

### Once-per-page `boolean`

`zrzOncePerPage` - See Tag Firing Options above.

### Enable Conversion Linker `boolean`

`conversionLinker` - Enables the conversion linker for this Google Ads component.

## 🧱 Fields Description

### Event Type `string` _required_

`event` the type of event can be one of:

- Conversion
- Remarketing

Its value will determine how Google Ads will process it.

### Label `string`

`label` - The Conversion Label identifies the specific conversion. [Learn more](https://support.google.com/google-ads/answer/6095821)

## 📝 License

Licensed under the [Apache License](./LICENSE).

## 💜 Thanks

Thanks to everyone contributing in any manner for this repo and to everyone working on Open Source in general.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/simonabadoiu"><img src="https://avatars.githubusercontent.com/u/1610123?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Simona Badoiu</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/google-ads/commits?author=simonabadoiu" title="Code">💻</a></td>
    <td align="center"><a href="https://yoavmoshe.com/about"><img src="https://avatars.githubusercontent.com/u/55081?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Yo'av Moshe</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/google-ads/commits?author=bjesus" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jonnyparris"><img src="https://avatars.githubusercontent.com/u/6400000?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Ruskin</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/google-ads/commits?author=jonnyparris" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tomkln"><img src="https://avatars.githubusercontent.com/u/21014430?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Tom</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/google-ads/commits?author=tomkln" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kuba-orlik"><img src="https://avatars.githubusercontent.com/u/2697916?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Kuba</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/google-ads/commits?author=tomkln" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tomkln"><img src="https://avatars.githubusercontent.com/u/57571831?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Maryna</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/google-ads/commits?author=tomkln" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/omarmosid"><img src="https://avatars.githubusercontent.com/u/47219640?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Omar</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/google-ads/commits?author=tomkln" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
