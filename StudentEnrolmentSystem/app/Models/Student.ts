import { DateTime } from 'luxon'
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Student extends BaseModel {
  


  @column({isPrimary: true})
  public id: number

  @column({columnName: 'StudentID'})
  public StudentID: String

  @column({columnName: 'GivenName'})
  public GivenName: String

  @column({columnName: 'LastName'})
  public LastName: String

  @column({columnName: 'EmailAddress'})
  public EmailAddress: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}