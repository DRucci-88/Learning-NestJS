# Nest Js

`npx @nestjs/cli new name-of-project`

## Basic Knowledge

### Basic flow of Nest

1. Request coming from client
1. `Pipe` Validate data contained in the request
1. `Guard` Make sure the user use authenticated
1. `Controller` Route the request to a particular function
1. `Service` Run some business logic
1. `Repository` Access a database
1. Response send to client

### Parts of Nest

- `Controller` Handles incoming request
- `Service` Handles data access and business logic
- `Modules` Groups together code
- `Pipe` Validates incoming data before reaches a route handler
- `Filter` Handles errors that occur during request handling
- `Guard` Handles authentication
- `Interceptors` Adds extra logic to incoming request or outgoing responses
- `Repositories` Handles data stored in a DB

`Module`

- Every apps must contain module
- List out all different controller
- Whenever apps starts up, Nest is going to look at this app module, find all the controllers that listed and automatically create a instance.
-  

`bootstrap`

- Some logic to run anytime we start up our apps

File Naming Contentions

- One class per file (some exceptions)
- Class names should include the kind of thing we are creating
- Name of class and name of file should always match up
- Filename template: **name.type_of_thing.ts**

### NestJS Command Line Tool

In most cases, it is better to use npx instead of installing global npm packages, since you'll always use the latest version and not clutter your file system with things you don't need often.

Just replace nest with npx @nestjs/cli for any command: `npx @nestjs/cli new project-name`

<https://stackoverflow.com/questions/57266622/unable-to-create-a-new-project-with-the-nest-cli>

### Controller

```txt
POST /message/5?validate=true HTTP/1.1
Host: localhost:3001
Content-Type: application/json
{"content": "hi there"}
```

explanation decorator

- 5 `@Param('id')`
- validate=true `@Query()`
- Host and Content-Type `@Headers()`
- Json body `@Body()`

### Automatic Validation

1. Tell Nest to use global validation
1. Create a class that describes the different properties that the request body should have `Data Transfer Object (DTO)`.
1. Add validation rules to the class
1. Apply that class to the request handler

Data Transfer Object (DTO)

- Carries data between two places
- Class that a very detail properties and staticly type
- Very clear description what form of data look like
- Turn a plain JSON into a class

Basic Flow Validation

1. Request coming from client
1. That request will be validated using `Pipe`
1. Use ***class-transformer*** to turn the body  into an instance of the DTO class
1. Use ***class-validator*** to validate the instance
1. If there are validation errors, responsd immediately, otherwise provide body to request handler

### `Service`

- Its a class
- Place to put any business logic
- Uses one or moro repositories to find or store data
- Some calculation
- `@Injectable`

### `Repository`

- Its a class
- Place to put storage-relate logic
- Usually ends up being a `TypeORM` entity / mongoose schema / something similar
- Interact with database
- Write information to a file
- `@Injectable`

### Inversion of Control Principle

Classes should not create instances of its dependencies on its own

### Dependency Injection Container Flow

1. At startup, register all classes with the container
1. Container will figure out what each dependency each class has
1. We then ask the container to create an instance of a class for us
1. Container creates all required dependencies and gives us the instance
1. Container will hold onto the created dependency instances and reuse them if needed

Explanation

Step 1 and 2, Use the `@Injectable` decorator on each class and add them to the modules list of providers
Step 3 and 4, Happens automatically, Nest will try to create contoller instances for us

## TypeORM Persistent Data with Nest (Database)

NestJS works fine with any ORM, but works well out of the box with TypeORM and Mongoose.

NestJS and TypeORM is a perfect combination. Therefore TypeORM support Typescript by nature.

AppModule responsible to make a Connection to Database and shared down into different module.

## Entity

List out all the different properties that we expect our entity to have.

- Create an entity file and create a class in it that lists all the properties that your entity will have
- Connect the entity to its parent module. This creates a repository
- Connect the entity to the root connection (in app module)

## Repository

Class that created automatically from Entity TypeORM.

Some common built-in method / Repository API:

- `create()` Makes a new instance of an entity, but does not persist it to the DB
- `save()` Adds or update a record to the DB
- `find()` Runs a query and returns a list of entities
- `findOne()` Run a query, returning the first record mathinc the search crieteria
- `remove()` Remove a record from the DB
- `insert()`
- `update()`
- `delete()`
