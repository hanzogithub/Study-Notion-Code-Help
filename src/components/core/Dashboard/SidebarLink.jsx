import * as Icons1 from "react-icons/vsc";
import * as Icons2 from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { resetCourseState } from "../../../reducer/slices/courseSlice";

const SidebarLink = ({ data }) => {
  const Icon = Icons1[data.icon] || Icons2[data.icon];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = data.path === location.pathname;

  return (
    <NavLink
      key={data.id}
      to={data.path}
      onClick={dispatch(resetCourseState())}
      className={`relative px-6 py-2 ${
        matchRoute && "bg-yellow-800"
      } cursor-pointer transition-all duration-200`}
    >
      {matchRoute && (
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-50" />
      )}

      <div
        className={`flex items-center gap-2 text-sm font-medium ${
          matchRoute ? "text-yellow-50" : "text-richblack-300"
        }`}
      >
        <Icon className="text-lg" />
        <span>{data.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
