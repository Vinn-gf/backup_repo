import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { setIsEmail, setIsUsername } from "../../../redux/reducers/meUser/authMe";

function TokenProtected({ children }) {
  const navigate = useNavigate();
  const Data = useSelector((state) => state.auth)
  const dispatch = useDispatch()


  useEffect(() => {
    if (Data.token === undefined) {
        navigate("/")
        dispatch(setIsUsername(""))
        dispatch(setIsEmail(""))
    }
  }, [Data.token, navigate, dispatch]);



  return children;
}

export default TokenProtected;