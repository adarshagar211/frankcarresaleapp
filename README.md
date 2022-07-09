# Client

This project is deployable on generated with [Nginx server](https://www.nginx.com/)  .

## Development server

 - Install nginx server on your local
 - Copy all files in client folder to html folder 
 - Run `nginx.exe` for a dev server. Navigate to `http://localhost`. The app will automatically reload if you change any of the source files.

## Stopping application on nginx server

Run `nginx -s stop` on cmd to stop the server. Use "taskkill /f /IM nginx.exe" in case before command is not working .

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Nginx server use `nginx -help` or go check out the [NGINX site](https://www.nginx.com/).
