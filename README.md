# react-starter

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). 
It's had a number of libraries, tools and configurations added, including:
  * react-bootstrap
  * react-motion-drawer  
  * react-router
  * redux
    * reduxsauce
    * redux-router
    * redux-saga
  * immutable.js
  * TODO: document the rest


# Running behind a reverse proxy? 

We typically run our services behind a single reverse proxy (usually behind the beloved Kubernetes). 
To get this setup working cleanly, two changes are required:
  1. Add the following to `package.json` 
  ``` 
    "homepage": "/somePrefix/",
  ```
  2. And configure the `BrowserRouter` instance in `App.js`:
  ```
    <Router basename="/somePrefix/">
  ```

That should do it! 
    