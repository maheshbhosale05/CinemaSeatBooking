export const initializeSeatsLayout = ({ layouts, typeOfSeat, bookedSeats }) => {
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
        isSelected: false,
      });
    }
    seats.push(seatRow);
  }
  return seats;
};

export const getTotalPrice = ({ selectedSeats, seatsLayout, typeOfSeat }) => {
  return selectedSeats.reduce((total, seat) => {
    const seatType = seatsLayout[seat.row][seat.seat].type;
    return total + typeOfSeat[seatType].price;
  }, 0);
};
