import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { sendResetPassword } from '../services/authService';
import { ErrorMessage } from '../components/ErrorMessage';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid Gmail / email address.');
      return;
    }

    setLoading(true);
    try {
      await sendResetPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] flex flex-col justify-center p-4">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <Link
          to="/login"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <h2 className="text-lg font-black text-gray-900">Reset Password</h2>
        <p className="text-xs text-gray-500 mt-1 mb-4 leading-relaxed">
          Enter your registered Gmail or email address and we will send you a password reset link.
        </p>

        {error && <ErrorMessage message={error} />}

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center my-4 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#16834A] mx-auto" />
            <h3 className="text-sm font-extrabold text-emerald-900">Reset Link Sent!</h3>
            <p className="text-xs text-emerald-700 font-medium">
              We have sent a password reset link to <span className="font-bold">{email}</span>. Check your inbox and spam folder.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Reset Email</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
