const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    accountType: {
      type: String,
      required: true,
      enum: ["Admin", "Student", "Instructor"],
    },

    active: {
      type: Boolean,
      default: true,
    },

    approved: {
      type: Boolean,
      default: true,
    },

    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    image: {
      type: String,
      required: true,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordTokenExpires: {
      type: Date,
    },

    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
      },
    ],
  },
  // Add timestamps for when the document is created and last modified
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("User", userSchema);
