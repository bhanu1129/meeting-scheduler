import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import {
  doc,
  collection,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Input } from "@mui/joy";
import { Button } from "@mui/material";

const Meeting = ({ user }) => {
  const params = useParams();
  const { id } = params;
  const [userData, setUserData] = useState(null);
  const [meetingData, setMeetingData] = useState({
    title: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) setUserData(userSnap.data());
      else console.log("No such user");
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({ ...meetingData, [name]: value });
  };
  // console.log(meetingData);

  const scheduleMeeting = async () => {
    if (!meetingData.title || !meetingData.date || !meetingData.time) {
      alert("Please provide the meeting title, date, and time.");
      return;
    }

    const meetingRef = collection(db, "meetings");
    const meeting = {
      scheduledBy: user.displayName,
      // scheduledBy: meetingData.name,
      scheduledByEmail: user.email,
      // scheduledByEmail: meetingData.email,
      scheduledFor: userData.displayName,
      scheduledForEmail: userData.email,
      meetingTitle: meetingData.title,
      meetingDate: meetingData.date,
      meetingTime: meetingData.time,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(meetingRef, meeting);
      console.log("Meeting scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling meeting", error);
    }

    alert("Meeting scheduled successfully");
  };

  if (id === user.uid) {
    return (
      <div className="mt-10 flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl font-medium">
          Can't schedule a meeting with yourself
        </h1>
        <Link to="/">
          <Button
            variant="solid"
            sx={{ color: "black", border: "1px grey solid" }}
          >
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="mt-10 pt-5 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 shadow-lg border-2">
      <div>
        <div className="m-3 flex gap-2 items-center">
          <h2 className="text-3xl font-semibold">
            Schedule a meeting with {userData && userData.displayName}
          </h2>
          <img
            className="w-8 h-8 rounded-full"
            src={userData && userData.photoURL}
          />
        </div>
        <div>
          <form>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name:</label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  name="name"
                  value={user.displayName}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email:</label>
                <Input
                  id="email"
                  placeholder="Your Email"
                  type="email"
                  name="email"
                  value={user.email}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1 col-span-full">
                <label htmlFor="title">Meeting Title:</label>
                <Input
                  id="title"
                  placeholder="Meeting's Topic"
                  name="title"
                  value={meetingData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="date">Enter Date:</label>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  value={meetingData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="time">Enter Time:</label>
                <Input
                  id="time"
                  type="time"
                  name="time"
                  value={meetingData.time}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-center mt-10 pb-10">
              <Button
                variant="solid"
                sx={{ color: "black", border: "1px grey solid" }}
                onClick={scheduleMeeting}
              >
                Schedule
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Meeting;
