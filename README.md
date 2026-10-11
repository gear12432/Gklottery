# Kerala Lottery Live — User Application

Official mobile-first web application for Kerala State Lottery live results, daily lucky draws, check-in rewards, VIP passes, and wallet management.

## Key Features
- **Mobile-First Design**: Matching the reference UI with primary orange `#F36B16` styling, promotional hero carousel, winner marquee ticker, 4 quick action cards, and fixed bottom navigation.
- **Firebase Authentication**: Full sign-up, login, password reset, and user session restoration with Firestore user profile binding.
- **Firebase Cloud Database**: Secure attribute-based access control rules for user data, transactions, check-ins, tickets, and notifications.
- **Daily Check-In & Lucky Spin**: Earn bonus wallet credits directly saved to your profile with transactional audit records.
- **Official Lotteries Catalog**: Complete weekly schedule (Win-Win, Sthree Sakthi, Fifty-Fifty, Karunya Plus, Nirmal, Thiruvonam Bumper) with countdown timers and ticket purchasing.
- **Verified Draw Results**: Official published gazette results with winning number search and prize tier breakdown.
- **Wallet & Instant Deposit**: Deposit simulation with instant reference ID generation and wallet balance updates.
- **GitHub Pages Ready**: Configured with `HashRouter` and GitHub Actions workflow (`.github/workflows/deploy.yml`).

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Deploying to GitHub Pages
1. Push this repository to GitHub.
2. Navigate to **Settings -> Pages**.
3. Under **Source**, select **GitHub Actions**.
4. Push to `main` branch or trigger the workflow manually under **Actions**.
