import { createConnection } from "typeorm";

createConnection().then(async connection => {
    console.log('📦 Successfully connected with database');
})