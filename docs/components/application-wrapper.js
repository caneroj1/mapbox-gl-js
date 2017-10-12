import React from 'react';

// Do not import the following during the static build.
// Otherwise Node will complain that window is not defined.
// if (typeof window !== 'undefined') {
//   import(/* webpackChunkName: "assembly-js" */ '@mapbox/mapbox-assembly/dist/assembly.js');
// }

// Disable Raven if this isn't a production build, so we don't send development
// errors to Sentry.
if (process.env.DEPLOY_ENV !== 'production' && typeof window != 'undefined') {
  window.MapboxPageShell.disableRaven();
}

// Sync the page shell (which makes session API calls) with the deployment
// environment.
if (process.env.DEPLOY_ENV === 'production' && typeof window != 'undefined') {
  window.MapboxPageShellProduction = true;
}

// Add more code that should only run once, when the app starts.

class ApplicationWrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

export default ApplicationWrapper;
