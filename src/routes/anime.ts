import axios from "axios";
import { secondOp } from "./movie";
import { Anime } from "../interfaces/anime";
import { rClient } from "../dbs/redis";

export async function Anime(id: string, ep: string, type: string) {
  const url = `https://moviekexonline-29aedc6d6588.herokuapp.com/anime/${id}/${ep}/${type}`;
  const tvId: string = id + "_" + ep + "_" + type;

  try {
    const t = await rClient.get(tvId);

    if (t != null) {
      try {
        let obj: Anime = JSON.parse(t);
        let res = await axios.get(obj[0].url);
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
