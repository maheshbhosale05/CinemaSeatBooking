import { useMemo, useState } from "react";
import Title from "../components/Title";
import SeatsLayout from "../components/Seatslayout";
import SeatsTypeLegends from "../components/SeatsTypeLegends";
import Screen from "../components/Screen";
import { getTotalPrice, initializeSeatsLayout } from "../utils";
import BookingSummary from "../components/BookingSummary";
import BookingButton from "../components/BookingButton";

const CinemaSeatsBooking = ({
  layouts,
  typeOfSeat,
  handleSuccussfulBooking,
  bookedSeats,
  currency,
  movieName,
  cinemaName,
  subTitle,
}) => {
  const defaultSeatsLayout = useMemo(
    () => initializeSeatsLayout({ layouts, typeOfSeat, bookedSeats }),
    [layouts, typeOfSeat, bookedSeats]
  );

  const [seatsLayout, setSeatsLayout] = useState(defaultSeatsLayout);

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
              : seat.isSelected,
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
        { row: rowIndex, seat: seatIndex },
      ]);
    }
  };

  const handleOnBookClick = () => {
    setSeatsLayout((prevLayout) =>
      prevLayout.map((row) =>
        row.map((seat) => ({
          ...seat,
          isSelected: false,
          isBooked: selectedSeats.some(
            (s) => s.row === seat.row && s.seat === seat.seat
          ),
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
        <Title
          movieName={movieName}
          cinemaName={cinemaName}
          subTitle={subTitle}
        />

        {/* SCREEN */}
        <Screen />

        {/* SEATS LAYOUT   */}
        <SeatsLayout
          seatsLayout={seatsLayout}
          aislePositions={layouts.aislePositions}
          handleSeatClick={handleSeatClick}
        />

        {/* LEGEND */}
        <SeatsTypeLegends typeOfSeat={typeOfSeat} currency={currency} />

        {/* BOOKING SUMMARY */}
        <BookingSummary
          selectedSeats={selectedSeats}
          currency={currency}
          totalPrice={getTotalPrice({ selectedSeats, seatsLayout, typeOfSeat })}
        />

        {/* BOOKING BUTTON */}
        <BookingButton
          selectedSeats={selectedSeats}
          currency={currency}
          seatsLayout={seatsLayout}
          typeOfSeat={typeOfSeat}
          handleOnBookClick={handleOnBookClick}
        />
        
      </div>
    </div>
  );
};

export default CinemaSeatsBooking;
