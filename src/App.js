import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Activity,
  Droplet,
  Utensils,
  Pill,
  TrendingDown,
  Calendar,
  User,
  CheckCircle,
  ChevronRight,
  Plus,
  Zap,
  Flame,
} from "lucide-react";

// --- DATA & CONSTANTS ---

const WEEK_PLAN = {
  6: {
    // Saturday (Day 1)
    title: "شنبه - شروع قدرتمند",
    macros: { protein: 192, carbs: 180, fat: 58, calories: 2100 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۱)",
        desc: "۶ سفیده + ۲ تست + ۶۰گ پنیر + گردو",
        time: "08:00",
        p: 35,
        c: 30,
        f: 12,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ کاسه عدسی + ۱ سیب",
        time: "10:30",
        p: 12,
        c: 25,
        f: 1,
      },
      {
        id: "l",
        name: "ناهار (منو ۱)",
        desc: "۳/۴ برنج قهوه‌ای + ۲۰۰گ مرغ + سالاد",
        time: "13:30",
        p: 60,
        c: 60,
        f: 10,
      },
      {
        id: "s2",
        name: "عصرانه",
        desc: "آجیل خام + ۱ سیب",
        time: "17:00",
        p: 5,
        c: 20,
        f: 15,
      },
      {
        id: "d",
        name: "شام (منو ۲)",
        desc: "۱۷۰گ استیک + سبزی + ۱ تست",
        time: "20:30",
        p: 50,
        c: 15,
        f: 15,
      },
      {
        id: "bed",
        name: "قبل خواب",
        desc: "۱ لیوان شیر کم‌چرب",
        time: "23:00",
        p: 8,
        c: 12,
        f: 2,
      },
    ],
    supplements: [
      { id: "sup1", name: "B-Complex", time: "صبح (با صبحانه)", taken: false },
      {
        id: "sup2",
        name: "منیزیم مالات",
        time: "صبح (با صبحانه)",
        taken: false,
      },
      { id: "sup3", name: "امگا ۳ (۲ عدد)", time: "بعد ناهار", taken: false },
      { id: "sup4", name: "D3 + K2", time: "بعد ناهار", taken: false },
      { id: "sup5", name: "کروم", time: "بعد ناهار", taken: false },
      {
        id: "sup6",
        name: "زینک گلوکونات",
        time: "عصر (ساعت ۱۸)",
        taken: false,
      },
      {
        id: "sup7",
        name: "منیزیم بیس‌گلایسینات",
        time: "۱ ساعت قبل خواب",
        taken: false,
      },
    ],
  },
  0: {
    // Sunday (Day 2)
    title: "یکشنبه - تنوع دریایی",
    macros: { protein: 205, carbs: 210, fat: 52, calories: 2200 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۲)",
        desc: "اوتمیل (جو+شیر+موز+عسل+کره بادام+گردو)",
        time: "08:00",
        p: 20,
        c: 60,
        f: 15,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ اسکوپ وی + آب",
        time: "10:30",
        p: 25,
        c: 2,
        f: 1,
      },
      {
        id: "l",
        name: "ناهار (منو ۵)",
        desc: "۳/۴ برنج + ۲۲۰گ ماهی کبابی",
        time: "13:30",
        p: 50,
        c: 50,
        f: 12,
      },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "کافئین ۲۰۰",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      {
        id: "post",
        name: "بعد تمرین",
        desc: "۱ سیب‌زمینی + ۲ فیله مرغ (یا وی)",
        time: "18:00",
        p: 30,
        c: 35,
        f: 2,
      },
      {
        id: "d",
        name: "شام (منو ۳)",
        desc: "بورانی اسفناج + ۳ فیله مرغ + ماست + تست",
        time: "20:30",
        p: 45,
        c: 25,
        f: 8,
      },
      {
        id: "bed",
        name: "قبل خواب",
        desc: "۱ لیوان شیر",
        time: "23:00",
        p: 8,
        c: 12,
        f: 2,
      },
    ],
    supplements: [
      { id: "sup1", name: "B-Complex", time: "صبح", taken: false },
      { id: "sup2", name: "منیزیم مالات", time: "صبح", taken: false },
      { id: "sup3", name: "امگا ۳ (۲ عدد)", time: "بعد ناهار", taken: false },
      { id: "sup4", name: "D3 + K2", time: "بعد ناهار", taken: false },
      { id: "sup5", name: "کروم", time: "بعد ناهار", taken: false },
      { id: "sup6", name: "زینک گلوکونات", time: "عصر", taken: false },
      { id: "sup7", name: "منیزیم بیس‌گلایسینات", time: "شب", taken: false },
    ],
  },
  1: {
    // Monday (Day 3)
    title: "دوشنبه - ریکاوری عضلانی",
    macros: { protein: 198, carbs: 185, fat: 55, calories: 2150 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۱)",
        desc: "۶ سفیده + ۲ تست + ۶۰گ پنیر + گردو",
        time: "08:00",
        p: 35,
        c: 30,
        f: 12,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ کاسه عدسی + ۱ سیب",
        time: "10:30",
        p: 12,
        c: 25,
        f: 1,
      },
      {
        id: "l",
        name: "ناهار (منو ۳)",
        desc: "۳/۴ برنج + ۲۰۰گ جوجه کباب + سالاد",
        time: "13:30",
        p: 55,
        c: 50,
        f: 12,
      },
      {
        id: "s2",
        name: "عصرانه",
        desc: "۱ اسکوپ وی + شیر + آجیل",
        time: "17:00",
        p: 35,
        c: 15,
        f: 10,
      },
      {
        id: "d",
        name: "شام (منو ۱)",
        desc: "خوراک مرغ (۱۸۰گ) + سبزیجات + ۱ تست",
        time: "20:30",
        p: 45,
        c: 25,
        f: 8,
      },
      {
        id: "bed",
        name: "قبل خواب",
        desc: "۱ لیوان شیر",
        time: "23:00",
        p: 8,
        c: 12,
        f: 2,
      },
    ],
    supplements: [
      { id: "sup1", name: "B-Complex", time: "صبح", taken: false },
      { id: "sup2", name: "منیزیم مالات", time: "صبح", taken: false },
      { id: "sup3", name: "امگا ۳ (۲ عدد)", time: "بعد ناهار", taken: false },
      { id: "sup4", name: "D3 + K2", time: "بعد ناهار", taken: false },
      { id: "sup5", name: "کروم", time: "بعد ناهار", taken: false },
      { id: "sup6", name: "زینک گلوکونات", time: "عصر", taken: false },
      { id: "sup7", name: "منیزیم بیس‌گلایسینات", time: "شب", taken: false },
    ],
  },
  2: {
    // Tuesday (Day 4)
    title: "سه‌شنبه - عدس‌پلو",
    macros: { protein: 190, carbs: 225, fat: 62, calories: 2250 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۲)",
        desc: "اوتمیل کامل",
        time: "08:00",
        p: 20,
        c: 60,
        f: 15,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ سیب + آجیل خام",
        time: "10:30",
        p: 5,
        c: 20,
        f: 15,
      },
      {
        id: "l",
        name: "ناهار (منو ۴)",
        desc: "۳/۴ عدس‌پلو + ۱۰۰گ گوشت چرخ‌کرده",
        time: "13:30",
        p: 40,
        c: 70,
        f: 15,
      },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "کافئین ۲۰۰",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      {
        id: "post",
        name: "بعد تمرین",
        desc: "۱ سیب‌زمینی + ۲ فیله مرغ (یا وی)",
        time: "18:00",
        p: 30,
        c: 35,
        f: 2,
      },
      {
        id: "d",
        name: "شام (منو ۴)",
        desc: "۲۰۰گ ماهی کبابی + سیب‌زمینی کوچک",
        time: "20:30",
        p: 45,
        c: 25,
        f: 10,
      },
      {
        id: "bed",
        name: "قبل خواب",
        desc: "۱ لیوان شیر",
        time: "23:00",
        p: 8,
        c: 12,
        f: 2,
      },
    ],
    supplements: [
      { id: "sup1", name: "B-Complex", time: "صبح", taken: false },
      { id: "sup2", name: "منیزیم مالات", time: "صبح", taken: false },
      { id: "sup3", name: "امگا ۳ (۲ عدد)", time: "بعد ناهار", taken: false },
      { id: "sup4", name: "D3 + K2", time: "بعد ناهار", taken: false },
      { id: "sup5", name: "کروم", time: "بعد ناهار", taken: false },
      { id: "sup6", name: "زینک گلوکونات", time: "عصر", taken: false },
      { id: "sup7", name: "منیزیم بیس‌گلایسینات", time: "شب", taken: false },
    ],
  },
  3: {
    // Wednesday (Day 5)
    title: "چهارشنبه - ماکارونی دی",
    macros: { protein: 185, carbs: 240, fat: 50, calories: 2300 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۱)",
        desc: "۶ سفیده + ۲ تست + ۶۰گ پنیر + گردو",
        time: "08:00",
        p: 35,
        c: 30,
        f: 12,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ اسکوپ وی + شیر",
        time: "10:30",
        p: 30,
        c: 12,
        f: 2,
      },
      {
        id: "l",
        name: "ناهار (منو ۲)",
        desc: "۱ لیوان ماکارونی + ۵۰گ سویا + سالاد",
        time: "13:30",
        p: 35,
        c: 80,
        f: 10,
      },
      {
        id: "s2",
        name: "عصرانه",
        desc: "آجیل خام + سالاد فصل با آووکادو",
        time: "17:00",
        p: 5,
        c: 15,
        f: 18,
      },
      {
        id: "d",
        name: "شام (منو ۱)",
        desc: "خوراک مرغ (۱۸۰گ) + سبزیجات + ۱ تست",
        time: "20:30",
        p: 45,
        c: 25,
        f: 8,
      },
      {
        id: "bed",
        name: "قبل خواب",
        desc: "۱ لیوان شیر",
        time: "23:00",
        p: 8,
        c: 12,
        f: 2,
      },
    ],
    supplements: [
      { id: "sup1", name: "B-Complex", time: "صبح", taken: false },
      { id: "sup2", name: "منیزیم مالات", time: "صبح", taken: false },
      { id: "sup3", name: "امگا ۳ (۲ عدد)", time: "بعد ناهار", taken: false },
      { id: "sup4", name: "D3 + K2", time: "بعد ناهار", taken: false },
      { id: "sup5", name: "کروم", time: "بعد ناهار", taken: false },
      { id: "sup6", name: "زینک گلوکونات", time: "عصر", taken: false },
      { id: "sup7", name: "منیزیم بیس‌گلایسینات", time: "شب", taken: false },
    ],
  },
  4: {
    // Thursday (Day 6)
    title: "پنجشنبه - خورشت رژیمی",
    macros: { protein: 188, carbs: 205, fat: 60, calories: 2180 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۲)",
        desc: "اوتمیل کامل",
        time: "08:00",
        p: 20,
        c: 60,
        f: 15,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ کاسه عدسی + ۱ سیب",
        time: "10:30",
        p: 12,
        c: 25,
        f: 1,
      },
      {
        id: "l",
        name: "ناهار (منو ۶)",
        desc: "۳/۴ برنج + خورشت رژیمی + ۱۲۰گ گوشت",
        time: "13:30",
        p: 45,
        c: 50,
        f: 18,
      },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "کافئین ۲۰۰",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      {
        id: "post",
        name: "بعد تمرین",
        desc: "۱ سیب‌زمینی + ۲ فیله مرغ (یا وی)",
        time: "18:00",
        p: 30,
        c: 35,
        f: 2,
      },
      {
        id: "d",
        name: "شام (منو ۳)",
        desc: "بورانی اسفناج + ۳ فیله مرغ + ماست + تست",
        time: "20:30",
        p: 45,
        c: 25,
        f: 8,
      },
      {
        id: "bed",
        name: "قبل خواب",
        desc: "۱ لیوان شیر",
        time: "23:00",
        p: 8,
        c: 12,
        f: 2,
      },
    ],
    supplements: [
      { id: "sup1", name: "B-Complex", time: "صبح", taken: false },
      { id: "sup2", name: "منیزیم مالات", time: "صبح", taken: false },
      { id: "sup3", name: "امگا ۳ (۲ عدد)", time: "بعد ناهار", taken: false },
      { id: "sup4", name: "D3 + K2", time: "بعد ناهار", taken: false },
      { id: "sup5", name: "کروم", time: "بعد ناهار", taken: false },
      { id: "sup6", name: "زینک گلوکونات", time: "عصر", taken: false },
      { id: "sup7", name: "منیزیم بیس‌گلایسینات", time: "شب", taken: false },
    ],
  },
  5: {
    // Friday (Day 7)
    title: "جمعه - تثبیت و استراحت",
    macros: { protein: 195, carbs: 180, fat: 58, calories: 2100 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۱)",
        desc: "۶ سفیده + ۲ تست + ۶۰گ پنیر + گردو",
        time: "08:00",
        p: 35,
        c: 30,
        f: 12,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ سیب + آجیل خام",
        time: "10:30",
        p: 5,
        c: 20,
        f: 15,
      },
      {
        id: "l",
        name: "ناهار (منو ۱)",
        desc: "۳/۴ برنج + ۲۰۰گ مرغ + سالاد",
        time: "13:30",
        p: 60,
        c: 60,
        f: 10,
      },
      {
        id: "s2",
        name: "عصرانه",
        desc: "۱ کاسه عدسی یا نیم اسکوپ وی",
        time: "17:00",
        p: 15,
        c: 20,
        f: 2,
      },
      {
        id: "d",
        name: "شام (منو ۲)",
        desc: "۱۷۰گ استیک + سبزی + ۱ تست",
        time: "20:30",
        p: 50,
        c: 15,
        f: 15,
      },
      {
        id: "bed",
        name: "قبل خواب",
        desc: "۱ لیوان شیر",
        time: "23:00",
        p: 8,
        c: 12,
        f: 2,
      },
    ],
    supplements: [
      { id: "sup1", name: "B-Complex", time: "صبح", taken: false },
      { id: "sup2", name: "منیزیم مالات", time: "صبح", taken: false },
      { id: "sup3", name: "امگا ۳ (۲ عدد)", time: "بعد ناهار", taken: false },
      { id: "sup4", name: "D3 + K2", time: "بعد ناهار", taken: false },
      { id: "sup5", name: "کروم", time: "بعد ناهار", taken: false },
      { id: "sup6", name: "زینک گلوکونات", time: "عصر", taken: false },
      { id: "sup7", name: "منیزیم بیس‌گلایسینات", time: "شب", taken: false },
    ],
  },
};

const INITIAL_WEIGHT_DATA = [
  { date: "11/01", weight: 134, muscle: 50, fat: 35 },
  { date: "11/08", weight: 132.5, muscle: 50.1, fat: 34.2 },
  { date: "11/15", weight: 131, muscle: 50.2, fat: 33.5 },
];

// --- COMPONENTS ---

const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700 ${className}`}
  >
    {children}
  </div>
);

const MacroRing = ({ label, current, total, color }) => {
  const percentage = Math.min((current / total) * 100, 100);
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-700 opacity-30"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${color} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <div className="text-center mt-1">
        <div className="text-xs text-gray-400 font-medium mb-0.5">{label}</div>
        <div className="text-[10px] text-gray-500">
          {current}/{total}g
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function BodyCockpit() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [today, setToday] = useState(new Date().getDay());
  const [currentPlan, setCurrentPlan] = useState(
    WEEK_PLAN[today] || WEEK_PLAN[6]
  );
  const [hydration, setHydration] = useState(0);
  const [completedItems, setCompletedItems] = useState({});
  const [weightData, setWeightData] = useState(INITIAL_WEIGHT_DATA);
  const [profile] = useState({ weight: 134, height: 178, muscle: 50, fat: 35 });

  useEffect(() => {
    const savedHydration = localStorage.getItem("hydration");
    const savedCompleted = localStorage.getItem("completedItems");
    if (savedHydration) setHydration(JSON.parse(savedHydration));
    if (savedCompleted) setCompletedItems(JSON.parse(savedCompleted));
  }, []);

  useEffect(() => {
    localStorage.setItem("hydration", JSON.stringify(hydration));
    localStorage.setItem("completedItems", JSON.stringify(completedItems));
  }, [hydration, completedItems]);

  const toggleItem = (id) => {
    const key = `${today}-${id}`;
    setCompletedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isCompleted = (id) => !!completedItems[`${today}-${id}`];

  const consumed = (currentPlan.meals || []).reduce(
    (acc, meal) => {
      if (isCompleted(meal.id)) {
        acc.p += meal.p || 0;
        acc.c += meal.c || 0;
        acc.f += meal.f || 0;
      }
      return acc;
    },
    { p: 0, c: 0, f: 0 }
  );

  const consumedCalories = consumed.p * 4 + consumed.c * 4 + consumed.f * 9;

  const calculateDailyProgress = () => {
    const totalItems =
      (currentPlan.meals?.length || 0) + (currentPlan.supplements?.length || 0);
    if (totalItems === 0) return 0;
    const completedCount = [
      ...(currentPlan.meals || []),
      ...(currentPlan.supplements || []),
    ].filter((item) => isCompleted(item.id)).length;
    return Math.round((completedCount / totalItems) * 100);
  };

  const addWater = () => {
    if (hydration < 4000) setHydration((prev) => prev + 250);
  };

  // --- VIEWS ---

  const DashboardView = () => {
    const nextMeal = currentPlan.meals?.find((m) => !isCompleted(m.id));
    const nextSup = currentPlan.supplements?.find((s) => !isCompleted(s.id));

    return (
      <div className="space-y-6 animate-fade-in pb-20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">سلام سروش 💪</h1>
            <p className="text-gray-400 text-sm">امروز: {currentPlan.title}</p>
          </div>
          <div className="bg-gray-800 p-2 rounded-full border border-gray-600">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
              S
            </div>
          </div>
        </div>

        {/* MACROS SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={100} className="text-yellow-500" />
          </div>
          <div className="p-5 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Zap size={18} className="text-yellow-400" /> وضعیت سوخت
              </h3>
              <div className="flex items-center gap-1 bg-gray-800/80 px-3 py-1 rounded-full border border-gray-700">
                <Flame size={14} className="text-orange-500" />
                <span className="text-white font-bold">{consumedCalories}</span>
                <span className="text-[10px] text-gray-400">kcal</span>
              </div>
            </div>

            <div className="flex justify-around items-end">
              <MacroRing
                label="پروتئین"
                current={consumed.p}
                total={currentPlan.macros.protein}
                color="text-emerald-500"
              />
              <MacroRing
                label="کربوهیدرات"
                current={consumed.c}
                total={currentPlan.macros.carbs}
                color="text-blue-500"
              />
              <MacroRing
                label="چربی"
                current={consumed.f}
                total={currentPlan.macros.fat}
                color="text-rose-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="col-span-2 bg-gradient-to-r from-gray-800 to-gray-900 border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <Activity size={20} /> عملکرد امروز
              </h2>
              <span className="text-2xl font-bold text-white">
                {calculateDailyProgress()}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-emerald-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${calculateDailyProgress()}%` }}
              ></div>
            </div>
          </Card>

          <Card
            className="flex flex-col items-center justify-center p-6 relative overflow-hidden group cursor-pointer"
            onClick={addWater}
          >
            <div className="absolute top-0 right-0 bg-blue-500/20 p-2 rounded-bl-xl text-blue-300 text-xs">
              +250ml
            </div>
            <Droplet
              size={32}
              className="text-blue-400 mb-2 group-hover:scale-110 transition-transform"
            />
            <span className="text-2xl font-bold text-white">
              {hydration / 1000}L
            </span>
            <span className="text-xs text-gray-400">هدف: ۳.۵ لیتر</span>
            <div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300"
              style={{ width: `${(hydration / 3500) * 100}%` }}
            ></div>
          </Card>

          <Card className="flex flex-col justify-center items-center">
            <div className="text-xs text-gray-400 mb-1">کاهش وزن</div>
            <div className="text-2xl font-bold text-white">
              3.0 <span className="text-sm font-normal">kg</span>
            </div>
            <div className="text-xs text-emerald-400 mt-1">عالیه! 🔥</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* NEXT MEAL BOX */}
          <Card
            className="border-l-4 border-l-blue-500 py-3"
            onClick={() => setActiveTab("plan")}
          >
            <h3 className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">
              وعده بعدی
            </h3>
            {nextMeal ? (
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white font-bold text-base">
                    {nextMeal.name}
                  </div>
                  <div className="text-gray-400 text-xs">{nextMeal.time}</div>
                </div>
                <Utensils className="text-gray-600" size={20} />
              </div>
            ) : (
              <div className="text-emerald-400 font-bold text-sm">
                تمامی وعده‌ها میل شد ✅
              </div>
            )}
          </Card>

          {/* NEXT SUPPLEMENT BOX (NEW) */}
          <Card
            className="border-l-4 border-l-purple-500 py-3"
            onClick={() => setActiveTab("plan")}
          >
            <h3 className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">
              مکمل بعدی
            </h3>
            {nextSup ? (
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white font-bold text-base">
                    {nextSup.name}
                  </div>
                  <div className="text-gray-400 text-xs">{nextSup.time}</div>
                </div>
                <Pill className="text-purple-400/50" size={20} />
              </div>
            ) : (
              <div className="text-emerald-400 font-bold text-sm">
                مکمل‌های امروز تمام شد ✅
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  };

  const PlanView = () => (
    <div className="space-y-6 pb-20">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[6, 0, 1, 2, 3, 4, 5].map((d) => (
          <button
            key={d}
            onClick={() => {
              setToday(d);
              setCurrentPlan(WEEK_PLAN[d]);
            }}
            className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-colors ${
              today === d
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {WEEK_PLAN[d]?.title.split(" - ")[0] || `روز ${d}`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Utensils size={20} className="text-orange-500" /> وعده‌های غذایی
        </h2>
        {currentPlan.meals?.map((meal) => (
          <div
            key={meal.id}
            onClick={() => toggleItem(meal.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
              isCompleted(meal.id)
                ? "bg-gray-900/50 border-gray-800 opacity-60"
                : "bg-gray-800 border-gray-700 hover:border-gray-600"
            }`}
          >
            <div
              className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center border ${
                isCompleted(meal.id)
                  ? "bg-emerald-500 border-emerald-500"
                  : "border-gray-500"
              }`}
            >
              {isCompleted(meal.id) && (
                <CheckCircle size={14} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3
                  className={`font-bold ${
                    isCompleted(meal.id)
                      ? "text-gray-500 line-through"
                      : "text-white"
                  }`}
                >
                  {meal.name}
                </h3>
                <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">
                  {meal.time}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{meal.desc}</p>
              {!isCompleted(meal.id) && (
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] bg-gray-700/50 px-1.5 rounded text-emerald-400">
                    P: {meal.p}g
                  </span>
                  <span className="text-[10px] bg-gray-700/50 px-1.5 rounded text-blue-400">
                    C: {meal.c}g
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-8">
          <Pill size={20} className="text-purple-500" /> مکمل‌ها
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {currentPlan.supplements?.map((sup) => (
            <div
              key={sup.id}
              onClick={() => toggleItem(sup.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isCompleted(sup.id)
                  ? "bg-gray-900/50 border-gray-800 opacity-50"
                  : "bg-gray-800 border-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-10 rounded-full ${
                    isCompleted(sup.id) ? "bg-gray-600" : "bg-purple-500"
                  }`}
                ></div>
                <div>
                  <div
                    className={`font-medium ${
                      isCompleted(sup.id)
                        ? "text-gray-500 line-through"
                        : "text-gray-200"
                    }`}
                  >
                    {sup.name}
                  </div>
                  <div className="text-xs text-gray-500">{sup.time}</div>
                </div>
              </div>
              {isCompleted(sup.id) && (
                <CheckCircle size={18} className="text-emerald-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProgressView = () => (
    <div className="space-y-6 pb-20">
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center">
          <div className="text-gray-400 text-sm mb-1">وزن شروع</div>
          <div className="text-2xl font-bold text-white">
            134 <span className="text-sm font-normal">kg</span>
          </div>
        </Card>
        <Card className="text-center border-emerald-500 border-b-4">
          <div className="text-gray-400 text-sm mb-1">وزن فعلی</div>
          <div className="text-2xl font-bold text-white">
            {weightData[weightData.length - 1].weight}{" "}
            <span className="text-sm font-normal">kg</span>
          </div>
        </Card>
      </div>

      <Card className="h-64">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <TrendingDown size={18} className="text-blue-500" /> روند کاهش وزن
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              stroke="#9ca3af"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#374151",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorWeight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="text-white font-bold mb-4">آمار بدنی</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
            <span className="text-gray-400">توده عضلانی</span>
            <span className="text-white font-bold text-lg">
              {profile.muscle} kg
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
            <span className="text-gray-400">درصد چربی</span>
            <span className="text-white font-bold text-lg">{profile.fat}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">BMI</span>
            <span className="text-white font-bold text-lg">
              {(profile.weight / (profile.height / 100) ** 2).toFixed(1)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans" dir="rtl">
      <div className="max-w-md mx-auto min-h-screen bg-gray-900 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 p-6 h-full overflow-y-auto scrollbar-hide">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "plan" && <PlanView />}
          {activeTab === "progress" && <ProgressView />}
        </div>

        <div className="fixed bottom-0 max-w-md w-full bg-gray-800/90 backdrop-blur-lg border-t border-gray-700 p-4 flex justify-around items-center z-50 rounded-t-2xl">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "dashboard"
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Activity size={24} />
            <span className="text-xs font-medium">داشبورد</span>
          </button>

          <button
            onClick={() => setActiveTab("plan")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "plan"
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Calendar size={24} />
            <span className="text-xs font-medium">برنامه</span>
          </button>

          <div className="relative -top-6">
            <button
              onClick={addWater}
              className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/40 text-white transition-transform active:scale-95 border-4 border-gray-900"
            >
              <Droplet size={24} fill="white" />
            </button>
          </div>

          <button
            onClick={() => setActiveTab("progress")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "progress"
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <TrendingDown size={24} />
            <span className="text-xs font-medium">پیشرفت</span>
          </button>

          <button
            className={`flex flex-col items-center gap-1 transition-colors text-gray-500 hover:text-gray-300`}
          >
            <User size={24} />
            <span className="text-xs font-medium">پروفایل</span>
          </button>
        </div>
      </div>
    </div>
  );
}
