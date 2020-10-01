

## Table of contents

- [Quick start](#quick-start)
- [Status](#status)
- [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Versioning](#versioning)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)


## Quick start

Several quick start options are available:

- Clone the repo: `git@github.com:richardforjoe/ts-code-snippets.git`
- Install with [npm](https://www.npmjs.com/): `npm install`


## Status
Completed snippets:

how-to-setup-dynamic-api-using-express

Pending snippets:

how-to-setup-dynamic-api-using-apimocker

how-to-setup-api-mocker

how-to-mock-websocket

hot-to-mock-graphql


## What's included

Within the download you'll find the following directories and files:

```npm run polling
src
└── how-to-setup-dynamic-api-using-express/
    ├── mocks/
    │   ├── OriginalData.json
    │   ├── polledResponse.json
    │   apiDynamicPollingService.ts
    ├── server.start.ts
    └── server.ts
    
```


## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines]


## Documentation

TBC

### Running documentation locally

1. Run `npm install` to install the Node.js dependencies
2. Amend startPolling(numberOfItems, pollingInterval) in server.ts line 45 - This sets how many items should be injected and at what intervals in milliseconds - ms
2. Run `npm run polling` Express should setup an endpoint.
4. Open `http://localhost:8055/endpoint?id=TEST` in your browser, and observer the json is updated every 5000ms(5seconds) upon refresh.


### Documentation for previous releases


## Contributing

maintained by [Richard Forjoe](https://github.com/richardforjoe). Looking for contributors to add snippets for mocking api's


## Community

- Follow [@rforjoe on Twitter](https://twitter.com/rforjoe).
- Instagram for my photography [Street photography](https://www.instagram.com/forjoe_streets/).
- Linkedin (https://www.linkedin.com/in/richardforjoe/)
- Website (http://rforjoe.mystrikingly.com/blog)


## Versioning


## Creators

**Richard Forjoe**


## Thanks

## Sponsors

## Copyright and license

Code and documentation copyright 2011–2020 the [Richard Forjoe](https://github.com/richardforjoe) Code released under the [MIT License]. Docs released under [Creative Commons](https://creativecommons.org/licenses/by/3.0/).
