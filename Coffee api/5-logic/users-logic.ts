import { dal, getAllUsers } from "../2-utils/dal";
import { Role, UserModel } from "../4-models/UserModel";


export async function getAllUsersFromLogic(){ 
    const users = await getAllUsers();
    
    return users;
}

export async function getUser(id: number ) {
    const users = await getAllUsersFromLogic();
    const user = users.find(u => u.id === id)
if(user){
    return user;
} 

    // let user = users.find(u => u.username === userBody.username && u.password === userBody.password);
}
export async function registerLogic(userBody: UserModel){
    const users = await getAllUsers();
    const id = Math.max(...(await users).map(p => p.id)) + 1;

        // let user: UserModel = {
        //     id,
        //        userBody,
        //         role
        // }
        userBody.id = id;
        userBody.role = Role.User;
     await users.push(userBody);


     await dal.saveAllUsers(users);
     return userBody;
}

export async function loginLogic(userBody: UserModel) {
    // const users = await getAllUsers();

    
    // const user = users.find(u => u.username == userBody.username && u.password == userBody.password);
    // if(user){
    //     console.log("Welcome");
        
    // }
}