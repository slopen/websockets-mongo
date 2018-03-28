### replicaset setup

`mongod` instance as a member of `test` replica set

```
$ mongod --port 27001 --smallfiles --oplogSize 50 --replSet test
```

connect to this instance and configure its replica set

```
$ mongo --port 27001
> cfg = {_id: "test", members: [{_id: 0, host: "localhost:27001"}]}
> use admin
> rs.initiate (cfg)
```