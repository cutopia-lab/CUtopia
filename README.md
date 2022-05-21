## Initialize
Installing all packages below:
- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Installing node modules dependencies:
```sh
sh package-install.sh
```
Creating .env files according to [Environment Variable Settings](#environment-variable-settings).

## Develop
### Compiling scripts
```sh
sh local-compile.sh
```
### Starting server
Run below in another terminal after scripts are compiled:
```sh
sh local-server.sh
```

### GraphQL playground
After server started, GraphQL playground is available at:
http://localhost:4000/graphql


## Deploy

### Configuring AWS credientals for deployment
Generate your AWS access key as instructed [here](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys). Then run the command below and paste the generated key:

```sh
aws configure
```

### Deploying to AWS
```sh
sh deploy.sh stack-name
```
> Example: `sh deploy.sh mike-dev`

### Configure API Gateway manually for static resources
1. Create Resource
> /static
> 
> Enable API Gateway CORS: True

2. Create Child Resources for all files under static
> Configure as proxy resource: True
> 
> Resource Path `static_file_name_with_extension`
>
> Enable API Gateway CORS: True
3. Add Methods (e.g. GET, OPTION) for all files under child resources
> 
> Integration type: Lambda fn
> 
> Use Lambda Proxy Integration: true
4. Deploy API
> Choose stage of deployment (Prod)

## Environment Variable Settings
### mongodb/.env
```
ATLAS_URI=Your MongoDB connection key
ATLAS_DEV_URI=Your MongoDB connection key for running Jest test scripts
```
### lambda/graphql/.env
```
NODE_ENV=production
ATLAS_URI=Your MongoDB connection key
```

### lambda/emailer/.env
This env file can be ignored if you are not developing emailer.

Currently, it is assumed three email addresses are available for resending emails in case of failure.
```
GMAIL_ADDRESS_0=Your email address
GMAIL_CLIENT_ID_0=Your client id
GMAIL_CLIENT_SECRET_0=Your client secret
GMAIL_REFRESH_TOKEN_0=Your refresh token
GMAIL_ACCESS_TOKEN_0=Your access token

GMAIL_ADDRESS_1=Your email address
GMAIL_CLIENT_ID_1=Your client id
GMAIL_CLIENT_SECRET_1=Your client secret
GMAIL_REFRESH_TOKEN_1=Your refresh token
GMAIL_ACCESS_TOKEN_1=Your access token

GMAIL_ADDRESS_2=Your email address
GMAIL_CLIENT_ID_2=Your client id
GMAIL_CLIENT_SECRET_2=Your client secret
GMAIL_REFRESH_TOKEN_2=Your refresh token
GMAIL_ACCESS_TOKEN_2=Your access token

ATLAS_URI=Your MongoDB connection key
```

### lambda/cron-remove-timetable/.env
```
ATLAS_URI=Your MongoDB connection key
```

### lambda/cron-remove-update-ranking/.env
```
ATLAS_URI=Your MongoDB connection key
```
