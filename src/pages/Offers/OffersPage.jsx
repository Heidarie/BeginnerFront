import React from "react";
import Offer from "./components/Offer";

const Offers = () => {
  return (
    <div className="text-black text-center text-[50px] font-bold h-screen w-full px-8 ">
      <div className="grid-flow-col-dense md:grid md:grid-flow-dense md:grid-rows lg:grid-cols-6 2xl:grid-cols-6 gap-8 mt-8">
        <Offer
          title="1 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-3"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
        <Offer
          title="2 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-1"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
        <Offer
          title="3 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-1 h-[21rem]"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
        <Offer
          title="4 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-2"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
        <Offer
          title="5 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-1 h-[21rem]"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
        <Offer
          title="6 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-1 h-[21rem]"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
        <Offer
          title="7 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-1 h-[21rem]"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
        <Offer
          title="8 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-1 h-[21rem]"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
        <Offer
          title="9 Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-1 h-[21rem]"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
            "Life insurance",
            "Life insurance",
          ]}
        />
      </div>
    </div>
  );
};

export default Offers;
