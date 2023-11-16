const Category = require("../models/categoryModel");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const categoryData = await Category.create({ name, description });

    console.log("Category Data: ", categoryData);

    return res.status(200).json({
      success: true,
      message: "Category created Successfully.",
    });
  } catch (error) {
    console.log("Error occured: ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    res.status(200).json({
      success: true,
      message: "All Categories returned successfully",
      data: allCategories,
    });
  } catch (error) {
    console.log("Error occured: ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId).populate({
      path: "courses",
      match: { status: "Published" },
      populate: "ratingAndReviews instructor",
    });

    console.log(selectedCategory);

    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");

      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");

      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // const selectedCourses = selectedCategory.courses;

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    ).populate({
      path: "courses",
      match: { status: "Published" },
      populate: "ratingAndReviews instructor",
    });

    //console.log("Different COURSE", differentCategory)
    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
      populate: "ratingAndReviews instructor",
    });

    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
