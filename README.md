## Initialization
### Install packages
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- [Docker](https://www.docker.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Git](https://git-scm.com/downloads)

### Run initialization script

```sh
sh tools/init.sh
```

This script will:
- install git submodules
- install node modules
- build GraphQL types
- create environment variables
- generate RSA key pair for JWT login token

> After running the script, replace `ATLAS_PROD_URI` and `ATLAS_DEV_URI` in the .env file with your MongoDB connection URI.

## Development
### Compile scripts
```sh
sh tools/watch-local-files.sh
```
### Start server
Run below in another terminal after scripts are compiled:
```sh
sh tools/run-local-server.sh
```

### GraphQL playground
After server started, GraphQL playground is available at: http://localhost:4000/graphql.

## Deployment

### Create MongoDB Atlas instance
Create a [serverless MongoDB Atlas](https://www.mongodb.com/pricing) instance in Singapore region on AWS. Then, create an admin account and add a whitelisted IP address 0.0.0.0/0 in [MongoDB Cloud](https://cloud.mongodb.com/). Next, obtain your connection URI in MongoDB Cloud.

### Configure AWS credientals
Generate your AWS access key as instructed [here](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys). Then run the script below, paste the generated key and set the "Default region name" to "ap-southeast-1", which is Singapore.

```sh
aws configure
```

### Deploy to AWS
All serverless serivces will be deployed to [Lambda](https://aws.amazon.com/lambda/) using the script below. The status of deployed stacks can be found in [CloudFormation](https://aws.amazon.com/cloudformation/).

```sh
# Deploy development stack
sh tools/deploy.sh cutopia-dev

# Deploy production stack
export NODE_ENV=production; sh tools/deploy.sh cutopia-production
```

> Note: when running the script for the first time, a few config options will be asked in console. Follow the default values for all options.

Once the server is successfully deployed, find the API ID of the server in [API Gateway](https://aws.amazon.com/api-gateway/). Then, the GraphQL playground is available at https://{API ID}.execute-api.ap-southeast-1.amazonaws.com/Stage/graphql.

### Logs
All messages logged (e.g. using console.log in GraphQL server) can be found in [CloudWatch](https://aws.amazon.com/cloudwatch/).

## Test
### Server load test
This tool exams the time taken to handle enormous requests during peak period. The settings are: 50 users concurrently login their accounts, then fetch latest reviews and reviews of a course.

It is expected that the time taken will be much lesser when running the script for the second time, because most Lambda instances are warmed up.

```sh
cd tools/load-test/
node .
```

### MongoDB unit tests
To guarantee the functionality of database API, please run the Jest tests if the MongoDB controllers/models are modified.

```sh
yarn --cwd mongodb test --runInBand
```
