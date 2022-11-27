import axios from "axios";

const BASE_URL = "https://etemple-api.edahampasala.com/api/";
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2JlMjE5NzQ3YTI4NWM0ZTJmMzFiYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Nzc0NDY5OCwiZXhwIjoxNjU4MDAzODk4fQ.7daxD3CSubuHEJPl-IMtp_lguXimAIULd46BbJ-I8PQ";

// const user = useSelector((state) => state.user.token);
// const TOKEN = JSON.parse(
//   JSON.parse(localStorage.getItem("persist:root")).user
// ).token;
// const TOKEN = JSON.parse(localStorage.getItem("accessToken"))
// console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  "Content-Type": "application/json",
});


// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
export const userRequest = axios.create({
  baseURL: BASE_URL
});