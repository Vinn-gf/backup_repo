import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetMovieList } from "../redux/actions/getMovies";
import { CookieKeys, CookieStorage } from "../utils/cookies";
import SearchIcon from "@rsuite/icons/Search";
import RenderAllMovies from "../assets/components/AllMoviesComponents/RenderAllMovies";
import {
  setLoggedIn,
  setToken,
  setUser,
} from "../redux/reducers/auth/authLogin";
// import { setTokenMe } from "../redux/reducers/meUser/authMe";

const ReduxAllMovies = () => {
  const [Popular, setPopular] = useState([]);
  const [Search, setSearch] = useState("");
  const [PageNow, setPageNow] = useState(1);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allMovies = useSelector((state) => state.movieBox.movies);

  useEffect(() => {
    setLoading(true);

    dispatch(GetMovieList(PageNow))
      .then((result) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "err dashboard");
        setLoading(false);
      });
  }, [PageNow, dispatch]);

  useEffect(() => {
    if (!Loading) {
      setPopular(allMovies);
    }
  }, [allMovies, Loading]);

  const handlePageMinus = () => {
    if (PageNow > 1) {
      setPageNow(PageNow - 1);
    } else {
      alert("Sudah di ujung halaman");
    }
  };

  const renderAll = () => {
    return Popular.map((movie, i) => {
      return <RenderAllMovies key={i} allMovie={movie} />;
    });
  };

  return (
    <div className="parents">
      {Loading && Popular ? (
        <span>
          <h2>Sedang Memuat....</h2>
        </span>
      ) : (
        <>
          <div className="parents bg-gradient-to-r from-gray-500 to-gray-700">
            <div className="header-section flex justify-between w-full pt-[.5rem]">
              <Link to={`/home`} className="brand-text">
                <h1 className="font-black z-99 outline-red-600 tracking-wider font-poppins text-[2.5rem] text-red-600 ml-2">
                  MovieList
                </h1>
              </Link>
              <div className="search-section w-[40%] flex justify-center items-center">
                <div className="relative w-full">
                  <input
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    className="border-2 w-full bg-transparent font-bold font-montserrat text-black border-red-600 rounded-full px-4 py-2 outline-red-600 focus:border-red-600 focus:outline-none"
                    placeholder="What do you want to watch?"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                    <Link to={`/search/${Search}`}>
                      <SearchIcon className="text-[1.5rem] hover:scale-[110%] text-black mx-2" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="head-btn z-50 flex gap-4 justify-center items-center mx-[2.5rem]">
                <button
                  onClick={() => {
                    CookieStorage.remove(CookieKeys.AuthToken);
                    dispatch(setToken(undefined));
                    dispatch(setLoggedIn(false));
                    dispatch(setUser(""));
                    // dispatch(setTokenMe(""));
                    navigate("/");
                  }}
                  className="bg-red-600 text-white py-0.5 px-1 font-normal text-[1rem] border-2 border-red-600 outline-red-600 rounded-full w-[6rem] h-[2.5rem]"
                >
                  LogOut
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center bg-red-500 w-[10.5%] rounded-full h-[2.5rem] my-3 shadow-md hover:bg-red-600">
                <div className="flex gap-7 text-white">
                  <button onClick={handlePageMinus}>
                    <i className="fas fa-arrow-left text-[1.3rem] text-white hover:text-black"></i>
                  </button>
                  <p className="font-montserrat font-extrabold text-[1.2rem]">
                    {PageNow}
                  </p>
                  <button
                    onClick={() => {
                      setPageNow(PageNow + 1);
                    }}
                  >
                    <i className="fas fa-arrow-right text-[1.3rem] text-white hover:text-black"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="show-all-movies flex flex-wrap justify-between items-center gap-5 py-[1rem] px-[1.7rem]">
              {renderAll()}
            </div>

            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center bg-red-500 w-[10.5%] rounded-full h-[2.5rem] mb-4 my-3 hover:bg-red-600">
                <div className="flex gap-7 text-white">
                  <button onClick={handlePageMinus}>
                    <i className="fas fa-arrow-left text-[1.3rem] text-white hover:text-black"></i>
                  </button>
                  <p className="font-montserrat font-extrabold text-[1.2rem]">
                    {PageNow}
                  </p>
                  <button
                    onClick={() => {
                      setPageNow(PageNow + 1);
                    }}
                  >
                    <i className="fas fa-arrow-right text-[1.3rem] text-white hover:text-black"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReduxAllMovies;
