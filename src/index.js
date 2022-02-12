const express = require("express");
const cors = require("cors");
const typeorm = require("typeorm");
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./configs/swagger.json');
const dotenv = require('dotenv');

dotenv.config({path : 'src/.env'});

const port = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

typeorm.createConnection({
    type:  process.env.DATABASE_TYPE_ERP,
    host:  process.env.DATABASE_HOST_ERP,
    port:  process.env.DATABASE_PORT_ERP,
    username:  process.env.DATABASE_USERNAME_ERP,
    password:  process.env.DATABASE_PASSWORD_ERP,
    database:  process.env.DATABASE_DB_ERP,
    synchronize:  process.env.DATABASE_SYNCHRONIZE_ERP,
    entities: ["src/entity/**/*.entity.js"],
    cli: {
        "entitiesDir": "src/entity"
      }
}).then(function (connection) {
    console.log("🚀 ~ file: db.js ~ line 19 ~ connection", connection);

    // var category1 = {
    //     name: "TypeScript"
    // };
    // var category2 = {
    //     name: "Programming"
    // };

    // var post = {
    //     title: "Control flow based type analysis",
    //     text: "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.",
    //     categories: [
    //         category1, category2
    //     ]
    // };

    // var postRepository = connection.getRepository("Post");
    // postRepository.save(post)
    //     .then(function(savedPost) {
    //         console.log("Post has been saved: ", savedPost);
    //         console.log("Now lets load all posts: ");

    //         return postRepository.find();
    //     })
    //     .then(function(allPosts) {
    //         console.log("All posts: ", allPosts);
    //     });

}).catch(function(error) {
    console.log("Error: ", error);
});

app.listen(port, () => {
    console.log(`🚀 ~ Server started on port ~ ${port}`);
})