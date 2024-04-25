import {v2 as cloudinary } from  "cloudinary"

import fs from "fs"

// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

 const uploadonCloudinary  = async (localFilepath) => {
    try {
        if(!localFilepath) return null
            //upload the file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilepath,{
                resource_type:"auto"
            })
            //file hasbeen uploaDER success fully

        

        console.log("file is uploader on cloudinary ");
        console.log(response.url);
        return response

    } catch (error) {
        fs.unlinkSync(localFilepath) //remove the locally save temprorery file as the upload operation got failed
    }
 }




export {cloudinary}