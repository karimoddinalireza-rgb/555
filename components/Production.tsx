import React from 'react';
import { Calendar, User, Clock, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { mockTasks } from '../services/mockData';

const TaskCard = ({ task }: any) => {
  const statusColor = {
    'Pending': 'text-gray-400',
    'In Progress': 'text-amber-500',
    'Done': 'text-green-500'
  };

  const statusBg = {
    'Pending': 'bg-gray-50 border-gray-200',
    'In Progress': 'bg-amber-50 border-amber-200',
    'Done': 'bg-green-50 border-green-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${statusBg[task.status]} mb-3 transition-transform hover:scale-[1.01]`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-800">{task.stationName}</h4>
        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white border ${statusColor[task.status]}`}>
          {task.status === 'Done' ? 'تکمیل شده' : task.status === 'In Progress' ? 'در حال انجام' : 'در انتظار'}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
         <span className="font-mono bg-white px-1 rounded border border-gray-100 text-xs">{task.orderId}</span>
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200/50">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <User size={14} />
          {task.assignedTo}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={14} />
          {task.estimatedTime} دقیقه
        </div>
      </div>
    </div>
  );
};

const Production: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">برنامه‌ریزی و کنترل تولید</h2>
          <p className="text-gray-500 mt-1">مدیریت ایستگاه‌های کاری و دستور کارهای فعال</p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border border-gray-200">
            <button className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">نمای ستونی</button>
            <button className="px-4 py-1.5 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium">گانت چارت</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] overflow-hidden">
        {/* Column 1: Pending */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2 rounded-t-xl">
             <Circle size={18} className="text-gray-400" />
             <h3 className="font-bold text-gray-700">صف انتظار</h3>
             <span className="mr-auto bg-gray-200 text-gray-700 px-2 rounded-full text-xs">1</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 bg-gray-50/50">
             {mockTasks.filter(t => t.status === 'Pending').map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>

        {/* Column 2: Cutting Station */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 bg-blue-50 flex items-center gap-2 rounded-t-xl">
             <PlayCircle size={18} className="text-blue-500" />
             <h3 className="font-bold text-gray-700">برش پنل‌ها</h3>
             <span className="mr-auto bg-blue-200 text-blue-800 px-2 rounded-full text-xs">1</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 bg-gray-50/50">
             {mockTasks.filter(t => t.station === 'Cutting' && t.status !== 'Pending').map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>

        {/* Column 3: Assembly Station */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 bg-amber-50 flex items-center gap-2 rounded-t-xl">
             <PlayCircle size={18} className="text-amber-500" />
             <h3 className="font-bold text-gray-700">مونتاژ یراق‌آلات</h3>
             <span className="mr-auto bg-amber-200 text-amber-800 px-2 rounded-full text-xs">1</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 bg-gray-50/50">
             {mockTasks.filter(t => t.station === 'Assembly' && t.status !== 'Pending').map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>

        {/* Column 4: Completed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 bg-green-50 flex items-center gap-2 rounded-t-xl">
             <CheckCircle size={18} className="text-green-500" />
             <h3 className="font-bold text-gray-700">تکمیل شده</h3>
             <span className="mr-auto bg-green-200 text-green-800 px-2 rounded-full text-xs">1</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 bg-gray-50/50">
              {mockTasks.filter(t => t.status === 'Done').map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Production;