import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import MeetingData from "../components/MeetingData";

const Home = ({ user }) => {
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!user) return;

      try {
        const meetingsRef = collection(db, "meetings");
        const q = query(
          meetingsRef,
          where("scheduledForEmail", "==", user.email),
          orderBy("meetingDate"),
          orderBy("meetingTime")
        );
        const querySnapshot = await getDocs(q);

        const meetingsData = [];
        querySnapshot.forEach((doc) => {
          meetingsData.push(doc.data());
        });

        setScheduledMeetings(meetingsData);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [user]);

  return (
    <div className="mt-5">
      <h1 className="text-3xl font-semibold text-center">Meetings</h1>
      <div>
        {scheduledMeetings.map((meeting, index) => (
          <MeetingData meeting={meeting} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
