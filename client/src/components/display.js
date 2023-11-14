import { useState } from "react";
import "./display.css";
const Display = ({account,contract})=>{
    const [data,setData] = useState("");
    const getdata = async() =>{
        let dataArray;
        const inputAddress = document.querySelector(".address").value;
        console.log(inputAddress);
        console.log(contract);
        console.log(account);
        if (inputAddress){
            dataArray = await contract.display(inputAddress);
            console.log(dataArray);
        }
        else{
            dataArray = await contract.display(account);
        }
        console.log(dataArray);
        const isEmpty = Object.keys(dataArray).length===0;
        if (!isEmpty){
            const str = dataArray.toString();
            const str_array = str.split(",");
            console.log(str);
            console.log(str_array);
            const images = str_array.map((item,i)=>{
                console.log(item);
                return(
                    <a href="item" key={i} target="_blank">
                        <img key={i} src={item} alt="new" className="image-list"></img>
                    </a>
                )
            })
            setData(images);
        }else{
            alert("No image to display");
        }
    }
    return(
    <>
    <div className="image-list">{data}</div>
    <input type="text" placeholder="Enter Address" className="address"></input>
    <button className="center button" onClick={getdata}>Get Data</button>
    </>
    )
}
export default Display;