var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Department",
    tableName: "departments",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            nullable: false

        },
        createAt: {
            type : Date
        }
    }
});