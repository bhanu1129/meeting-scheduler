import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  // console.log(user);
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Meeting Scheduler</h1>
        <div className="flex items-center">
          {user && (
            <Link className="text-white text-lg mr-8" to="/">
              Home
            </Link>
          )}
          {user ? (
            <Link to="/profile">
              {" "}
              <img src={user.photoURL} className="w-8 h-8 rounded-full" />{" "}
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
