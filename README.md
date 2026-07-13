# React Social Authentication Client

![React Social Auth](https://i.imgur.com/acA83LR.gif)

Client half of a decoupled OAuth setup for React: clicking a provider button opens a popup to the server, which does the actual OAuth dance and pushes the authenticated profile back here over a socket. Written in TypeScript.

## Demo

[Live demo](https://react-multi-auth.vercel.app)

## Medium posts that detail this repo
* [Twitter, Google, Facebook, Github version on Codeburst](https://medium.com/p/862d59583105)
* [Twitter only version on ITNEXT](https://medium.com/p/2f6b7b0ee9d2)

## Getting Started

```shell
git clone https://github.com/funador/react-auth-client.git
cd react-auth-client
npm i && HTTPS=true npm start
```

### Because of Facebook, HTTPS is required locally

Facebook requires every app talking to its API — including apps in development — to be served over HTTPS.

#### macOS
To add HTTPS to localhost, [follow these instructions](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec), then manually trust the cert in Chrome as [described here](https://www.comodo.com/support/products/authentication_certs/setup/mac_chrome.php).

You may also need to open a separate tab for `https://localhost:8080` and accept the security warning before the client will push requests through.

#### Windows
Thanks to [Le Gui PPF](https://medium.com/@guillaume.bottius) for these SSL-on-Windows instructions:

> I spent a whole day figuring out how to generate a proper SSL certificate with all Chrome's requirements — see [this answer](https://serverfault.com/a/850961) and add the following to the v3 req section:
>
> ```
> authorityKeyIdentifier=keyid,issuer
> basicConstraints=CA:FALSE
> keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
> ```

If you only want Twitter/Google/Github authentication (no HTTPS hassle), use [the twitter-auth branch](https://github.com/funador/react-auth-client/tree/twitter-auth) instead.

## Server

This client just talks to a socket + a few OAuth routes — there's no client-side provider setup. Follow the instructions in the [server repo](https://github.com/funador/react-auth-server) to register each provider and get the server running.

Once the server's reachable, open `https://localhost:3000`.

### Deploy

Deployed on Vercel, pointed at the deployed server via `API_URL` in `src/config.ts`.

### Issues

Something not working? Please [open an issue](https://github.com/funador/react-auth-client/issues) or submit a PR.
