import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Brain, TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { analyzeProductionData } from '../services/geminiService';
import { mockOrders, mockTasks } from '../services/mockData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const dataProduction = [
  { name: 'فروردین', quantity: 40 },
  { name: 'اردیبهشت', quantity: 55 },
  { name: 'خرداد', quantity: 35 },
  { name: 'تیر', quantity: 60 },
  { name: 'مرداد', quantity: 70 },
];

const dataEfficiency = [
  { name: 'برش', value: 85 },
  { name: 'مونتاژ', value: 72 },
  { name: 'رنگ', value: 90 },
  { name: 'بسته‌بندی', value: 95 },
];

const dataCostBreakdown = [
  { name: 'مواد اولیه', value: 65 },
  { name: 'سربار', value: 15 },
  { name: 'دستمزد', value: 20 },
];

const KPICard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-green-500 font-medium flex items-center gap-1">
        <TrendingUp size={14} />
        {sub}
      </span>
      <span className="text-gray-400 mr-2">نسبت به ماه قبل</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAiAnalysis = async () => {
    setLoadingAi(true);
    const result = await analyzeProductionData(mockOrders, mockTasks);
    setAiAnalysis(result);
    setLoadingAi(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">داشبورد عملکرد</h2>
          <p className="text-gray-500 mt-1">نمای کلی وضعیت تولید کارخانه رنا</p>
        </div>
        <button 
          onClick={handleAiAnalysis}
          disabled={loadingAi}
          className="flex items-center gap-2 bg-gradient-to-l from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg shadow hover:shadow-lg transition-all disabled:opacity-70"
        >
          <Brain size={18} />
          {loadingAi ? 'در حال تحلیل...' : 'تحلیل هوشمند (Gemini AI)'}
        </button>
      </div>

      {/* AI Insight Box */}
      {aiAnalysis && (
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Brain className="text-indigo-600" size={20}/>
                گزارش تحلیلگر هوشمند
            </h4>
            <p className="text-indigo-800 leading-relaxed text-sm text-justify whitespace-pre-line">
                {aiAnalysis}
            </p>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="تولید ماه جاری" value="125 درب" sub="+12%" icon={CheckCircle} color="bg-blue-600" />
        <KPICard title="میانگین راندمان" value="82%" sub="+3.5%" icon={TrendingUp} color="bg-green-500" />
        <KPICard title="زمان توقفات" value="14 ساعت" sub="-5%" icon={AlertTriangle} color="bg-amber-500" />
        <KPICard title="میانگین زمان تولید" value="3.5 روز" sub="-8%" icon={Clock} color="bg-purple-500" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-gray-800 mb-6">روند تولید (تعداد درب)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataProduction}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{fill: '#f3f4f6'}}
                />
                <Bar dataKey="quantity" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">ترکیب بهای تمام شده</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataCostBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataCostBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-6">راندمان ایستگاه‌های کاری</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataEfficiency}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;