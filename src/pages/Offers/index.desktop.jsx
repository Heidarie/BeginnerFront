import React, { useState, useRef, useCallback, useEffect } from "react";
import { classNames } from "../../utils";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import Offer from "./components/Offer";
import useOffersFilter from "./components/useOffersFilter";
import Toast from "../../components/Toast";
import ScrollContainer from "react-indiana-drag-scroll";
import FilterOffers from "./components/filterOffers";
import { useUIDSeed } from "react-uid";
import { useInfiniteQuery } from "react-query";

const Offers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const [occupations, setOccupations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 5000]);

  const { offers, hasMore, loading, error } = useOffersFilter(
    query,
    pageNumber
  );
  const hideModal = () => {
    setFilters(false);
  };
  function handleQuery(
    occupations,
    jobTypes,
    levels,
    professions,
    salaryRange
  ) {
    const occupationsList = occupations?.map((obj) => obj.id).join(",");
    const professionsList = professions?.map((obj) => obj.id).join(",");
    const jobTypesList = jobTypes?.map((obj) => obj.id).join(",");
    const levelsList = levels?.map((obj) => obj.id).join(",");
    console.log(occupationsList, professionsList, jobTypesList, levelsList);
    setQuery(
      `Occupation=${occupationsList}&Profession=${professionsList}&SalaryFrom=${salaryRange[0]}&SalaryTo=${salaryRange[1]}&JobType=${jobTypesList}&Level=${levelsList}`
    );
    //&City=City
    setPageNumber(0);
  }
  const observer = useRef();

  const lastOfferElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((offers) => {
        if (offers[0].isIntersecting && hasMore) {
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

  useEffect(() => {
    handleQuery(occupations, jobTypes, levels, professions, salaryRange);
  }, [occupations, jobTypes, levels, professions, salaryRange]);

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
      {filters && (
        <FilterOffers
          hideModal={hideModal}
          occupationsQuery={[occupations, setOccupations]}
          jobTypesQuery={[jobTypes, setJobTypes]}
          levelsQuery={[levels, setLevels]}
          professionsQuery={[professions, setProfessions]}
          salaryRangeQuery={[salaryRange, setSalaryRange]}
        />
      )}
      {error && (
        <Toast text="Wystąpił bład przy ładowaniu ofert" icon="ERROR" />
      )}
      {loading && <Toast text="Ładowanie" icon="LOADING" />}
      {window.location.href.includes("/Offers") && (
        <div className="absolute bottom-5 left-5">
          <div className="w-fit flex flex-col items-start justify-start">
            <button
              type="button"
              onClick={() => setFilters(true)}
              className="bg-[#00df9a] hover:bg-[#073f2e] focus:ring-white inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              FILTRY
            </button>
          </div>
        </div>
      )}
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
