import React, { useState, useRef, useCallback } from "react";
import { classNames } from "../../utils";
import { AiOutlineArrowUp } from "react-icons/ai";
import useOffersFilter from "./components/useOffersFilter";
import Toast from "../../components/Toast";
import FilterOffers from "./components/filterOffers";
import OfferScroll from "./components/offerScroll";

const Offers = ({ flag }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const [occupations, setOccupations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 1_000_000]);

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
    if (
      occupations.toString() ||
      professions.toString() ||
      jobTypes.toString() ||
      levels.toString()
    ) {
      const occupationsList = occupations?.map((obj) => obj.id).join(",");
      const professionsList = professions?.map((obj) => obj.id).join(",");
      const jobTypesList = jobTypes?.map((obj) => obj.id).join(",");
      const levelsList = levels?.map((obj) => obj.id).join(",");
      setQuery(
        `Occupation=${occupationsList}&Profession=${professionsList}&SalaryFrom=${salaryRange[0]}&SalaryTo=${salaryRange[1]}&JobType=${jobTypesList}&Level=${levelsList}`
      );
      setPageNumber(0);
    } else {
      setQuery(`SalaryFrom=${salaryRange[0]}&SalaryTo=${salaryRange[1]}`);
      setPageNumber(0);
    }
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
  window.addEventListener("scroll", toggleVisibility);

  return (
    <>
      <OfferScroll offers={offers} flag={flag} ref={lastOfferElementRef} />
      {filters && (
        <FilterOffers
          hideModal={hideModal}
          occupationsQuery={[occupations, setOccupations]}
          jobTypesQuery={[jobTypes, setJobTypes]}
          levelsQuery={[levels, setLevels]}
          professionsQuery={[professions, setProfessions]}
          salaryRangeQuery={[salaryRange, setSalaryRange]}
          createQuery={handleQuery}
        />
      )}
      {error && (
        <Toast text="Wystąpił bład przy ładowaniu ofert" icon="ERROR" />
      )}
      {loading && <Toast text="Ładowanie" icon="LOADING" />}
      {window.location.href.includes("/Offers") && (
        <div className="fixed bottom-5 left-5">
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
      <div className="fixed bottom-5 w-full">
        <div className="w-full flex flex-col items-center justify-center">
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
