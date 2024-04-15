
import multer from 'multer'
import path from 'path'
import { imageDirectory } from '../app.mjs'


export const upload = (function(){
    try {
    
    
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, imageDirectory)
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                console.log(uniqueSuffix, 'middleware file name is showing')
                cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
            }
        })
    
        return multer({ storage: storage })
        
    } catch (error) {
        console.log(error, 'MULTER');
    }
})()
        


