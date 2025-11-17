import React from "react";

const sitsStructure = (props) => {
  const { sitsStructure, sitTypes } = props;
  return (
    <div className="flex flex-col gap-2 justify-between items-center overflow-x-auto mt-6">
      {[...Array(sitsStructure.row)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row gap-4 justify-center items-center"
        >
          <div className="text-base font-bold text-gray-800 w-2">
            {String.fromCharCode(65 + rowIndex)}
          </div>
          {Array.from({ length: sitsStructure.split }, (_, i) => 1 + i).map(
            (columnValue) => (
              <div
                key={columnValue}
                className="px-4 py-2 bg-amber-300/10 border border-amber-700 text-base font-black"
              >
                {columnValue}
              </div>
            )
          )}
          <div className="p-3" />
          {Array.from(
            { length: sitsStructure.column - sitsStructure.split },
            (_, i) => 1 + i + sitsStructure.split
          ).map((columnValue) => (
            <div
              key={columnValue}
              className="px-4 py-2 bg-amber-300/10 border border-amber-700 text-base font-black"
            >
              {columnValue}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default sitsStructure;
