import axios from "axios";
import { rClient } from "../middlewares/redis";
import { Vidsrc } from "../interfaces/vidscrc";

const vidscrcToWorking = true;

async function handleAxiosError(
  id: string,
  ss: string | null,
  ep: string | null,
  url: string,
  vId: string
): Promise<Vidsrc> {
  try {
    await test();
    const second:any = await vidsrc(id, ss, ep, "2");
    console.log(second + "i was retried ");
    return second;
  } catch (error) {
    console.error(`Error fetching data from ${url}: ${error}`);
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

const proxy:string = 'https://nodeproxy-1a962f2c7198.herokuapp.com/' 
export async function secondOp(
  url: string,
  t: string | null,
  cashId: string,
  id: string,
  ss: string | null = null,
  ep: string | null = null,
  source: string = "1"
) {
  try {
    console.log(source);
    const res = await axios.get(url);
    const data: Vidsrc = res.data;
    if(source=='1'){
        // let replaced = data.m3u8[0].replace('https://',proxy)
        data.m3u8[0] = proxy + encodeURIComponent(data.m3u8[0])
    }
    if (!data.m3u8 && source !== "1") {
    //   throw new Error("Error in vidsrc.to. Retrying to vidsrc.me");
    console.log('kiss me ')
    return handleAxiosError(id, ss, ep, url, cashId);
    }
    else{
        console.log('ff fuck ')
    }
    await rClient.set(cashId, JSON.stringify(data), "EX", 86400); // will expire in 24 hours
    return data;
  } catch {
    // if (source == "2") {
    //   return 'cat';
    // }
    return handleAxiosError(id, ss, ep, url, cashId);
  }
}

export async function vidsrc(
  id: string,
  ss: string | null = null,
  ep: string | null = null,
  source: string = "1"
) {
  const vId = `${id}${source === "1" ? "to" : "me"}${ss ? `_${ss}` : ""}${
    ep ? `_${ep}` : ""
  }`;
  const rootVidsrcTo = "https://vidsrc-bc567b0e907e.herokuapp.com/";
  const rootVidsrcMe = "https://moviekexonline-29aedc6d6588.herokuapp.com/";

  const root = source === "1" && vidscrcToWorking ? rootVidsrcTo : rootVidsrcMe;
  const url = !ss && !ep ? `${root}movie/${id}` : `${root}tv/${id}/${ss}/${ep}`;

  try {
    const t = await rClient.get(vId);
    console.log(t);
    if (t != null) {
      const obj: Vidsrc = JSON.parse(t);
      const res = await axios.get(obj.m3u8[0]);
      if (res.status >= 200 && res.status < 300) {
        console.log("Successfully fetched m3u8 URL");
        return obj;
      } else {
        console.log("Fallback to secondOp");
        return secondOp(url, t, vId, id, ss, ep, source);
      }
    } else {
      console.log("Fallback to secondOp");
      return secondOp(url, t, vId, id, ss, ep, source);
    }
  } catch (error) {
    console.error(`Error in vidsrc: ${error}`);
    // throw new Error(`Error in vidsrc: ${error}`);
  }
}

async function test() {
  console.log("sakib");
}
