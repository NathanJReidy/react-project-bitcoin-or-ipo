import React from "react";

const CompaniesImgContainer = ({ oppCost, image }) => {
  return (
    <>
      <div className="imgContainer">
        <img
          className="img"
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/bitcoin-icon.png"
        ></img>

        {oppCost >= 0 ? (
          <img
            className="tick"
            src="https://image.flaticon.com/icons/png/128/390/390973.png"
          />
        ) : (
          <img
            className="cross"
            src="https://image.flaticon.com/icons/png/128/1828/1828665.png"
          />
        )}

        <h4 className="vs">VS</h4>
        <img className="img" src={image}></img>

        {oppCost < 0 ? (
          <img
            className="tick"
            src="https://image.flaticon.com/icons/png/128/390/390973.png"
          />
        ) : (
          <img
            className="cross"
            src="https://image.flaticon.com/icons/png/128/1828/1828665.png"
          />
        )}
      </div>
    </>
  );
};

export default CompaniesImgContainer;
