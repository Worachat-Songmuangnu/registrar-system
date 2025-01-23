import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
export default function EditableTable(props) {
  const [data, setData] = useState([{ id: 6710110001, name: "RakChat YingSheep", score: 0 }]);

  const handleChange = (id, field, value) => {
    setData((prevData) => prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };
  const handleAddRow = (count = 1) => {
    const newRows = Array.from({ length: count }, (_, i) => {
      const newId = data.length > 0 ? data[data.length - 1].id + i + 1 : i + 1;
      return { id: newId, name: "FirstName LastName", score: 0 };
    });
    setData((prevData) => [...prevData, ...newRows]);
  };

  const handleDeleteRow = (id) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
  };

  return (
    <div className="">
      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 w-1/6">Student ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2 w-32">Score ({props.maxScore})</th>
            <th className="border border-gray-300 px-4 py-2 w-20 text-center">Result</th>
            <th className="border border-gray-300 px-4 py-2 w-12 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{row.id}</td>
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.score}
                  onChange={(e) => handleChange(row.id, "score", e.target.value)}
                  className="border border-gray-400 px-2 py-1 rounded w-full"
                />
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 text-center ${
                  row.score > props.maxScore / 2 ? "text-green-500" : "text-red-500"
                }`}
              >
                {row.score > props.maxScore / 2 ? "Pass" : "Fail"}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button onClick={() => handleDeleteRow(row.id)} className=" px-4 py-2 rounded">
                  <TrashIcon className="size-6 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-end gap-4">
        <button
          type="button"
          onClick={() => handleAddRow(1)}
          className=" mt-4 border-gray-800 border-[1px]  text-black px-4 py-2 rounded"
        >
          + Add 1 Row
        </button>
        <button
          type="button"
          onClick={() => handleAddRow(10)}
          className=" mt-4 border-gray-800 border-[1px]  text-black px-4 py-2 rounded"
        >
          + Add 10 Row
        </button>
      </div>
    </div>
  );
}
