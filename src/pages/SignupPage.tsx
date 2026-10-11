import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, UserPlus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { signUpUser } from '../services/authService';
import { ErrorMessage } from '../components/ErrorMessage';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid Gmail / email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check again.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      await signUpUser(email, password, fullName.trim());
      navigate('/', { replace: true });
    } catch (err: any) {
      let msg = 'Failed to create account. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'This email address is already registered. Please log in.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Invalid email address format.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password is too weak. Choose a stronger password.';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] flex flex-col justify-center p-4 py-8">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F36B16] via-[#E85D08] to-[#C95C2D] p-6 text-white text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-3 shadow-md">
            <Sparkles className="w-8 h-8 text-[#F6C445]" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Create New Account</h2>
          <p className="text-xs text-orange-100 mt-1">
            Get ₹50 Free Bonus Credit on your first signup
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <ErrorMessage message={error} />}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#F36B16] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Gmail / Email */}
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

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#F36B16] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start space-x-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#F36B16] rounded border-gray-300 focus:ring-orange-500"
            />
            <label htmlFor="terms" className="text-[11px] text-gray-600 font-medium leading-tight">
              I accept the{' '}
              <Link to="/terms" className="text-[#F36B16] font-bold hover:underline">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[#F36B16] font-bold hover:underline">
                Privacy Policy
              </Link>.
            </label>
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
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </>
            )}
          </button>

          {/* Login Redirect */}
          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#F36B16] font-extrabold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </form>

        <div className="bg-gray-50 p-3 text-center border-t border-gray-100 flex items-center justify-center space-x-1 text-[10px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16834A]" />
          <span>Protected by Firebase Secure Cloud Auth</span>
        </div>
      </div>
    </div>
  );
};
