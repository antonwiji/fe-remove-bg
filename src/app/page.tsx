'use client'
import {ChangeEvent, useState} from "react";
import axios from "axios";

export default function Home() {

    const [render, setRender] = useState('')

    const imageData = (file: ChangeEvent<HTMLInputElement>) => {

        // @ts-ignore
        const fileData = file?.target?.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(fileData)
        reader.onload = async () => {

         // @ts-ignore
            setRender(reader.result)
        }
    }

    const apiRemoveBg = () => {

        const base64String = render?.split(",")[1];

        axios.post("https://api-remove-production.up.railway.app/api/remove-background", {
            "image_base64": base64String,
        }).then((res) => setRender(`data:image/png;base64,${res?.data?.image_base64}`))
            .catch((err) => console.log(err))
    }

  return (
   <>
      <input
        placeholder="Upload an image"
        type="file"
        id="image-file"
        onChange={(event) => imageData(event)}
      />

      <button
          disabled={!render}
          onClick={() => apiRemoveBg()}
      >Remove BG
      </button>
       {render && <img
                    src={render}
                    alt="image"
                />
       }
   </>
  );
}
