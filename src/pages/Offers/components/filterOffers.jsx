import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import Modal from "../../../components/Modal";
import makeAnimated from "react-select/animated";
import DataService from "../../../components/data.service";
import Toast from "../../../components/Toast";
import { Slider } from "antd";

const animatedComponents = makeAnimated();

const FilterOffers = ({
  hideModal,
  occupationsQuery,
  jobTypesQuery,
  levelsQuery,
  professionsQuery,
  salaryRangeQuery,
  createQuery,
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [filtersData, setFiltersData] = useState([]);
  const [occupations, setOccupations] = useState(occupationsQuery[0] || []);
  const [jobTypes, setJobTypes] = useState(jobTypesQuery[0] || []);
  const [levels, setLevels] = useState(levelsQuery[0] || []);
  const [professions, setProfessions] = useState(professionsQuery[0] || []);
  const [salaryRange, setSalaryRange] = useState(
    salaryRangeQuery[0] || [(0, 1_000_000)]
  );

  async function loadFilters() {
    setLoading(true);
    let { status, data, response } = await DataService.getFilters(
      "category=occupation,jobtype,level"
    );
    if (status === 200) {
      const occupationFilter = data.occupationFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const levelFilter = data.levelFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const jobTypeFilter = data.jobTypeFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const newObject = { occupationFilter, levelFilter, jobTypeFilter };
      setLoading(false);
      setFiltersData(newObject);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response.data.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  }
  async function loadProfession(values) {
    setLoading(true);
    const occupationIds = values.map((obj) => obj.id).join(",");
    let { status, data, response } = await DataService.getFilters(
      `category=profession&occupationIds=${occupationIds}`
    );
    if (status === 200) {
      if (filtersData.professionFilter) {
        setProfessions([]);
        setFiltersData({ ...filtersData, professionFilter: [] });
      }
      setLoading(false);
      const professionFilter = data?.professionFilter?.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      setFiltersData({ ...filtersData, professionFilter: professionFilter });
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response.data.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  }

  const handleClearFilters = () => {
    setOccupations([]);
    setJobTypes([]);
    setLevels([]);
    setProfessions([]);
    setSalaryRange([0, 1_000_000]);
    occupationsQuery[1]([]);
    jobTypesQuery[1]([]);
    levelsQuery[1]([]);
    professionsQuery[1]([]);
    salaryRangeQuery[1]([0, 1_000_000]);
  };

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    if (occupations.length > 0) {
      loadProfession(occupations);
    } else {
      delete filtersData?.professionFilter;
      setProfessions([]);
    }
  }, [occupations]);
  return (
    <Modal hideModal={hideModal} className="sm:max-w-2xl p-4">
      {occupations.length ||
      professions.length ||
      levels.length ||
      jobTypes.length !== 0 ? (
        <div className="grid grid-cols-6 gap-6 m-2">
          <h2 className="col-span-3 my-auto">Wybierz filtry ofert</h2>
          <button
            onClick={handleClearFilters}
            className="col-span-3 bg-red-600 rounded-lg w-fit p-2 justify-self-end text-white"
          >
            Wyczyść filtry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-6 m-2">
          <h2 className="col-span-3 my-auto">Wybierz filtry ofert</h2>
          <button
            disabled={true}
            onClick={handleClearFilters}
            className="invisible col-span-3 bg-red-600 rounded-lg w-fit p-2 justify-self-end text-white"
          >
            Wyczyść filtry
          </button>
        </div>
      )}
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="shadow-md sm:rounded-md overflow-visible">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Typ zawodu
                </label>
                <Select
                  components={animatedComponents}
                  onChange={(e) => {
                    setOccupations(e || []);
                    occupationsQuery[1](e || []);
                  }}
                  value={occupations}
                  options={filtersData?.occupationFilter}
                  isMulti
                  placeholder="Wybierz.."
                  name="jobTypes"
                  className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 ">
        <div className="shadow-md sm:rounded-md overflow-visible">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Typ pracy
                  </label>
                  <Select
                    components={animatedComponents}
                    onChange={(e) => {
                      setJobTypes(e || []);
                      jobTypesQuery[1](e || []);
                    }}
                    value={jobTypes}
                    options={filtersData?.jobTypeFilter}
                    isMulti
                    name="jobTypes"
                    placeholder="Wybierz.."
                    className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Poziom
                  </label>
                  <Select
                    components={animatedComponents}
                    onChange={(e) => {
                      setLevels(e || []);
                      levelsQuery[1](e || []);
                    }}
                    value={levels}
                    options={filtersData?.levelFilter}
                    isMulti
                    name="jobTypes"
                    placeholder="Wybierz.."
                    className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {filtersData?.professionFilter ? (
        <div className="md:col-span-2">
          <div className="shadow-md sm:rounded-md overflow-visible">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Język pracy
                  </label>
                  <Select
                    components={animatedComponents}
                    onChange={(e) => {
                      setProfessions(e || []);
                      professionsQuery[1](e || []);
                    }}
                    value={professions}
                    options={filtersData?.professionFilter}
                    isMulti
                    name="jobTypes"
                    placeholder="Wybierz.."
                    className="mt-1 block w-full rounded-md text-black bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:col-span-2">
          <div className="shadow-md sm:rounded-md overflow-visible">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Język pracy
                  </label>
                  <Select
                    components={animatedComponents}
                    onChange={(e) => {
                      setProfessions(e || []);
                      professionsQuery[1](e || []);
                    }}
                    value={professions}
                    options={filtersData?.professionFilter}
                    isMulti
                    isDisabled={true}
                    name="jobTypes"
                    placeholder="Wybierz.."
                    className="mt-1 block w-full rounded-md text-black bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="md:col-span-2">
        <div className="shadow-md sm:rounded-md overflow-visible">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Wynagrodzenie {salaryRange[0].toLocaleString()} zł -{" "}
                  {salaryRange[1].toLocaleString()} zł
                </label>
                <Slider
                  range={{ draggableTrack: true }}
                  min={0}
                  max={1_000_000}
                  step={100}
                  defaultValue={[0, 1_000_000]}
                  onChange={(e) => {
                    setSalaryRange(e || []);
                    salaryRangeQuery[1](e || []);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="focus:outline-none text-white hover:text-black bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 w-full text-center justify-center"
          onClick={() => {
            createQuery(
              occupations,
              jobTypes,
              levels,
              professions,
              salaryRange
            );
            hideModal(true);
          }}
        >
          Szukaj
        </button>
      </div>
      {error && (
        <Toast
          text={
            errorMessage === "" || errorMessage === undefined
              ? "Wystąpił nieoczekiwany błąd"
              : errorMessage
          }
          icon="ERROR"
        />
      )}
      {loading && <Toast text="Ładowanie filtrów" icon="LOADING" />}
    </Modal>
  );
};

export default FilterOffers;
