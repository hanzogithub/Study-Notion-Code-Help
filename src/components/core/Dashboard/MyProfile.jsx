import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <section className="bg-richblack-800 border-[1px] border-richblack-700 flex justify-between items-center px-12 py-8 rounded-lg my-10">
            <div className="flex items-center justify-center gap-5">
              <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="w-[78px] aspect-square rounded-full object-cover"
              />

              <div className="flex flex-col justify-center items-start">
                <h2 className="text-lg font-semibold text-richblack-5">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm font-normal text-richblack-300">
                  {user.email}
                </p>
              </div>
            </div>

            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </section>

          <section className="bg-richblack-800 border-[1px] border-richblack-700 flex flex-col px-12 py-8 rounded-lg my-10 gap-10">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-richblack-5">About</h2>

              <IconBtn
                text="Edit"
                onclick={() => {
                  navigate("/dashboard/settings");
                }}
              >
                <RiEditBoxLine />
              </IconBtn>
            </div>

            <p className="text-sm font-normal text-richblack-300">
              {user?.additionalDetails?.about ||
                "Write Something About Yourself"}
            </p>
          </section>

          <section className="bg-richblack-800 border-[1px] border-richblack-700 flex flex-col px-12 py-8 rounded-lg my-10 gap-10">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-richblack-5">
                Personal Details
              </h2>

              <IconBtn
                text="Edit"
                onclick={() => {
                  navigate("/dashboard/settings");
                }}
              >
                <RiEditBoxLine />
              </IconBtn>
            </div>

            <div className="flex max-w-[500px] justify-between">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-2 text-sm text-richblack-600">First Name</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.firstName}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-richblack-600">Email</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-richblack-600">Gender</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.additionalDetails?.gender || "Add Gender"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.lastName}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-richblack-600">
                    Phone Number
                  </p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.additionalDetails?.contactNumber ||
                      "Add Contact Number"}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-richblack-600">
                    Date Of Birth
                  </p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.additionalDetails?.dateOfBirth ||
                      "Add Date Of Birth"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
