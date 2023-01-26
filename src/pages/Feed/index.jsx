import React, { useState, useEffect } from "react";
import loginBg from "../../assets/loginBg.png";
import DataService from "../../components/data.service";
import Toast from "../../components/Toast";
import InputBox from "./components/InputBox";
import InputBoxMobile from "./components/InputBox.mobile";
import Post from "./components/Post";
import PostMobile from "./components/Post.mobile";

const Feed = ({ flag }) => {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setUserData = async () => {
    setLoading(true);
    const { status, data, response } = await DataService.getUserData();
    if (status === 200 || status === 201) {
      setUser(data);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(response?.message);
      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    setUserData();
  }, []);
  return (
    <>
      {flag === undefined || flag === true ? (
        <div>
          <InputBox user={user} />
          <Post
            name="Maciek Moczadło"
            title="TO jest moje nowe biurko"
            description="Podoba się?"
            postImage={loginBg}
            image={loginBg}
            category="Programowanie"
            timestamp="2 hours ago"
          />
          <Post
            name="Maciek Moczadło"
            title="TO jest moje nowe biurko"
            description="Podoba się?"
            postImage={loginBg}
            image={loginBg}
            category="Programowanie"
            timestamp="2 hours ago"
          />
          <Post
            name="Maciek Moczadło"
            title="TO jest moje nowe biurko"
            description="Podoba się?"
            image={loginBg}
            category="Programowanie"
            timestamp="2 hours ago"
          />
        </div>
      ) : (
        <div>
          <InputBoxMobile user={user} />
          <PostMobile
            name="Maciek Moczadło"
            title="TO jest moje nowe biurko"
            description="Podoba się?"
            postImage={loginBg}
            image={loginBg}
            category="Programowanie"
            timestamp="2 hours ago"
          />
          <PostMobile
            name="Maciek Moczadło"
            title="TO jest moje nowe biurko"
            description="Podoba się?"
            postImage={loginBg}
            image={loginBg}
            category="Programowanie"
            timestamp="2 hours ago"
          />
          <PostMobile
            name="Maciek Moczadło"
            title="TO jest moje nowe biurko"
            description="Podoba się?"
            image={loginBg}
            category="Programowanie"
            timestamp="2 hours ago"
          />
        </div>
      )}
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
      {loading && <Toast text="Ładowanie" icon="LOADING" />}
    </>
  );
};

export default Feed;
