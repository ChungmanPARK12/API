 
 # Student Records Management API

![postman_0](https://github.com/user-attachments/assets/eda9fc36-102b-4ee4-a5d9-3871f6069810)

# Overview

<h2>Purpose</h2>

The purpose of this project is to gain understanding of REST API for managing student records, enabling efficient creation, retrieval, updating, and deletion of student data in a structured manner using `Postman` for testing and documentation.


<h2>Features</h2>

- **Create**: Add new student records with details such as StudentID, GivenName, LastName, and EmailAddress.
- **Read**: Retrieve individual student details or a list of all students.
- **Update**: Modify existing student records using their unique identifiers.
- **Delete**: Remove student records based on specific criteria like StudentID and GivenName.
- **Validation**: Ensure data integrity with validation rules for input fields.
- **Error Handling**: Provide meaningful error messages for validation failures and other exceptions.
- **Authentication**: Secure API endpoints with token-based authentication.
- **Postman Integration**: Use Postman for testing API endpoints and ensuring correct functionality.
- **API Documentation**: Comprehensive documentation for all endpoints, including examples of requests and responses.



<h2>Debugging Process</h2>

### 1. Check Request and Response

- **Inspect Request Data**: Ensure that the data being sent to the API is correctly formatted and includes all required fields.
- **Review Response**: Look at the API response to understand the status code and any error messages returned by the server.

### 2. Validate Input Data

- **Validation Rules**: Verify that the input data adheres to the defined validation rules. For example, check that `StudentID` is unique and `EmailAddress` is a valid email format.
- **Custom Error Messages**: Ensure that custom error messages are correctly set up to provide clear guidance on validation failures.

### 3. Use Postman for Testing

- **Create and Save Requests**: Use Postman to create, save, and organize requests for each API endpoint.
- **Run Tests**: Execute requests and review responses to ensure that endpoints behave as expected.

### 4. Handle Exceptions

- **Try-Catch Blocks**: Use try-catch blocks to handle exceptions gracefully and provide meaningful error responses.
- **ModelNotFoundException**: Specifically handle `ModelNotFoundException` to return a `404 Not Found` response when a student record does not exist.

<h2>Installation</h2>

- **IDE**: An integrated development environment(IDE) makes development easier [official website](https://visualstudio.microsoft.com/)
- **Visual Studio**: A powerful IDE for Windows and MacOS, which provides extensive feature for C# development. 

- **Clone the Repository**:
   ```bash
   git https://github.com/ChungmanPARK12/DataStructure-and-Algorithm.git
   cd <StudentEnrolmentSystem>
  

# Getting started
- **Running the server**
`node ace serve --wath`
- ![started](https://github.com/user-attachments/assets/31c1bf47-3c10-4252-956b-7fe64884397d)

# Architechture
<h2>StudentController.ts</h2>

Manages student records with methods to create (`store`), update (`update`), delete (`destroy`), and validate inputs, ensuring robust and secure CRUD operations.

* ### Example of Code [Click here](https://github.com/ChungmanPARK12/BinarySearch.git)

<h2>Students.ts</h2>

Represents student records, with properties like `StudentID`, `GivenName`, `LastName`, and `EmailAddress`, enabling database interactions and validation for CRUD operations.

* ### Example of Code [Click here](https://github.com/ChungmanPARK12/BinarySearch.git)

<h2>Routes.ts</h2>

Maps HTTP methods to `StudentsController` actions, defining `endpoints` for creating, reading, updating, and deleting student records, ensuring structured API interaction.

* ### Example of Code [Click here](https://github.com/ChungmanPARK12/BinarySearch.git)

# Postman(CRUD)

<h2>API Endpoint</h2>

**You can interact with the Student Management API using the following base URL**:

 ```http://127.0.0.1:3333/api/v1/students```
 
<h2>GET Student</h2>
 
Use the `GET` method to retrieve student details by ID or All of the lists.

* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/BinarySearch.git)

<h2>POST Student</h2>
 
Use the `POST` method to create a new student record by sending student details in the request body.

* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/BinarySearch.git)

<h2>DELETE Student</h2>
 
Use the `DELETE` method to remove a student record by providing specific criteria in the request body.

* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/BinarySearch.git)

<h2>UPDATE Student</h2>

Use the `PUT` method to update an existing student record by its ID, replacing all fields with new data.


* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/BinarySearch.git)

Use the `PATCH` method to update specific fields of an existing student record without replacing the entire record.

* ### Result in Postman [Click here](https://github.com/ChungmanPARK12/BinarySearch.git)


 
