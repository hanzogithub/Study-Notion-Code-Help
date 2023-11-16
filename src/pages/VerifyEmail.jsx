import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOTP, signUp } from "../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [navigate, signupData]);

  const submitHandler = () => {
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="font-inter flex w-screen min-h-screen justify-center items-center bg-richblack-900">
      <div className="w-[508px] p-8 flex flex-col gap-6">
        {/* Section 1 */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold  text-richblack-5">
            Verify Email
          </h1>
          <p className="font-normal text-lg text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="rounded-lg p-3 bg-richblack-800 text-base font-medium text-richblack-5 w-[50px] border-0 aspect-square text-center focus:border-0  focus:outline-[1px] focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
        </div>

        <button
          type="submit"
          onClick={submitHandler}
          className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
        >
          Verify Email
        </button>

        {/* Section 3 */}

        <div className="flex justify-between">
          <div>
            <Link to="/login">
              <p className="flex gap-2 items-center text-richblack-5 text-base font-medium">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>

          <button
            className="flex items-center text-blue-100 gap-x-2"
            onClick={() => dispatch(sendOTP(signupData.email, navigate))}
          >
            <RxCountdownTimer />
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
