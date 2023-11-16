import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";
import { FiUpload } from "react-icons/fi";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = () => {
    try {
      console.log("uploading...");
      setLoading(true);

      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      // console.log("formdata", formData)

      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  // w-[78px] aspect-square rounded-full object-cover
  return (
    <section className="bg-richblack-800 border-[1px] border-richblack-700 flex justify-between items-center px-12 py-8 rounded-lg my-10">
      <div className="flex items-center gap-5">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-[78px] aspect-square object-cover rounded-full"
        />

        <div className="flex flex-col justify-center items-start gap-3">
          <h2 className="text-base capitalize font-medium text-richblack-25">
            Change Profile Picture
          </h2>

          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />

            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>

            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangeProfilePicture;
