import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { logout } from "../../../services/operations/authAPI";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col min-h-[calc(100vh-4rem)] min-w-[220px] border-r-2 border-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col gap-7">
          <div className="w-full flex flex-col gap-3">
            {sidebarLinks.map((data, idx) => {
              if (data.type && data.type !== user.accountType) {
                return null;
              }

              return <SidebarLink data={data} key={idx}/>;
            })}
          </div>

          <div className="w-[80%] h-[0.12rem] bg-richblack-600 rounded-full mx-auto" />

          <div className="w-full flex flex-col gap-3">
            <SidebarLink
              data={{
                icon: "VscSettingsGear",
                name: "Settings",
                path: "/dashboard/settings",
                id: "7",
              }}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-6 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center text-richblack-300 gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
