# Startup

Run in bash: `docker-compose up`

# Try in playground

Start server and open your browser at `localhost/graphql`.
 
# Authorization

In order to do some graphql mutations/queries you have to be authorized.
Use mutation `signUp()` in order to create new user, in response you will get
your JWT and user instance.

Put JWT in http request headers: { "Authorization": "Bearer <JWT>" }.
You may use your JWT in playground, put it into HTTP HEADERS section (lower left panel).

# API

Use graphql queries/mutations in order to interact with the API.

* `createCoordCenter()` creates new coordination center.
* `deleteCoordCenter()` deletes coordination center.
* `getRoutesToSector()` returns all possible routes with security levels for the given sector from some coordination center 
* `getCoordCenters()` returns a page of all coordination centers in the database


# Caveats

When debugging with `VSCode` be sure that `localRoot` and `remoteRoot` config
options have the same value. Thus, docker container work directory path must match
your local project path when you are debugging your app.

```json
{
    "type": "node",
    "request": "attach",
    "name": "Attach",
    "protocol": "inspector",
    "localRoot": "${workspaceFolder}",
    "remoteRoot": "${workspaceFolder}"
}
```

Run `npm run docker:dev` in order to start your application in development mode (with debugger attachment possibility)