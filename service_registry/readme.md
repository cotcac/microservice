# Quick start

## Build image form docker file
```
docker build -t service_registry .
```

## Run the image just build debug mode
```
docker run -p 3003:3003 service_registry
```

## Run image in the back ground
```
docker run -p 3003:3003 -d service_registry

```

## Run image in the background and restart always
```
docker run -p 3003:3003 -d --restart always service_registry  
```