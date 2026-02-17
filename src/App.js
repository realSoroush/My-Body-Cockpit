import React, { useState, useEffect, useRef } from "react";
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
  BarChart,
  Bar,
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
  Dumbbell,
  RefreshCw,
  Save,
  ArrowUpRight,
} from "lucide-react";

// --- MENU OPTIONS DATABASE (Logic Unchanged) ---

const BREAKFAST_OPTIONS = [
  {
    name: "صبحانه (منو ۱)",
    desc: "۶ عدد سفیده تخم‌مرغ + ۲ عدد نان تست + ۶۰ گرم پنیر + ۲ عدد گردو",
    p: 35,
    c: 30,
    f: 12,
  },
  {
    name: "صبحانه (منو ۲)",
    desc: "اوتمیل (۵۰گ جو + شیر + موز + عسل + کره بادام + گردو)",
    p: 20,
    c: 60,
    f: 15,
  },
];

const LUNCH_OPTIONS = [
  {
    name: "ناهار (منو ۱)",
    desc: "۳/۴ برنج قهوه‌ای + ۲۰۰گ مرغ + سالاد",
    p: 60,
    c: 60,
    f: 10,
  },
  {
    name: "ناهار (منو ۲)",
    desc: "۱ لیوان ماکارونی + ۵۰گ سویا + سبزی",
    p: 35,
    c: 80,
    f: 10,
  },
  {
    name: "ناهار (منو ۳)",
    desc: "۳/۴ برنج + ۲۰۰گ جوجه کباب + سالاد",
    p: 55,
    c: 50,
    f: 12,
  },
  {
    name: "ناهار (منو ۴)",
    desc: "۳/۴ عدس‌پلو + ۱۰۰گ گوشت چرخ‌کرده",
    p: 40,
    c: 70,
    f: 15,
  },
  {
    name: "ناهار (منو ۵)",
    desc: "۳/۴ برنج + ۲۲۰گ ماهی کبابی + لیمو",
    p: 50,
    c: 50,
    f: 12,
  },
  {
    name: "ناهار (منو ۶)",
    desc: "۳/۴ برنج + خورشت کم‌چرب + ۱۲۰گ گوشت",
    p: 45,
    c: 50,
    f: 18,
  },
];

const DINNER_OPTIONS = [
  {
    name: "شام (منو ۱)",
    desc: "۱۸۰گ خوراک مرغ + هویج + لوبیا سبز + گوجه + ۱ تست",
    p: 45,
    c: 25,
    f: 8,
  },
  {
    name: "شام (منو ۲)",
    desc: "۱۷۰گ استیک گوشت + پنیر + سبزی + ۱ تست",
    p: 50,
    c: 15,
    f: 15,
  },
  {
    name: "شام (منو ۳)",
    desc: "بورانی اسفناج + ۳ فیله مرغ + ماست + ۱ تست",
    p: 45,
    c: 25,
    f: 8,
  },
  {
    name: "شام (منو ۴)",
    desc: "۲۰۰گ ماهی شیر + ۱ سیب‌زمینی گریل + تخمه",
    p: 45,
    c: 40,
    f: 15,
  },
];

const SNACK1_OPTIONS = [
  {
    name: "میان‌ وعده ۱ (تمرین)",
    desc: "۱ اسکوپ وی در شیر/ماست کم‌چرب",
    p: 25,
    c: 5,
    f: 2,
  },
  {
    name: "میان‌ وعده ۱ (استراحت)",
    desc: "۱ کاسه عدسی + ۱ سیب",
    p: 12,
    c: 25,
    f: 1,
  },
];

const SNACK2_OPTIONS = [
  {
    name: "عصرانه (بعد تمرین)",
    desc: "۱ سیب‌زمینی + ۲ فیله مرغ (یا وی با آب)",
    p: 30,
    c: 35,
    f: 2,
  },
  {
    name: "عصرانه (استراحت)",
    desc: "۱۵گ آجیل خام + نیم اسکوپ وی",
    p: 20,
    c: 10,
    f: 15,
  },
];

// --- INITIAL WEEK PLAN ---

const INITIAL_WEEK_PLAN = {
  6: {
    title: "شنبه - شروع قدرتمند",
    isTraining: true,
    meals: [
      {
        id: "b",
        ...BREAKFAST_OPTIONS[0],
        time: "08:00",
        options: BREAKFAST_OPTIONS,
      },
      {
        id: "s1",
        ...SNACK1_OPTIONS[0],
        time: "10:30",
        options: SNACK1_OPTIONS,
      },
      { id: "l", ...LUNCH_OPTIONS[0], time: "13:30", options: LUNCH_OPTIONS },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "۱ قرص کافئین ۲۰۰",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      { id: "post", ...SNACK2_OPTIONS[0], time: "18:00" },
      {
        id: "s2",
        name: "عصرانه (سالاد)",
        desc: "سالاد کامل + نصف آووکادو",
        time: "19:30",
        p: 5,
        c: 15,
        f: 10,
      },
      { id: "d", ...DINNER_OPTIONS[1], time: "21:00", options: DINNER_OPTIONS },
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
  },
  0: {
    title: "یکشنبه - استراحت",
    isTraining: false,
    meals: [
      {
        id: "b",
        ...BREAKFAST_OPTIONS[0],
        time: "08:00",
        options: BREAKFAST_OPTIONS,
      },
      {
        id: "s1",
        ...SNACK1_OPTIONS[1],
        time: "10:30",
        options: SNACK1_OPTIONS,
      },
      { id: "l", ...LUNCH_OPTIONS[0], time: "13:30", options: LUNCH_OPTIONS },
      { id: "s2_1", ...SNACK2_OPTIONS[1], time: "17:00" },
      {
        id: "s2_2",
        name: "عصرانه دوم",
        desc: "سالاد کامل",
        time: "19:00",
        p: 5,
        c: 15,
        f: 10,
      },
      { id: "d", ...DINNER_OPTIONS[1], time: "21:00", options: DINNER_OPTIONS },
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
  },
  1: {
    title: "دوشنبه - ریکاوری",
    isTraining: true,
    meals: [
      {
        id: "b",
        ...BREAKFAST_OPTIONS[0],
        time: "08:00",
        options: BREAKFAST_OPTIONS,
      },
      {
        id: "s1",
        ...SNACK1_OPTIONS[0],
        time: "10:30",
        options: SNACK1_OPTIONS,
      },
      { id: "l", ...LUNCH_OPTIONS[2], time: "13:30", options: LUNCH_OPTIONS },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "کافئین ۲۰۰",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      { id: "post", ...SNACK2_OPTIONS[0], time: "18:00" },
      {
        id: "s2",
        name: "عصرانه",
        desc: "سالاد کامل",
        time: "19:30",
        p: 5,
        c: 15,
        f: 10,
      },
      { id: "d", ...DINNER_OPTIONS[0], time: "21:00", options: DINNER_OPTIONS },
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
  },
  2: {
    title: "سه‌شنبه - عدس‌پلو",
    isTraining: false,
    meals: [
      {
        id: "b",
        ...BREAKFAST_OPTIONS[1],
        time: "08:00",
        options: BREAKFAST_OPTIONS,
      },
      {
        id: "s1",
        ...SNACK1_OPTIONS[1],
        time: "10:30",
        options: SNACK1_OPTIONS,
      },
      { id: "l", ...LUNCH_OPTIONS[3], time: "13:30", options: LUNCH_OPTIONS },
      { id: "s2_1", ...SNACK2_OPTIONS[1], time: "17:00" },
      {
        id: "s2_2",
        name: "عصرانه",
        desc: "سالاد کامل",
        time: "19:00",
        p: 5,
        c: 15,
        f: 10,
      },
      { id: "d", ...DINNER_OPTIONS[3], time: "21:00", options: DINNER_OPTIONS },
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
  },
  3: {
    title: "چهارشنبه - ماکارونی",
    isTraining: true,
    meals: [
      {
        id: "b",
        ...BREAKFAST_OPTIONS[0],
        time: "08:00",
        options: BREAKFAST_OPTIONS,
      },
      {
        id: "s1",
        ...SNACK1_OPTIONS[0],
        time: "10:30",
        options: SNACK1_OPTIONS,
      },
      { id: "l", ...LUNCH_OPTIONS[1], time: "13:30", options: LUNCH_OPTIONS },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "کافئین ۲۰۰",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      { id: "post", ...SNACK2_OPTIONS[0], time: "18:00" },
      {
        id: "s2",
        name: "عصرانه",
        desc: "سالاد کامل",
        time: "19:30",
        p: 5,
        c: 15,
        f: 10,
      },
      { id: "d", ...DINNER_OPTIONS[0], time: "21:00", options: DINNER_OPTIONS },
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
  },
  4: {
    title: "پنجشنبه - خورشت",
    isTraining: true,
    meals: [
      {
        id: "b",
        ...BREAKFAST_OPTIONS[1],
        time: "08:00",
        options: BREAKFAST_OPTIONS,
      },
      {
        id: "s1",
        ...SNACK1_OPTIONS[0],
        time: "10:30",
        options: SNACK1_OPTIONS,
      },
      { id: "l", ...LUNCH_OPTIONS[5], time: "13:30", options: LUNCH_OPTIONS },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "کافئین ۲۰۰",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      { id: "post", ...SNACK2_OPTIONS[0], time: "18:00" },
      {
        id: "s2",
        name: "عصرانه",
        desc: "۱۵گ آجیل",
        time: "19:30",
        p: 5,
        c: 15,
        f: 10,
      },
      { id: "d", ...DINNER_OPTIONS[2], time: "21:00", options: DINNER_OPTIONS },
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
  },
  5: {
    title: "جمعه - تنوع دریایی",
    isTraining: false,
    meals: [
      {
        id: "b",
        ...BREAKFAST_OPTIONS[1],
        time: "08:00",
        options: BREAKFAST_OPTIONS,
      },
      {
        id: "s1",
        ...SNACK1_OPTIONS[1],
        time: "10:30",
        options: SNACK1_OPTIONS,
      },
      { id: "l", ...LUNCH_OPTIONS[4], time: "13:30", options: LUNCH_OPTIONS },
      { id: "s2_1", ...SNACK2_OPTIONS[1], time: "17:00" },
      { id: "d", ...DINNER_OPTIONS[2], time: "21:00", options: DINNER_OPTIONS },
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
  },
};

Object.values(INITIAL_WEEK_PLAN).forEach((day) => {
  day.supplements = [
    { id: "sup1", name: "B-Complex (شامل ۲۴mg زینک)", time: "صبح" },
    { id: "sup2", name: "منیزیم مالات", time: "صبح" },
    { id: "sup3", name: "امگا ۳ (۲ عدد)", time: "بعد ناهار" },
    { id: "sup4", name: "D3 + K2", time: "بعد ناهار" },
    { id: "sup5", name: "کروم", time: "بعد ناهار" },
    { id: "sup7", name: "منیزیم شب", time: "شب" },
  ];
  if (day.isTraining)
    day.supplements.push({ id: "sup6", name: "زینک گلوکونات", time: "عصر" });
});

const INITIAL_WEIGHT_DATA = [
  { date: "11/01", weight: 134 },
  { date: "11/08", weight: 132.5 },
  { date: "11/15", weight: 131 },
];

const INITIAL_HISTORY = [
  { week: "هفته ۱", cal: 14500, p: 1300 },
  { week: "هفته ۲", cal: 14200, p: 1350 },
];

// --- MODERN UI COMPONENTS ---

const Card = ({ children, className = "", onClick, noBlur }) => (
  <div
    onClick={onClick}
    className={`relative overflow-hidden bg-gray-900/60 border border-gray-800/50 rounded-3xl p-5 shadow-xl transition-all duration-300 ${
      onClick
        ? "cursor-pointer hover:bg-gray-800/60 hover:shadow-2xl hover:border-gray-700 active:scale-[0.98]"
        : ""
    } ${!noBlur ? "backdrop-blur-xl" : ""} ${className}`}
  >
    {children}
  </div>
);

const MacroRing = ({ label, current, total, color, icon: Icon }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((current / total) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center group">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${color.replace(
            "text-",
            "bg-"
          )}`}
        ></div>

        <svg className="w-full h-full transform -rotate-90 relative z-10">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-800/50"
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
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-black text-white drop-shadow-md">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <div className="text-center mt-2 space-y-0.5">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          {label}
        </div>
        <div
          className="text-[10px] text-gray-500 font-mono tracking-tight"
          dir="ltr"
        >
          {current}/{total}g
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [today, setToday] = useState(new Date().getDay());
  const [hydration, setHydration] = useState(0);
  const [completedItems, setCompletedItems] = useState({});
  const [mealSelections, setMealSelections] = useState({});
  const [weightData, setWeightData] = useState(INITIAL_WEIGHT_DATA);
  const [weeklyHistory, setWeeklyHistory] = useState(INITIAL_HISTORY);
  const [streak, setStreak] = useState(1);
  const [newWeight, setNewWeight] = useState("");

  const itemRefs = useRef({});

  useEffect(() => {
    const saved = localStorage.getItem("appData_v4");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHydration(data.hydration || 0);
        setCompletedItems(data.completedItems || {});
        setMealSelections(data.mealSelections || {});
        setWeightData(
          Array.isArray(data.weightData) ? data.weightData : INITIAL_WEIGHT_DATA
        );
        setWeeklyHistory(
          Array.isArray(data.weeklyHistory)
            ? data.weeklyHistory
            : INITIAL_HISTORY
        );
        setStreak(data.streak || 1);
      } catch (e) {
        console.error("Error loading data", e);
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      hydration,
      completedItems,
      mealSelections,
      weightData,
      weeklyHistory,
      streak,
    };
    localStorage.setItem("appData_v4", JSON.stringify(data));
  }, [
    hydration,
    completedItems,
    mealSelections,
    weightData,
    weeklyHistory,
    streak,
  ]);

  const getMealData = (dayIndex, meal) => {
    const selectionIndex = mealSelections[`${dayIndex}-${meal.id}`] || 0;
    if (meal.options && meal.options[selectionIndex]) {
      return { ...meal, ...meal.options[selectionIndex] };
    }
    return meal;
  };

  const cycleMealOption = (e, mealId) => {
    e.stopPropagation();
    const key = `${today}-${mealId}`;
    const currentIdx = mealSelections[key] || 0;
    const meal = INITIAL_WEEK_PLAN[today].meals.find((m) => m.id === mealId);
    if (meal && meal.options) {
      const nextIdx = (currentIdx + 1) % meal.options.length;
      setMealSelections((prev) => ({ ...prev, [key]: nextIdx }));
    }
  };

  const toggleItem = (id) => {
    const key = `${today}-${id}`;
    setCompletedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isCompleted = (id) => !!completedItems[`${today}-${id}`];

  const currentPlan = INITIAL_WEEK_PLAN[today] || INITIAL_WEEK_PLAN[6];
  const consumed = (currentPlan.meals || []).reduce(
    (acc, meal) => {
      if (isCompleted(meal.id)) {
        const actualMeal = getMealData(today, meal);
        acc.p += actualMeal.p || 0;
        acc.c += actualMeal.c || 0;
        acc.f += actualMeal.f || 0;
      }
      return acc;
    },
    { p: 0, c: 0, f: 0 }
  );
  const consumedCalories = consumed.p * 4 + consumed.c * 4 + consumed.f * 9;

  const targetMacros = { protein: 190, carbs: 180, fat: 60 };

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

  const handleAddWeight = () => {
    if (newWeight) {
      const dateStr = new Date().toLocaleDateString("fa-IR").slice(5);
      setWeightData([
        ...weightData,
        { date: dateStr, weight: parseFloat(newWeight) },
      ]);
      setNewWeight("");
    }
  };

  const handleFinishWeek = () => {
    if (window.confirm("آیا مطمئنی؟ دیتای هفته ذخیره و برنامه ریست می‌شود.")) {
      const weeklyCal = consumedCalories * 7;
      const weeklyP = consumed.p * 7;
      setWeeklyHistory((prev) => {
        const safe = Array.isArray(prev) ? prev : INITIAL_HISTORY;
        return [
          ...safe,
          {
            week: `هفته ${safe.length + 1}`,
            cal: weeklyCal > 0 ? weeklyCal : 10000,
            p: weeklyP > 0 ? weeklyP : 1000,
          },
        ];
      });
      setCompletedItems({});
      setHydration(0);
      setMealSelections({});
      alert("هفته جدید شروع شد! 🚀");
    }
  };

  const navigateToItem = (id) => {
    setActiveTab("plan");
    setTimeout(() => {
      const element = itemRefs.current[id];
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const DashboardView = () => {
    const nextMeal = currentPlan.meals?.find((m) => !isCompleted(m.id));
    const nextSup = currentPlan.supplements?.find((s) => !isCompleted(s.id));

    return (
      <div className="space-y-6 animate-fade-in pb-24">
        {/* Header */}
        <div className="flex justify-between items-center px-1">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tighter">
                سلام سروش!
              </h1>
            </div>
            <p className="text-gray-400 text-xs font-medium mt-1 flex items-center gap-2">
              <Calendar size={12} /> {currentPlan.title}
              {currentPlan.isTraining && (
                <span className="text-rose-400 bg-rose-500/10 px-1.5 rounded text-[10px] border border-rose-500/20">
                  روز تمرین
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-orange-400">
                <Flame
                  size={18}
                  fill="currentColor"
                  className="animate-pulse"
                />
                <span className="font-black text-lg font-mono">{streak}</span>
              </div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                روز متوالی
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 border border-white/10">
              S
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl">
          <div className="p-6 relative z-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                <div className="w-1 h-4 bg-yellow-400 rounded-full"></div> ماکرو
                ها
              </h3>
              <div className="flex items-center gap-3 bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700/50 shadow-inner">
                <Flame size={14} className="text-orange-500" />
                <span className="text-white font-bold font-mono text-lg">
                  {consumedCalories}
                </span>
                <span className="text-[12px] text-gray-400 uppercase font-bold">
                  kcal
                </span>
              </div>
            </div>
            <div className="flex justify-around items-end">
              <MacroRing
                label="پروتئین"
                current={consumed.p}
                total={targetMacros.protein}
                color="text-emerald-400"
              />
              <MacroRing
                label="کربوهیدرات"
                current={consumed.c}
                total={targetMacros.carbs}
                color="text-blue-400"
              />
              <MacroRing
                label="چربی"
                current={consumed.f}
                total={targetMacros.fat}
                color="text-rose-400"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="col-span-2 !bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <Activity size={18} className="text-emerald-400" /> عملکرد امروز
              </h2>
              <span className="text-2xl font-black text-white">
                {calculateDailyProgress()}%
              </span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-3 p-0.5 border border-gray-700/50">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                style={{ width: `${calculateDailyProgress()}%` }}
              ></div>
            </div>
          </Card>

          <Card
            className="flex flex-col items-center justify-center p-6 relative group cursor-pointer border-blue-500/20 hover:border-blue-500/50"
            onClick={addWater}
          >
            <div className="absolute top-2 right-2 bg-blue-500/10 px-2 py-1 rounded-lg text-blue-300 text-[12px] font-bold border border-blue-500/20">
              250ml+
            </div>
            <div className="mb-3 p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors">
              <Droplet
                size={24}
                className="text-blue-400 group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-2xl font-black text-white font-mono">
              {(hydration / 1000).toFixed(1)}L
            </span>
            <span className="text-[14px] text-gray-500 font-bold uppercase mt-1">
              آب مصرفی
            </span>
            <div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              style={{ width: `${Math.min((hydration / 3500) * 100, 100)}%` }}
            ></div>
          </Card>

          <Card className="flex flex-col justify-center items-center border-orange-500/20">
            <div className="text-[14px] text-gray-500 font-bold uppercase mb-2">
              آخرین وزن ثبت شده
            </div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              {weightData[weightData.length - 1].weight}
              <span className="text-sm text-gray-600 ml-1">kg</span>
            </div>
            <div className="text-[12px] text-emerald-400 mt-2 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
              <TrendingDown size={10} /> روند نزولی
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <Card
            className="border-l-4 border-l-blue-500 py-4 cursor-pointer active:scale-[0.99] hover:bg-gray-800/80 group"
            onClick={() => nextMeal && navigateToItem(nextMeal.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-blue-400 text-[10px] uppercase tracking-widest font-black mb-1">
                  وعده بعدی
                </h3>
                {nextMeal ? (
                  <div className="text-white font-bold text-lg group-hover:text-blue-200 transition-colors">
                    {getMealData(today, nextMeal).name}
                  </div>
                ) : (
                  <div className="text-emerald-400 font-bold text-sm">
                    همه وعده‌ها میل شد ✅
                  </div>
                )}
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
                <Utensils size={20} />
              </div>
            </div>
            {nextMeal && (
              <div className="mt-3 pt-3 border-t border-gray-700/50 text-xs text-gray-400 flex items-center gap-1.5">
                <Calendar size={12} className="text-blue-500" /> ساعت پیشنهادی:{" "}
                <span className="font-mono text-gray-300">{nextMeal.time}</span>
              </div>
            )}
          </Card>

          <Card
            className="border-l-4 border-l-purple-500 py-4 cursor-pointer active:scale-[0.99] hover:bg-gray-800/80 group"
            onClick={() => nextSup && navigateToItem(nextSup.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-purple-400 text-[10px] uppercase tracking-widest font-black mb-1">
                  مکمل بعدی
                </h3>
                {nextSup ? (
                  <div className="text-white font-bold text-lg group-hover:text-purple-200 transition-colors">
                    {nextSup.name}
                  </div>
                ) : (
                  <div className="text-emerald-400 font-bold text-sm">
                    مکمل‌های امروز تمام شد ✅
                  </div>
                )}
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-violet-700 p-2.5 rounded-xl text-white shadow-lg shadow-purple-500/20">
                <Pill size={20} />
              </div>
            </div>
            {nextSup && (
              <div className="mt-3 pt-3 border-t border-gray-700/50 text-xs text-gray-400 flex items-center gap-1.5">
                <Calendar size={12} className="text-purple-500" /> زمان مصرف:{" "}
                <span className="text-gray-300">{nextSup.time}</span>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  };

  const PlanView = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
        {[6, 0, 1, 2, 3, 4, 5].map((d) => (
          <button
            key={d}
            onClick={() => setToday(d)}
            className={`px-5 py-3 rounded-2xl whitespace-nowrap text-sm font-bold transition-all border ${
              today === d
                ? "bg-white text-black border-white shadow-lg shadow-white/10 scale-105"
                : "bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-800"
            }`}
          >
            {(INITIAL_WEEK_PLAN[d]?.title || "").split(" - ")[0]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {currentPlan.isTraining && (
          <div className="bg-gradient-to-r from-rose-900/40 to-red-900/20 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-4 mb-6 shadow-lg shadow-rose-900/10">
            <div className="bg-rose-500/20 p-2 rounded-lg text-rose-400">
              <Dumbbell size={20} />
            </div>
            <div className="text-rose-200 text-sm font-medium">
              امروز روز تمرین سنگینه! <br />
              <span className="text-xs opacity-70">
                وعده‌های بعد تمرین رو جدی بگیر.
              </span>
            </div>
          </div>
        )}

        <h2 className="text-lg font-bold text-white flex items-center gap-2 pl-2 border-l-2 border-orange-500 ml-1">
          <Utensils size={18} className="text-orange-500" /> وعده‌های غذایی
        </h2>
        {currentPlan.meals?.map((mealRaw) => {
          const meal = getMealData(today, mealRaw);
          return (
            <div
              key={meal.id}
              ref={(el) => (itemRefs.current[meal.id] = el)}
              onClick={() => toggleItem(meal.id)}
              className={`relative overflow-hidden p-5 rounded-3xl border transition-all cursor-pointer group ${
                isCompleted(meal.id)
                  ? "bg-gray-900/30 border-gray-800 opacity-60 grayscale-[0.5]"
                  : "bg-gray-800/60 border-gray-700 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
              }`}
            >
              <div className="flex items-start gap-4 relative z-10">
                <div
                  className={`mt-1 min-w-[1.75rem] h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted(meal.id)
                      ? "bg-emerald-500 border-emerald-500 scale-110"
                      : "border-gray-600 group-hover:border-gray-400"
                  }`}
                >
                  {isCompleted(meal.id) && (
                    <CheckCircle size={16} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`font-bold text-sm ${
                          isCompleted(meal.id)
                            ? "text-gray-500 line-through"
                            : "text-gray-100"
                        }`}
                      >
                        {meal.name}
                      </h3>
                      {mealRaw.options &&
                        mealRaw.options.length > 1 &&
                        !isCompleted(meal.id) && (
                          <button
                            onClick={(e) => cycleMealOption(e, meal.id)}
                            className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 hover:bg-blue-500 hover:text-white transition-all active:scale-90"
                            title="تغییر منو"
                          >
                            <RefreshCw size={12} />
                          </button>
                        )}
                    </div>
                    <span className="text-[12px] text-gray-400 bg-gray-950 font-bold px-2.5 py-1 rounded-lg border border-gray-800 font-mono">
                      {meal.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed border-l-2 border-gray-700 pl-3 ml-1">
                    {meal.desc}
                  </p>

                  {!isCompleted(meal.id) && (
                    <div className="flex gap-2 mt-4">
                      <span className="text-[12px] bg-emerald-950/50 px-2 py-1 rounded-md text-emerald-400 font-bold border border-emerald-900/30">
                        P: {meal.p}g
                      </span>
                      <span className="text-[12px] bg-blue-950/50 px-2 py-1 rounded-md text-blue-400 font-bold border border-blue-900/30">
                        C: {meal.c}g
                      </span>
                      <span className="text-[12px] bg-rose-950/50 px-2 py-1 rounded-md text-rose-400 font-bold border border-rose-900/30">
                        F: {meal.f}g
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <h2 className="text-lg font-bold text-white flex items-center gap-2 pl-2 border-l-2 border-purple-500 ml-1 mt-8">
          <Pill size={18} className="text-purple-500" /> مکمل‌ها
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {currentPlan.supplements?.map((sup) => (
            <div
              key={sup.id}
              ref={(el) => (itemRefs.current[sup.id] = el)}
              onClick={() => toggleItem(sup.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                isCompleted(sup.id)
                  ? "bg-gray-900/30 border-gray-800 opacity-50 grayscale"
                  : "bg-gray-800/40 border-gray-700 hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-1 h-8 rounded-full ${
                    isCompleted(sup.id)
                      ? "bg-gray-700"
                      : "bg-gradient-to-b from-purple-500 to-blue-500"
                  }`}
                ></div>
                <div>
                  <div
                    className={`font-bold text-sm ${
                      isCompleted(sup.id)
                        ? "text-gray-500 line-through"
                        : "text-gray-200"
                    }`}
                  >
                    {sup.name}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {sup.time}
                  </div>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isCompleted(sup.id)
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-gray-600"
                }`}
              >
                {isCompleted(sup.id) && (
                  <CheckCircle size={12} className="text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProgressView = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
      <Card
        noBlur
        className="bg-gradient-to-br from-gray-800 to-gray-900 !border-gray-700"
      >
        <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
          <Plus size={16} className="text-blue-500" /> ثبت وزن جدید
        </h3>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="مثلا: 130.5"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="flex-1 bg-black/40 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-mono placeholder:text-gray-600"
          />
          <button
            onClick={handleAddWeight}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/20"
          >
            ثبت
          </button>
        </div>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-bold flex items-center gap-2 text-sm">
            <TrendingDown size={16} className="text-emerald-500" /> نمودار
            تغییرات وزن
          </h3>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 font-bold">
            هدف: 100kg
          </span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              stroke="#9ca3af"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              hide
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                borderRadius: "12px",
                border: "1px solid #374151",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWeight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
          <Activity size={16} className="text-orange-500" /> تاریخچه کالری هفتگی
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyHistory}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              stroke="#9ca3af"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "#374151", opacity: 0.2 }}
              contentStyle={{
                backgroundColor: "#111827",
                borderRadius: "12px",
                border: "1px solid #374151",
                color: "#fff",
              }}
            />
            <Bar
              dataKey="cal"
              fill="#f97316"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <button
        onClick={handleFinishWeek}
        className="w-full bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-rose-900/20"
      >
        <Save size={18} />
        پایان هفته و ذخیره عملکرد
      </button>
      <p className="text-center text-[10px] text-gray-500 mt-3 opacity-60">
        با زدن این دکمه، دیتای این هفته ذخیره و برنامه برای شروع مجدد ریست
        می‌شود.
      </p>
    </div>
  );

  // --- RENDER ---
  return (
    <div
      className="min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-500/30 custom-font-wrapper"
      dir="rtl"
    >
      <style>{`
         @font-face {
          font-family: 'DANA-FANUM';
          src: url('/DANA-FANUM-BOLD.TTF') format('truetype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
         }

          .custom-font-wrapper {
            font-family: 'DANA-FANUM', sans-serif !important;
            direction: rtl;
          }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
      `}</style>

      <div className="max-w-md mx-auto min-h-screen bg-gray-950 shadow-2xl relative flex flex-col">
        {/* Background Ambient Glows */}
        <div className="fixed top-0 left-0 w-full h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-b-full"></div>
        <div className="fixed bottom-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="flex-1 relative z-10 p-5 overflow-y-auto scroll-smooth scrollbar-hide">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "plan" && <PlanView />}
          {activeTab === "progress" && <ProgressView />}
        </div>

        {/* MODERN GLASS BOTTOM NAV */}
        <div className="sticky bottom-4 left-4 right-4 mx-4 mb-4 bg-gray-900/80 backdrop-blur-xl border border-white/5 px-2 py-2 flex justify-around items-center z-50 rounded-[2rem] shadow-2xl">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
              activeTab === "dashboard"
                ? "bg-white/10 text-white shadow-inner"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Activity size={20} />
          </button>

          <button
            onClick={() => setActiveTab("plan")}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
              activeTab === "plan"
                ? "bg-white/10 text-white shadow-inner"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Calendar size={20} />
          </button>

          <div className="relative -top-6">
            <button
              onClick={addWater}
              className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 text-white transition-all active:scale-90 active:rotate-12 border-[6px] border-gray-950 group"
            >
              <Plus
                size={28}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>

          <button
            onClick={() => setActiveTab("progress")}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
              activeTab === "progress"
                ? "bg-white/10 text-white shadow-inner"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <TrendingDown size={20} />
          </button>

          <button
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 text-gray-500 hover:text-gray-300 opacity-50 cursor-not-allowed`}
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
