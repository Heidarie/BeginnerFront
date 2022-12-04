import React, { useState } from "react";
import { classNames } from "../../utils";
import { AiOutlineArrowUp } from "react-icons/ai";
import ScrollContainer from "react-indiana-drag-scroll";
import Offer from "./components/Offer";
import useOffersFilter from "./components/useOffersFilter";
import Toast from "./components/Toast";

const Offers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
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
  // window.innerHeight use to call next page
  window.addEventListener("scroll", toggleVisibility);

  const { offers, hasMore, loading, error } = useOffersFilter(
    filter,
    pageNumber
  );
  return (
    <>
      <ScrollContainer className="sticky top-8 h-screen bg-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-5 p-[4rem]">
        <Offer
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
          benefits={["JS", "REACT", "AWS"]}
          premium={true}
        />
      </ScrollContainer>
      {error && (
        <Toast text="Wystąpił bład przy ładowaniu ofert" icon="ERROR" />
      )}
      {loading && <Toast text="Ładowanie" icon="LOADING" />}
      <div className="fixed bottom-5">
        <div className="w-screen flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className={classNames(
              isVisible ? "animate-bounce opacity-100" : "hidden",
              "bg-[#00df9a] hover:bg-[#073f2e] focus:ring-white inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            )}
          >
            <AiOutlineArrowUp className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Offers;
