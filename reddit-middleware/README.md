## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This server project is a challenge to build a web application using Reddit API with the following requirements:

- Users must be able to search for any subreddit and get a list, limited to 100 results, of hot and
  new topics.
- For each topic will be displayed a maximum of 3 comments with a maximum of 5 replies.
  Besides this requirement, you may decide what data is relevant to display or not.
- Finally, users will be able to bookmark their favorite subreddit.
  Data must persist.

## Technologies

Project is created with:

- NodeJS: 12.18.3
- Yarn 1.22.4
- Docker 18.03.0
- Mongodb 4.4.0

This API follows the GraphQL paradigm using GraphQL Yoga library

## Setup

To run this project, a mongo database running on localhost:27017 is required. In order to start the local project on your favourite IDE, please execute the following commands:

```
$ git clone https://github.com/ESegundoRolon/reddit-application.git
$ cd reddit-middleware
$ docker-compose up mongodb
$ yarn
$ yarn start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to execute queries and mutations.

To run the application middleware and database, please execute the following commands:

```
$ git clone https://github.com/ESegundoRolon/reddit-application.git
$ cd reddit-middleware
$ docker build -t esegundorolon/reddit-middleware .
$ docker-compose up
```

Open [http://localhost:4000](http://localhost:4000) with your browser to execute queries and mutations.
