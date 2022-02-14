import { createConnection } from 'typeorm';
import { Role } from "../entity/Role.entity";

createConnection().then(async connection => {
    const roles = [
        new Role({
            roleName: "Admin",
            roleTag : "ADMIN"
        }),
        new Role({
            roleName: "Employee",
            roleTag : "EMPLOYEE"
        })
    ];

    const roleRepository = connection.getRepository(Role);
    
    const foundRoles = await roleRepository.find();
    if(foundRoles.length == 0){
        roleRepository.save(roles);
    }

    console.log('📦 Successfully connected with database');
})