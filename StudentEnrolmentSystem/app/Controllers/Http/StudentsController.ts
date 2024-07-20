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
      GivenName: schema.string({}, [rules.maxLength(12)]),
      LastName: schema.string({}, [rules.maxLength(12)]),
      EmailAddress: schema.string({}, [rules.maxLength(30)]),
    })

    const messages = {
      'StudentID.unique': 'The Student ID already exists.',
      'StudentID.maxLength': 'StudentID cannot be longer than 9 characters.',
      'GivenName.maxLength': 'Given name cannot be longer than 12 characters.',
      'LastName.maxLength': 'Last name cannot be longer than 12 characters.',
      'EmailAddress.maxLength': 'Email address cannot be longer than 30 characters.',
    };

    try{
      const payload = await request.validate({
        schema: newStudentSchema, messages,
      })

      if (!payload.EmailAddress.includes('@')) {
        return response.badRequest({ errors: { EmailAddress: 'Email address must contain an "@" symbol' } })
      }

      const student: Student = await Student.create(payload)
      return response.ok(student)
    } catch(error)
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

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const payload = await request.validate(validator);
      const id = params.id;
      const student = await Student.find(id);
  
      console.log('Updating student ID:', id);
      console.log('Payload:', payload);
  
      if (!student) {
        console.log('Student not found with ID:', id);
        return response.notFound({ message: "Not found any students" });
      }
      
      // Email validation if EmailAddress is provided in the payload
      if (payload.EmailAddress && !payload.EmailAddress.includes('@')) {
        return response.badRequest({ errors: { EmailAddress: 'Email address must contain an "@" symbol' } });
      }
  
      // Check for existing StudentID if provided in the payload
      if (payload.StudentID) {
        const existingStudent = await Student.query()
          .where('StudentID', payload.StudentID)
          .andWhereNot('id', id)
          .first();
  
        console.log('Existing student with same StudentID:', existingStudent);
  
        if (existingStudent) {
          return response.badRequest({ message: `Student with ID ${payload.StudentID} already exists for another student` });
        }
      }
  
      // Update only the fields provided in the payload
      if (payload.StudentID) student.StudentID = payload.StudentID;
      if (payload.GivenName) student.GivenName = payload.GivenName;
      if (payload.LastName) student.LastName = payload.LastName;
      if (payload.EmailAddress) student.EmailAddress = payload.EmailAddress;
  
      await student.save();
      console.log('Updated student data:', student);
      return response.ok(student);
    } catch (error) {
      console.log('Validation or other error:', error);
      return response.status(500).send({ errors: error.messages || 'Something went wrong' });
    }
  }
    
  public async destroy({params, response}: HttpContextContract) {
    
    try {
      // Attempt to find the student by ID
      const student = await Student.findOrFail(params.id);

      // Delete the student record
      await student.delete();

      // Return a success response
      return response.ok({ message: `ID with ${params.id} has been deleted` });
    } catch (error) {
      
      // Handle any other errors
      return response.internalServerError({ message: 'Cannot find the ID', error: error.message  });
    }   
  }
}
