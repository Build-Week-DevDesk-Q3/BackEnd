exports.up = function(knex) {
    return knex.schema.createTable('users', t =>{
        t.increments();
        // username 
                t.string('username',128).unique().notNullable();
        // password
                t.string('password',128).notNullable();
                t.string('role',128).notNullable();
            })
   





// tickets table 
    .createTable('tickets', t =>{
        //tickets id
        t.increments();
//refernces who the ticket was submitted by from the user's id
        t.integer('student_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

        t.integer('helper_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
// a description of the ticket 
        t.string('description',255)
        t.string('notes',255)
// refernces a category by id 
t.string('category', 128).notNullable()
// is the ticket answered or not (might return a 1 or 0)
        t.boolean("completed").notNullable()
        t.boolean("open").notNullable()
// ticket title
        t.string('name', 128).unique().notNullable()
        t.string('answer', 255)
    })

};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('tickets')
    .dropTableIfExists('users')

};
