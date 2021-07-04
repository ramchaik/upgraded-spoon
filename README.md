# URL Shortener Service

## Usage

For spinning up the app on dev, run:
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d 
```

For spinning up the app on dev with multiple instances, run:
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale url-shortener=2
```