import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import validator from 'App/Validators/Validator'

export default class StudentsController {
  public async index({}: HttpContextContract) {
    const students = await Student.all()
    return students
  }

  public async store({request, response}: HttpContextContract) {
    
    const newStudentSchema = schema.create({
      StudentID: schema.string({}, [ rules.maxLength(9),
        rules.unique({ table: 'students', column: 'StudentID' }),
      ]),
      GivenName: schema.string({}, [rules.maxLength(64)]),
      LastName: schema.string({}, [rules.maxLength(64)]),
      EmailAddress: schema.string({}, [rules.maxLength(100)]),
    })

    const messages = {
      'StudentID.unique': 'The StudentID already exists.',
      'StudentID.maxLength': 'StudentID cannot be longer than 9 characters.',
      'GivenName.maxLength': 'Given name cannot be longer than 64 characters.',
      'LastName.maxLength': 'Last name cannot be longer than 64 characters.',
      'EmailAddress.maxLength': 'Email address cannot be longer than 100 characters.',
    };

    try{
      const payload = await request.validate({
        schema: newStudentSchema, messages,
      })
      const student: Student = await Student.create(payload)
      return response.ok(student)
    } 
    catch(error)
    {
    if (error.messages) {
      return response.badRequest({ errors: error.messages });
    }
    return response.internalServerError({ message: 'An error occurred while processing your request' });
    }
  }

  public async show({params, response}: HttpContextContract) {
    const show = await Student.find(params.id)
    if (!show) {
      return response.notFound({ message: 'Student not found' })
    }
    return response.ok(show)
  }

  public async update({request, response, params}: HttpContextContract) {
    const payload = await request.validate(validator);
    const id = params.id
    const student = await Student.find(id);
    //Debug log
    console.log('Updating student ID:', id);
    console.log('Payload:', payload);

    if (!student)
    {
      return response.notFound({message :"Not found any studnets"})
    }
    
    const existingStudent = await Student.query()
    .where('StudentID', payload.StudentID)
    .andWhereNot('id', id).
    first();
    //Debug log
    console.log('Existing student with same StudentID:', existingStudent);

    if (existingStudent) {
      return response.badRequest({ message: "StudentID already exists for another student" });
    }
    //Debug log
    console.log('Updated student data:', student);

    student.StudentID = payload.StudentID
    student.GivenName = payload.GivenName
    student.LastName = payload.LastName
    student.EmailAddress = payload.EmailAddress
    await student.save();
    return response.ok(student); 
  }
 
  public async destroy({params, response}: HttpContextContract) {
    
    try {
      // Attempt to find the student by ID
      const student = await Student.findOrFail(params.id);

      // Delete the student record
      await student.delete();

      // Return a success response
      return response.ok({ message: `Student with ID ${params.id} has been deleted` });
    } 
    catch (error) 
    {
      // Handle the case where the student is not found
      if (error.name === 'ModelNotFoundException') {
        return response.notFound({ message: `Student with ID ${params.id} not found` });
      }
      // Handle any other errors
      return response.internalServerError({ message: `Student with ID ${params.id} not found` });
    }    
  }  
}
