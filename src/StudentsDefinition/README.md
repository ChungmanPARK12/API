```ts
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table.string('StudentID', 9)
      table.string('GivenName', 12)
      table.string('LastName', 12)
      table.string('EmailAddress', 30)

      //Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL    
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

```
 
