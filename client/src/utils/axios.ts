import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000"
})

axiosInstance.interceptors.request.use((config) => {
    return config;
})

axiosInstance.interceptors.response.use((response) => response, (error) => {

})

export default axiosInstance


// import { getTokens } from "@/service/token.service";
// import { getTokensFromLocalStorage } from "@/service/token.service";
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
// });

// axiosInstance.interceptors.request.use((config) => {
//   const tokens = getTokensFromLocalStorage();
//   if (tokens)
//     config.headers.Authorization = `Bearer ${tokens.accessToken}`;
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use((response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const tokens = getTokensFromLocalStorage()
//         const refreshToken = tokens.refreshToken;

//         if (!refreshToken) {
//           console.error("refresh token not found!");
//           return Promise.reject(error);
//         }

//         const response = await axiosInstance.post("/token/refresh_access_token", { refreshToken });
//         const accessToken = response.data.accessToken;
//         console.log("got the access token", {accessToken});
//         localStorage.setItem(
//           "tokens",
//           JSON.stringify({
//             accessToken,
//             refreshToken,
//           })
//         );
//         return axiosInstance(originalRequest);
//       } catch (refreshError:any) {
//         console.error("error fetching new refresh token", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }else{
//       return Promise.reject(error);
//     }
//   }
// )
// export default axiosInstance;
