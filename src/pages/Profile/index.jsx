import React, { useState, useEffect } from "react";
import loginBg from "../../assets/loginBg.png";
import Footer from "../../components/Footer";
import AuthService from "../../components/auth.service";
import { IoFlame } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import EditProfile from "./editProfile";
import { FaCameraRetro } from "react-icons/fa";
import { ImCross, ImPlus, ImMenu, ImPencil, ImCheckmark } from "react-icons/im";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Moment from "moment";
import EditExperience from "./editExperience";
import EditGraduation from "./editGraduation";

const Profile = () => {
  let { id } = useParams();
  const [user, setUser] = useState(undefined);
  const [editProfile, setEditProfile] = useState(false);
  const [selectExp, setSelectExp] = useState(false);
  const [selectGrad, setSelectGrad] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [editGrad, setEditGrad] = useState(false);
  const [expList, setExpList] = useState([]);
  const [gradList, setGradList] = useState([]);

  const hideModal = () => {
    setEditProfile(false);
    setSelectExp(false);
    setSelectGrad(false);
  };

  const handleDropExp = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) {
      setExpList(
        expList.filter((item) => item.employerName !== droppedItem.draggableId)
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
  const handleAcceptExp = () => {
    //CALL TO API
    //REFRESH PAGE
  };
  const handleDropGrad = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) {
      setGradList(
        gradList.filter((item) => item.schoolName !== droppedItem.draggableId)
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
  const handleAcceptGrad = () => {
    //CALL TO API
    //REFRESH PAGE
  };

  const getUser = (id) => {
    if (id) {
      AuthService.getUser(id).then((res) => {
        setUser(res.data);
      });
    }
  };

  useEffect(() => {
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
            {editProfile && <EditProfile hideModal={hideModal} />}
            <div className="flex flex-col gap-1 text-center items-center">
              {user?.imagePath ? (
                <img
                  src={`data:image/png;base64,${user.imagePath}`}
                  key={`${user.imagePath}`}
                  alt="ProfilePhoto"
                  className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
                />
              ) : (
                <FaCameraRetro style={{ fontSize: "50px" }} />
              )}
              <p className="font-semibold">{`${user?.name} ${user?.surname}`}</p>
              <div className="text-sm leading-normal text-gray-400 flex justify-center items-center">
                <IoFlame />
                {user?.profession.toUpperCase()}
              </div>
            </div>
            <div className="flex justify-center items-center text-center gap-3 m-auto my-3">
              <div className="font-semibold ">
                <p className="text-black">102</p>
                <span className="text-gray-400">Posts</span>
              </div>
              <div className="font-semibold  ">
                <p className="text-black">102</p>
                <span className="text-gray-400">Followers</span>
              </div>
              <div className="font-semibold  ">
                <p className="text-black">102</p>
                <span className="text-gray-400">Folowing</span>
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
                    <Link onClick={() => setEditExp(true)}>
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
                          key={experience.employerName}
                          draggableId={experience.employerName}
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
              user?.personalDataModel?.experience.map((experience) => (
                <div className="item-container my-2 md:col-span-2 md:mt-0">
                  <div className="shadow-md sm:rounded-md overflow-visible">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <h3 className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Nazwa firmy
                          </label>
                          {experience.employerName}
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
                    <Link onClick={() => setEditGrad(true)}>
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
                          key={graduation.schoolName}
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
                                        {Moment(graduation?.dateStart).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </h3>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Data zakończenia
                                      </label>
                                      <h3 className="col-span-6">
                                        {Moment(graduation?.dateEnd).format(
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
              user?.personalDataModel?.graduations.map((graduation) => (
                <div className="item-container my-2 md:col-span-2 md:mt-0">
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
                            {Moment(graduation?.dateStart).format("DD/MM/YYYY")}
                          </h3>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Data zakończenia
                          </label>
                          <h3 className="col-span-6">
                            {Moment(graduation?.dateEnd).format("DD/MM/YYYY")}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="grid mt-5 grid-cols-2  space-x-4 overflow-y-scroll justify-center items-center w-full ">
            <div
              className="relative flex flex-col justify-between   bg-white shadow-md rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center  h-64 my-2"
              style={{ backgroundImage: `url(${loginBg})` }}
            >
              <div className="absolute bg-gradient-to-t from-green-400 to-blue-400  opacity-50 inset-0 z-0"></div>
              <div className="relative flex flex-row items-end  h-72 w-full ">
                <div className="absolute right-0 top-0 m-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 "
                    fill="none"
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
                </div>
                <div className="p-6 rounded-lg  flex flex-col w-full z-5">
                  <h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">
                    Loremipsum..
                  </h4>
                  <div className="flex justify-between items-center ">
                    <div className="flex flex-col">
                      <h2 className="text-sm flex items-center text-gray-300 font-normal">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        Dubai
                      </h2>
                    </div>
                  </div>
                  <div className="flex pt-4  text-sm text-gray-300">
                    <div className="flex items-center mr-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <p className="font-normal">4.5</p>
                    </div>
                    <div className="flex items-center font-medium text-white ">
                      $1800
                      <span className="text-gray-300 text-sm font-normal">
                        {" "}
                        /wk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative flex flex-col justify-between   bg-white  rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center shadow-md h-64 my-2"
              style={{ backgroundImage: `url(${loginBg})` }}
            >
              <div className="absolute bg-gradient-to-t from-blue-500 to-yellow-400  opacity-50 inset-0 z-0"></div>
              <div className="relative flex flex-row items-end  h-72 w-full ">
                <div className="absolute right-0 top-0 m-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 "
                    fill="none"
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
                </div>
                <div className="p-5 rounded-lg  flex flex-col w-full z-5 ">
                  <h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">
                    Loremipsum..
                  </h4>
                  <div className="flex justify-between items-center ">
                    <div className="flex flex-col">
                      <h2 className="text-sm flex items-center text-gray-300 font-normal">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        India
                      </h2>
                    </div>
                  </div>
                  <div className="flex pt-4  text-sm text-gray-300">
                    <div className="flex items-center mr-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <p className="font-normal">4.5</p>
                    </div>
                    <div className="flex items-center font-medium text-white ">
                      $1800
                      <span className="text-gray-300 text-sm font-normal">
                        {" "}
                        /wk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <div className="text-gray-500 text-sm mb-6 mx-3 px-2">
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
                <div className="text-xs  mt-0.5 text-gray-500">14 w</div>
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
            <div className="text-gray-500 text-sm mb-6 mx-3 px-2">
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
            <div className="text-gray-500 text-sm mb-6 mx-3 px-2">
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
      <Footer />
    </div>
  );
};

export default Profile;
