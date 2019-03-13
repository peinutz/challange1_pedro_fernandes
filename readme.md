## To run the service (port 8081) :

- docker-compose up --build

### Examples: 

![Examples](test-examples.PNG)

## To run the (integration) tests:

 - docker pull mongo
 - docker run --rm -d -p 27017:27017 mongo
 - npm test

(kill the database container after the tests so we can run the application again)
docker kill $(docker ps -q)

# Questions

## What would the bottleneck(s) be in your implementation as you acquire more users?

## How would you improve your deployment process if you needed to mantain this application long term? 