# Nest Js

## Basic Knowledge

Basic flow

1. Request coming from client
1. `Pipe` Validate data contained in the request
1. `Guard` Make sure the user use authenticated
1. `Controller` Route the request to a particular function
1. `Service` Run some business logic
1. `Repository` Access a database
1. Response send to client

Parts of Nest

- `Controller` Handles incoming request
- `Service` Handles data access and business logic
- `Modules` Groups together code
- `Pipe` Validates incoming data
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
