import React from "react";

const CinemaHallTitle = (props) => {
  const { cinemaName, cinemaHallName, cinemaHallAddress } = props;
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl font-bold font-black">{cinemaName}</h1>
      <p className="text-xl font-bold text-gray-500">{cinemaHallName}</p>
      <p className="text-base text-gray-500">{cinemaHallAddress}</p>
      <hr className="w-full h-0.5" />
    </div>
  );
};

export default CinemaHallTitle;
