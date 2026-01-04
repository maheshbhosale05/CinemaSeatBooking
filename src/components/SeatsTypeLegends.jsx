import React from "react";
import { getSeatColor } from "../constants";

const SeatsTypeLegends = ({ typeOfSeat, currency }) => {
  return (
    <div className="flex flex-row justify-center gap-4 p-2 m-6">
      {Object.values(typeOfSeat).map((seat) => (
        <div key={seat.type} className="flex items-center gap-2">
          <div
            className={`
                  w-6 h-6 rounded border-2 ${getSeatColor[seat.type]}
                `}
          />
          <span className="text-sm sm:text-base text-gray-700">
            {seat.type.charAt(0).toUpperCase() + seat.type.slice(1)} ({currency}{" "}
            {seat.price})
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <div
          className={`
                  w-6 h-6 rounded border-2 opacity-50 ${getSeatColor.booked}
                `}
        />
        <span className="text-sm sm:text-base text-gray-700">Booked</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`
                  w-6 h-6 rounded border-2 ${getSeatColor.selected}
                `}
        />
        <span className="text-sm sm:text-base text-gray-700">Selected</span>
      </div>
    </div>
  );
};

export default SeatsTypeLegends;
