export interface LotteryDraw {
  id: string;
  code: string; // e.g., "W-782", "SS-410"
  name: string; // e.g., "Win-Win", "Sthree Sakthi", "Karunya Plus"
  dayName: string; // e.g., "Monday", "Tuesday"
  drawDate: string; // ISO or formatted date
  drawTime: string; // e.g. "03:00 PM"
  firstPrize: string; // e.g., "₹75,00,000"
  ticketPrice: number; // e.g. 50, 40
  status: 'upcoming' | 'live' | 'completed';
  nextDrawTimestamp: number;
  bannerImage?: string;
  category: 'daily' | 'bumper' | 'weekly';
  description?: string;
}

export interface PrizeBreakdown {
  rank: string; // 1st Prize, 2nd Prize, 3rd Prize, Consolation
  amount: string;
  winningNumber?: string | string[];
}

export interface LotteryResult {
  id: string;
  drawId: string;
  lotteryName: string;
  drawNumber: string;
  drawDate: string;
  prizes: PrizeBreakdown[];
  verifiedOfficial: boolean;
  publishedAt: string;
}

export interface LotteryTicket {
  id: string;
  drawId: string;
  lotteryName: string;
  ticketNumber: string; // e.g., "WA-123456"
  series: string;
  price: number;
  purchasedAt: string;
  status: 'active' | 'won' | 'lost' | 'pending';
  winningAmount?: number;
  drawDate: string;
}

export interface VipTicket {
  id: string;
  title: string;
  description: string;
  ticketPriceDiscount: number;
  expiryTimestamp: number;
  claimed: boolean;
  passType: 'GOLD' | 'PLATINUM' | 'DIAMOND';
  bonusCredit: number;
}

export interface WinnerTickerItem {
  id: string;
  winnerName: string;
  district: string;
  lotteryName: string;
  prizeAmount: string;
  ticketNumber: string;
  timeAgo: string;
}
