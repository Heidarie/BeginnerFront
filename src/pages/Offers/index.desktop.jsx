import React, { useState, useRef, useCallback } from "react";
import { classNames } from "../../utils";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import Offer from "./components/Offer";
import useOffersFilter from "./components/useOffersFilter";
import Toast from "../../components/Toast";
import ScrollContainer from "react-indiana-drag-scroll";
import FilterOffers from "./components/filterOffers";

const Offers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const { offers, hasMore, loading, error } = useOffersFilter(
    query,
    pageNumber
  );
  const hideModal = () => {
    setFilters(false);
  };
  function handleQuery(e) {
    setQuery(e.target.value);
    setPageNumber(0);
  }
  const observer = useRef();

  const lastOfferElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((offers) => {
        if (offers[0].isIntersecting && hasMore) {
          console.log("VISIBLE");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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
  console.log(offers);
  return (
    <div>
      <ScrollContainer className="pb-5 mt-[2rem] sticky top-16 h-screen bg-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 md:grid-rows-2 gap-3 md:gap-5 p-[2rem]">
        {offers.map((offer, index) => {
          if (offers.length === index + 1) {
            return (
              <Offer
                key={offer.publicUrl}
                ref={lastOfferElementRef}
                offer={offer}
              />
            );
          } else {
            return <Offer key={offer.publicUrl} offer={offer} />;
          }
        })}
      </ScrollContainer>
      {filters && <FilterOffers hideModal={hideModal} />}
      {error && (
        <Toast text="Wystąpił bład przy ładowaniu ofert" icon="ERROR" />
      )}
      {loading && <Toast text="Ładowanie" icon="LOADING" />}
      <div className="absolute bottom-5 left-5">
        <div className="w-fit flex flex-col items-start justify-start">
          <button
            type="button"
            onClick={() => setFilters(true)}
            className="bg-[#00df9a] hover:bg-[#073f2e] focus:ring-white inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <BsFilter className="h-8 w-8 m-auto" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-5">
        <div className="w-fit flex flex-col items-center justify-center">
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
    </div>
  );
};

export default Offers;
