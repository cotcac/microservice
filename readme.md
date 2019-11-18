# api gateway
It is our api gateway

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
## List all service registers
http://localhost:3003/
```
[
  {
    "timestamp": 1574067030,
    "ip": "[::ffff:127.0.0.1]",
    "port": "3002",
    "name": "users",
    "version": "1.0"
  },
  {
    "timestamp": 1574066909,
    "ip": "[::ffff:127.0.0.1]",
    "port": "3001",
    "name": "posts",
    "version": "1.0"
  }
]
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

# Test
Call API gateway

http://localhost:3000/posts  
http://localhost:3000/users  

