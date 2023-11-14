import { useState } from "react";
import axios from "axios";
import "./fileupload.css";
const FileUpload = ({contract,account,provider})=>{
    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState('No image Selected');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //console.log("thgtdfydr");
        if (file){
            try{
                const formdata =new FormData();
                formdata.append('file',file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formdata,
                    headers: {
                      pinata_api_key: `6f53285111659a0f0095`,
                      pinata_secret_api_key: `4245baf078035933dcc634dca0a538c821312ee72f2c49cb1e5b6edc820e73b4`,
                      "Content-Type": "multipart/form-data",
                    },
                  });
               // console.log(resFile.data.IpfsHash);
                const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                await contract.add(account,imgHash);
                alert("successfully uploaded images");
                setFileName("No image selected");
                setFile(null);
            }catch(error){
                alert("Unable to upload image to Pinata");
            }
            }
        }
        const retrieveFile = (e) => {
            const data = e.target.files[0]; //files array of files object
           // console.log(data);
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(data);
            reader.onloadend = () => {
              setFile(e.target.files[0]);
            };
            setFileName(e.target.files[0].name);
            e.preventDefault();
          };
    return(
        <div className="top">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="choose">
            Choose Image
          </label>
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          <span className="textArea">Image: {fileName}</span>
          <button type="submit" className="upload" disabled={!file}>
            Upload File
          </button>
        </form>
      </div>
    )
};
export default FileUpload;