import axios, { AxiosResponse, AxiosError } from "axios";
import { rClient } from "../dbs/redis";
import { secondOp } from "./movie";
import { MediaData } from "../interfaces/mvtv";
export async function Tv(id: string, ss: string|null, ep: string|null) {
  const url = `https://moviekexonline-29aedc6d6588.herokuapp.com/tv/${id}/${ss}/${ep}`;
  const tvId = id + "_" + ss + "_" + ep;
  try {
    const t = await rClient.get(tvId);

    if (t != null) {
      try {
        let obj: MediaData = JSON.parse(t);
        let res = await axios.get(obj.m3u8[0]);
        if (res.status >= 200 && res.status < 300) {
          console.log("fuck off");
          return obj;
        } else {
          return secondOp(url, t, tvId);
        }
      } catch (error) {
        console.error(`err in mv axios : ${error}`);
        return secondOp(url, t, tvId);
      }
    } else if (t == null) {
      return secondOp(url, t, tvId);
    }
  } catch (error) {
    return `id ${tvId} not found `;
  }
}
