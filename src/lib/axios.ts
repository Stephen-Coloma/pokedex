import { setupCache } from "axios-cache-interceptor";
import Axios from "axios";

const axios = setupCache(Axios.create());

export default axios;
