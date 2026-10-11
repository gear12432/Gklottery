import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { SplashScreen } from './pages/SplashScreen';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { HomePage } from './pages/HomePage';
import { CheckInPage } from './pages/CheckInPage';
import { LuckySpinPage } from './pages/LuckySpinPage';
import { ResultsPage } from './pages/ResultsPage';
import { DepositPage } from './pages/DepositPage';
import { WalletPage } from './pages/WalletPage';
import { VipTicketsPage } from './pages/VipTicketsPage';
import { LotteryListPage } from './pages/LotteryListPage';
import { LotteryDetailsPage } from './pages/LotteryDetailsPage';
import { GameDetailsPage } from './pages/GameDetailsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { SupportPage } from './pages/SupportPage';
import { ResponsiblePlayPage } from './pages/ResponsiblePlayPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Core Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/lotteries" element={<LotteryListPage />} />
          <Route path="/lottery/:drawId" element={<LotteryDetailsPage />} />
          <Route path="/game/:gameId" element={<GameDetailsPage />} />
          <Route path="/vip-tickets" element={<VipTicketsPage />} />

          {/* Protected User Routes */}
          <Route
            path="/check-in"
            element={
              <ProtectedRoute>
                <CheckInPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lucky-spin"
            element={
              <ProtectedRoute>
                <LuckySpinPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                <DepositPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <TransactionHistoryPage />
              </ProtectedRoute>
            }
          />

          {/* Static Info Routes */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/responsible-play" element={<ResponsiblePlayPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
