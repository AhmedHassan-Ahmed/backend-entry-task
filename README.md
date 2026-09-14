# Task Manager

**Name:** [Ahmed Hassan Ahmed]

## Description

This project is built with TypeScript and Node.js.

It supports:

* Adding tasks
* Finding tasks by ID
* Updating tasks
* Removing tasks
* Filtering and sorting tasks
* Counting tasks by status
* Importing tasks from JSONPlaceholder API

## How to Run

Compile the TypeScript file:

```bash
tsc taskStore.ts --target ES2017
```

Then run the generated JavaScript file:

```bash
node taskStore.js
```

The demo at the bottom of the file shows adding, updating, removing, finding, filtering, counting, and importing tasks from the API.

## Questions

### 1. What do `async` and `await` do in `importFromApi`? What exactly is the code waiting for?

`async` makes `importFromApi` an asynchronous function, so it can use `await`.

`await` makes the function wait for the asynchronous operation to finish before continuing.

In this case, the code waits for:

```ts
await fetch(...)
```

to finish the HTTP request and return a response.

Then it waits for:

```ts
await response.json()
```

to finish reading and converting the response body into JavaScript data.

This allows the API data to be available before the tasks are added to the store.

### 2. Why must `list()` not return the internal array directly?

`list()` should not return `Store.tasks` directly because external code could modify the internal array since arrays are passed by reference.

Instead, `list()` creates a copy using:

```ts
let result = [...Store.tasks];
```

This protects the internal array from direct array modifications.

### 3. What was the hardest part? How did you work through it?

The hardest part was implementing the `update()` method correctly.

At first, I created a new task object, but changing the local variable did not update the task inside the store.

I solved this by finding the existing task and updating only the fields that were provided in `changes`.

I also had to make sure that the task ID could not be changed.

Another part that required attention was the API import, especially converting the API `completed` value into the task `status`.

## Unfinished / Notes

The required functionality is implemented.
