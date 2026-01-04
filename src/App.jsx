import CinemaSeatsBooking from "./pages/CinemaSeatsBooking";

function App() {
  return (
    <CinemaSeatsBooking
      layouts={{ rows: 8, seatsPerRow: 12, aislePositions: 5 }}
      typeOfSeat={{
        regular: { type: "regular", price: 150, rows: [0, 1, 2] },
        premium: { type: "premium", price: 250, rows: [3, 4, 5] },
        vip: { type: "vip", price: 350, rows: [6, 7] },
      }}
      handleSuccussfulBooking={(bookingDetails) => {
        console.log("Booking Successful:", bookingDetails);
      }}
      bookedSeats={[
        { row: 2, seat: 3 },
        { row: 4, seat: 6 },
      ]}
      currency="INR"
      movieName="Avengers: Endgame"
      cinemaName="Grand Cinema Hall"
      subTitle="Experience the epic conclusion"
    />
  );
}

export default App;
