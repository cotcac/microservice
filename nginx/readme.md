# Run

```
docker build -t load-balance-nginx .
docker run -p 3006:80 -d load-balance-nginx
# or use this for develop Stop just by ctr + c
docker run -p 3006:80 -it --rm load-balance-nginx
```
# Where
- build to build the image
- -t tags the image
- run make an instance running container from the image
- -p expose images ip to host machine.
- -d run in background.
- . Find Dockerfind in currect directory

# Some noted on nginx.conf
"172.17.0.1"  in the nginx config is the default gateway of docker.  
Checkout
```
 docker network inspect bridge
 ...
 "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
...
```
"Bridge" is the default network in docker.  
You have to use the gateway IP, cant use localhost IP like "127.0.0.1" coz it point back to the machine that run nginx not the machines that run our app.
# Check on browser


### You should open 2 different browers 

Nginx load balancer by default have to tech to address the client.
So if the same client send multiple request they jsut point to the same server on Chrome. firefox is ok for check the load balancer though.

