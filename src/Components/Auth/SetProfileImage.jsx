import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {FaCameraRetro} from 'react-icons/fa';

const SetProfileImage = ({register, setValue,setPreview,preview}) => {
  
    const {user} = useSelector( (state) => state.profile);

    const [previewSource,setPreviewSource] = useState(null);
    const [file,setFile] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        if (file) {
          setFile(file)
          previewFile(file)
          setPreview(true);
          setValue("profileImage",file);
        }
    };

    // Reading file content using it to give the preview and then uploading it to the database
    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // once file is read setting the DataUrl inside state previewSource
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }

    useEffect( () => {
      if(file){
        previewFile(file);
        setPreview(true);
      }
    },[file])

    useEffect(() => {
      register("profileImage");
    })
    return (
      <div className="input-field items-center">
      {
        preview ? previewSource && (
          <img 
          src={previewSource} 
          className="icons object-cover w-9 rounded-full aspect-square"
          />
        ) : (
          <FaCameraRetro className="icons"/>
        )
      }
      
      <label 
        className="bg-richblack-700 text-[#aaaeb3] text-sm rounded-lg cursor-pointer tracking-wide whitespace-nowrap"
        >
        {
          preview ? previewSource && " Uploaded Picture" : " Upload Profile Picture"
        }
        <input 
          type="file" 
          onChange={handleFileSelect}
          hidden
        />
      </label>
    </div>
  )
}

export default SetProfileImage