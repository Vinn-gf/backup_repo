import { reduxGetUser } from "../../services/auth/get_me_user";
import { setIsEmail, setIsUsername } from "../reducers/meUser/authMe";
// import { setIsUser, setTokenMe } from "../reducers/meUser/authMe";

export const GetUserMe = () => (dispatch) => {
  return reduxGetUser()
    .then((result) => {
      dispatch(setIsUsername(result.data.data.name));
      dispatch(setIsEmail(result.data.data.email))
      return true;
    })
    .catch((err) => {
      console.log(err, "err me");
      return false;
    });
};
