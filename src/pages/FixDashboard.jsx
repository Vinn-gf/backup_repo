import React, { useEffect, useState } from "react";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useDispatch, useSelector } from "react-redux";
import { GetMovieList } from "../redux/actions/getMovies";
import SearchIcon from "@rsuite/icons/Search";
import { Link, useNavigate } from "react-router-dom";
import { CookieKeys, CookieStorage } from "../utils/cookies";
import {
  setLoggedIn,
  setToken,
  setUser,
} from "../redux/reducers/auth/authLogin";
import PopularMovies from "../assets/components/PopularComponents/PopularMovies";
import { GetUserMe } from "../redux/actions/getMe";

const FixDashboard = () => {
  const [Popular, setPopular] = useState([]);
  const [Search, setSearch] = useState("");
  const [Loading, setLoading] = useState(false);
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movieBox.movies);
  const usernameData = useSelector((state) => state.authMeUser.isUsername);
  const emailData = useSelector((state) => state.authMeUser.isEmail);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(GetUserMe())
      .then((result) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "err dashboard");
        setLoading(false);
      });

    dispatch(GetMovieList(1))
      .then((result) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "err dashboard");
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!Loading) {
      setUserName(usernameData);
      setUserEmail(emailData);
      setPopular(movieData);
    }
  }, [movieData, Loading, dispatch, usernameData, emailData]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const renderPopularMovieList = () => {
    return Popular.slice(0, 5).map((movie, i) => {
      return <PopularMovies key={i} dataPopular={movie} />;
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
          <div className="header-section absolute flex justify-between z-50 w-full px-[1rem]">
            <div className="brand-text flex justify-center items-center">
              <h1 className="font-black outline-red-600 tracking-wider font-poppins text-[2.5rem] text-red-600 ml-2">
                MovieList
              </h1>
            </div>
            <div className="search-section w-[40%] flex justify-center items-center">
              <div className="relative w-full">
                <input
                  value={Search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="border-2 w-full bg-transparent font-bold font-montserrat text-white border-red-600 rounded-full px-4 py-2 outline-red-600 focus:border-red-600 focus:outline-none"
                  placeholder="what do you want to watch?"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                  <Link to={`/search/${Search}`}>
                    <SearchIcon className="text-[1.5rem] hover:scale-[110%] text-slate-300 mx-2" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="head-btn flex gap-4 justify-center items-center mr-2">
              <button
                onClick={() => {
                  CookieStorage.remove(CookieKeys.AuthToken);
                  dispatch(setToken(undefined));
                  dispatch(setLoggedIn(false));
                  dispatch(setUser(""));
                  navigate("/");
                }}
                className="bg-red-600 text-white py-0.5 px-1 font-normal text-[1rem] border-2 border-red-600 outline-red-600 rounded-full w-[6rem] h-[2.5rem]"
              >
                LogOut
              </button>
              <button
                onClick={openModal}
                className="bg-blue-600 text-white py-0.5 px-1 font-normal text-[1rem] border-2 border-blue-600 outline-blue-600 rounded-full w-[6rem] h-[2.5rem]"
              >
                User Info
              </button>
            </div>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
          >
            {Popular.slice(0, 3).map((movie, i) => {
              const backgroundStyle = {
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
              };
              return (
                <SwiperSlide key={i}>
                  <div
                    className={`body-parents bg-cover relative bg-center bg-no-repeat h-screen overflow-hidden py-1 z-50 flex justify-start items-center`}
                    style={backgroundStyle}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-opacity-60 bg-black -z-50"></div>
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
                    <div
                      key={i}
                      className={`desc-section flex flex-col gap-4 w-[50%] text-white mx-[1.5rem]`}
                    >
                      <div className="Movie-title">
                        <h1 className="font-extrabold font-montserrat text-[4rem] leading-[4.5rem]">
                          {movie.title}
                        </h1>
                      </div>
                      <div className="Movie-overview">
                        <p className="text-[0.8rem] text-justify font-normal font-montserrat">
                          {movie.overview}
                        </p>
                      </div>
                      <div className="desc-btn">
                        <button className="bg-red-600 rounded-full px-3 font-montserrat font-bold py-1 h-[2.5rem] text-[0.8rem] w-[10rem]">
                          <PlayOutlineIcon className="text-[1rem] mx-[0.3rem] mb-[0.2rem]" />
                          WATCH TRAILER
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="pop-movie-list py-2">
            <div className="pop-text px-6 flex justify-between h-[3rem]">
              <h1 className="font-black font-poppins tracking-wide text-[2rem]">
                Popular Movie
              </h1>
              <Link to={"/movie-list"}>
                <div className="flex justify-center items-center h-[100%]">
                  <p className="text-red-600 font-normal font-montserrat">
                    See All Movie
                  </p>
                  <i className="fas fa-arrow-right text-red-600 ml-1"></i>
                </div>
              </Link>
            </div>
            <div className="flex flex-wrap px-[1.7rem] gap-4 py-[2rem]">
              {renderPopularMovieList()}
            </div>
          </div>
          {isModalOpen && (
            <div className="modal-overlay font-montserrat flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm w-full h-screen z-50">
              <div className="modal-content bg-blue-600 flex flex-col gap-[1rem] rounded-md px-4 py-2 text-white">
                <h2>User Information</h2>
                <p>Name   : {UserName}</p>
                <p>Email   : {UserEmail}</p>
                <button className="modal-close font-black text-black bg-red-600 rounded-md px-2 py-1 hover:bg-red-800 hover:text-white"
                onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FixDashboard;
