import { Auth, Provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = ({ user }) => {
  const navigate = useNavigate();

  const signIn = async () => {
    signInWithPopup(Auth, Provider)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-3 text-center">
      <h1 className="text-2xl font-semibold mb-3">Login</h1>
      <button
        onClick={signIn}
        className="p-3 bg-cyan-500 text-white rounded-xl"
      >
        Sign in with Google!
      </button>
    </div>
  );
};

export default Login;
