# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## We need to generate dister folder after build to be sent to backend project public folder
To do that we need to update "outputPath": "dist/frontend" to
"../backend/public"

## To display toasts
npm install ngx-toastr --save
npm install @angular/animations --save

## For Encryption
For encryption we are using crypto js
npm install crypto-js
npm install @types/crypto-js --save-dev

## To remember password
We need to store in cookies
npm install ngx-cookie-service --save

## Checking Authentication to Hide/Show Elements and Handle Routing
npm install @auth0/angular-jwt --save

## To upload and crop image
npm install ngx-image-cropper --save
npm install ngx-file-helpers --save
