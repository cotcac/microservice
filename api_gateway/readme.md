# Quick start

## Build image form docker file
```
docker build -t api_gateway .
```

## Run the image just build debug mode
```
docker run -p 3010:3010 api_gateway
```

## Run image in the back ground
```
docker run -p 3010:3010 -d api_gateway

```

## Run image in the background and restart always
```
docker run -p 3010:3010 -d --restart always api_gateway
```