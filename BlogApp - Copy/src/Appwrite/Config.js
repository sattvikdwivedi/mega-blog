import conf from "../conf/conf";
import { Client,Databases,ID,Storage,Query, Account} from "appwrite";

export class Service{
     client =new Client();
    databases;
    bucket;

    constructor (){
        this.client.
        setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.account= new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content, featuredImage,status,userId}){
        try{
           return await this.databases.createDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
           )
        }
        catch(error){
            console.log("Appwrite Service ::  Create Post :: error", err);
        }

    }
    async UpdatePost(slug,{title,content, featuredImage,status}){
        try {
            return  await this.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: getCurrent User :: error", err);
        }

    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(conf.DATABASE_ID,conf.COLLECTION_ID,slug)
             return true;
        } catch (error) {
            console.log("Appwrite Service :: DeletePost :: error", err)
            return false;
        }
    
     }
     async getPost(slug){
        try {
            await this.databases.getDocument(conf.DATABASE_ID,conf.COLLECTION_ID,slug);
            
        } catch (error) {
            console.log("Appwrite Service :: getPost User :: error", err)
            return false;
        }
     }
     async getPosts(queries=[Query.equal("Status","active")]){
        try {
            return await this.databases.listDocuments(conf.DATABASE_ID,conf.COLLECTION_ID,queries)
            
        } catch (error) {
            console.log("Appwrite Service :: getPosts  :: error", err)
            return false;
        }
     
}
async UploadFile(file){
    try {
        return await this.bucket.createFile(conf.BUCKET_ID,ID.unique(),file);
        
   return true;
    }  
    catch (error) {
     console.log("Appwrite Service :: getPost User :: error", err);
        return false;
    }

}
async deleletFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.BUCKET_ID,fileId
        )
        return true
    } catch (error) {
        throw(error);
        return false;
    }
} 
     getFilePreview(fileId){
    return this.bucket.getFilePreview(conf.BUCKET_ID,fileId);

} 

}
const service =new Service();
export default service;