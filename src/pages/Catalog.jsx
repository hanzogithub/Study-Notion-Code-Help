import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConnector from "../services/apiConnector";
import { categories } from "../services/apis";
import { toast } from "react-hot-toast";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Error from "./Error";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import CourseCard from "../components/core/Catalog/CourseCard";

const Catalog = () => {
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);

  let { catalogName } = useParams();
  catalogName = catalogName.split("-").join(" ");

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);

      try {
        const res = await axiosConnector("GET", categories.CATEGORIES_API);

        const categoryData = res?.data?.data.filter(
          (data) => data.name.toLowerCase() === catalogName
        )[0];

        setCategory(categoryData);
      } catch (error) {
        toast.error("Some thing went wrong.");
      }

      setLoading(false);
    };

    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      setLoading(true);

      try {
        const res = await getCatalogPageData(category._id);
        console.log(res.data);

        setCatalogPageData(res.data);
      } catch (error) {
        toast.error("Some thing went wrong.");
      }

      setLoading(false);
    };

    if (category) {
      getCategoryDetails();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="border h-[calc(100vh-4rem)] flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData) {
    return <Error />;
  }

  console.log(catalogPageData);

  return (
    <div className="pb-20 flex flex-col gap-20">
      <section className="bg-richblack-800 py-20 px-10">
        <div className="max-w-maxContent w-11/12 flex flex-col gap-5 mx-auto">
          <p className="text-sm font-normal text-richblack-300 capitalize">
            home / catalog /{" "}
            <span className="text-yellow-50">{catalogName}</span>
          </p>

          <h1 className="text-3xl font-medium text-richblack-5 capitalize">
            {catalogName}
          </h1>

          <p className="text-sm font-normal text-richblack-200">
            {category?.description}
          </p>
        </div>
      </section>

      <section className="px-10">
        <div className="max-w-maxContent w-11/12 flex flex-col gap-5 mx-auto">
          <h2 className="text-3xl font-semibold text-richblack-5">
            Courses to get you started
          </h2>

          <div className="border-b border-richblack-600 text-base font-normal text-richblack-200 flex gap-1 capitalize">
            <p
              className={`${
                active === 1 && "text-yellow-100 border-b border-yellow-100"
              } px-3 py-2 cursor-pointer`}
              onClick={() => setActive(1)}
            >
              most popular
            </p>

            <p
              className={`${
                active === 2 && "text-yellow-100 border-b border-yellow-100"
              } px-3 py-2 cursor-pointer`}
              onClick={() => setActive(2)}
            >
              new
            </p>
          </div>

          <div className="swipperWrapper">
            <CourseSlider
              courses={catalogPageData?.selectedCategory?.courses}
            />
          </div>
        </div>
      </section>

      <section className="px-10">
        <div className="max-w-maxContent w-11/12 flex flex-col gap-5 mx-auto">
          <h2 className="text-3xl font-semibold text-richblack-5">
            Top Courses in {catalogPageData?.differentCategory?.name}
          </h2>

          <div className="swipperWrapper">
            <CourseSlider
              courses={catalogPageData?.differentCategory?.courses}
            />
          </div>
        </div>
      </section>

      <section className="px-10">
        <div className="max-w-maxContent w-11/12 flex flex-col gap-5 mx-auto">
          <h2 className="text-3xl font-semibold text-richblack-5">
            Frequently Bought
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 6)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
