import { removeBackground} from "@imgly/background-removal"
import {ImageInit} from "@/app/CostumeHook/UseImage/type";

export const useImage = async (imageInit: ImageInit) : Promise<string> => {

    const imageTransparan = await removeBackground(imageInit)

    return URL.createObjectURL(imageTransparan)
}