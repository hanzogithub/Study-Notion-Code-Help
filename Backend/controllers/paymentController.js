const User = require("../models/userModel");
const Course = require("../models/courseModel");
const instance = require("../config/razorpay");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const CourseProgress = require("../models/courseProgressModel");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const user = req.user;

  if (courses.length === 0) {
    return res.json(400).status({
      success: false,
      message: "Please Provide course Id",
    });
  }

  let totalAmount = 0;

  for (const courseId of courses) {
    try {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found.",
        });
      }

      if (course.studentsEnrolled.includes(user._id)) {
        return res.status(400).json({
          success: false,
          message: "Sttudent is already enrolled.",
        });
      }

      totalAmount += course.price;
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);

    res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Could not Initiate Order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    courses,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  const user = req.user;

  if (
    !courses ||
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !user
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  }

  console.log("razorpay_order_id: " + razorpay_order_id);
  console.log("razorpay_payment_id: " + razorpay_payment_id);
  console.log("razorpay_signature: " + razorpay_signature);
  console.log("user: ", user);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  console.log("expectedSignature: ", expectedSignature);

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, user, res);

    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  }

  return res.status(400).json({ success: false, message: "Payment Failed" });
};

const enrollStudents = async (courses, user, res) => {
  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: {
            studentsEnrolled: user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!enrolledCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not Found",
        });
      }

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: user._id,
        completedVideos: [],
      });

      const enrolledStudent = await User.findByIdAndUpdate(
        user._id,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${user.firstName} ${user.lastName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${user.firstName} ${user.lastName}`
        )
      );
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const user = req.user;

  if (!orderId || !paymentId || !amount || !user) {
    res.status(400).json({
      success: false,
      message: "Please provide all the fields",
    });
  }

  try {
    await mailSender(
      user.email,
      `Payment Recieved`,
      paymentSuccessEmail(`${user.firstName}`, amount / 100, orderId, paymentId)
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Could not send Email",
    });
  }
};

// exports.capturePayment = async (req, res) => {
//   const { courseId } = req.body;
//   const user = req.user;

//   let course;

//   try {
//     course = await Course.findById(courseId);

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "No course found, please provide valid course id",
//       });
//     }

//     if (course.studentsEnrolled.includes(user._id)) {
//       return res.status(200).json({
//         success: false,
//         message: "Student is already enrolled",
//       });
//     }
//   } catch (error) {
//     console.log("Error occurred: ", error);

//     return res.status(500).json({
//       success: "false",
//       message: error.message,
//     });
//   }

//   // ORDER
//   let options = {
//     amount: course.price * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId,
//       userId: user._id,
//     },
//   };

//   try {
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);

//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbNail: course.thumbNail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.log("Error occurred: ", error);

//     return res.status(500).json({
//       success: "false",
//       message: "Could not initiate order",
//       error: error.message,
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   const webhookSecret = "123456789";

//   const signature = req.headers["x-razorpay-signature"];

//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature !== digest) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid request",
//     });
//   }

//   try {
//     console.log("Payment is Authorized");

//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     const enrolledCourse = await Course.findByIdAndUpdate(
//       courseId,
//       {
//         $push: { studentEnrolled: userId },
//       },
//       { new: true, runValidators: true }
//     );

//     console.log(enrolledCourse);

//     const enrolledStudent = await User.findByIdAndUpdate(
//       userId,
//       {
//         $push: {
//           courses: courseId,
//         },
//       },
//       { new: true, runValidators: true }
//     );

//     console.log(enrolledStudent);

//     //mail send krdo confirmation wala
//     const emailResponse = await mailSender(
//       enrolledStudent.email,
//       "Congratulations from CodeHelp",
//       "Congratulations, you are onboarded into new CodeHelp Course"
//     );

//     console.log(emailResponse);

//     return res.status(200).json({
//       success: true,
//       message: "Signature Verified and Course Added",
//     });
//   } catch (error) {
//     console.log("Error Occurred: ", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
