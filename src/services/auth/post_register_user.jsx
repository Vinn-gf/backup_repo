import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import https3 from "../../utils/https3";

const RegisterUser = async (input) => {
  return await https3.post(API_ENDPOINTS.REGISTER_USER, input);
};

const useCreateUser = () => {
  return useMutation(RegisterUser);
};

export { RegisterUser, useCreateUser };
