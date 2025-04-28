import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { FaSpinner, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const navigate = useNavigate();

  const getFriendlyError = (error) => {
    switch (error.code) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/invalid-email":
        return "Invalid email address.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Google login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      setError("Please enter your email address");
      return;
    }
    
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
      setError("");
    } catch (err) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0c2a] to-[#1a043b] px-4">
      <div className="bg-transparent w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">SIGN IN</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {showForgotPassword ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Reset Password</h3>
            <p className="text-gray-400 text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <input
              type="email"
              className="w-full p-3 bg-[#2c1a4a] border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <button
              onClick={handlePasswordReset}
              className="w-full p-3 rounded bg-gradient-to-r from-purple-700 to-blue-500 text-white font-semibold hover:brightness-110"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Send Reset Link"}
            </button>
            {resetSent && (
              <p className="text-green-500 text-sm text-center">
                Password reset email sent! Check your inbox.
              </p>
            )}
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetSent(false);
                setError("");
              }}
              className="text-blue-400 hover:underline text-sm"
            >
              Back to login
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Sign in with email address
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-400 text-sm hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full p-3 rounded bg-gradient-to-r from-purple-700 to-blue-500 text-white font-semibold hover:brightness-110"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Sign in"}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-2 text-gray-400">or continue with</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
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
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

