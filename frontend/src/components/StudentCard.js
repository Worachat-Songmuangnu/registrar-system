// components/StudentCard.js
import React from "react";
import dayjs from "dayjs";

const StudentCard = (props) => {
  return (
    <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        ({props.SubjectId}) {props.Subject}
      </h5>

      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-row gap-8 items-center">
          <p className="mb-3 font-normal text-gray-700 text-3xl">
            Score : {props.Score}/{props.MaxScore}
          </p>
          <p className="mb-3 font-normal text-gray-700 text-xl">
            Status : {props.Status}
          </p>
        </div>
        <div className="flex flex-row gap-24">
          <p className="mb-3 font-normal text-gray-700 ">
            Date : {dayjs(props.Date).format("MMM D, YYYY h:mm A")}
          </p>
          <p className="mb-3 font-normal text-gray-700 ">
            Auditor : {props.Auditor}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
