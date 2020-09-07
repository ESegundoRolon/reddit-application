## Table of contents
* [General info](#general-info)
* [Setup](#setup)
* [Issues](#issues)

## General info
This UI project is a challenge to build a web application using Reddit API with the following requirements:

* You will create a reddit feed web app.
* Users must be able to search for any subreddit and get a list, limited to 100 results, of hot and
new topics.
* For each topic will be displayed a maximum of 3 comments with a maximum of 5 replies.
* Besides this requirement, you may decide what data is relevant to display or not.
* Finally, users will be able to bookmark their favorite subreddit.
* Data must persist.
* Bonus:
* You will integrate a pagination.

* Requirements:
You must use Next.js together with React.
You must use GraphQL.
You may use any CSS library.
You may use any database service.

	
## Setup
To run this project as standalone, Docker V18.03 is required. In order to start the application, please follow the next steps

```
$ git clone https://github.com/ESegundoRolon/reddit-application.git
$ cd reddit-middleware
$ docker build -t esegundorolon/reddit-middleware .
$ cd ../reddit-app
$ docker build -t esegundorolon/reddit-app .
$ docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

![alt text](https://user-images.githubusercontent.com/29233071/92375779-e1932680-f101-11ea-8197-18809ac80641.png)

## Issues

The following issues are known:

* All filters are applied on the UI and no pagination and filtering was exposed on the backend.
* When updating a single subreddit, the new and popular attribute are override on the backend.
* Missing backend unit tests. 