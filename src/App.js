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
  ShoppingCart,
  Trophy,
  Moon,
} from "lucide-react";

// --- DATA & CONSTANTS ---

const WEEK_PLAN = {
  6: {
    // Saturday
    title: "شنبه - شروع قدرتمند",
    isTraining: true,
    macros: { protein: 192, carbs: 180, fat: 58, calories: 2100 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۱)",
        desc: "۶ عدد سفیده تخم‌مرغ + ۲ عدد نان تست سبوس‌دار + ۶۰ گرم پنیر کم‌چرب + ۲ عدد گردو + چای سبز",
        time: "08:00",
        p: 35,
        c: 30,
        f: 12,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ اسکوپ پروتئین وی محلول در شیر یا ماست کم‌چرب",
        time: "10:30",
        p: 25,
        c: 5,
        f: 2,
      },
      {
        id: "l",
        name: "ناهار (منو ۱)",
        desc: "۳/۴ بشقاب برنج قهوه‌ای + ۲۰۰ گرم سینه مرغ پخته + ۱ کاسه سالاد با ۱ قاشق روغن زیتون",
        time: "13:30",
        p: 60,
        c: 60,
        f: 10,
      },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "۱ عدد قرص کافئین ۲۰۰ میلی‌گرم",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      {
        id: "post",
        name: "بعد تمرین",
        desc: "۱ عدد سیب‌زمینی گریل/آبپز + ۲ عدد فیله مرغ (۵۰ گرمی) یا ۱ اسکوپ وی با آب",
        time: "18:00",
        p: 30,
        c: 35,
        f: 2,
      },
      {
        id: "s2",
        name: "عصرانه (سالاد)",
        desc: "پیش‌دستی سالاد (کاهو، ۱ گوجه، جوانه گندم، ۱ هویج رنده شده، نصف آووکادو)",
        time: "19:30",
        p: 5,
        c: 15,
        f: 10,
      },
      {
        id: "d",
        name: "شام (منو ۲)",
        desc: "۱۷۰ گرم استیک گوشت قرمز + ۱ برش پنیر کم‌چرب + ۱ مشت سبزی خوردن + ۱ عدد نان تست",
        time: "21:00",
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
    // Sunday (Rest Day - No Pre/Post Workout)
    title: "یکشنبه - تثبیت و استراحت",
    isTraining: false,
    macros: { protein: 195, carbs: 180, fat: 58, calories: 2100 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۱)",
        desc: "۶ عدد سفیده تخم‌مرغ + ۲ عدد نان تست سبوس‌دار + ۶۰ گرم پنیر کم‌چرب + ۲ عدد گردو",
        time: "08:00",
        p: 35,
        c: 30,
        f: 12,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ کاسه کوچک عدسی + ۱ عدد سیب (ترجیحاً با پوست)",
        time: "10:30",
        p: 12,
        c: 25,
        f: 1,
      },
      {
        id: "l",
        name: "ناهار (منو ۱)",
        desc: "۳/۴ بشقاب برنج قهوه‌ای + ۲۰۰ گرم سینه مرغ پخته + سالاد",
        time: "13:30",
        p: 60,
        c: 60,
        f: 10,
      },
      {
        id: "s2_1",
        name: "عصرانه اول",
        desc: "نیم اسکوپ وی در شیر کم‌چرب + نصف مشت آجیل خام (پسته/بادام)",
        time: "17:00",
        p: 20,
        c: 10,
        f: 15,
      },
      {
        id: "s2_2",
        name: "عصرانه دوم",
        desc: "پیش‌دستی سالاد (کاهو، گوجه، جوانه، هویج، نصف آووکادو)",
        time: "19:00",
        p: 5,
        c: 15,
        f: 10,
      },
      {
        id: "d",
        name: "شام (منو ۲)",
        desc: "۱۷۰ گرم استیک گوشت قرمز + ۱ برش پنیر کم‌چرب + سبزی خوردن + ۱ عدد نان تست",
        time: "21:00",
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
    // Monday
    title: "دوشنبه - ریکاوری عضلانی",
    isTraining: true,
    macros: { protein: 198, carbs: 185, fat: 55, calories: 2150 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۱)",
        desc: "۶ عدد سفیده تخم‌مرغ + ۲ عدد نان تست + ۶۰ گرم پنیر + ۲ عدد گردو",
        time: "08:00",
        p: 35,
        c: 30,
        f: 12,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ اسکوپ پروتئین وی در شیر یا ماست کم‌چرب",
        time: "10:30",
        p: 25,
        c: 5,
        f: 2,
      },
      {
        id: "l",
        name: "ناهار (منو ۳)",
        desc: "۳/۴ بشقاب برنج قهوه‌ای + ۶ تکه جوجه کباب (۲۰۰ گرم) + ۱ کاسه سالاد",
        time: "13:30",
        p: 55,
        c: 50,
        f: 12,
      },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "۱ عدد قرص کافئین ۲۰۰ میلی‌گرم",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      {
        id: "post",
        name: "بعد تمرین",
        desc: "۱ عدد سیب‌زمینی گریل/آبپز + ۲ عدد فیله مرغ (۵۰ گرمی)",
        time: "18:00",
        p: 30,
        c: 35,
        f: 2,
      },
      {
        id: "s2",
        name: "عصرانه (سالاد)",
        desc: "سالاد کامل (کاهو، گوجه، جوانه، هویج، نصف آووکادو)",
        time: "19:30",
        p: 5,
        c: 15,
        f: 10,
      },
      {
        id: "d",
        name: "شام (منو ۱)",
        desc: "۱۸۰ گرم خوراک مرغ + ۱ هویج + ۱/۴ لیوان لوبیا سبز + گوجه + ۱ نان تست",
        time: "21:00",
        p: 45,
        c: 25,
        f: 8,
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
    // Tuesday (Rest Day)
    title: "سه‌شنبه - عدس‌پلو",
    isTraining: false,
    macros: { protein: 190, carbs: 225, fat: 62, calories: 2250 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۲)",
        desc: "۱ موز + ۵۰ گرم جوپرک + ۱ قاشق عسل + ۲ گردو + ۲۵۰ml شیر + ۱ تکه نان جو + ۱ قاشق کره بادام‌زمینی",
        time: "08:00",
        p: 20,
        c: 60,
        f: 15,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ کاسه کوچک عدسی + ۱ عدد سیب",
        time: "10:30",
        p: 12,
        c: 25,
        f: 1,
      },
      {
        id: "l",
        name: "ناهار (منو ۴)",
        desc: "۳/۴ بشقاب عدس‌پلو (برنج قهوه‌ای) + ۵ قاشق گوشت چرخ‌کرده بدون چربی + سبزی",
        time: "13:30",
        p: 40,
        c: 70,
        f: 15,
      },
      {
        id: "s2_1",
        name: "عصرانه اول",
        desc: "نیم اسکوپ وی در شیر کم‌چرب + نصف مشت آجیل خام",
        time: "17:00",
        p: 20,
        c: 10,
        f: 15,
      },
      {
        id: "s2_2",
        name: "عصرانه دوم",
        desc: "سالاد کامل (کاهو، گوجه، جوانه، هویج، نصف آووکادو)",
        time: "19:00",
        p: 5,
        c: 15,
        f: 10,
      },
      {
        id: "d",
        name: "شام (منو ۴)",
        desc: "۲۰۰ گرم ماهی شیر + ۱ سیب‌زمینی گریل + ۱ مشت تخمه خام + ۱ سیب‌زمینی کوچک",
        time: "21:00",
        p: 45,
        c: 40,
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
    // Wednesday
    title: "چهارشنبه - ماکارونی دی",
    isTraining: true,
    macros: { protein: 185, carbs: 240, fat: 50, calories: 2300 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۱)",
        desc: "۶ عدد سفیده تخم‌مرغ + ۲ عدد نان تست + ۶۰ گرم پنیر + ۲ عدد گردو",
        time: "08:00",
        p: 35,
        c: 30,
        f: 12,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ اسکوپ پروتئین وی در شیر یا ماست کم‌چرب",
        time: "10:30",
        p: 25,
        c: 5,
        f: 2,
      },
      {
        id: "l",
        name: "ناهار (منو ۲)",
        desc: "۱ لیوان ماکارونی پخته + ۵۰ گرم سویا + ۱ پیش‌دستی سبزی خوردن",
        time: "13:30",
        p: 35,
        c: 80,
        f: 10,
      },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "۱ عدد قرص کافئین ۲۰۰ میلی‌گرم",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      {
        id: "post",
        name: "بعد تمرین",
        desc: "۱ سیب‌زمینی گریل/آبپز + ۲ فیله مرغ (۵۰ گرمی)",
        time: "18:00",
        p: 30,
        c: 35,
        f: 2,
      },
      {
        id: "s2",
        name: "عصرانه (سالاد)",
        desc: "سالاد کامل (کاهو، گوجه، جوانه، هویج، نصف آووکادو)",
        time: "19:30",
        p: 5,
        c: 15,
        f: 10,
      },
      {
        id: "d",
        name: "شام (منو ۱)",
        desc: "۱۸۰ گرم خوراک مرغ + هویج + لوبیا سبز + گوجه + ۱ نان تست",
        time: "21:00",
        p: 45,
        c: 25,
        f: 8,
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
    // Thursday
    title: "پنجشنبه - خورشت رژیمی",
    isTraining: true,
    macros: { protein: 188, carbs: 205, fat: 60, calories: 2180 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۲)",
        desc: "۱ موز + ۵۰ گرم جوپرک + ۱ قاشق عسل + ۲ گردو + شیر + نان جو + کره بادام‌زمینی",
        time: "08:00",
        p: 20,
        c: 60,
        f: 15,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ اسکوپ پروتئین وی در شیر یا ماست کم‌چرب",
        time: "10:30",
        p: 25,
        c: 5,
        f: 2,
      },
      {
        id: "l",
        name: "ناهار (منو ۶)",
        desc: "۳/۴ بشقاب برنج قهوه‌ای + خورشت کم‌چرب + ۱۲۰ گرم گوشت (۴ تکه)",
        time: "13:30",
        p: 45,
        c: 50,
        f: 18,
      },
      {
        id: "pre",
        name: "قبل تمرین",
        desc: "۱ عدد قرص کافئین ۲۰۰ میلی‌گرم",
        time: "16:00",
        p: 0,
        c: 0,
        f: 0,
      },
      {
        id: "post",
        name: "بعد تمرین",
        desc: "۱ سیب‌زمینی گریل/آبپز + ۲ فیله مرغ (۵۰ گرمی)",
        time: "18:00",
        p: 30,
        c: 35,
        f: 2,
      },
      {
        id: "s2",
        name: "عصرانه (سالاد)",
        desc: "سالاد کامل (کاهو، گوجه، جوانه، هویج، نصف آووکادو)",
        time: "19:30",
        p: 5,
        c: 15,
        f: 10,
      },
      {
        id: "d",
        name: "شام (منو ۳)",
        desc: "نصف بشقاب بورانی اسفناج + ۳ فیله مرغ (۱۸۰ گرم) + ۱ کاسه ماست + ۱ نان تست",
        time: "21:00",
        p: 45,
        c: 25,
        f: 8,
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
    // Friday (Rest Day)
    title: "جمعه - تنوع دریایی",
    isTraining: false,
    macros: { protein: 205, carbs: 210, fat: 52, calories: 2200 },
    meals: [
      {
        id: "b",
        name: "صبحانه (منو ۲)",
        desc: "۱ موز + ۵۰ گرم جوپرک + ۱ قاشق عسل + ۲ گردو + شیر + نان جو + کره بادام‌زمینی",
        time: "08:00",
        p: 20,
        c: 60,
        f: 15,
      },
      {
        id: "s1",
        name: "میان‌وعده صبح",
        desc: "۱ کاسه کوچک عدسی + ۱ عدد سیب",
        time: "10:30",
        p: 12,
        c: 25,
        f: 1,
      },
      {
        id: "l",
        name: "ناهار (منو ۵)",
        desc: "۳/۴ بشقاب برنج قهوه‌ای + ۲۲۰ گرم ماهی کبابی + لیمو",
        time: "13:30",
        p: 50,
        c: 50,
        f: 12,
      },
      {
        id: "s2_1",
        name: "عصرانه اول",
        desc: "نیم اسکوپ وی در شیر کم‌چرب + نصف مشت آجیل خام",
        time: "17:00",
        p: 20,
        c: 10,
        f: 15,
      },
      {
        id: "s2_2",
        name: "عصرانه دوم",
        desc: "سالاد کامل (کاهو، گوجه، جوانه، هویج، نصف آووکادو)",
        time: "19:00",
        p: 5,
        c: 15,
        f: 10,
      },
      {
        id: "d",
        name: "شام (منو ۳)",
        desc: "نصف بشقاب بورانی اسفناج + ۳ فیله مرغ (۱۸۰ گرم) + ۱ کاسه ماست + ۱ نان تست",
        time: "21:00",
        p: 45,
        c: 25,
        f: 8,
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
        <div
          className="text-[10px] text-gray-500 font-mono tracking-tight"
          dir="ltr"
        >
          {current}g / {total}g
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [today, setToday] = useState(new Date().getDay());
  const [currentPlan, setCurrentPlan] = useState(
    WEEK_PLAN[today] || WEEK_PLAN[6]
  );
  const [hydration, setHydration] = useState(0);
  const [completedItems, setCompletedItems] = useState({});
  const [highlightedId, setHighlightedId] = useState(null);
  const [weightData] = useState(INITIAL_WEIGHT_DATA);
  const [profile] = useState({ weight: 134, height: 178, muscle: 50, fat: 35 });
  const [streak, setStreak] = useState(0); // New Feature

  const itemRefs = useRef({});

  useEffect(() => {
    const savedHydration = localStorage.getItem("hydration");
    const savedCompleted = localStorage.getItem("completedItems");
    const savedStreak = localStorage.getItem("streak"); // Load streak
    if (savedHydration) setHydration(JSON.parse(savedHydration));
    if (savedCompleted) setCompletedItems(JSON.parse(savedCompleted));
    if (savedStreak) setStreak(JSON.parse(savedStreak));
    else setStreak(1); // Start day 1
  }, []);

  useEffect(() => {
    localStorage.setItem("hydration", JSON.stringify(hydration));
    localStorage.setItem("completedItems", JSON.stringify(completedItems));
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [hydration, completedItems, streak]);

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

  const navigateToItem = (id) => {
    setActiveTab("plan");
    setHighlightedId(id);
    setTimeout(() => {
      const element = itemRefs.current[id];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setTimeout(() => setHighlightedId(null), 2500);
    }, 100);
  };

  // --- VIEWS ---

  const DashboardView = () => {
    const nextMeal = currentPlan.meals?.find((m) => !isCompleted(m.id));
    const nextSup = currentPlan.supplements?.find((s) => !isCompleted(s.id));

    return (
      <div className="space-y-6 animate-fade-in pb-24">
        <style>{`
          @keyframes bounce-highlight {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-20px);}
            60% {transform: translateY(-10px);}
          }
          .bounce-item { animation: bounce-highlight 1s ease 2; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>

        {/* NEW HEADER WITH STREAK & TRAINING MODE */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">سلام سروش 💪</h1>
              {currentPlan.isTraining && (
                <span className="bg-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded-full border border-rose-500/50 flex items-center gap-1 animate-pulse">
                  <Dumbbell size={10} /> روز تمرین
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">امروز: {currentPlan.title}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end mr-1">
              <div className="flex items-center gap-1 text-orange-500">
                <Flame size={14} fill="currentColor" />
                <span className="font-bold text-sm">{streak} روز</span>
              </div>
              <span className="text-[9px] text-gray-500">زنجیره نظم</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg border-2 border-gray-800">
              S
            </div>
          </div>
        </div>

        {/* MACROS SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-950 border border-gray-800 shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Zap size={100} className="text-yellow-500" />
          </div>
          <div className="p-5 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Zap size={18} className="text-yellow-400" /> وضعیت سوخت
              </h3>
              <div className="flex items-center gap-1 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                <Flame size={14} className="text-orange-500" />
                <span className="text-white font-bold font-mono">
                  {consumedCalories}
                </span>
                <span className="text-[10px] text-gray-400 uppercase">
                  kcal
                </span>
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
                className="bg-emerald-500 h-3 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${calculateDailyProgress()}%` }}
              ></div>
            </div>
          </Card>

          <Card
            className="flex flex-col items-center justify-center p-6 relative overflow-hidden group cursor-pointer"
            onClick={addWater}
          >
            <div className="absolute top-0 right-0 bg-blue-500/20 px-2 py-1 rounded-bl-xl text-blue-300 text-[10px] font-bold">
              +250ml
            </div>
            <Droplet
              size={32}
              className="text-blue-400 mb-2 group-hover:scale-110 transition-transform"
            />
            <span className="text-2xl font-bold text-white font-mono">
              {(hydration / 1000).toFixed(1)}L
            </span>
            <span className="text-xs text-gray-400">هدف: ۳.۵ لیتر</span>
            <div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              style={{ width: `${Math.min((hydration / 3500) * 100, 100)}%` }}
            ></div>
          </Card>

          <Card className="flex flex-col justify-center items-center">
            <div className="text-xs text-gray-400 mb-1">کاهش وزن</div>
            <div className="text-2xl font-bold text-white font-mono">
              3.0 <span className="text-sm font-normal">kg</span>
            </div>
            <div className="text-xs text-emerald-400 mt-1 font-bold">
              عالیه! 🔥
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card
            className="border-l-4 border-l-blue-500 py-4 cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => nextMeal && navigateToItem(nextMeal.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                  وعده بعدی
                </h3>
                {nextMeal ? (
                  <div className="text-white font-bold text-lg">
                    {nextMeal.name}
                  </div>
                ) : (
                  <div className="text-emerald-400 font-bold text-sm">
                    همه وعده‌ها میل شد ✅
                  </div>
                )}
              </div>
              <div className="bg-blue-500/10 p-2 rounded-xl text-blue-400">
                <Utensils size={24} />
              </div>
            </div>
            {nextMeal && (
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={12} /> ساعت پیشنهادی: {nextMeal.time}
              </div>
            )}
          </Card>

          <Card
            className="border-l-4 border-l-purple-500 py-4 cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => nextSup && navigateToItem(nextSup.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                  مکمل بعدی
                </h3>
                {nextSup ? (
                  <div className="text-white font-bold text-lg">
                    {nextSup.name}
                  </div>
                ) : (
                  <div className="text-emerald-400 font-bold text-sm">
                    مکمل‌های امروز تمام شد ✅
                  </div>
                )}
              </div>
              <div className="bg-purple-500/10 p-2 rounded-xl text-purple-400">
                <Pill size={24} />
              </div>
            </div>
            {nextSup && (
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={12} /> زمان مصرف: {nextSup.time}
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  };

  // (بقیه ویوها مثل PlanView و ProgressView بدون تغییر می‌مانند چون عالی هستند)
  // برای خلاصه شدن کد، فقط DashboardView رو تغییر دادیم که در بالا آوردم
  // اما کل کامپوننت PlanView و ProgressView قبلی رو اینجا میذارم که کپی پیست راحت باشه

  const PlanView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[6, 0, 1, 2, 3, 4, 5].map((d) => (
          <button
            key={d}
            onClick={() => {
              setToday(d);
              setCurrentPlan(WEEK_PLAN[d]);
            }}
            className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-bold transition-all ${
              today === d
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-900"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {WEEK_PLAN[d]?.title.split(" - ")[0] || `روز ${d}`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* NEW HEADER FOR TRAINING DAYS */}
        {currentPlan.isTraining && (
          <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center gap-3 mb-4">
            <Dumbbell className="text-rose-500" />
            <div className="text-rose-200 text-sm">
              امروز روز تمرین سنگینه! وعده‌های بعد تمرین رو جدی بگیر.
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Utensils size={20} className="text-orange-500" /> وعده‌های غذایی
        </h2>
        {currentPlan.meals?.map((meal) => (
          <div
            key={meal.id}
            ref={(el) => (itemRefs.current[meal.id] = el)}
            onClick={() => toggleItem(meal.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              isCompleted(meal.id)
                ? "bg-gray-950/50 border-gray-900 opacity-60"
                : highlightedId === meal.id
                ? "bg-blue-900/30 border-blue-500 bounce-item"
                : "bg-gray-800 border-gray-700 hover:border-gray-600 shadow-md"
            }`}
          >
            <div
              className={`mt-1 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${
                isCompleted(meal.id)
                  ? "bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "border-gray-600"
              }`}
            >
              {isCompleted(meal.id) && (
                <CheckCircle size={16} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3
                  className={`font-bold text-base ${
                    isCompleted(meal.id)
                      ? "text-gray-500 line-through"
                      : "text-white"
                  }`}
                >
                  {meal.name}
                </h3>
                <span className="text-[10px] text-gray-400 bg-gray-900 font-bold px-2 py-1 rounded-lg border border-gray-800">
                  {meal.time}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                {meal.desc}
              </p>
              {!isCompleted(meal.id) && (
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] bg-gray-900 px-2 py-1 rounded-md text-emerald-400 font-bold border border-emerald-900/50">
                    P: {meal.p}g
                  </span>
                  <span className="text-[10px] bg-gray-900 px-2 py-1 rounded-md text-blue-400 font-bold border border-blue-900/50">
                    C: {meal.c}g
                  </span>
                  <span className="text-[10px] bg-gray-900 px-2 py-1 rounded-md text-rose-400 font-bold border border-rose-900/50">
                    F: {meal.f}g
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-10">
          <Pill size={20} className="text-purple-500" /> مکمل‌ها
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {currentPlan.supplements?.map((sup) => (
            <div
              key={sup.id}
              ref={(el) => (itemRefs.current[sup.id] = el)}
              onClick={() => toggleItem(sup.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                isCompleted(sup.id)
                  ? "bg-gray-950/50 border-gray-900 opacity-50"
                  : highlightedId === sup.id
                  ? "bg-purple-900/30 border-purple-500 bounce-item"
                  : "bg-gray-800 border-gray-700 shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-1.5 h-10 rounded-full ${
                    isCompleted(sup.id)
                      ? "bg-gray-700"
                      : "bg-gradient-to-b from-purple-500 to-indigo-600"
                  }`}
                ></div>
                <div>
                  <div
                    className={`font-bold ${
                      isCompleted(sup.id)
                        ? "text-gray-500 line-through"
                        : "text-gray-200"
                    }`}
                  >
                    {sup.name}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {sup.time}
                  </div>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isCompleted(sup.id)
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-gray-700"
                }`}
              >
                {isCompleted(sup.id) && (
                  <CheckCircle size={14} className="text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProgressView = () => (
    <div className="space-y-6 pb-24">
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center bg-gray-800/50">
          <div className="text-gray-400 text-xs mb-1">وزن شروع</div>
          <div className="text-2xl font-bold text-white font-mono">
            134 <span className="text-sm font-normal">kg</span>
          </div>
        </Card>
        <Card className="text-center border-emerald-500 border-b-4 bg-gray-800/80">
          <div className="text-gray-400 text-xs mb-1">وزن فعلی</div>
          <div className="text-2xl font-bold text-white font-mono">
            131.0 <span className="text-sm font-normal">kg</span>
          </div>
        </Card>
      </div>

      <Card className="h-72">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
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
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
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
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWeight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
        <h3 className="text-white font-bold mb-5 flex items-center gap-2">
          <Activity size={18} className="text-rose-500" /> آنالیز ترکیبات بدن
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-950/40 rounded-xl">
            <span className="text-gray-400 font-medium">توده عضلانی</span>
            <span className="text-white font-bold text-lg font-mono">
              {profile.muscle} kg
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-950/40 rounded-xl">
            <span className="text-gray-400 font-medium">درصد چربی</span>
            <span className="text-rose-400 font-bold text-lg font-mono">
              {profile.fat}%
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-950/40 rounded-xl">
            <span className="text-gray-400 font-medium">BMI</span>
            <span className="text-blue-400 font-bold text-lg font-mono">
              {(profile.weight / (profile.height / 100) ** 2).toFixed(1)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-500/30"
      dir="rtl"
    >
      <div className="max-w-md mx-auto min-h-screen bg-gray-900 shadow-2xl relative flex flex-col border-x border-gray-800">
        <div className="absolute top-0 left-0 w-full h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>

        <div className="flex-1 relative z-10 p-5 overflow-y-auto scroll-smooth scrollbar-hide">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "plan" && <PlanView />}
          {activeTab === "progress" && <ProgressView />}
        </div>

        <div className="sticky bottom-0 w-full bg-gray-950/90 backdrop-blur-2xl border-t border-gray-800 px-4 py-3 flex justify-around items-center z-50 rounded-t-[32px] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              activeTab === "dashboard"
                ? "text-blue-500 scale-110"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl ${
                activeTab === "dashboard" ? "bg-blue-500/10" : ""
              }`}
            >
              <Activity size={22} />
            </div>
            <span className="text-[10px] font-bold tracking-tight">
              داشبورد
            </span>
          </button>

          <button
            onClick={() => setActiveTab("plan")}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              activeTab === "plan"
                ? "text-blue-500 scale-110"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl ${
                activeTab === "plan" ? "bg-blue-500/10" : ""
              }`}
            >
              <Calendar size={22} />
            </div>
            <span className="text-[10px] font-bold tracking-tight">برنامه</span>
          </button>

          <div className="relative -top-8">
            <button
              onClick={addWater}
              className="w-16 h-16 bg-gradient-to-tr from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(59,130,246,0.5)] text-white transition-all active:scale-90 active:rotate-12 border-[6px] border-gray-900"
            >
              <Droplet size={28} fill="white" />
            </button>
          </div>

          <button
            onClick={() => setActiveTab("progress")}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              activeTab === "progress"
                ? "text-blue-500 scale-110"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl ${
                activeTab === "progress" ? "bg-blue-500/10" : ""
              }`}
            >
              <TrendingDown size={22} />
            </div>
            <span className="text-[10px] font-bold tracking-tight">پیشرفت</span>
          </button>

          <button
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 text-gray-500 hover:text-gray-300`}
          >
            <div className="p-1.5 rounded-xl">
              <User size={22} />
            </div>
            <span className="text-[10px] font-bold tracking-tight">
              پروفایل
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
