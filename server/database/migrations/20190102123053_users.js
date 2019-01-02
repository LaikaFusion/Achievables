exports.up = knex =>
  knex.schema.createTable("users", users => {
    users.increments();
    users.string("name", 128).notNullable();
    users
      .string("email", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
    users.string("avatar", 128);
    users.integer("XP").defaultTo(0);
  });

exports.down = knex => knex.schema.dropTableIfExists("users");
