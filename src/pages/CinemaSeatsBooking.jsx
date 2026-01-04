import { useMemo, useState } from "react";

const CinemaSeatsBooking = ({
  layouts,
  typeOfSeat,
  handleSuccussfulBooking,
  bookedSeats,
  currency,
  MovieName,
  CinemaName,
  subTitle
}) => {
  const getSeatColor = {
    regular: "bg-yellow-100 border-yellow-500 text-yellow-800",
    premium: "bg-blue-100 border-blue-500 text-blue-800",
    vip: "bg-purple-100 border-purple-500 text-purple-800",
    selected: "bg-green-300 border-green-500 text-green-800",
    booked: "bg-gray-100 border-gray-500 text-gray-800"
  };

  const initializeSeatsLayout = useMemo(() => {
    // layouts={{ rows: 8, seatsPerRow: 12, aislePositions: [5] }}
    const seats = [];
    for (let row = 0; row < layouts.rows; row++) {
      const seatRow = [];
      for (let seat = 0; seat < layouts.seatsPerRow; seat++) {
        seatRow.push({
          row,
          seat,
          type:
            Object.values(typeOfSeat).find((seatType) =>
              seatType.rows.includes(row)
            )?.type || "regular",
          isBooked: bookedSeats.some(
            (booked) => booked.row === row && booked.seat === seat
          ),
          isSelected: false
        });
      }
      seats.push(seatRow);
    }
    return seats;
  }, [layouts, typeOfSeat, bookedSeats]);

  const [seatsLayout, setSeatsLayout] = useState(initializeSeatsLayout);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat, rowIndex, seatIndex) => {
    if (
      bookedSeats.some(
        (booked) => booked.row === seat.row && booked.seat === seat.seat
      )
    ) {
      return;
    } // Handle seat selection logic here
    setSeatsLayout((prevLayout) =>
      prevLayout.map((row, rInx) =>
        row.map((seat, sInx) => ({
          ...seat,
          isSelected:
            rInx === rowIndex && sInx === seatIndex
              ? !seat.isSelected
              : seat.isSelected
        }))
      )
    );

    if (seat.isSelected) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter(
          (seat) => !(seat.row === rowIndex && seat.seat === seatIndex)
        )
      );
    } else {
      setSelectedSeats((prevSelectedSeats) => [
        ...prevSelectedSeats,
        { row: rowIndex, seat: seatIndex }
      ]);
    }
  };

  const getSeatRow = (seat, rowIndex, seatIndex) => (
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

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatType = seatsLayout[seat.row][seat.seat].type;
      return total + typeOfSeat[seatType].price;
    }, 0);
  };

  const handleOnBookClick = () => {
    setSeatsLayout((prevLayout) =>
      prevLayout.map((row) =>
        row.map((seat) => ({
          ...seat,
          isSelected: false,
          isBooked: selectedSeats.some(
            (s) => s.row === seat.row && s.seat === seat.seat
          )
        }))
      )
    );
    handleSuccussfulBooking(selectedSeats);
    setSelectedSeats([]);
  };

  return (
    <div className="w-full min-h-screen mx-auto p-4 bg-gray-50">
      <div className="p-4 sm:p-6 w-full mx-auto my-6 text-center bg-white rounded-lg shadow-lg">
        {/* TITLE */}
        <div className="flex flex-col justify-center mb-6">
          <h3 className="text-lg sm:text-3xl font-bold text-gray-800">
            {MovieName} - {CinemaName}
          </h3>
          <p className="text-gray-600 text-lg">{subTitle}</p>
        </div>

        {/* SCREEN */}
        <div className="mb-6">
          <div className="w-full h-6 mb-2 bg-gradient-to-r from-gray-300 via-gray-600 to-gray-300 rounded-full" />
          <p className="text-sm font-medium text-gray-600">SCREEN</p>
        </div>
        {/* SEATS LAYOUT   */}

        <div className="mb-6 overflow-x-scroll">
          {seatsLayout.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center mb-2"
            >
              <div className="text-right text-sm sm:text-lg font-medium text-gray-600 w-4 sm:w-8 mr-2">
                {String.fromCharCode(65 + rowIndex)}
              </div>
              {row
                .slice(0, layouts.aislePositions)
                .map((seat, seatIndex) =>
                  getSeatRow(seat, rowIndex, seatIndex)
                )}
              <div className="w-6 h-6 mx-4" /> {/* Aisle Space */}
              {row
                .slice(layouts.aislePositions)
                .map((seat, seatIndex) =>
                  getSeatRow(seat, rowIndex, seatIndex + layouts.aislePositions)
                )}
            </div>
          ))}
        </div>
        {/* LEGEND */}
        <div className="flex flex-row justify-center gap-4 p-2 m-6">
          {Object.values(typeOfSeat).map((seat) => (
            <div key={seat.type} className="flex items-center gap-2">
              <div
                className={`
                  w-6 h-6 rounded border-2 ${getSeatColor[seat.type]}
                `}
              />
              <span className="text-sm sm:text-base text-gray-700">
                {seat.type.charAt(0).toUpperCase() + seat.type.slice(1)} (
                {currency} {seat.price})
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
        {/* BOOKING SUMMARY */}
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
                Total Price: {currency}{" "}
                {selectedSeats.reduce((total, seat) => {
                  const seatType = seatsLayout[seat.row][seat.seat].type;
                  return total + typeOfSeat[seatType].price;
                }, 0)}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 text-center">No seats selected.</p>
          )}
        </div>

        {/* BOOKING BUTTON */}
        <div className="mb-6">
          <button
            disabled={selectedSeats.length === 0}
            className="bg-green-200 h-12 px-6 rounded-lg text-green-800 font-semibold hover:bg-green-300 disabled:bg-gray-300 disabled:text-gray-500 w-full transition-colors duration-300"
            onClick={() => handleOnBookClick()}
          >
            {selectedSeats.length > 0
              ? `Book Now (${currency} ${getTotalPrice()})`
              : "Select Seats to Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinemaSeatsBooking;
