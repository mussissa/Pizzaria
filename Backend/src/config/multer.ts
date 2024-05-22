import multer from "multer";
import crypto from 'crypto';


import {extname, resolve} from 'path'


export default{
    upload(folder:string){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..','..', folder),
                filename:(resquest, file, callback)=>{
                    const filehash = crypto.randomBytes(16).toString("hex");
                    const filename = `${filehash}-${file.originalname}`

                    return callback(null, filename)
                }
            })
        }
    }
}