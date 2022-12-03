import React from "react";
import loginBg from "../../assets/loginBg.png";
import InputBoxMobile from "./components/InputBox.mobile";
import PostMobile from "./components/Post.mobile";

const FeedMobile = () => {
  return (
    <>
      <InputBoxMobile />
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
    </>
  );
};

export default FeedMobile;
