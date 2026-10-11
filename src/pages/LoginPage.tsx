import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { loginUser } from '../services/authService';
import { ErrorMessage } from '../components/ErrorMessage';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid Gmail / email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, password);
      navigate('/', { replace: true });
    } catch (err: any) {
      let msg = 'Failed to sign in. Please check your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email address or password.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Access temporarily disabled due to too many failed attempts.';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] flex flex-col justify-center p-4">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-[#F36B16] via-[#E85D08] to-[#C95C2D] p-6 text-white text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-3 shadow-md">
            <Sparkles className="w-8 h-8 text-[#F6C445]" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="text-xs text-orange-100 mt-1">
            Log in to access your wallet, lottery tickets & rewards
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <ErrorMessage message={error} />}

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Gmail / Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#F36B16] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700">Password</label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-[#F36B16] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#F36B16] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Create Account Link */}
          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#F36B16] font-extrabold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </form>

        <div className="bg-gray-50 p-3 text-center border-t border-gray-100 flex items-center justify-center space-x-1 text-[10px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
          <span>Firebase Encrypted Authentication</span>
        </div>
      </div>
    </div>
  );
};
