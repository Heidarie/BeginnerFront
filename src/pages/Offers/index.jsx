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
      {offers?.length > 0 && (
        <OfferScroll offers={offers} flag={flag} ref={lastOfferElementRef} />
      )}
      {loading && (
        <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
          <div className="m-auto">
            <div role="status" className="mb-4">
              <svg
                aria-hidden="true"
                className="m-auto w-[10rem] h-[10rem] text-gray-200 animate-spin dark:text-gray-600 fill-[#00df9a]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">{`...LOADING`}</span>
            </div>
            <h2 className="m-auto text-gray-600 font-extrabold text-6xl">
              Trwa{" "}
              <span className="underline decoration-[#00df9a]">ładowanie</span>{" "}
              ofert...
            </h2>
          </div>
        </div>
      )}
      {error && (
        <div className="flex h-screen justify-center items-center m-auto">
          <h2 className="text-gray-600 font-extrabold text-6xl text-center">
            Niestety ale wystąpił błąd przy ładowaniu ofert.
          </h2>
        </div>
      )}
      {offers?.length === 0 && !loading && (
        <div className="flex h-screen justify-center items-center">
          <h2 className="text-gray-600 font-extrabold text-6xl text-center">
            {`Nie znaleziono ofert :(.`}
          </h2>
        </div>
      )}
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
