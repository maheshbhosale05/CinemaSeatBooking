import React from "react";
import { getTotalPrice } from "../utils";

const BookingButton = ({
  selectedSeats,
  currency,
  seatsLayout,
  typeOfSeat,
  handleOnBookClick,
}) => {
  return (
    <div className="mb-6">
      <button
        disabled={selectedSeats.length === 0}
        className="bg-green-200 h-12 px-6 rounded-lg text-green-800 font-semibold hover:bg-green-300 disabled:bg-gray-300 disabled:text-gray-500 w-full transition-colors duration-300"
        onClick={() => handleOnBookClick()}
      >
        {selectedSeats.length > 0
          ? `Book Now (${currency} ${getTotalPrice({
              selectedSeats,
              seatsLayout,
              typeOfSeat,
            })})`
          : "Select Seats to Book"}
      </button>
    </div>
  );
};

export default BookingButton;
