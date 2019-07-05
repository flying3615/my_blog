---
path: "/sportsbook"
date: 2019-07-05
title: "Sports Book"
---

![](https://source.unsplash.com/user/erondu)

# NZRB's tab.co.nz Application

This repo contains NZRB's tab.co.nz application which includes a sportsbook which
includes a rich racing section, and full account capabilities.

## Walk me through things!

The numbered steps below explain what a browser will do when loading a page that
contains SG Digital page components, a.k.a widgets.

### 1. `index.shtml`

The file at `./public/index.shtml` is included in the final release bundle of
this repo. It provides the main page structure of the application and also act's
as a container for dynamic application configuration. As you can see in the file
there are a number of lines that look like;

```html
<!--#include file="./ssi/app-configuration-script.html" -->
```

These are designed to be substituted by Apache configured to support SSI (server
side includes). The contents of the `./ssi/app-configuration-script.html` file is
expected to be written by some sort of configuration management tool such as Ansible.

<?
  <h1>HTML test</h1>
?>

The file sourced by the browser will have the configuration substituted into it
and the SSI sections will be replaced instead look something like;

```javascript
(function(window) {

  window.__ServerTime__ = '2018-05-30T10:22:38+1200';

  window.__OpenbetAppConfig__ = {
    basePath: '/front-end',
    endpoints: {
      account: 'https://api.example.com/account-service/api/v1',
      bet: 'https://api.example.com/bet-service/api/v1',
      identity: 'https://auth.example.com/identity-service/api/v1',
      payment: 'https://api.example.com/payment-service/api/v1',
      content: 'https://content.example.com/content-service/api/v1',
      promotion: 'https://api.example.com/promotions-service/api/v0'
    },
    liveServ: {
      baseUrl: 'https://www.example.com/static/liveserv',
      instances: [
        {
          host: 'wss://push.example.com/websock',
          port: null,
          method: 'WEB_SOCK'
        },
        {
          host: 'push.example.com',
          port: 443,
          method: 'AJAX'
        }
      ]
    },
})(window)
```

As well as containing configuration this file also initialises the actual application,
this is done in two locations. First in the `head` section we have the following
snippet;

```
<script>
  (function(w,l){w[l]=w[l]||{q:[],load:function(e,n,c){w[l].q.push([e,n,c])}}})(window,'SGDPortal');
</script>
```

this snippet actually defines a global Javascript function which can be called immediately;

```
SGDPortal.load(<selector>, <component>, <configuration>)
```

which allows us to request that a specific page component is loaded into a specific 
DOM element on the page with particular configuration (if needed).

Secondly at the footer of the page we invoke `SGDPortal.load` requesting that the
`site` component be loaded into the `main#app` DOM selector, and then immediately
follow this with a snippet of code which will load the main Webpack bundle (i.e.
the actual application code itself).

_Note: this code isn't 'Webpacked' and hence it needs to be raw Javascript that
can run in a browser as-is._

### 2. `./app.config.js`

This file defines *what* page components should be mounted in this application. In
NZRB's case this is one large component that actually implements an entire portal
application.

The key thing to understand is that this code is bundled by Webpack and hence we're
able to source NPM modules that are necessary to implement the needs of the operator.

### 3. `./src/app-prod.js`

This file is ultimately the *entrypoint* to what gets bundled by Webpack into the
`/assets/main.bundle.js` file you can see being added dynamically to the page in
the `index.shtml` file above. It invokes the dynamic loader
`DynamicLoader.initialise(...)` with the application configuration set in
`app.config.js`. 

_Note: there is also a `./src/app-dev.js` file that performs the same job, but also
looks after bootstrapping Mountebank mocks when the application loads in development
mode. That file actually calls back into `app-prod.js` to do the dynamic loading._

### 4. `./src/dynamicLoader.js`

The dynamic loader code is responsible for actually honouring the interface we have
provided to the host page, remember the `SGDPortal.load(...)` method from earlier?
It's in this file that we actually 'upgrade' the small snippet of code that we have
added to our `./public/index.shtml` page into a fully fledged function that will
render SG Digital page components to the page.

One useful feature, infact it's the reason we do things the way we do, of using the
snippet of code we do is so that the host page itself doesn't need to worry about
observing the `/assets/main.bundle.js` file successfully loading before starting to
call the `SGDPortal.load(...)` method. The snippet actually implements a small
queue of requests and when the dynamic loader kicks into life it drains that queue
of requests and actions them while at the same time any new requests are actioned too.


## Deployment

See [here](https://wiki.openbet.com/display/OBFE/Web+App+Deployment) for details of how to deploy.

See [here](https://nzrb.jm.dev.openbet.com/job/nzrb-frontend-webapp-pipeline/job/master/) for the CI job that creates RPM's.

See [here](https://artifactory.int.openbet.com/artifactory/webapp/#/artifacts/browse/tree/General/nzrb-candidate-local/com/openbet/nzracingboard/openbet-front-end-webapp) for the RPM's in Artifactory.
