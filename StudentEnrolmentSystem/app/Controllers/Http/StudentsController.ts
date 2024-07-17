import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import validator from 'App/Validators/Validator'

export default class StudentsController {
  public async index({}: HttpContextContract) {
    const students = await Student.all()
    return students
  }

  public async create({}: HttpContextContract) {}

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
    }catch(error)
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

  public async edit({}: HttpContextContract) {}

  public async update({request, response, params}: HttpContextContract) {
    const payload = await request.validate(validator);
    const id = params.id
    const student = await Student.find(id);

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

    console.log('Existing student with same StudentID:', existingStudent);

    if (existingStudent) {
      return response.badRequest({ message: "StudentID already exists for another student" });
    }

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
    } catch (error) {
      // Handle the case where the student is not found
      if (error.name === 'ModelNotFoundException') {
        return response.notFound({ message: `Student with ID ${params.id} not found` });
      }

      // Handle any other errors
      return response.internalServerError({ message: `Student with ID ${params.id} not found` });
    }

    
  }

  public async destroyMultiple({ request, response }: HttpContextContract) {
    const { ids } = request.only(['ids']); // Assuming the IDs are sent in a field called 'ids'
  
    if (!Array.isArray(ids) || ids.length === 0) {
      return response.badRequest({ message: 'Invalid or missing IDs array' });
    }
  
    try {
      const students = await Student.query().whereIn('id', ids);
  
      if (students.length === 0) {
        return response.notFound({ message: 'No students found for the given IDs' });
      }
  
      await Student.query().whereIn('id', ids).delete();
  
      return response.ok({ message: 'Students deleted successfully', ids });
    } catch (error) {
      return response.internalServerError({ message: 'Something went wrong', error: error.message });
    }
  }
  
}
