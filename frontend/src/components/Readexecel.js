import React, { useEffect, useRef, useState } from "react";
import readXlsxFile from "read-excel-file";

export default function ReadExcel(props) {
  const fileInputRef = useRef(null);
  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      readXlsxFile(file).then((rows) => {
        console.log("Excel Data:", rows);
        const dataWithIds = rows.slice(1).map((row, index) => ({
          id: index, // Unique identifier for each row
          username: String(row[0]),
          name: String(row[1]),
          score: String(row[2]),
        }));
        props.setScores(dataWithIds); // Initialize state with the processed data
      });
    }
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        disabled={!props.edit}
        className="p-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        ref={fileInputRef}
        type="file"
        id="file-input"
        accept=".xlsx"
        onChange={handleFileChange}
        required
      />
      <input />
    </div>
  );
}
