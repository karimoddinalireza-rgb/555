import { GoogleGenAI } from "@google/genai";
import { Order, ProductionTask } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeProductionData = async (orders: Order[], tasks: ProductionTask[]): Promise<string> => {
  if (!apiKey) return "کلید API تنظیم نشده است.";

  const prompt = `
    به عنوان یک مدیر تولید ارشد در شرکت "رنا" (تولید کننده درب‌های سکشنال)، داده‌های زیر را تحلیل کن و یک گزارش مدیریتی کوتاه (حداکثر 3 پاراگراف) به زبان فارسی بنویس.
    تمرکز بر گلوگاه‌ها، راندمان و پیشنهاد برای بهبود باشد.
    
    سفارشات:
    ${JSON.stringify(orders.map(o => ({ type: o.productType, status: o.status, progress: o.progress })))}
    
    وظایف جاری:
    ${JSON.stringify(tasks.map(t => ({ station: t.stationName, status: t.status, estTime: t.estimatedTime })))}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "خطا در دریافت تحلیل.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "خطا در ارتباط با هوش مصنوعی.";
  }
};