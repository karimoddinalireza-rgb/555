import React from 'react';
import { DollarSign, PieChart as PieIcon, TrendingDown, FileText } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'ORD-001', material: 45000000, labor: 12000000, overhead: 5000000 },
  { name: 'ORD-002', material: 32000000, labor: 8000000, overhead: 3500000 },
  { name: 'ORD-003', material: 78000000, labor: 20000000, overhead: 9000000 },
];

const Costing: React.FC = () => {
  return (
    <div className="space-y-6">
       <div>
          <h2 className="text-2xl font-bold text-gray-800">بهای تمام شده و گزارشات مالی</h2>
          <p className="text-gray-500 mt-1">تحلیل سودآوری و هزینه سفارشات تکمیل شده</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">هزینه کل مواد (ماه جاری)</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">1.2 میلیارد <span className="text-sm font-normal text-gray-500">تومان</span></h3>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                    <DollarSign size={24} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">هزینه دستمزد مستقیم</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">450 میلیون <span className="text-sm font-normal text-gray-500">تومان</span></h3>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                    <UserIcon size={24} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">حاشیه سود میانگین</p>
                    <h3 className="text-2xl font-bold text-green-600 mt-1">22%</h3>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-green-600">
                    <TrendingDown size={24} className="transform rotate-180" />
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">تحلیل هزینه سفارشات اخیر (تومان)</h3>
                <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
                    <FileText size={16} />
                    دانلود اکسل
                </button>
            </div>
            <div className="h-80 w-full" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={40}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(val) => `${val/1000000}M`} />
                        <Tooltip 
                            formatter={(value: number) => value.toLocaleString()}
                            cursor={{fill: '#f9fafb'}}
                        />
                        <Bar dataKey="material" name="مواد اولیه" stackId="a" fill="#3b82f6" />
                        <Bar dataKey="labor" name="دستمزد" stackId="a" fill="#8b5cf6" />
                        <Bar dataKey="overhead" name="سربار" stackId="a" fill="#f59e0b" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    مواد اولیه
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    دستمزد
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    سربار تولید
                </div>
            </div>
        </div>
    </div>
  );
};

// Helper component for icon
const UserIcon = ({size, className}: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default Costing;