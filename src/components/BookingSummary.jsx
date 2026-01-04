import React from "react";

const BookingSummary = ({ selectedSeats, currency, totalPrice }) => {
  return (
    <div className="p-2 mb-6 bg-gray-50 rounded-lg">
      {selectedSeats.length > 0 ? (
        <div>
          <p className="text-base text-gray-800 mb-2">
            Selected Seats:{"  "}
            {selectedSeats
              .map(
                (seat) =>
                  `${String.fromCharCode(65 + seat.row)}${seat.seat + 1}`
              )
              .join(", ")}
          </p>
          <p className="font-semibold text-base text-gray-800">
            Total Price: {currency} {totalPrice}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 text-center">No seats selected.</p>
      )}
    </div>
  );
};

export default BookingSummary;
