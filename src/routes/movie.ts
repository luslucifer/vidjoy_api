import axios, { AxiosResponse, AxiosError } from "axios";
import { rClient } from "../middlewares/redis";
import { MediaData } from "../interfaces/mvtv";


export async function secondOp (url:string,t:string|null,id:string){
    const res =  await axios.get(url)
    const data = res.data
    console.log(res.data)
    console.log(t)
    await rClient.set(id,JSON.stringify(data),'EX',86400) // will expire in 24 hh 
    return data


}

export async function Movie(id: string) {
    const url = `https://moviekexonline-29aedc6d6588.herokuapp.com/movie/${id}`;
try {
    const t = await rClient.get(id)

    if (t!=null){
        try {
            let obj:MediaData = JSON.parse(t)
            let res = await axios.get(obj.m3u8[0])
            if (res.status >= 200 && res.status < 300) {
                console.log('fuck off')
                return obj
            } 
            else{
                return secondOp(url,t,id)
            }
        } catch (error) {
            console.error(`err in mv axios : ${error}`)
            return secondOp(url,t,id)
        }

    
    }

    else if (t == null){
        return secondOp(url,t,id)

    }

    
} catch (error) {
    return `id ${id} not found `
}

}
