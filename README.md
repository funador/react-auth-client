# React Social Authentication

## Getting Started

```
git clone https://github.com/funador/react-auth-client.git
cd react-auth-client
npm i && HTTPS=true npm start
```

#### Because of Facebook, https is required. Even in development. 
Facebook recently updated their developer requirements to have all apps interacting with their api (including those in development) to be served over https.  This means you will need to run create-react-app in https mode. Plus set up certificates for your server. Go ahead and get yourself a cup of coffee. This could take a minute.

To add https to localhost [follow these instructions](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec) (OS X).

You will also need to manually add the https certificate to Chrome as [described here](https://www.comodo.com/support/products/authentication_certs/setup/mac_chrome.php).

I also had to open a seperate tab for https://localhost:8080 and accept the security warning before the client would push requests through.

If you only want to use Twitter authentication (https is not required), follow the instructions in [this branch](https://github.com/funador/react-auth-client/tree/twitter-auth)

## Client

Depending on your OS you will have to flag the HTTPS enviornment variable differently. Above is for OS X. Documentation is [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-https-in-development). 

## Server

Follow the instructions in the [server repo](https://github.com/funador/react-auth-server)
``` 
cd server && npm i
touch .env
// open .env and add values for: TWITTER_KEY, TWITTER_SECRET, GOOGLE_KEY, 
// GOOGLE_SECRET, FACEBOOK_KEY, FACEBOOK_SECRET, GITHUB_KEY, GITHUB_SECRET
// SESSION_SECRET
// You get the keys and secret from registering at the appropriate 
// provider (ie. Twitter, Google, Facebook, Github)
// Make sure you have added 'https://127.0.0.1:8080/__provider__/callback'
// in your callback settings for each provider
npm run dev
```

Finally open https://localhost:3000

#### Deploy
Everything is set up to deploy to Netlify. You just need to `npm run build` on the client and deploy to netlify.

### Issues

Something not working?  Please [open an issue](https://github.com/funador/react-auth-client/issues)