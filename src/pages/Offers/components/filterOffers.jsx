import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import Modal from "../../../components/Modal";
import makeAnimated from "react-select/animated";
import UserService from "../../../components/user.service";
import Toast from "../../../components/Toast";
import { Slider } from "antd";

const animatedComponents = makeAnimated();

const FilterOffers = ({ hideModal }) => {
  //READ FIRST FROM LINK IF AVAIABLE
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filtersData, setFiltersData] = useState([]);

  const [occupations, setOccupations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [salaryRange, setSalaryRange] = useState([1000, 10000]);
  const [range, setRange] = useState([]);

  async function loadFilters() {
    setLoading(true);
    let res = await UserService.getFilters("category=occupation,jobtype,level");
    if (res.status === 200) {
      console.log(res.data);
      const occupationFilter = res.data.occupationFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const levelFilter = res.data.levelFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const jobTypeFilter = res.data.jobTypeFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      const newObject = { occupationFilter, levelFilter, jobTypeFilter };
      setLoading(false);
      setFiltersData(newObject);
    } else {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }
  async function loadProfession(values) {
    setLoading(true);
    const occupationIds = values.map((obj) => obj.id).join(",");
    console.log(occupationIds);
    let res = await UserService.getFilters(
      `category=profession&occupationIds=${occupationIds}`
    );
    if (res.status === 200) {
      console.log(res.data);
      const professionFilter = res.data.professionFilter.map((obj) => ({
        ...obj,
        label: obj.value,
      }));
      console.log(professionFilter);
      setFiltersData({ ...filtersData, professionFilter: professionFilter });
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  const rangeMarks = {
    10: "10KM",
    20: "20KM",
    30: "30KM",
    40: "40KM",
    50: "50KM",
    100: {
      style: {
        color: "#f50",
      },
      label: <strong>Każda</strong>,
    },
  };

  const handleClearFilters = () => {};

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
      <div className="grid grid-cols-6 gap-6">
        <h2 className="col-span-3 my-auto">Wybierz filtry ofert</h2>
        <button
          onClick={handleClearFilters}
          className="col-span-3 bg-red-600 rounded-lg w-fit p-2 justify-self-end text-white"
        >
          Wyczyść filtry
        </button>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="shadow-md sm:rounded-md overflow-visible">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  occupation
                </label>
                <Select
                  components={animatedComponents}
                  onChange={setOccupations}
                  value={occupations}
                  options={filtersData?.occupationFilter}
                  isMulti
                  name="jobTypes"
                  className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0 ">
        <div className="shadow-md sm:rounded-md overflow-visible">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    jobtype
                  </label>
                  <Select
                    components={animatedComponents}
                    onChange={setJobTypes}
                    value={jobTypes}
                    options={filtersData?.jobTypeFilter}
                    isMulti
                    name="jobTypes"
                    className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    level
                  </label>
                  <Select
                    components={animatedComponents}
                    onChange={setLevels}
                    value={levels}
                    options={filtersData?.levelFilter}
                    isMulti
                    name="jobTypes"
                    className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {filtersData?.professionFilter ? (
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="shadow-md sm:rounded-md overflow-visible">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    profession
                  </label>
                  <Select
                    components={animatedComponents}
                    onChange={setProfessions}
                    value={professions}
                    options={filtersData?.professionFilter}
                    isMulti
                    name="jobTypes"
                    className="mt-1 block w-full rounded-md text-black bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="shadow-md sm:rounded-md overflow-visible">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    profession
                  </label>
                  <Select
                    components={animatedComponents}
                    onChange={setProfessions}
                    value={professions}
                    options={filtersData?.professionFilter}
                    isMulti
                    isDisabled={true}
                    name="jobTypes"
                    className="mt-1 block w-full rounded-md text-black bg-gray-50 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="shadow-md sm:rounded-md overflow-visible">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  salary {salaryRange[0]} zł - {salaryRange[1]} zł
                </label>
                <Slider
                  range={{ draggableTrack: true }}
                  min={0}
                  max={100000}
                  step={100}
                  defaultValue={[1000, 10000]}
                  onChange={setSalaryRange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="shadow-md sm:rounded-md overflow-visible">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  odległość {range === 100 ? "nie ma znaczenia" : `${range} km`}
                </label>

                <Slider
                  marks={rangeMarks}
                  step={10}
                  defaultValue={37}
                  min={10}
                  onChange={setRange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <Toast text="Wystąpił błąd przy ładowaniu filtrów" icon="ERROR" />
      )}
      {loading && <Toast text="Ładowanie filtrów" icon="LOADING" />}
    </Modal>
  );
};

export default FilterOffers;
