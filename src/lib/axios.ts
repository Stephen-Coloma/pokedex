import { setupCache } from "axios-cache-interceptor";
import Axios from "axios";

export const axios = setupCache(Axios.create());
