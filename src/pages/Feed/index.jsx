import React from "react";
import loginBg from "../../assets/loginBg.png";
import InputBox from "./components/InputBox";
import Post from "./components/Post";

const Feed = () => {
  return (
    <>
      <InputBox />
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
    </>
  );
};

export default Feed;
