const semver = require('semver');
class ServiceRegistry {
    constructor() {
        this.services = {};
        console.log('create new instance of class');
        this.timeout = 30;
    }
    get(name, version){
    
        const candidates = Object.values(this.services)
        .filter(service => service.name === name && service.version === version);
        return candidates;

    }
    getAll(){
        const candidates = Object.values(this.services);
        return candidates;
    }
    register(name, version, ip, port) {
        const key = name + version + ip + port;
        if(!this.services[key]) {
            this.services[key] = {};
            this.services[key].timestamp = Math.floor(new Date() / 1000);
            this.services[key].ip = ip;
            this.services[key].port = port;
            this.services[key].name = name;
            this.services[key].version = version;
            console.log(`Added services ${name}, version ${version} at ${ip}: ${port}`);
            return key;
        }
        this.services[key].timestamp = Math.floor(new Date() / 1000);
        console.log(`Updated services ${name}, version ${version} at ${ip}: ${port}`);
        return key;
    }
    unregister(name, version, ip, port) {
        const key = name + version + ip + port;
        delete this.services[key];
        console.log(`Unregister services ${name}, version ${version} at ${ip}: ${port}`);
        return key;
    }
}
module.exports = ServiceRegistry;