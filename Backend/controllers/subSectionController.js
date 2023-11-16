const SubSection = require("../models/subSectionModel");
const Section = require("../models/sectionModel");
const uploadToCloudinary = require("../utils/imageAndVideoUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { title, description, sectionId } = req.body;

    const video = req.files.video;

    if (!title || !description || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadedVideoDetails = await uploadToCloudinary(
      video,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    console.log("Uploaded Video file here: ", uploadedVideoDetails);

    const subSectionData = await SubSection.create({
      title,
      timeDuration: uploadedVideoDetails.duration,
      description,
      videoUrl: uploadedVideoDetails.secure_url,
    });

    const updatedSectionData = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionData._id,
        },
      },
      { new: true, runValidators: true }
    ).populate("subSection");

    res.status(200).json({
      success: true,
      message: "Sub Section created successfully.",
      data: updatedSectionData,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Unable to create Sub Section, please try again",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;

      const uploadDetails = await uploadToCloudinary(
        video,
        process.env.FOLDER_NAME
      );

      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
      error: error.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true, runValidators: true }
    );

    await SubSection.findByIdAndDelete(subSectionId);

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    res.status(200).json({
      success: true,
      message: "Sub Section deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("Error occurred: ", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete Sub Section, please try again",
      error: error.message,
    });
  }
};
