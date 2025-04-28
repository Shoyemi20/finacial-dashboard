import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FaSpinner, FaGoogle } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getFriendlyError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Email already in use.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Google signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0c2a] to-[#1a043b] px-4">
      <div className="bg-transparent w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">SIGN UP</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Sign up with email address
            </label>
            <input
              type="email"
              className="w-full p-3 bg-[#2c1a4a] border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-[#2c1a4a] border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded bg-gradient-to-r from-purple-700 to-blue-500 text-white font-semibold hover:brightness-110"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Sign up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-2 text-gray-400">or continue with</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 p-3 bg-[#2c1a4a] text-white rounded hover:brightness-110"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : (
            <>
              <FaGoogle className="text-red-500" />
              Google
            </>
          )}
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

