## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This UI project is a challenge to build a web application using Reddit API with the following requirements:

* Users must be able to search for any subreddit and get a list, limited to 100 results, of hot and
new topics.
* For each topic will be displayed a maximum of 3 comments with a maximum of 5 replies.
Besides this requirement, you may decide what data is relevant to display or not.
* Finally, users will be able to bookmark their favorite subreddit.
Data must persist. 


## Technologies
Project is created with:
* NodeJS: 12.18.3
* Yarn 1.22.4
* Docker 18.03.0
* ReactJS 16
* UI library: antd
* React Hooks
* Apollo
* NextJS 9
	
## Setup
To run this project, the reddit-middleware is required

```
$ git clone https://github.com/ESegundoRolon/reddit-application.git
$ cd reddit-application
$ docker-compose up
$ cd ../reddit-app
$ yarn
$ yarn start
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

To run the full application

```
$ git clone https://github.com/ESegundoRolon/reddit-application.git
$ cd reddit-app
$ docker build -t esegundorolon/reddit-middleware .
$ docker-compose up 
```

Open [http://localhost:3000](http://localhost:3000) with your browser.