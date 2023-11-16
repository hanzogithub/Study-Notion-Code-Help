import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import apiConnector from "../../services/apiConnector";
import { categories } from "../../services/apis";

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const matchRoute = (path) => {
    return path === location.pathname;
  };

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="h-16 border-b-[1px] border-richblack-700 py-3 bg-richblack-800 flex items-center justify-center">
      <div className="w-11/12 max-w-maxContent flex justify-between items-center">
        {/* Section 1 */}
        <div>
          <Link to="/">
            <img src={logo} width={160} height={32} loading="lazy" />
          </Link>
        </div>

        {/* Section 2 */}
        <div className="flex gap-5">
          {NavbarLinks.map((item, idx) => {
            return (
              <div key={idx} className="text-white">
                {item.title === "Catalog" ? (
                  <div className="relative group cursor-pointer">
                    <p className="flex justify-center items-center gap-[2px]">
                      Catalog <MdKeyboardArrowDown size="24px" />
                    </p>

                    <div className="invisible absolute left-[50%] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 py-5 px-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] z-[1000]">
                      <div className="h-6 w-6 rotate-45 rounded bg-richblack-5 -top-2 left-[55%] translate-x-[3px] absolute "></div>

                      {subLinks.length ? (
                        subLinks.map((sublink, idx) => {
                          return (
                            <Link
                              to={`/catalog/${sublink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={idx}
                            >
                              <p className="capitalize text-lg hover:bg-richblack-50 rounded-lg py-4 pl-4 font-inter ">
                                {sublink.name}
                              </p>
                            </Link>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={item.path}>
                    <p
                      className={`${
                        matchRoute(item?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {item.title}
                    </p>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Section 3 */}
        <div className="flex gap-4 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <div className="relative text-richblack-25 ">
                <AiOutlineShoppingCart className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute h-5 w-5 flex justify-center items-center rounded-full bg-caribbeangreen-500 text-xs font-semibold -top-2 left-[20%] animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
