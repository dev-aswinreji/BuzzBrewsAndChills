
import multer from 'multer'
import path from 'path'
import { imageDirectory } from '../app.mjs'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,imageDirectory)
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        console.log(uniqueSuffix,'middleware file name is showing')
        cb(null,file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

export const upload = multer({storage:storage})



