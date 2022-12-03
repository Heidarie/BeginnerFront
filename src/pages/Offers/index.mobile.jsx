import React, { useState } from "react";
import { classNames } from "../../utils";
import { AiOutlineArrowUp } from "react-icons/ai";
import ScrollContainer from "react-indiana-drag-scroll";
import OfferMobile from "./components/Offer.mobile";

const OffersMobile = () => {
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
    <div className="">
      <ScrollContainer className="sticky top-16 h-screen bg-white text-white grid grid-cols-1 gap-2 p-8">
        <OfferMobile
          company="Accenture"
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
      <ScrollContainer className="sticky top-16 h-screen bg-white text-white grid grid-cols-1 gap-2 p-8">
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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
        <OfferMobile
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

export default OffersMobile;
