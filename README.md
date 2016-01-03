# kadkad-mgmt

Image gallery management application. Frontend for [dakdak-api](https://github.com/miro/dakdak-api).

Better README is on the works.

Currently seems to be working only with node v0.12.x, see this [react-router issue](https://github.com/rackt/react-router/issues/2195) for more details.


## Quick-start development

The JavaScript-thingies on this app is built using *webpack*. Styles are built using *gulp*.

You must have node version of >= 4.x

* `npm install`
* `npm run start:dev` to start webpack dev server at port 9010
* `npm run build-css:dev` to start SCSS to CSS build and BrowserSync at port 3000
* -> now you can open [localhost:3000](http://localhost:3000), and you should see the app with React hot-reload enabled and live injecting of CSS via BrowserSync!


## Running in production

To create a production build, run `npm run build`


## Running tests

* `npm test` to run the tests once
* `npm run test:watch` to run tests on each file update

=======

## Acknowledgements
This project is a grateful recipient of the [Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities). ♥
