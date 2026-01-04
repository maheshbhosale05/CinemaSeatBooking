import React from "react";

const Title = ({ movieName, cinemaName, subTitle }) => {
  return (
    <div className="flex flex-col justify-center mb-6">
      <h3 className="text-lg sm:text-3xl font-bold text-gray-800">
        {movieName} - {cinemaName}
      </h3>
      <p className="text-gray-600 text-lg">{subTitle}</p>
    </div>
  );
};

export default Title;
