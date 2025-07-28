import PromoCard from "../../Fragments/Home/PromoCard";
import { useEffect } from "react";

const PromoLayouts = () => {
 

  return (
    <section
      id="promo"
      className="transition-all destinations  scroll-mt-24 section duration-400 dark:bg-gray-900"
    >
      <div className="container grid gap-12">
        <div className="text-center">
          <p className="destinations__subtitle section-subtitle">Best Promos</p>
          <h1 className="destinations__title section-title">
            Discover Our Exclusive Destination Offers
          </h1>
        </div>

        {/* Promo Card Grid */}
        <div className="h-auto max-w-7xl p-4 mx-auto overflow-hidden">
          <PromoCard />
        </div>
      </div>
    </section>
  );
};

export default PromoLayouts;
