exports.up = knex =>
  knex.schema.createTable("achievements", achievements => {
    achievements.increments();
    achievements
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    achievements
      .string("title", 128)
      .notNullable()
      .unique();
    achievements.text("description").notNullable();
    achievements.string("image").notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists("achievements");
