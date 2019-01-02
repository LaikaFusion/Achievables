exports.up = knex =>
  knex.schema.createTable("tasks", tasks => {
    tasks.increments();
    tasks
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    tasks
      .string("title", 128)
      .notNullable()
      .unique();
    tasks.text("description").notNullable();
    tasks
      .integer("difficulty")
      .defaultTo(1)
      .notNullable();
    tasks
      .integer("reward")
      .defaultTo(0)
      .notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists("tasks");
