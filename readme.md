## theWiseDev | API for a squeze page to register users on a mailing list and to email them a bonus (written in Node.js and TypeScript in a Clean Architecture)

This is an API used in the backend of the landing page of **theWiseDev** platform (http://www.thewisedev.com.br).

It is a basic *squeeze page* where the user can be registered on the mailing list and receive an e-mail with a bonus.

The API was developed using concepts from *Clean Architecture*, *Domain-Driven Design*, *Test-Driven Development*, *Continuos Refactoring*, and *Atomic Commits*.

To run this project you will need to create a `.env` file at the root of your project with values for the following environment variables:

* `EMAIL_HOST`
* `EMAIL_PORT`
* `EMAIL_USERNAME`
* `EMAIL_PASSWORD`
* `MONGO_URL`
* `PORT`

The `EMAIL_`* variables are used to send the e-mail to the registered user; `MONGO_URL` is where your MongoDB is located (*you can also create other implementations for the UserRepository for other specific databases if you like; the use cases were developed independent from specific database implementations*); and `PORT` is the port where your API will run.

We believe this project can be used as a *reference implementation* of the **Clean Architecture** with Node.js and TypeScript.

Copyright © 2020 theWiseDev