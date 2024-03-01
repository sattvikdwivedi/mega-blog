import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";


// class banaya hu  jo Authentication Service ko hold kre
export class AuthService {
   client=new Client();
   account;

   constructor(){
      this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
      this.account= new Account(this.client);
   }
   async createAccount({email,password,name}){
    
    try   
    {
        const userAccount= await this.account.create(ID.unique(),email,password,name);
        if(userAccount){
            //means create ho gya account ab direct login kr do 
            return this.login({email,password})
    
        }
        else{
            return  userAccount;
        }
    
    }
    catch(err){
      throw err;
    }
}
async login({email,password}){
    try{
    const userlogin= await account.createEmailSession(email,password);
    return userlogin;
       
    }
    catch(err){
        throw err;
    }

}
async getUser(){
    try{
      const user= await this.account.get();
       if(user){
        return await this.account.get();}
  }
    catch(err){
     console.log("Appwrite Service :: getCurrent User :: error", err)
  
    }
    return null;
}
async logout()
{
  try{
    return await this.account.deleteSessions();

  }
  catch(error){
    console.log("Appwrite Service ::Logout Error :: error", error);
  }


}
}    


const Auth= new AuthService(); // object banake export kruga
export default Auth;