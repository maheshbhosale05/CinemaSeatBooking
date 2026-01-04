import React from "react";
import { getSeatColor } from "../constants";

const Seat = ({ seatIndex, rowIndex, seat, handleSeatClick }) => {
  return (
    <div
      key={seatIndex}
      className={`
        w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex justify-center items-center m-1 rounded cursor-pointer border-1 transform transition-transform duration-300 ease-in-out  hover:scale-110
        ${
          getSeatColor[
            seat.isBooked ? "booked" : seat.isSelected ? "selected" : seat.type
          ]
        } 
        ${seat.isBooked ? "opacity-50 !cursor-not-allowed scale-110" : ""}`}
      title={`Row ${seat.row + 1}, Seat ${seat.seat + 1}`}
      onClick={() => handleSeatClick(seat, rowIndex, seatIndex)}
    >
      {seatIndex + 1}
    </div>
  );
};

export default Seat;
