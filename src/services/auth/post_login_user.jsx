import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import { CookieKeys, CookieStorage } from "../../utils/cookies";
import https3 from "../../utils/https3";


const LoginWithRedux = async (input) => {
  return await https3.post(API_ENDPOINTS.LOGIN_USER , input)
}


const LoginUser = async (input) => {
  return await https3.post(API_ENDPOINTS.LOGIN_USER , input).then((result) => {
    CookieStorage.set(CookieKeys.AuthToken, result.data.data.token);
    return result;
  }).catch((err) => {
      
  });
};


const useLogin = () => {
  return useMutation(LoginUser);
};

export { LoginUser, useLogin, LoginWithRedux };
