 
 # Student Records Management API

![postman_0](https://github.com/user-attachments/assets/eda9fc36-102b-4ee4-a5d9-3871f6069810)

## Overview

This project is a learning-focused REST API built to practice backend fundamentals,
including routing, controller structure, CRUD operations, and basic data validation.

The main goal of this project was to understand how a backend API supports
frontend applications by handling data persistence and request–response flows.

## Tech Stack

- Node.js
- TypeScript
- AdonisJS
- MongoDB / MySQL

## What I practiced

- Designing RESTful CRUD endpoints
- Structuring controllers and routes
- Basic request validation and error responses
- Using Postman to test and document API behavior
- Understanding how frontend applications consume APIs

## Debugging & Learning Notes

While building this API, I debugged common backend issues by manually testing
requests and responses using Postman.

### Request & Response Checking
- Verified request payloads and headers when endpoints did not behave as expected
- Checked HTTP status codes and error messages to understand failure cases

### Input Validation
- Encountered validation errors when required fields were missing or incorrectly formatted
- Learned how validation rules help prevent invalid data from reaching the database

### Postman-based Testing
- Used Postman to manually test CRUD endpoints during development
- Saved requests to quickly re-test after code changes

### Exception Handling
- Handled cases where requested records did not exist
- Returned appropriate error responses (e.g., 404 Not Found) for missing resources

## Installation

This project was developed and tested locally.

```bash
git clone https://github.com/ChungmanPARK12/API.git
cd StudentEnrolmentSystem
npm install
```

## Getting Started

The API was run locally during development using the AdonisJS development server.

```bash
node ace serve --watch
```

# Architechture
<h2>StudentController.ts</h2>

Handles CRUD operations for student records, including creating, reading,
updating, and deleting data.

- [View code](https://github.com/ChungmanPARK12/API/tree/09a744dac35c59aaa0aa071d3c258a9ffa979694/src/StudentController)

<h2>Students.ts</h2>

Defines the student data model and field structure used by the API.

- [View code](https://github.com/ChungmanPARK12/API/tree/09a744dac35c59aaa0aa071d3c258a9ffa979694/src/StudentsDefinition)

<h2>Routes.ts</h2>

Defines API endpoints and maps HTTP requests to controller actions

- [View code](https://github.com/ChungmanPARK12/API/tree/09a744dac35c59aaa0aa071d3c258a9ffa979694/src/Routes.ts)

# Postman(CRUD)

<h2>API Endpoint</h2>

**You can interact with the Student Management API using the following base URL**:

 ```http://127.0.0.1:3333/api/v1/students```
 
<h2>GET Student</h2>
 
Use the `GET` method to retrieve student details by ID or All of the lists.

* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/API/tree/1f24ce91800993c18cc13a1f5f84533a348935ae/src/GetAllStudents)

<h2>POST Student</h2>
 
Use the `Update` method to create a new student record by sending student details in the request body.

* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/API/tree/1f24ce91800993c18cc13a1f5f84533a348935ae/src/ResultOfPost)

<h2>DELETE Student</h2>
 
Use the `DELETE` method to remove a student record by providing specific criteria in the request body.

* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/API/tree/b8f2241e0984719436e545670f87dc630cbb0832/src/ResultOfDelete)

<h2>UPDATE Student</h2>

Use the `PUT` method to update an existing student record by its ID, replacing all fields with new data.


* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/API/tree/b8f2241e0984719436e545670f87dc630cbb0832/src/ResultOfPut)

Use the `PATCH` method to update specific fields of an existing student record without replacing the entire record.

* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/API/tree/eea5c2d2e1281bcbcc4b0d3cca129ea43d80e15b/src/ResultOfPatch)

## Summary

The Student Management API allows for efficient management of student records through CRUD operations. Users can create, read, update, and delete student data using HTTP methods. The API ensures data integrity with validation and secure endpoints. Postman is used for testing and documentation, providing a reliable interface for interacting with the API.

## Thank you
Thank you for visiting my github :)


 
