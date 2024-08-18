```ts
import Route from '@ioc:Adonis/Core/Route'

//Route.get('/', async ({ view }) => {
  //return {hello: 'world'}
//})

//Route.resource('student', 'StudentController').apiOnly()
Route.group(() =>
  {
    Route.resource('students', 'StudentsController').apiOnly()
  }).prefix('/api/v1')

```
 
