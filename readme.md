# app
It is our api gateway
We dont make the UI here.

# UI 

Should be our Front End but we dont have anything for it.
Just make it here to complete the picture.

# service_registry
registry the service

# post and users are our 2 micro service

# diagram 


![Alt][1]

[1]: docs/microservice.jpg "Title"

# Quick start

## Start app
default port: 3000

```
cd app
node bin/www
```
## start registry service
Default port 3003
```
cd service_registry
node bin/www
```

## start user service

```
cd user_service
node bin/www
```
## start post service
```
cd post_service
node bin/www
```