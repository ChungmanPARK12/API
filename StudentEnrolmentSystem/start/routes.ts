/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

//Route.get('/', async ({ view }) => {
  //return {hello: 'world'}
//})

//Route.resource('student', 'StudentController').apiOnly()

Route.group(() =>
  {
    Route.resource('students', 'StudentsController').apiOnly()
  }).prefix('/api/v1')

  Route.get('/students/delete-multiple', async ({ request }) => {
    return request.only(['ids']);
  });
  
  Route.delete('/students/delete-multiple', 'StudentsController.destroyMultiple');

  


