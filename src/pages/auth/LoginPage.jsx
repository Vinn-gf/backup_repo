import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostLoginUser } from "../../redux/actions/postLogin";

const LoginPage = () => {
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "email") {
        setEmail(e.target.value);
      }
      if (e.target.id === "password") {
        setPassword(e.target.value);
      }
    }
  };

  const handleLoginUser = async () => {
    const dataDispatch = await dispatch(
      PostLoginUser({
        email: Email,
        password: Password,
      })
    );

    if (dataDispatch) {
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col gap-[1rem] justify-center bg-gradient-to-r from-rose-100 to-teal-100 items-center w-full h-screen">
      <div className="form-container rounded-md p-[1rem] bg-gradient-to-r from-emerald-500 to-lime-600 h-[45%] w-[28%] flex flex-col justify-center items-center gap-4 shadow-lg shadow-slate-600">
        <div className="text-login">
          <span className="font-black font-poppins text-[1.5rem]">Login</span>
        </div>
        <div className="input-section flex flex-col gap-4 w-[80%]">
          <div className="input-email flex flex-col gap-2 font-bold font-poppins tracking-wider text-[1rem]">
            <label>Email</label>
            <input
              onChange={handleInput}
              id="email"
              type="email"
              className="border-2 border-slate-600 focus:outline-none px-2 py-1 rounded-md"
            />
          </div>

          <div className="input-pass flex flex-col gap-2 font-bold font-poppins tracking-wider text-[1rem]">
            <label>Password</label>
            <input
              onChange={handleInput}
              type="password"
              id="password"
              className="border-2 border-slate-600 px-2 py-1 focus:outline-none rounded-md"
            />
          </div>
        </div>
        <div className="btn-section w-[60%]">
          <button
            onClick={() => {
              handleLoginUser();
            }}
            className="bg-[#A4F9C8] px-4 py-2 hover:bg-[#214E34] my-2 hover:text-white rounded-full w-[100%] font-bold font-poppins tracking-wider focus:outline-none"
          >
            Login
          </button>
          <GoogleLogin buttonText="Login with Google" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
