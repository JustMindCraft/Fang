import User, { newAdmin, setSuperAdmin } from './models/User';
import Role, { newSuperRole } from './models/Role';
import RoleUser from './models/RoleUser';
import App from './models/App';
import AppOwner from './models/AppOwner';

export async function testCreateApp(){

}



export async function testCreateUserApp(owner){

    let app = await App.findOne({owner})
    
}

export async function testSetDefaultApp(){
    const {superRole, superAdmin} = (await setSuperAdmin());

    let appOnwer = await AppOwner.findOne({owner: superAdmin._id});

    const appOwner = new AppOwner({
        app: null,
        owner: superAdmin._id,
    });








}