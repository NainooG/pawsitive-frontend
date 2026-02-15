"use client";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

const lambdaUrl =
  "https://fbsx233mrj5yhjm6monw5pszca0ffykp.lambda-url.us-east-2.on.aws/";

export default function Home() {
  const [image, setImage] = useState('');

  const invokeLambda = async () => {
    try {
      const response = await axios.get(lambdaUrl);
      
      console.log('retrieving gobi photo!');
      console.log(response.data);
      
      setImage(response.data);
    } catch (error) {
      console.error("error invoking lambda function", error.message);
      throw error;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      {!image && <button
        className="bg-amber-500 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded"
        onClick={invokeLambda}
      >
        Get Image of Gobi!
      </button>
      }   

      <div>
        {image ? <img src={image} alt="gobi photo!!!"/> : ""}
      </div>
    </div>
  );
}
