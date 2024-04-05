import axios from "axios"
import { MediaData } from "../interfaces/mvtv"
// import { mydb } from "../dbs/lmdb"
import { putData,getData } from "../dbs/lmdb"

const toUrl = 'https://vidsrc-bc567b0e907e.herokuapp.com/'
const meUrl = 'https://moviekexonline-29aedc6d6588.herokuapp.com/'
const nodeProxy = 'https://nodeproxy-1a962f2c7198.herokuapp.com/'
// const vidsrc_working:boolean = true

async function fetchinVidsrc(id:string,ss:string|null = null ,ep:string|null = null) {
  console.log('sir got fetch order ')
  try {
    if(ss==null){
      const res = await axios.get(toUrl+'movie/'+id)
      const data:MediaData = res.data
      if (data.m3u8[0] !=null){
let m3u8:string = data.m3u8[0]
let modifiedM3u8:string=nodeProxy+encodeURIComponent(m3u8)
data.m3u8[0]=modifiedM3u8
        return data
      }
      else{
        const meRes:MediaData = await axios.get(meUrl+'movie/'+id)
        return meRes
      }
    }

    if(ss!=null){
      const res = await axios.get(toUrl+'tv/'+id+'/'+ss+'/'+ep)
      const data:MediaData = res.data
      if (data.m3u8[0] !=null){
        let m3u8:string = data.m3u8[0]
        let modifiedM3u8:string=nodeProxy+encodeURIComponent(m3u8)
        data.m3u8[0]=modifiedM3u8
        return data
      }
      else{
        const meRes:MediaData = await axios.get(meUrl+'tv/'+id+'/'+ss+'/'+ep)
        return meRes
      }
    }
  } catch (error) {
    console.error(`err in fetch data from vidsrc.to : ${error} | now will retry to vidsrc.me`)
    if(ss==null){
      const meRes:MediaData = await axios.get(meUrl+'movie/'+id)
      return meRes
    }else{
      const meRes:MediaData = await axios.get(meUrl+'tv/'+id+'/'+ss+'/'+ep)
      console.log(meRes)
      return meRes
      
    }
  }
  

}

function Key(id:string,ss:string|null = null,ep:string|null = null){
  const key = ss!=null ? `${id}/${ss}/${ep}`:id
  return key
}


async function dms(key:string,obj:MediaData|undefined = undefined){
  if(obj != undefined || null){
    await putData(key,obj) 
  }
  let data:undefined|MediaData = await getData(key)
  
  return data
}



async function  dataProcessing(id:string,ss:string|null = null,ep:string|null = null){
  const key =  Key(id,ss,ep)
  const getDms:MediaData|undefined = await dms(key)
  // console.log(getDms)

  if (getDms!=undefined ){
    try {
      let testM3u8:string = await axios.get(getDms.m3u8[0])
      console.log('seems m3u8 link is okey returning test ')
      return getDms
    } catch (error) {
      console.log('looks like m3u8 link got expired re fetcing it ')
      let response = await fetchinVidsrc(id,ss,ep)
      await dms(key,response)
      return  response
    
    }
 

  }
  else if(getDms==undefined){
    console.log(key + ' is undifend so i have to fetch again db ')
    const fetchedVidsrc = await fetchinVidsrc(id,ss,ep)
    // console.log(fetchedVidsrc)
     dms(key,fetchedVidsrc)
     return fetchedVidsrc
  }
   
  
  // const response = await fetchinVidsrc(id,ss,ep)

}


export async function vidsrc(id:string,ss:string|null = null,ep:string|null = null){

  const data = await dataProcessing(id,ss,ep)
 

  // console.log(data)
  return data
}


vidsrc('1399','3','5')


 



