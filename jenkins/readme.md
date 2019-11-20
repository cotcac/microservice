# Install 
## Debug
```
docker run -p 8080:8080 --name=jenkins-master jenkins/jenkins:lts
```

## Productions
```
CTR + C
docker rm jenkins-master 
docker run -p 8080:8080 --name=jenkins-master -d jenkins/jenkins:lts
```

## Rebuild restart always

```
docker stop jenkins-master
docker rm jenkins-master
docker run --restart always -p 8080:8080 --name=jenkins-master -d jenkins/jenkins:lts

```

# Reference
https://technology.riotgames.com/news/putting-jenkins-docker-container  