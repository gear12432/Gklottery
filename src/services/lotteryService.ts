import { collection, doc, setDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { LotteryDraw, LotteryResult, LotteryTicket, WinnerTickerItem, VipTicket } from '../types/lottery';
import { createTransaction } from './transactionService';
import { handleFirestoreError, OperationType } from './firestoreError';

// Official Scheduled Kerala Lottery Draws
export const KERALA_LOTTERIES: LotteryDraw[] = [
  {
    id: 'draw-win-win',
    code: 'W-782',
    name: 'Win-Win',
    dayName: 'Monday',
    drawDate: 'Today, 03:00 PM',
    drawTime: '03:00 PM',
    firstPrize: '₹75,00,000',
    ticketPrice: 40,
    status: 'upcoming',
    nextDrawTimestamp: Date.now() + 1000 * 60 * 60 * 4 + 1000 * 60 * 25, // 4 hours 25 mins
    category: 'daily',
    description: 'Weekly Monday draw with ₹75 Lakhs 1st Prize and 8 secondary prize tiers.',
  },
  {
    id: 'draw-sthree-sakthi',
    code: 'SS-438',
    name: 'Sthree Sakthi',
    dayName: 'Tuesday',
    drawDate: 'Tomorrow, 03:00 PM',
    drawTime: '03:00 PM',
    firstPrize: '₹75,00,000',
    ticketPrice: 40,
    status: 'upcoming',
    nextDrawTimestamp: Date.now() + 1000 * 60 * 60 * 28,
    category: 'daily',
    description: 'Empowering weekly Tuesday draw with bumper sub-prizes and consolidated bonuses.',
  },
  {
    id: 'draw-fifty-fifty',
    code: 'FF-112',
    name: 'Fifty-Fifty',
    dayName: 'Wednesday',
    drawDate: 'Oct 14, 03:00 PM',
    drawTime: '03:00 PM',
    firstPrize: '₹1,00,00,000',
    ticketPrice: 50,
    status: 'upcoming',
    nextDrawTimestamp: Date.now() + 1000 * 60 * 60 * 52,
    category: 'daily',
    description: 'High-stake Wednesday draw featuring ₹1 Crore top jackpot.',
  },
  {
    id: 'draw-karunya-plus',
    code: 'KN-542',
    name: 'Karunya Plus',
    dayName: 'Thursday',
    drawDate: 'Oct 15, 03:00 PM',
    drawTime: '03:00 PM',
    firstPrize: '₹80,00,000',
    ticketPrice: 50,
    status: 'upcoming',
    nextDrawTimestamp: Date.now() + 1000 * 60 * 60 * 76,
    category: 'daily',
    description: 'Thursday premium draw with ₹80 Lakh first prize.',
  },
  {
    id: 'draw-nirmal',
    code: 'NR-398',
    name: 'Nirmal',
    dayName: 'Friday',
    drawDate: 'Oct 16, 03:00 PM',
    drawTime: '03:00 PM',
    firstPrize: '₹70,00,000',
    ticketPrice: 40,
    status: 'upcoming',
    nextDrawTimestamp: Date.now() + 1000 * 60 * 60 * 100,
    category: 'daily',
    description: 'Friday draw with ₹70 Lakhs 1st prize.',
  },
  {
    id: 'draw-thiruvonam-bumper',
    code: 'BR-98',
    name: 'Thiruvonam Bumper 2026',
    dayName: 'Special Bumper',
    drawDate: 'Oct 25, 02:00 PM',
    drawTime: '02:00 PM',
    firstPrize: '₹25,00,00,000',
    ticketPrice: 500,
    status: 'upcoming',
    nextDrawTimestamp: Date.now() + 1000 * 60 * 60 * 300,
    category: 'bumper',
    description: 'Mega Bumper Draw! ₹25 Crore Mega Jackpot with 20 sub-jackpots of ₹1 Crore each.',
  },
];

// Verified Kerala Lottery Results
export const RECENT_LOTTERY_RESULTS: LotteryResult[] = [
  {
    id: 'res-w781',
    drawId: 'draw-win-win',
    lotteryName: 'Win-Win (W-781)',
    drawNumber: 'W-781',
    drawDate: 'Yesterday, 03:00 PM',
    verifiedOfficial: true,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    prizes: [
      { rank: '1st Prize (₹75,00,000)', amount: '₹75,00,000', winningNumber: 'WA 849201 (Thrissur)' },
      { rank: 'Consolation Prize (₹8,000)', amount: '₹8,000', winningNumber: ['WB 849201', 'WC 849201', 'WD 849201', 'WE 849201'] },
      { rank: '2nd Prize (₹5,000,000)', amount: '₹50,00,000', winningNumber: 'WF 392018 (Kollam)' },
      { rank: '3rd Prize (₹12,000)', amount: '₹12,000', winningNumber: ['4920', '8192', '3019', '7721'] },
      { rank: '4th Prize (₹5,000)', amount: '₹5,000', winningNumber: ['1029', '4491', '8201', '3910'] },
    ],
  },
  {
    id: 'res-ss437',
    drawId: 'draw-sthree-sakthi',
    lotteryName: 'Sthree Sakthi (SS-437)',
    drawNumber: 'SS-437',
    drawDate: 'Oct 08, 2026',
    verifiedOfficial: true,
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    prizes: [
      { rank: '1st Prize (₹75,00,000)', amount: '₹75,00,000', winningNumber: 'SA 391048 (Eranakulam)' },
      { rank: '2nd Prize (₹10,00,000)', amount: '₹10,00,000', winningNumber: 'SB 920183 (Palakkad)' },
      { rank: '3rd Prize (₹5,000)', amount: '₹5,000', winningNumber: ['0192', '8392', '2019', '7482'] },
    ],
  },
  {
    id: 'res-ff111',
    drawId: 'draw-fifty-fifty',
    lotteryName: 'Fifty-Fifty (FF-111)',
    drawNumber: 'FF-111',
    drawDate: 'Oct 07, 2026',
    verifiedOfficial: true,
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    prizes: [
      { rank: '1st Prize (₹1,00,00,000)', amount: '₹1,00,00,000', winningNumber: 'FA 108392 (Kottayam)' },
      { rank: '2nd Prize (₹10,00,000)', amount: '₹10,00,000', winningNumber: 'FB 849201 (Alappuzha)' },
    ],
  },
];

// Live Winner Ticker Data
export const WINNER_TICKER_ITEMS: WinnerTickerItem[] = [
  { id: 'w1', winnerName: 'Ramesh K.', district: 'Thrissur', lotteryName: 'Win-Win W-781', prizeAmount: '₹75,00,000', ticketNumber: 'WA 849201', timeAgo: '2h ago' },
  { id: 'w2', winnerName: 'Anoop Kumar', district: 'Kollam', lotteryName: 'Fifty-Fifty FF-111', prizeAmount: '₹1,00,00,000', ticketNumber: 'FA 108392', timeAgo: '5h ago' },
  { id: 'w3', winnerName: 'Sujith V.', district: 'Palakkad', lotteryName: 'Sthree Sakthi SS-437', prizeAmount: '₹10,00,000', ticketNumber: 'SB 920183', timeAgo: '1d ago' },
  { id: 'w4', winnerName: 'Biju Nair', district: 'Kottayam', lotteryName: 'Nirmal NR-397', prizeAmount: '₹70,00,000', ticketNumber: 'NA 482019', timeAgo: '2d ago' },
  { id: 'w5', winnerName: 'Deepak M.', district: 'Kozhikode', lotteryName: 'Karunya KN-541', prizeAmount: '₹80,00,000', ticketNumber: 'KA 910283', timeAgo: '3d ago' },
];

export const DEMO_VIP_TICKETS: VipTicket[] = [
  {
    id: 'vip-pass-gold',
    title: 'VIP Gold Draw Pass',
    description: 'Get 50% extra cashback + 1 Free Lucky Wheel Spin on every purchase',
    ticketPriceDiscount: 20,
    expiryTimestamp: Date.now() + 1000 * 60 * 60 * 72, // 3 days
    claimed: false,
    passType: 'GOLD',
    bonusCredit: 100,
  },
  {
    id: 'vip-pass-platinum',
    title: 'Platinum Thiruvonam Bumper Pass',
    description: 'Guaranteed 2 Bumper Ticket Entry Discount + ₹250 Direct Wallet Bonus',
    ticketPriceDiscount: 50,
    expiryTimestamp: Date.now() + 1000 * 60 * 60 * 120, // 5 days
    claimed: false,
    passType: 'PLATINUM',
    bonusCredit: 250,
  },
];

export async function buyLotteryTicket(userId: string, draw: LotteryDraw, quantity: number = 1): Promise<LotteryTicket[]> {
  const totalPrice = draw.ticketPrice * quantity;
  const path = `tickets/${userId}/history`;

  // 1. Create transaction
  await createTransaction(userId, 'LOTTERY_PURCHASE', totalPrice, 'WALLET_BALANCE', `Purchased ${quantity}x ${draw.name} Ticket`);

  const createdTickets: LotteryTicket[] = [];

  for (let i = 0; i < quantity; i++) {
    const ticketId = 'tkt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const seriesList = ['WA', 'WB', 'WC', 'WD', 'WE', 'SA', 'SB', 'FA', 'KA', 'NR'];
    const randomSeries = seriesList[Math.floor(Math.random() * seriesList.length)];
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const ticketNum = `${randomSeries} ${randomNum}`;

    const ticket: LotteryTicket = {
      id: ticketId,
      drawId: draw.id,
      lotteryName: draw.name,
      ticketNumber: ticketNum,
      series: randomSeries,
      price: draw.ticketPrice,
      purchasedAt: new Date().toISOString(),
      status: 'active',
      drawDate: draw.drawDate,
    };

    try {
      const ticketRef = doc(db, 'tickets', userId, 'history', ticketId);
      await setDoc(ticketRef, ticket);
      createdTickets.push(ticket);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }

  return createdTickets;
}

export async function getUserTickets(userId: string): Promise<LotteryTicket[]> {
  const path = `tickets/${userId}/history`;
  try {
    const colRef = collection(db, 'tickets', userId, 'history');
    const q = query(colRef, orderBy('purchasedAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as LotteryTicket);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
