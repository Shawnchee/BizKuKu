import { useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  msmeFinancialKPIs,
  msmeBankAccounts
} from '@/lib/msme-data'
import * as Icons from 'lucide-react'

type Emotion = 'happy' | 'neutral' | 'sad'
type IconName = keyof typeof Icons

const parseValue = (value: string | number | undefined): number => {
  if (value === undefined) return 0
  if (typeof value === 'number') return value
  return parseFloat(value.replace(/[^\d.]/g, '')) || 0
}

const msmeHistoricalFinancials = {
    inflow: [
      { day: 'Mon', value: 980 },
      { day: 'Tue', value: 1050 },
      { day: 'Wed', value: 1100 },
      { day: 'Thu', value: 1020 },
      { day: 'Fri', value: 1250 },
      { day: 'Sat', value: 1400 },
      { day: 'Sun', value: 1125 },
    ],
    balance: [
      { day: 'Mon', value: 52000 },
      { day: 'Tue', value: 52500 },
      { day: 'Wed', value: 53100 },
      { day: 'Thu', value: 54000 },
      { day: 'Fri', value: 55250 },
      { day: 'Sat', value: 56751 },
      { day: 'Sun', value: 56751 },
    ],
    netflow: [
      { day: 'Mon', value: 150 },
      { day: 'Tue', value: 200 },
      { day: 'Wed', value: 250 },
      { day: 'Thu', value: 180 },
      { day: 'Fri', value: 400 },
      { day: 'Sat', value: 550 },
      { day: 'Sun', value: 280 },
    ]
};

export const useStoryData = () => {
  const { language } = useLanguage()

  const storyData = useMemo(() => {
    const todayInflow =
      parseValue(
        msmeFinancialKPIs.find(kpi => kpi.id === 'daily_inflow')?.value
      ) || 1125
    const monthlyOutflow =
      parseValue(
        msmeFinancialKPIs.find(kpi => kpi.id === 'monthly_outflow')?.value
      ) || 10000
    const totalBalance =
      msmeBankAccounts?.reduce((sum, account) => sum + (account.balance || 0), 0) ||
      56751
    const todayOutflow = monthlyOutflow / 30
    const todayNetFlow = todayInflow - todayOutflow

    const moneyJars = [
      {
        id: 'inflow',
        label: language === 'ms' ? 'Wang Masuk Hari Ini' : "Today's Inflow",
        amount: todayInflow,
        maxAmount: 2000,
        color: ['#6EE7B7', '#10B981'],
        icon: 'Coins' as IconName,
        emotion: (todayInflow > 1500 ? 'happy' : todayInflow > 800 ? 'neutral' : 'sad') as Emotion,
        historicalData: msmeHistoricalFinancials.inflow,
        metric: 'value',
        explanation: language === 'ms' 
          ? 'Ini ialah jumlah semua wang yang masuk ke dalam perniagaan anda setiap hari. Ia menunjukkan berapa banyak jualan yang anda buat.' 
          : 'This is the total amount of money coming into your business each day. It shows how much you are selling.',
        status: todayInflow > 1000 
          ? { text: language === 'ms' ? 'Baik!' : 'Good!', color: 'bg-green-100 text-green-800' }
          : { text: language === 'ms' ? 'Boleh diperbaiki' : 'Could be better', color: 'bg-yellow-100 text-yellow-800' }
      },
      {
        id: 'balance',
        label: language === 'ms' ? 'Baki Bank' : 'Bank Balance',
        amount: totalBalance,
        maxAmount: 100000,
        color: ['#60A5FA', '#2563EB'],
        icon: 'PiggyBank' as IconName,
        emotion: (totalBalance > 75000 ? 'happy' : totalBalance > 30000 ? 'neutral' : 'sad') as Emotion,
        historicalData: msmeHistoricalFinancials.balance,
        metric: 'value',
        explanation: language === 'ms'
          ? 'Ini ialah jumlah wang yang anda ada dalam semua akaun bank anda. Ia penting untuk kecemasan dan perbelanjaan besar.'
          : 'This is the total amount of money you have in all your bank accounts. It is important for emergencies and big expenses.',
        status: totalBalance > 50000
            ? { text: language === 'ms' ? 'Sangat Baik!' : 'Very Good!', color: 'bg-green-100 text-green-800' }
            : { text: language === 'ms' ? 'Cukup' : 'Sufficient', color: 'bg-blue-100 text-blue-800' }
      },
      {
        id: 'netflow',
        label: language === 'ms' ? 'Aliran Bersih Hari Ini' : "Today's Net Flow",
        amount: todayNetFlow,
        maxAmount: 1800,
        color: ['#FBBF24', '#F59E0B'],
        icon: 'Award' as IconName,
        emotion: (todayNetFlow > 1000 ? 'happy' : todayNetFlow > 300 ? 'neutral' : 'sad') as Emotion,
        historicalData: msmeHistoricalFinancials.netflow,
        metric: 'value',
        explanation: language === 'ms'
            ? 'Ini ialah perbezaan antara wang masuk dan wang keluar. Ia menunjukkan keuntungan harian anda.'
            : 'This is the difference between money in and money out. It shows your daily profit.',
        status: todayNetFlow > 200
            ? { text: language === 'ms' ? 'Cemerlang!' : 'Excellent!', color: 'bg-green-100 text-green-800' }
            : { text: language === 'ms' ? 'OK' : 'Okay', color: 'bg-yellow-100 text-yellow-800' }
      }
    ]

    const timelineEvents = [
      {
        id: 'morning',
        time: '7-9 AM',
        icon: 'Sun' as IconName,
        title: language === 'ms' ? 'Pagi Ceria' : 'Good Morning',
        description:
          language === 'ms'
            ? 'Warung dibuka! Transaksi pertama masuk.'
            : 'Warung is open! First transactions are coming in.',
        audioText:
          language === 'ms'
            ? 'Pagi ceria, warung dibuka!'
            : 'Good morning, the warung is open!'
      },
      {
        id: 'midday',
        time: '12-2 PM',
        icon: 'Users' as IconName,
        title: language === 'ms' ? 'Waktu Sibuk' : 'Peak Hours',
        description:
          language === 'ms'
            ? 'Pelanggan ramai, jualan meningkat!'
            : 'Lots of customers, sales are booming!',
        audioText:
          language === 'ms' ? 'Waktu sibuk!' : 'Peak hours!'
      },
      {
        id: 'evening',
        time: '6-8 PM',
        icon: 'Moon' as IconName,
        title: language === 'ms' ? 'Waktu Petang' : 'Evening Wind-down',
        description:
          language === 'ms'
            ? 'Jualan terakhir, bersedia untuk tutup.'
            : 'Last sales, preparing to close.',
        audioText:
          language === 'ms' ? 'Waktu petang.' : 'Evening time.'
      }
    ]

    return {
      todayInflow,
      moneyJars,
      timelineEvents
    }
  }, [language])

  return storyData
} 