import React from "react";

const pagesCreator = () => {
  function widthScreen() {
    if (window.innerWidth > 1600) {
      // make smaller add one page
    }
    console.log(window.innerWidth);
  }
  return <div>pagesCreator</div>;
};

export default pagesCreator;
