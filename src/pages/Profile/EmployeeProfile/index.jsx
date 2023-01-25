import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { IoFlame } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import EditProfile from "./editProfile";
import { RiQuillPenFill } from "react-icons/ri";
import { ImCross, ImPlus, ImMenu, ImPencil, ImCheckmark } from "react-icons/im";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Moment from "moment";
import "moment/locale/pl";
import EditExperience from "./editExperience";
import EditGraduation from "./editGraduation";
import ScrollContainer from "react-indiana-drag-scroll";
import Toast from "../../../components/Toast";
import EmployeeService from "../../../components/employee.service";
import DataService from "../../../components/data.service";

const EmployeeProfile = () => {
  let { id } = useParams();
  const [user, setUser] = useState(undefined);
  const [editProfile, setEditProfile] = useState(false);
  const [selectExp, setSelectExp] = useState(false);
  const [selectGrad, setSelectGrad] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [editGrad, setEditGrad] = useState(false);
  const [expList, setExpList] = useState([]);
  const [gradList, setGradList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [filterAppliedOffers, setFilterAppliedOffers] = useState("");

  const hideModal = () => {
    setEditProfile(false);
    setSelectExp(false);
    setSelectGrad(false);
  };
  const filterEmployeeOfferApplications = (filter) => {
    setFilterAppliedOffers(filter);
    if (filter === undefined || filter === "") {
      setFilteredOffers(user?.employeeOfferApplications);
    } else {
      const filtered = user?.employeeOfferApplications.filter((offer) => {
        return offer.status === filter;
      });
      setFilteredOffers(filtered);
    }
  };
  const handleDropExp = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) {
      setExpList(
        expList.filter((item) => item.description !== droppedItem.draggableId)
      );
      return;
    }
    var updatedList = [...expList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setExpList(updatedList);
  };
  const handleDropGrad = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) {
      setGradList(
        gradList.filter((item) => item.type !== droppedItem.draggableId)
      );
      return;
    }
    var updatedList = [...gradList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setGradList(updatedList);
  };

  const handleAccept = async (values, type) => {
    if (values === null) {
      setEditExp(false);
      setEditGrad(false);
      return;
    }
    setLoading(true);
    let { status, response } = await EmployeeService.updateUserDetails(
      values,
      type
    );
    if (status === 200) {
      if (type === "experience") {
        setEditExp(false);
      } else {
        setEditGrad(false);
      }
      getUser(id);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response.data.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  };

  const getUser = async (id) => {
    if (id) {
      let { status, data, response } = await DataService.getUserProfile(id);
      if (status === 200) {
        setUser(data);
        setFilteredOffers(data?.employeeOfferApplications);
        setLoading(false);
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
  };

  useEffect(() => {
    Moment.locale("pl");
    filterEmployeeOfferApplications();
    getUser(id);
  }, []);

  return (
    <div className="app bg-gray-100">
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6  w-2xl container px-2 mx-auto mt-12">
        <aside className="my-10">
          <div className="bg-white shadow rounded-lg p-10">
            {user?.isLoggedInUserAccount && (
              <Link onClick={() => setEditProfile(true)}>
                <button className="px-4 py-2 bg-transparent outline-none border-2 border-indigo-400 rounded text-indigo-500 font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                  Edytuj
                </button>
              </Link>
            )}
            {editProfile && (
              <EditProfile hideModal={hideModal} editProfileData={user} />
            )}
            <div className="flex flex-col gap-1 text-center items-center">
              <img
                src={`${user?.image}`}
                key={`${user?.image}`}
                alt="ProfilePhoto"
                className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
              />

              <p className="font-semibold">{`${user?.name} ${user?.surname}`}</p>
              <div className="text-sm leading-normal text-gray-400 flex justify-center items-center">
                <IoFlame />
                {user?.profession?.toUpperCase()}
              </div>
            </div>
            <div className="flex justify-start items-start text-start gap-3 m-auto">
              <h3 className="col-span-3 text-xl">
                <label className="block text-lg font-medium text-gray-700">
                  Opis
                </label>
                {user?.personalDataModel?.description}
              </h3>
            </div>
          </div>
          <div className="bg-white shadow mt-6 rounded-lg p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Umiejętności
                </label>
                <ScrollContainer
                  horizontal="true"
                  nativeMobileScroll="true"
                  className="flex justify-start scroll-container bg-[#00df9881]"
                >
                  <ul className="flex">
                    {user?.personalDataModel?.skills?.map((skill, id) => {
                      return (
                        <li
                          className="outline-offset-2 outline-white p-3 text-sm xl:text-md 2xl:text-lg font-semibold text-black"
                          key={skill + id}
                        >
                          {skill}
                        </li>
                      );
                    })}
                  </ul>
                </ScrollContainer>
              </div>
            </div>
          </div>
          <div className="bg-white shadow mt-6 rounded-lg p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certyfikaty
                </label>
                <ScrollContainer
                  horizontal="true"
                  nativeMobileScroll="true"
                  className="flex justify-start scroll-container bg-[#00df9881]"
                >
                  <ul className="flex">
                    {user?.personalDataModel?.certificates?.map(
                      (certificate, id) => {
                        return (
                          <li
                            className="outline-offset-2 outline-white p-3 text-sm xl:text-md 2xl:text-lg font-semibold text-black"
                            key={certificate + id}
                          >
                            {certificate}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </ScrollContainer>
              </div>
            </div>
          </div>
          <div className="bg-white shadow mt-6 rounded-lg p-6">
            <div className="grid grid-cols-6 gap-6">
              <h3 className="col-span-3 my-auto">Doświadczenie</h3>
              <div className="col-span-3 items-end text-end">
                {!editExp ? (
                  user?.isLoggedInUserAccount && (
                    <Link
                      onClick={() => {
                        setExpList(user?.personalDataModel?.experience);
                        setEditExp(true);
                      }}
                    >
                      <button className="px-4 py-2 col-span-1 bg-transparent outline-none border-2 border-indigo-400 rounded text-indigo-500 font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        Edytuj
                      </button>
                    </Link>
                  )
                ) : (
                  <div className="my-[0.31rem]">
                    <Link onClick={() => setEditExp(false)}>
                      <button className="p-2 border rounded mx-2 border-red-600 hover:bg-red-600 text-red-600 hover:text-white">
                        <ImCross />
                      </button>
                    </Link>
                    <Link
                      onClick={() => {
                        setEditExp(true);
                        setSelectExp(null);
                      }}
                    >
                      <button className="p-2 border rounded mx-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-white">
                        <ImPlus className="" />
                      </button>
                    </Link>
                    <Link
                      onClick={() => {
                        setEditExp(true);
                        handleAccept(expList, "experience");
                      }}
                    >
                      <button className="p-2 border rounded mx-2 border-green-600 hover:bg-green-600 text-green-600 hover:text-white">
                        <ImCheckmark className="" />
                      </button>
                    </Link>

                    {selectExp !== false && (
                      <EditExperience
                        hideModal={hideModal}
                        experience={selectExp}
                        setExp={setExpList}
                        expList={expList}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            {editExp ? (
              <DragDropContext onDragEnd={handleDropExp}>
                <Droppable droppableId="list-container">
                  {(provided) => (
                    <div
                      className="list-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {expList?.map((experience, index) => (
                        <Draggable
                          key={experience.description}
                          draggableId={experience.description}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              className="item-container my-2 md:col-span-2 md:mt-0"
                            >
                              <div className="shadow-md sm:rounded-md overflow-visible">
                                {editExp && (
                                  <>
                                    <div className="flex text-start col-span-3 justify-start text-gray-200 -mb-6 ml-2">
                                      <ImMenu className="cursor-grab h-8 w-8" />
                                    </div>

                                    <div className="flex col-span-3 justify-end text-red-600 -mb-6 mr-4">
                                      <Link
                                        onClick={() =>
                                          setExpList(
                                            expList.filter(
                                              (item) => item !== experience
                                            )
                                          )
                                        }
                                      >
                                        <ImCross className="h-7 w-7" />
                                      </Link>
                                    </div>
                                  </>
                                )}
                                <div className="bg-white px-4 py-5 sm:p-6">
                                  <div className="grid grid-cols-6 gap-6">
                                    <h3 className="col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Nazwa firmy
                                      </label>
                                      {experience.employerName}
                                    </h3>
                                    <h3 className="col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Tytuł
                                      </label>
                                      {experience.position}
                                    </h3>
                                    <h3 className="col-span-6">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Opis
                                      </label>
                                      {experience.description}
                                    </h3>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Data rozpoczęcia
                                      </label>
                                      <h3 className="col-span-6">
                                        {Moment(experience.dateFrom).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </h3>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Data zakończenia
                                      </label>
                                      <h3 className="col-span-6">
                                        {Moment(experience.dateTo).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </h3>
                                    </div>
                                  </div>
                                  {editExp && (
                                    <div className="flex justify-end text-yellow-200 -mb-4 -mr-2">
                                      <Link
                                        onClick={() => setSelectExp(experience)}
                                      >
                                        <ImPencil className="h-7 w-7" />
                                      </Link>

                                      {selectExp !== false && (
                                        <EditExperience
                                          hideModal={hideModal}
                                          experience={selectExp}
                                          setExp={setExpList}
                                          expList={expList}
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              user?.personalDataModel?.experience?.map((experience) => (
                <div
                  className="item-container my-2 md:col-span-2 md:mt-0"
                  key={experience.description}
                >
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <h3 className="col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Nazwa firmy
                          </label>
                          {experience.employerName}
                        </h3>
                        <h3 className="col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Tytuł
                          </label>
                          {experience.position}
                        </h3>
                        <h3 className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Opis
                          </label>
                          {experience.description}
                        </h3>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data rozpoczęcia
                          </label>
                          <h3 className="col-span-6">
                            {Moment(experience.dateFrom).format("DD/MM/YYYY")}
                          </h3>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data zakończenia
                          </label>
                          <h3 className="col-span-6">
                            {Moment(experience.dateTo).format("DD/MM/YYYY")}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white shadow mt-6 rounded-lg p-6">
            <div className="grid grid-cols-6 gap-6">
              <h3 className="col-span-3 my-auto">Wykształcenie</h3>
              <div className="col-span-3 items-end text-end">
                {!editGrad ? (
                  user?.isLoggedInUserAccount && (
                    <Link
                      onClick={() => {
                        setGradList(user?.personalDataModel?.graduations);
                        setEditGrad(true);
                      }}
                    >
                      <button className="px-4 py-2 col-span-1 bg-transparent outline-none border-2 border-indigo-400 rounded text-indigo-500 font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">
                        Edytuj
                      </button>
                    </Link>
                  )
                ) : (
                  <div className="my-[0.31rem]">
                    <Link onClick={() => setEditGrad(false)}>
                      <button className="p-2 border rounded mx-2 border-red-600 hover:bg-red-600 text-red-600 hover:text-white">
                        <ImCross />
                      </button>
                    </Link>
                    <Link
                      onClick={() => {
                        setEditGrad(true);
                        setSelectGrad(null);
                      }}
                    >
                      <button className="p-2 border rounded mx-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-white">
                        <ImPlus className="" />
                      </button>
                    </Link>
                    <Link
                      onClick={() => {
                        setEditGrad(true);
                        handleAccept(gradList, "graduation");
                      }}
                    >
                      <button className="p-2 border rounded mx-2 border-green-600 hover:bg-green-600 text-green-600 hover:text-white">
                        <ImCheckmark className="" />
                      </button>
                    </Link>

                    {selectGrad !== false && (
                      <EditGraduation
                        hideModal={hideModal}
                        graduation={selectGrad}
                        setGrad={setGradList}
                        gradList={gradList}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            {editGrad ? (
              <DragDropContext onDragEnd={handleDropGrad}>
                <Droppable droppableId="list-container">
                  {(provided) => (
                    <div
                      className="list-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {gradList?.map((graduation, index) => (
                        <Draggable
                          key={graduation.schoolName + index}
                          draggableId={graduation.schoolName}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              className="item-container my-2 md:col-span-2 md:mt-0"
                            >
                              <div className="shadow-md sm:rounded-md overflow-visible">
                                {editGrad && (
                                  <>
                                    <div className="flex text-start col-span-3 justify-start text-gray-200 -mb-6 ml-2">
                                      <ImMenu className="cursor-grab h-8 w-8" />
                                    </div>

                                    <div className="flex col-span-3 justify-end text-red-600 -mb-6 mr-4">
                                      <Link
                                        onClick={() =>
                                          setGradList(
                                            gradList.filter(
                                              (item) => item !== graduation
                                            )
                                          )
                                        }
                                      >
                                        <ImCross className="h-7 w-7" />
                                      </Link>
                                    </div>
                                  </>
                                )}
                                <div className="bg-white px-4 py-5 sm:p-6">
                                  <div className="grid grid-cols-6 gap-6">
                                    <h3 className="col-span-6">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Nazwa uczelni
                                      </label>
                                      {graduation?.schoolName}
                                    </h3>
                                    <h3 className="col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Tytuł
                                      </label>
                                      {graduation?.title}
                                    </h3>
                                    <h3 className="col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Kierunek studiów
                                      </label>
                                      {graduation?.type}
                                    </h3>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Data rozpoczęcia
                                      </label>
                                      <h3 className="col-span-6">
                                        {Moment(graduation?.dateFrom).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </h3>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Data zakończenia
                                      </label>
                                      <h3 className="col-span-6">
                                        {Moment(graduation?.dateTo).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </h3>
                                    </div>
                                  </div>
                                  {editGrad && (
                                    <div className="flex justify-end text-yellow-200 -mb-4 -mr-2">
                                      <Link
                                        onClick={() =>
                                          setSelectGrad(graduation)
                                        }
                                      >
                                        <ImPencil className="h-7 w-7" />
                                      </Link>

                                      {selectExp !== false && (
                                        <EditGraduation
                                          hideModal={hideModal}
                                          experience={selectGrad}
                                          setGrad={setGradList}
                                          gradList={gradList}
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              user?.personalDataModel?.graduations?.map((graduation, index) => (
                <div
                  className="item-container my-2 md:col-span-2 md:mt-0"
                  key={graduation?.schoolName + index}
                >
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <h3 className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Nazwa uczelni
                          </label>
                          {graduation?.schoolName}
                        </h3>
                        <h3 className="col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Tytuł
                          </label>
                          {graduation?.title}
                        </h3>
                        <h3 className="col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Kierunek studiów
                          </label>
                          {graduation?.type}
                        </h3>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data rozpoczęcia
                          </label>
                          <h3 className="col-span-6">
                            {Moment(graduation?.dateFrom).format("DD/MM/YYYY")}
                          </h3>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data zakończenia
                          </label>
                          <h3 className="col-span-6">
                            {Moment(graduation?.dateTo).format("DD/MM/YYYY")}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {user?.isLoggedInUserAccount && (
            <div className="bg-white shadow mt-6 rounded-lg p-6">
              <div className="flex w-full justify-between">
                <h1 className="my-auto">Oferty na które zaaplikowałeś</h1>
                <select
                  className=""
                  label="Filtry"
                  name="filterOffers"
                  placeholder="Wybierz filtr"
                  defaultValue={""}
                  value={filterAppliedOffers}
                  type="text"
                  onChange={(e) =>
                    filterEmployeeOfferApplications(e.target.value)
                  }
                >
                  <option value="">Wszystkie</option>
                  <option value="Oczekująca">Oczekująca</option>
                  <option value="Zaakceptowana">Zaakceptowana</option>
                  <option value="Odrzucona">Odrzucona</option>
                </select>
              </div>
              <div className="grid mt-5 gap-4 grid-cols-2 justify-center items-center w-full">
                {filteredOffers.length === 0 ? (
                  <div className="col-span-2">
                    {filterAppliedOffers === "" && (
                      <h3 className="mt-2 text-center font-bold text-lg text-gray-500">
                        Nie zaaplikowałeś jeszcze na żadną ofertę
                      </h3>
                    )}
                    {filterAppliedOffers === "Oczekująca" && (
                      <h3 className="mt-2 text-center font-bold text-lg text-gray-500">
                        Brak oczekujących aplikacji na rozpatrzenie
                      </h3>
                    )}
                    {filterAppliedOffers === "Zaakceptowana" && (
                      <h3 className="mt-2 text-center font-bold text-lg text-gray-500">
                        Żadna z aplikacji nie została jeszcze rozpatrzona
                      </h3>
                    )}
                    {filterAppliedOffers === "Odrzucona" && (
                      <h3 className="mt-2 text-center font-bold text-lg text-gray-500">
                        Brak odrzuconych aplikacji
                      </h3>
                    )}
                  </div>
                ) : (
                  filteredOffers?.map((application) => (
                    <div
                      key={application.offerPublicUrl}
                      className="relative flex flex-col justify-between bg-white shadow-md rounded-3xl bg-cover text-gray-800 overflow-hidden cursor-pointer w-full object-cover object-center  max-h-fit"
                    >
                      {application.status === "Oczekująca" && (
                        <div className="absolute bg-gradient-to-t from-yellow-300 to-yellow-500 opacity-50 inset-0 z-0"></div>
                      )}
                      {application.status === "Zaakceptowana" && (
                        <div className="absolute bg-gradient-to-t from-green-300 to-green-500 opacity-50 inset-0 z-0"></div>
                      )}
                      {application.status === "Odrzucona" && (
                        <div className="absolute bg-gradient-to-t from-red-300 to-red-500 opacity-50 inset-0 z-0"></div>
                      )}
                      <Link to={`/Offers/Offer/${application.offerPublicUrl}`}>
                        <div className="relative flex flex-row items-end w-full ">
                          <div className="m-2 p-2 rounded-lg flex flex-col w-full z-5">
                            <h4 className="mt-1 text-black text-xl font-semibold w-full leading-tight truncate">
                              {application.offerName}
                            </h4>
                            <h2 className="text-sm flex items-center text-black font-normal my-auto">
                              {application.isOpened
                                ? "Aplikacja została wyświetlona"
                                : "Aplikacja nie została jeszcze wyświetlona"}
                            </h2>
                            <div className="pt-4 grid grid-cols-3 text-sm text-black">
                              <div className="col-span-2 flex items-center mr-auto">
                                <RiQuillPenFill className=" text-yellow-500 mr-1" />
                                <p className="font-normal">
                                  {Moment(
                                    application.applicationDate
                                  ).fromNow()}
                                </p>
                              </div>
                              <div className="col-span-1 items-center font-medium text-black">
                                PLN 1800
                                <span className="text-gray-500 text-sm font-normal">
                                  /M
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </aside>

        <article className="my-10">
          <form className="bg-white shadow rounded-lg mb-6 p-4">
            <textarea
              name="message"
              placeholder="Type something..."
              className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
            ></textarea>
            <footer className="flex justify-between mt-2">
              <div className="flex gap-2">
                <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="css-i6dzq1"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </span>
                <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="css-i6dzq1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="css-i6dzq1"
                  >
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                </span>
              </div>
              <button className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">
                Send
                <svg
                  className="ml-1"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </footer>
          </form>

          <div className="bg-white shadow rounded-lg mb-6">
            <div className="flex flex-row px-2 py-3 mx-3">
              <div className="w-auto h-auto rounded-full">
                <img
                  className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                  alt="User avatar"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                />
              </div>
              <div className="flex flex-col mb-2 ml-4 mt-1">
                <div className="text-gray-600 text-sm font-semibold">
                  John Doe
                </div>
                <div className="flex w-full mt-1">
                  <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                    SEO
                  </div>
                  <div className="text-gray-400 font-thin text-xs">
                    • 30 seconds ago
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-100"></div>
            <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
              <div className="grid grid-cols-6 col-span-2   gap-2  ">
                <div className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                  <img
                    className="h-full w-full object-cover "
                    src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                    alt=""
                  />
                </div>
                <div className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                  <img
                    className="h-full w-full object-cover  "
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1399&amp;q=80"
                    alt=""
                  />
                </div>
                <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                  <img
                    className="h-full w-full object-cover "
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                    alt=""
                  />
                </div>
                <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                  <img
                    className="h-full w-full object-cover "
                    src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                    alt=""
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                  <div className="text-white text-xl absolute inset-0  bg-slate-900/80 flex justify-center items-center">
                    + 23
                  </div>
                  <img
                    className="h-full w-full object-cover "
                    src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=765&amp;q=80"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="text-gray-700 text-sm mb-6 mx-3 px-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500
            </div>
            <div className="flex justify-start mb-4 border-t border-gray-100">
              <div className="flex w-full mt-1 pt-2 pl-5">
                <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="14px"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </span>
                <img
                  className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
              </div>
              <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="14px"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                </span>
                <span className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                  <svg
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex w-full border-t border-gray-100">
              <div className="mt-3 mx-5 flex flex-row text-xs">
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                  Comments:<div className="ml-1 text-gray-400 text-ms"> 30</div>
                </div>
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                  Views: <div className="ml-1 text-gray-400 text-ms"> 60k</div>
                </div>
              </div>
              <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
                  Likes:{" "}
                  <div className="ml-1 text-gray-400  text-ms"> 120k</div>
                </div>
              </div>
            </div>
            <div className="text-black p-4 antialiased flex">
              <img
                alt="x"
                className="rounded-full h-8 w-8 mr-2 mt-1 "
                src="https://picsum.photos/id/1027/200/200"
              />
              <div>
                <div className="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5">
                  <div className="font-semibold text-sm leading-relaxed">
                    Sara Lauren
                  </div>
                  <div className="text-xs leading-snug md:leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </div>
                </div>
                <div className="text-xs  mt-0.5 text-gray-700">14 w</div>
                <div className="bg-white border border-white rounded-full float-right -mt-8 mr-0.5 flex shadow items-center "></div>
              </div>
            </div>
            <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
              <img
                className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                alt="User avatar"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                >
                  <svg
                    className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                placeholder="Post a comment..."
                autoComplete="off"
              />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mb-6">
            <div className="flex flex-row px-2 py-3 mx-3">
              <div className="w-auto h-auto rounded-full border-2 border-green-500">
                <img
                  className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                  alt="User avatar"
                  src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"
                />
              </div>
              <div className="flex flex-col mb-2 ml-4 mt-1">
                <div className="text-gray-600 text-sm font-semibold">
                  Sara Lauren
                </div>
                <div className="flex w-full mt-1">
                  <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                    UX Design
                  </div>
                  <div className="text-gray-400 font-thin text-xs">
                    • 1 day ago
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-100"></div>
            <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
              <img
                alt="x"
                className="rounded w-full"
                src="https://picsum.photos/536/354"
              />
            </div>
            <div className="text-gray-600 font-semibold  mb-2 mx-3 px-2">
              Dummy text of the printing and typesetting industry
            </div>
            <div className="text-gray-700 text-sm mb-6 mx-3 px-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500
            </div>
            <div className="flex justify-start mb-4 border-t border-gray-100">
              <div className="flex w-full mt-1 pt-2 pl-5">
                <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="14px"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </span>
                <img
                  className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
              </div>
              <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="14px"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                </span>
                <span className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                  <svg
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex w-full border-t border-gray-100">
              <div className="mt-3 mx-5 flex flex-row text-xs">
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                  Comments:<div className="ml-1 text-gray-400 text-ms"> 30</div>
                </div>
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                  Views: <div className="ml-1 text-gray-400 text-ms"> 60k</div>
                </div>
              </div>
              <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
                  Likes: <div className="ml-1 text-gray-400 text-ms"> 120k</div>
                </div>
              </div>
            </div>
            <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
              <img
                className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                alt="User avatar"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                >
                  <svg
                    className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                placeholder="Post a comment..."
                autoComplete="off"
              />
            </div>
          </div>
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="flex flex-row px-2 py-3 mx-3">
              <div className="w-auto h-auto rounded-full border-2 border-green-500">
                <img
                  className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                  alt="User avatar"
                  src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"
                />
              </div>
              <div className="flex flex-col mb-2 ml-4 mt-1">
                <div className="text-gray-600 text-sm font-semibold">
                  Sara Lauren
                </div>
                <div className="flex w-full mt-1">
                  <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                    UX Design
                  </div>
                  <div className="text-gray-400 font-thin text-xs">
                    • 1 day ago
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-100"></div>
            <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
              <img
                alt="x"
                className="rounded w-full"
                src="https://picsum.photos/536/354"
              />
            </div>
            <div className="text-gray-600 font-semibold  mb-2 mx-3 px-2">
              Dummy text of the printing and typesetting industry
            </div>
            <div className="text-gray-700 text-sm mb-6 mx-3 px-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500
            </div>
            <div className="flex justify-start mb-4 border-t border-gray-100">
              <div className="flex w-full mt-1 pt-2 pl-5">
                <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="14px"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </span>
                <img
                  className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                  alt=""
                />
                <img
                  className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                  alt=""
                />
              </div>
              <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="14px"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                </span>
                <span className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                  <svg
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex w-full border-t border-gray-100">
              <div className="mt-3 mx-5 flex flex-row text-xs">
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                  Comments:<div className="ml-1 text-gray-400 text-ms"> 30</div>
                </div>
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                  Views: <div className="ml-1 text-gray-400 text-ms"> 60k</div>
                </div>
              </div>
              <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
                  Likes: <div className="ml-1 text-gray-400 text-ms"> 120k</div>
                </div>
              </div>
            </div>
            <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
              <img
                className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                alt="User avatar"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                >
                  <svg
                    className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                placeholder="Post a comment..."
                autoComplete="off"
              />
            </div>
          </div>
        </article>
      </main>
      {loading && <Toast text="Ładowanie" icon="LOADING" />}
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
      <Footer />
    </div>
  );
};

export default EmployeeProfile;
