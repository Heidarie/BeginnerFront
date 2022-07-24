import React from "react";
import Offer from "../components/Offer";

const Offers = () => {
  return (
    <div className="text-black text-center text-[50px] font-bold h-screen w-full px-8">
      <div className="grid grid-flow-dense grid-rows-3 grid-cols-3 gap-8 mt-8">
        <Offer
          title="Senior Fullstack Javascript Engineer"
          from="35000"
          to="50000"
          place="Warsaw"
          profession="Senior"
          displayStyle="col-span-1 hover:row-span-2 w-full items-center transition-colors transform cursor-pointer group bg-white shadow-xl hover:bg-black rounded-xl hover:pb-[15rem] duration-500 overflow-hidden"
          benefits={[
            "Sport subscription",
            "Small teams",
            "Modern family benefits",
            "International projects",
            "Life insurance",
          ]}
        />
        <div class="col-span-2 hover:row-span-2 w-full items-center transition-colors transform cursor-pointer group bg-white shadow-xl hover:bg-black rounded-xl hover:pb-[15rem] duration-500 overflow-hidden">
          <div class="rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
            <img
              class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
              src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
              alt="blog"
            />
          </div>
        </div>
        <div className="col-span-1 hover:row-span-2 w-full items-center p-8 transition-colors transform cursor-pointer group bg-red-600 hover:bg-white rounded-xl hover:pb-[15rem]  duration-500">
          <img
            class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
          <p>3</p>
        </div>
        <div className="col-span-1 hover:row-span-2 w-full items-center p-8 transition-colors transform cursor-pointer group bg-slate-600 hover:bg-white rounded-xl hover:pb-[15rem]  duration-500">
          <img
            class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
          <p>4</p>
        </div>
        <div className="col-span-1 hover:row-span-2 w-full items-center p-8 transition-colors transform cursor-pointer group bg-orange-500 hover:bg-white rounded-xl hover:pb-[15rem]  duration-500">
          <img
            class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
          <p>5</p>
        </div>
        <div className="col-span-1 hover:row-span-2 w-full items-center p-8 transition-colors transform cursor-pointer group bg-lime-600 hover:bg-white rounded-xl hover:pb-[15rem]  duration-500">
          <img
            class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
          <p>6</p>
        </div>
        <div className="col-span-1 hover:row-span-2 w-full items-center p-8 transition-colors transform cursor-pointer group bg-emerald-600 hover:bg-white rounded-xl hover:pb-[15rem]  duration-500">
          <img
            class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
        </div>
        <div className="col-span-1 hover:row-span-2 w-full items-center p-8 transition-colors transform cursor-pointer group hover:bg-white rounded-xl hover:pb-[15rem]  duration-500">
          <img
            class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
        </div>
        <div className="col-span-1 hover:row-span-2 w-full items-center p-8 transition-colors transform cursor-pointer group hover:bg-white rounded-xl hover:pb-[15rem]  duration-500">
          <img
            class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Offers;
