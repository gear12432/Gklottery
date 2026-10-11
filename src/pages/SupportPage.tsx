import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Headset, Send, CheckCircle2, HelpCircle, Phone, Mail } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';

const FAQS = [
  {
    q: 'How do I claim my lottery draw winnings?',
    a: 'Winnings are automatically credited directly to your registered wallet balance immediately after official Directorate result verification.',
  },
  {
    q: 'When are daily Kerala lottery results published?',
    a: 'Official Kerala State Lottery draw results are published every day live at 03:00 PM IST.',
  },
  {
    q: 'What is the deposit limit and processing time?',
    a: 'Deposits via BHIM UPI, GPay, PhonePe, and Paytm are processed instantly with zero transaction fee.',
  },
];

export const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Deposit Issue');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setError('Please fill in both subject and message details.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ticketId = 'sup_' + Date.now();
      const uid = user?.uid || 'guest';
      const ref = doc(db, 'supportTickets', uid, 'history', ticketId);
      await setDoc(ref, {
        subject: subject.trim(),
        category,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        status: 'open',
        userEmail: user?.email || 'guest@keralalottery.com',
      });
      setSubmitted(true);
    } catch (err: any) {
      setError('Failed to submit support request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F3] pb-12 select-none">
      <div className="bg-gradient-to-r from-[#F36B16] to-[#C95C2D] p-4 text-white">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-base font-extrabold tracking-tight">24/7 Customer Support</h1>
          <div className="w-8" />
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Support Banner */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F36B16] flex items-center justify-center flex-shrink-0">
            <Headset className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-black text-gray-900">How can we help you?</h2>
            <p className="text-xs text-gray-500 font-medium">
              Submit a support query or browse common questions below.
            </p>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        {submitted ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#16834A] mx-auto" />
            <h3 className="text-base font-black text-gray-900">Support Ticket Submitted!</h3>
            <p className="text-xs text-gray-600">
              Our support team will review your query and reply to your registered email address shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="py-2.5 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-black text-gray-900">Submit Support Inquiry</h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 outline-none"
              >
                <option value="Deposit Issue">Deposit Issue</option>
                <option value="Lottery Ticket Query">Lottery Ticket Query</option>
                <option value="Winnings & Withdrawal">Winnings & Withdrawal</option>
                <option value="Account & Login">Account & Login</option>
                <option value="General Feedback">General Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief subject summary"
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Message / Details</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Describe your issue or request in detail..."
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#F36B16] hover:bg-[#C95C2D] text-white text-xs font-black rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Ticket</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-3">
          <h3 className="text-sm font-black text-gray-900 flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-[#F36B16]" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="space-y-2.5 divide-y divide-gray-100">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="pt-2">
                <h4 className="text-xs font-bold text-gray-900">{faq.q}</h4>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
