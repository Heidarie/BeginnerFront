import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import Offer from "./Offer";
import OfferMobile from "./Offer.mobile";

const OfferScroll = React.forwardRef((props, ref) => {
  return (
    <>
      {props.flag === undefined || props.flag === true ? (
        <ScrollContainer className="sticky top-16 flex justify-center items-center min-h-screen">
          <div className="flex-1 p-8 lg:p-6 lg:py-12 min-h-screen w-screen">
            <div className="grid grid-cols-1 grid-rows-12 xl:grid-cols-4 xl:grid-rows-2 2xl:grid-cols-6 gap-4 pt-[3rem]">
              {props.offers.map((offer, index) => {
                if (props.offers.length === index + 1) {
                  return (
                    <Offer key={offer.publicUrl} ref={ref} offer={offer} />
                  );
                } else {
                  return <Offer key={offer.publicUrl} offer={offer} />;
                }
              })}
            </div>
          </div>
        </ScrollContainer>
      ) : (
        <ScrollContainer className="sticky top-16 flex justify-center items-center min-h-screen">
          <div className="flex-1 p-8 lg:p-6 lg:py-12 min-h-screen w-screen">
            <div className="grid grid-cols-1 grid-rows-12 gap-4 pt-[3rem]">
              {props.offers.map((offer, index) => {
                if (props.offers.length === index + 1) {
                  return (
                    <OfferMobile
                      key={offer.publicUrl}
                      ref={ref}
                      offer={offer}
                    />
                  );
                } else {
                  return <Offer key={offer.publicUrl} offer={offer} />;
                }
              })}
            </div>
          </div>
        </ScrollContainer>
      )}
    </>
  );
});

export default OfferScroll;
