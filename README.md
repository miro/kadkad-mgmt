# kadkad-mgmt

Frontend of [KAJAANISKATE.NET](http://kajaaniskate.net), utilizing [dakdak-api](https://github.com/miro/dakdak-api). This application is about Image uploading & metadata management.

![Example screenshot of the app](http://i.imgur.com/ObQvojP.png)

Better README is on the works.


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
