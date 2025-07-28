import CategoryCard from "../../Fragments/Home/CategoryCard";
import { useEffect } from "react";

const CategoryLayouts = () => {
  

  return (
    <section id="category" className="transition-all scroll-mt-24 destinations section duration-400 dark:bg-gray-900">
      <div className="container grid gap-12 ">
        <div className="max-w-sm mx-auto text-center sm:max-w-md md:max-w-lg">
          <p className="destinations__subtitle section-subtitle">
            Our Destination Categories
          </p>
          <h1 className="destinations__title section-title">
            Explore Your Dream Destination
          </h1>
        </div>

        <div className="grid w-full max-w-sm grid-cols-1 gap-8 mx-auto md:max-w-2xl lg:max-w-5xl sm:max-w-xl sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard />
        </div>
      </div>
    </section>
  );
};

export default CategoryLayouts;
