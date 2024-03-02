import { signOut } from "firebase/auth";
import { Auth } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  // const logOut = () => {
  //   signOut(Auth);
  //   navigate("/login");
  // };

  // console.log(user);
  const logOut = async () => {
    try {
      await signOut(Auth);
      // console.log("signout");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  // console.log(user);

  return (
    <main className="mt-10 pt-5 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 shadow-lg border-2">
      <div>
        <h2 className="m-3 text-3xl font-semibold">
          Welcome, {user && user.displayName}
        </h2>
        <div className="flex items-center gap-4 mt-10">
          <img className="rounded-full" src={user.photoURL} />
          <h3 className="text-2xl font-medium">{user && user.email}</h3>
        </div>
        <h3 className="text-lg mt-7 mb-7">
          <b>Your Unique Link:</b>{" "}
          <Link to={`http://localhost:3000/meeting/${user.uid}`}>
            localhost:3000/meeting/{user.uid}
          </Link>
        </h3>
        <div className="text-center mb-10">
          <Button
            variant="solid"
            sx={{ color: "black", border: "1px grey solid" }}
            onClick={logOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
