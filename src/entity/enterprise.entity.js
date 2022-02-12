var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Enterprise",
    tableName: "enterprises",
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
        // email : {
        //     type: "varchar",
        //     nullable: false
        // },
        // password : {
        //     type: "varchar",
        //     nullable: false
        // }, 
        // role : {
        //     type : "int"
        // }
    }
});