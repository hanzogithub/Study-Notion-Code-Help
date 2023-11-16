import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../reducer/slices/courseSlice";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal("");
  };

  const handleDeleleSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
    }

    setConfirmationModal(null);
  };

  return (
    <>
      <div className="rounded-lg px-6 py-6 border-richblack-600 bg-richblack-700 flex flex-col gap-10">
        {course?.courseContent?.map((section) => {
          return (
            <details key={section._id} open>
              <summary className="flex cursor-pointer items-start justify-between gap-8 border-b-2 border-richblack-600 pb-2">
                <div className="flex gap-2 w-full">
                  <RxDropdownMenu className="text-2xl text-richblack-400" />

                  <p className="text-base font-semibold text-richblack-50">
                    {section.sectionName}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }
                  >
                    <MdEdit className="text-xl text-richblack-300" />
                  </button>

                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleleSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                  </button>

                  <span className="bg-richblack-600 font-bold w-[2.5px] h-full text-richblack-600 overflow-hidden rounded-lg">
                    |
                  </span>

                  <AiFillCaretDown className={`text-xl text-richblack-300`} />
                </div>
              </summary>

              <div className=" mt-5 cursor-pointer flex flex-col gap-5 items-start w-[85%] mx-auto">
                {/* Render All Sub Sections Within a Section */}
                {section.subSection.map((data) => {
                  return (
                    <div
                      key={data._id}
                      className="flex justify-between items-start w-full border-b-2 border-richblack-600 pb-2"
                    >
                      <div
                        className="flex gap-2 w-full"
                        onClick={() => setViewSubSection(data)}
                      >
                        <RxDropdownMenu className="text-2xl text-richblack-400" />
                        <p className="text-base font-semibold text-richblack-50">
                          {data.title}
                        </p>
                      </div>

                      <div className="flex gap-2 justify-between items-center">
                        <button
                          onClick={() =>
                            setEditSubSection({
                              ...data,
                              sectionId: section._id,
                            })
                          }
                        >
                          <MdEdit className="text-xl text-richblack-300" />
                        </button>

                        <button
                          onClick={() =>
                            setConfirmationModal({
                              text1: "Delete this Sub-Section?",
                              text2: "This lectures will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleDeleleSubSection(data._id, section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                        >
                          <RiDeleteBin6Line className="text-xl text-richblack-300" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Add New Lecture to Section */}
                <button
                  className="flex gap-1 items-center justify-center"
                  onClick={() => setAddSubsection(section._id)}
                >
                  <FaPlus className="text-lg text-yellow-50" />
                  <p className="text-base font-medium text-yellow-50">
                    Add Lecture
                  </p>
                </button>
              </div>
            </details>
          );
        })}
      </div>

      {/* Modal Display */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      )}

      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}

      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default NestedView;
