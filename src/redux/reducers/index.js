import { combineReducers } from "redux";
import authLogin from "./auth/authLogin";
import authDetail from "./detail/authDetail";
import authMe from "./meUser/authMe";
import authMovie from "./movie/authMovie";
import authSearch from "./search/authSearch";
// import authLoginSlice from "./auth/authLogin"
// kotak untuk menyimpan semua reducer yg ada
export default combineReducers ({
    auth : authLogin,
    movieBox : authMovie,
    searchBox : authSearch,
    detailBox : authDetail,
    authMeUser : authMe
})