import React, { useState } from "react";
import { classNames } from "../../utils";
import { AiOutlineArrowUp } from "react-icons/ai";
import Offer2 from "./components/Offer2";
import ScrollContainer from "react-indiana-drag-scroll";
import Offer3 from "./components/Offer3";

const OffersPage2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisibility);
  return (
    <div className="content">
      <div className="">
        <ScrollContainer className="scroll-container overflow-visible sticky h-screen flex-col justify-between top-20 bg-white text-white grid grid-cols-2 w-[100%] gap-6 p-4 pb-[4.5rem] xl:grid-cols-5">
          <Offer2
            company="NAZWA"
            location="REMOTE"
            level="MID"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="SOME Accenture is a leading global professional services company, providing a broad range of services in strategy and consulting, interactive, technology and operations, with digital capabilities across all of these services. With our thought leadership and culture of innovation, we apply industry expertise, diverse skill sets and next-generation technology to each business challenge."
            benefits={["JS", "REACT", "AWS"]}
            premium={true}
          />
          <Offer2
            company="NAZWA"
            location="REMOTE"
            level="Junior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer2
            company="NAZWA"
            location="REMOTE"
            level="Junior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer2
            company="NAZWA"
            location="REMOTE"
            level="Junior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer2
            company="NAZWA"
            location="REMOTE"
            level="Junior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer2
            company="NAZWA"
            location="REMOTE"
            level="Junior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer2
            company="NAZWA"
            location="REMOTE"
            level="Junior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer2
            company="NAZWA"
            location="REMOTE"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
        </ScrollContainer>
        <div className="sticky top-4 h-screen flex flex-col items-center justify-center bg-purple-600 text-white">
          <div class="grid place-items-center min-h-screen">
            <div class="p-4 max-w-5xl grid gap-4 xs:grid-cols-2 xs:p-8 md:grid-cols-4 lg:gap-6">
              <h1 class="text-4xl font-extrabold xs:col-span-2 xs:grid xs:gap-4 xs:grid-cols-2 md:col-span-3 md:text-5xl md:grid-cols-3 lg:text-6xl">
                <span class="md:col-span-2">
                  Grid layout with Tailwind CSS.
                </span>
              </h1>
              <p class="xs:row-start-2 xs:col-start-2 xs:self-center md:col-start-1 md:col-span-2 md:pr-12 md:text-lg">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio hic itaque alias officiis.
              </p>
              <div class="h-40 bg-blue-500 xs:h-auto xs:square"></div>
              <div class="h-40 bg-blue-500 xs:h-auto xs:square"></div>
              <div class="h-40 bg-pink-500 xs:h-auto xs:square"></div>
              <div class="h-40 bg-blue-500 xs:h-auto xs:square md:col-start-2"></div>
              <div class="h-40 bg-pink-500 xs:h-auto xs:square"></div>
              <div class="h-40 bg-blue-500 xs:h-auto xs:square"></div>
              <div class="h-40 bg-blue-500 xs:h-auto xs:square"></div>
              <div class="h-40 bg-pink-500 xs:h-auto xs:square"></div>
              <p class="self-center md:text-lg md:col-span-2 md:text-center md:px-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit, and
                some more.
              </p>
            </div>
          </div>
        </div>
        <div className="sticky top-16 h-screen flex flex-col items-center justify-center bg-neutral-800 text-white">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"></div>
        </div>
        <ScrollContainer className="sticky top-16 h-screen bg-white text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-2 2xl:gap-10 mt-12 p-4">
          <Offer3
            company="NAZWA"
            location="REMOTE"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
"
            benefits={[
              "JS",
              "REACT",
              "AWS",
              "JS",
              "REACT",
              "AWS",
              "JS",
              "REACT",
              "AWS",
              "JS",
              "REACT",
              "AWS",
            ]}
            premium={true}
          />
          <Offer3
            company="NAZWA"
            location="REMOTE"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur. Culpa minus esse error iusto omnis. Ipsam ipsa aspernatur culpa sit cupiditate, debitis, temporibus ipsum deserunt non corrupti saepe sapiente!
"
            benefits={[
              "JS",
              "REACT",
              "AWS",
              "NODE.JS",
              "PowerPoint",
              "VISUALSTUDIO",
            ]}
            premium={false}
          />
          <Offer3
            company="NAZWA"
            location="REMOTE"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer3
            company="NAZWA"
            location="REMOTE"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer3
            company="NAZWA"
            location="REMOTE"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer3
            company="NAZWA"
            location="REMOTE"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer3
            company="NAZWA"
            location="REMOTE"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
          <Offer3
            company="Accenture"
            location="Warsaw"
            level="Senior"
            profession="JS PROGRAMMER"
            from="10000"
            to="15000"
            info="TEST"
            benefits={["JS", "REACT", "AWS"]}
            premium={false}
          />
        </ScrollContainer>
      </div>
      <div className="fixed bottom-5">
        <div className="w-screen flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className={classNames(
              isVisible ? "opacity-100" : "hidden",
              "bg-[#00df9a] hover:bg-[#073f2e] focus:ring-white inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            )}
          >
            <AiOutlineArrowUp className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffersPage2;
