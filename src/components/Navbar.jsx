import React, { useEffect, useState, Fragment } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiFillCaretDown,
  AiOutlineSolution,
} from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { classNames } from "../utils";
import AuthService from "./auth.service";
import DataService from "./data.service";

const Navbar = () => {
  const navigate = useNavigate();
  const [navMenu, setNavMenu] = useState(false);
  const [hover, setHover] = useState([false, false, false, false, false]);
  const [user, setUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    var res = await AuthService.logout();
    if (res.status === 200) {
      navigate("/Login");
      window.location.reload();
    }
  };
  const handleNavMenu = () => {
    setNavMenu(!navMenu);
  };

  const handleHover = (index) => {
    setHover((prevState) =>
      prevState.map((item, idx) => (idx === index ? !item : item))
    );
  };
  const handleUserData = async () => {
    const { data } = await DataService.getUserData();
    setUser(data);
  };
  useEffect(() => {
    setIsLoggedIn(DataService.checkCookieAuthState("AuthState"));
    if (user === undefined && isLoggedIn) {
      handleUserData();
    }
  }, [isLoggedIn, user]);

  return (
    <nav className="bg-gray-800 fixed w-full top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 z-[100]">
        <div className="relative flex items-center justify-between h-16 z-[100]">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
            <div
              onClick={handleNavMenu}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {!navMenu ? (
                <AiOutlineMenu size={25} />
              ) : (
                <AiOutlineClose size={25} />
              )}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start ">
            <Link to="/">
              <div className="flex-shrink-0 flex items-center justify-center">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <h1 className="hidden text-3xl lg:block w-auto font-bold text-[#00df9a] pl-4 pr-4">
                  Beginner.
                </h1>
              </div>
            </Link>
            <div className="hidden sm:block sm:ml-6 ">
              <div className="flex space-x-4">
                <Link className="" to="/Offers">
                  <div
                    className="px-2 py-1 bg-[#00df9a] rounded-md"
                    onMouseOver={() => handleHover(0)}
                    onMouseOut={() => handleHover(0)}
                  >
                    <RiFileList3Line
                      size={30}
                      className={classNames(
                        hover[0] ? "hidden" : "visible",
                        "text-black"
                      )}
                    />
                    <p
                      className={classNames(
                        hover[0] ? "hover:text-white" : "hidden",
                        "text-sm font-medium py-[0.52rem] -my-[0.2rem] -mx-[0.33rem] px-1 hover:px-5 duration-500"
                      )}
                    >
                      Oferty
                    </p>
                  </div>
                </Link>
                {user?.role === "Employer" && (
                  <Link className="" to="/Applications">
                    <div
                      className="px-2 py-1 bg-[#00df9a] rounded-md"
                      onMouseOver={() => handleHover(1)}
                      onMouseOut={() => handleHover(1)}
                    >
                      <AiOutlineSolution
                        size={30}
                        className={classNames(
                          hover[1] ? "hidden" : "visible",
                          " text-black"
                        )}
                      />
                      <p
                        className={classNames(
                          hover[1] ? "hover:text-white" : "hidden",
                          "text-sm font-medium py-[0.52rem] -my-[0.2rem] -mx-[0.33rem] px-1 hover:px-5 duration-500"
                        )}
                      >
                        Aplikacje
                      </p>
                    </div>
                  </Link>
                )}

                {/* <Link className="" to="/Contacts">
                  <div
                    className="px-2 py-1 bg-[#00df9a] rounded-md"
                    onMouseOver={() => handleHover(2)}
                    onMouseOut={() => handleHover(2)}
                  >
                    <RiContactsBookLine
                      size={30}
                      className={classNames(
                        hover[2] ? "hidden" : "visible",
                        " text-black"
                      )}
                    />
                    <p
                      className={classNames(
                        hover[2] ? "hover:text-white" : "hidden",
                        "text-sm font-medium py-[0.52rem] -my-[0.2rem] -mx-[0.33rem] px-1 hover:px-5 duration-500"
                      )}
                    >
                      Kontakty
                    </p>
                  </div>
                </Link> */}

                {/* <Link className="" to="/Messages">
                  <div
                    className="px-2 py-1 bg-[#00df9a] rounded-md"
                    onMouseOver={() => handleHover(3)}
                    onMouseOut={() => handleHover(3)}
                  >
                    <RiMessage3Line
                      size={30}
                      className={classNames(
                        hover[3] ? "hidden" : "visible",
                        " text-black"
                      )}
                    />
                    <p
                      className={classNames(
                        hover[3] ? "hover:text-white" : "hidden",
                        "text-sm font-medium py-[0.52rem] -my-[0.2rem] -mx-[0.33rem] px-1 hover:px-5 duration-500"
                      )}
                    >
                      Wiadomości
                    </p>
                  </div>
                </Link> */}
              </div>
            </div>
          </div>

          {user ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="ml-3 relative">
                <div>
                  <Menu
                    as="div"
                    className="relative inline-block text-left overflow-visible ml-5 z-[100]"
                  >
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full h-11 items-center rounded-md border border-gray-300 shadow-sm  py-0 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#00df9a]">
                        <div className="w-12 -left-2 md:-left-4 relative">
                          <img
                            src={user.image}
                            key={`${user?.image}`}
                            alt="ProfilePhoto"
                            className="inline-block h-12 w-12 rounded-full ring-2 ring-[#00df9a] "
                          />
                        </div>

                        <div className="pr-3 hidden sm:block">
                          <p>{user.name || user.companyName}</p>
                        </div>
                        <div>
                          <AiFillCaretDown
                            className="mr-1 h-5 w-5 items-end"
                            aria-hidden="true"
                          />
                        </div>
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                relative="path"
                                href={user?.profile}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm w-full text-start"
                                )}
                              >
                                Profil
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm w-full text-start"
                                )}
                              >
                                Ustawienia konta
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                className={classNames(
                                  active
                                    ? "bg-red-100 text-gray-900 "
                                    : "text-gray-700 ",
                                  "block px-4 py-2 text-sm w-full"
                                )}
                                onClick={handleLogout}
                              >
                                Wyloguj się
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  <Menu
                    as="div"
                    className="relative inline-block text-left overflow-visible ml-5 z-[100]"
                  >
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full h-11 items-center rounded-md border shadow-sm py-0 bg-white text-sm font-medium text-gray-700 hover:bg-[#00df9a]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#00df9a]">
                        <Link
                          to="/Login"
                          className="text-base leading-6 text-gray-700 hover:text-gray-900"
                        >
                          <div className="p-3">Zaloguj się</div>
                        </Link>
                      </Menu.Button>
                    </div>
                  </Menu>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={classNames(
          navMenu
            ? "fixed top-[4rem] opacity-100 h-auto w-full bg-[#000300] px-2 pt-2 pb-3 space-y-1 ease-out duration-700 z-[2]"
            : "fixed top-[-40%] opacity-0 h-auto w-full -z-[2] ease-in-out duration-700 px-2 pt-2 pb-3 ",
          "sm:hidden"
        )}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            onClick={() => setNavMenu(!navMenu)}
            to="/Offers"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Oferty
          </Link>
          {user?.role === "Employer" && (
            <Link
              onClick={() => setNavMenu(!navMenu)}
              to="/Applications"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Aplikacje
            </Link>
          )}
          {/* <Link
            onClick={() => setNavMenu(!navMenu)}
            to="/Contacts"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Kontakty
          </Link> */}

          {/* <Link
            onClick={() => setNavMenu(!navMenu)}
            to="/Messages"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Wiadomości
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
