# websockets-mongo

## install / setup
```
$ git clone https://github.com/slopen/websockets-mongo.git
$ cd websockets-mongo
$ npm i
```

[nginx setup](/nginx)

[replica set setup](/config)

## production
```
$ npm run production
```

## development

* comment out `production` block in nginx.conf
* uncomment `development` block in nginx.conf
* ```$ npm run dev```
