import React from "react";
import CinemaHallTitle from "../component/CinemaHallTitle";
import { Screen } from "../component/Screen";
import SitsStructure from "../component/SitsStructure";

function CinemaTheaterStructure() {
  return (
    <div className="flex flex-col gap-6 bg-white rounded-2xl p-2 sm:p-4 shadow-xl">
      <CinemaHallTitle
        cinemaName="Gangs of Wasepur"
        cinemaHallName="Apali Baramati"
        cinemaHallAddress="Near Pune"
      />
      <Screen />
      <SitsStructure
        sitsStructure={{ row: 10, column: 9, split: 5 }}
        sitTypes={[
          {
            type: "BASIC",
            price: 150,
            row: [1, 2, 3, 4, 5],
          },
          {
            type: "ADVANCE",
            price: 200,
            row: [6, 7, 8],
          },
          {
            type: "PREMIUM",
            price: 300,
            row: [9, 10],
          },
        ]}
      />
    </div>
  );
}

export default CinemaTheaterStructure;
