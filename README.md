# car-validation-vanilla-js

## Architecture

```mermaid
flowchart LR
  Driver[Driver] -->|enter car details| Form[HTML car details form\nVercel static hosting]
  Form --> JS[Vanilla JavaScript validation]
  JS --> Form
  Form --> Browser[Browser renders validation feedback]
```

[![Netlify Status](https://api.netlify.com/api/v1/badges/09f31079-7767-4696-a841-e822a03b576d/deploy-status)](https://app.netlify.com/sites/car-validation-vanilla-js/deploys)

Car Details Form Validation using Vanilla JavaScript

## Vercel Deployment
This is a static vanilla JavaScript application with no bundler build step. Connect the repository root to Vercel; the root [vercel.json](./vercel.json) publishes the checked-in static files directly. Preview branches receive preview deployments; production follows the configured production branch. No server environment values are needed.

