import React from "react";

const MeetingData = ({ meeting }) => {
  return (
    <div className="mt-5 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 shadow-lg border-2">
      <div className="mt-5 mb-5 flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{meeting.meetingTitle}</h2>
        <p>
          <b>Scheduled By: </b>
          {meeting.scheduledBy}
        </p>
        <p>
          <b>Email: </b>
          {meeting.scheduledByEmail}
        </p>
        <p>
          <b>Date: </b>
          {meeting.meetingDate}
        </p>
        <p>
          <b>Time: </b>
          {meeting.meetingTime}
        </p>
      </div>
    </div>
  );
};

export default MeetingData;
