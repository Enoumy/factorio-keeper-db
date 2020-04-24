# Factorio Blueprint Keeper HTTP Server

> HTTP server that handles the backend side of Factorio Blueprint Keeper!

## Introduction

[**Factorio**](https://factorio.com/) is one of my favorite games. It's a factory
building game where you can build your own factory as simple or as complicated as
you may want it to be. One of the mechanics of the game allows you to save a
part of your factory in the form of a **blueprint**. These blueprints can later
be used to plan out future expansions, _and even automatic expansions_, of your
factory. However, all the blueprints in your game are local to your machine.

![Factorio background](https://hb.imgix.net/cb5424b775d4a6ac28320eb5b30dcc7b97963185.jpg?auto=compress,format&fit=crop&h=353&w=616&s=cf3e481fa618c41377308a1ecd902e1d)

**Factorio Blueprint Keeper** allows users to post their own blueprints and download
all of their blueprints in one go in the form of a blueprint book string that
users can copy paste directly into their games!

## Installation

In order to install this backend server you need to install
[git](https://git-scm.com/) and [node npm](https://nodejs.org/en/).

You must first clone this repository by with:

```bash
$ git clone https://github.com/Enoumy/factorio-keeper-db.git
```

Afterwards, you must install the dependencies of the server by cd'ing into the
cloned repository and running:

```bash
$ npm i
```

## Usage

To start the database for the first time, _or if you want to reset it after
removing `test.db`_, you must run the following command:

```bash
$ npm run-script boot-db
```

This will generate a new [node sqlite3](https://www.npmjs.com/package/sqlite3)
database file called `test.db` where the blueprints of the backend server will
be stored.

To start the server run the following command:

```bash
$ npm start
```

This will start the [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
[express](https://www.npmjs.com/package/express)
server on `localhost:3000` where the HTTP server can receive and reply with
http requests and responses.

Once you're done using the server, you can close it by hitting `ctrl + c` on the
console that you opened it with.

## Routes

The purpose of the http server is to handle the backend of the Factorio
Blueprint Keeper application. It handles the internal workings by talking to
the database directly. It's API consists of the following routes:

| Type | Route                            | Description                                                                                               |
| ---- | -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| GET  | /                                | Returns 200 with "Factorio Keeper Backend server".                                                        |
| GET  | /blueprint/:blueprint_id         | Returns blueprint info in json form.                                                                      |
| GET  | /blueprint/:blueprint_id/summary | Returns blueprint info without the heavy blueprint string                                                 |
| GET  | /image/:image_id                 | Image serving route.                                                                                      |
| GET  | /user/:username                  | Returns json info about a user.                                                                           |
| GET  | /blueprints                      | Retrieves only the numeric ids of stored blueprints (useful for partial rendering in client application). |
| GET  | /blueprint_strings               | Given an array of blueprint ids as query parameters, returns the blueprint strings.                       |
| POST | /upload                          | Uploads a new blueprint given the blueprint string, images, and metadata about the blueprint and user.    |
| POST | /own                             | Adds a new blueprint to a user's profile.                                                                 |

## Factorio Blueprint Keeper Frontend

This backend server only deals with the storage and inner workings of the
project. What the users interact with graphically is a front-end client built
using [Angular](https://angular.io/).

> The backend server can work on its own without the frontend, but the frontend
> needs this backend server to talk to in order to retrieve and store blueprints.

You can setup the front-end angular server at this repository: [enoumy/factorio-keeper-ui](https://github.com/Enoumy/factorio-keeper-ui)
