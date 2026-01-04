import React from "react";
import Seat from "./Seat";

const SeatsLayout = ({ seatsLayout, aislePositions, handleSeatClick }) => {
  return (
    <div className="mb-6 overflow-x-scroll">
      {seatsLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-center mb-2">
          <div className="text-right text-sm sm:text-lg font-medium text-gray-600 w-4 sm:w-8 mr-2">
            {String.fromCharCode(65 + rowIndex)}
          </div>
          {row.slice(0, aislePositions).map((seat, seatIndex) => (
            <Seat
              seat={seat}
              rowIndex={rowIndex}
              seatIndex={seatIndex}
              handleSeatClick={handleSeatClick}
            />
          ))}
          <div className="w-6 h-6 mx-4" /> {/* Aisle Space */}
          {row.slice(aislePositions).map((seat, seatIndex) => (
            <Seat
              seat={seat}
              rowIndex={rowIndex}
              seatIndex={seatIndex + aislePositions}
              handleSeatClick={handleSeatClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatsLayout;
