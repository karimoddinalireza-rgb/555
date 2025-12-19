import React, { useState, useEffect } from 'react';
import { Calculator, Save, AlertCircle } from 'lucide-react';
import { BOMItem } from '../types';
import { generateBOMForOrder } from '../services/mockData';

const BOM: React.FC = () => {
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [bomItems, setBomItems] = useState<BOMItem[]>([]);

  useEffect(() => {
    // Auto calculate BOM on dimension change
    setBomItems(generateBOMForOrder(width, height));
  }, [width, height]);

  const totalCost = bomItems.reduce((acc, item) => acc + item.totalCost, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 text-gray-800">
            <Calculator size={20} className="text-blue-600" />
            <h3 className="font-bold text-lg">محاسبه‌گر BOM</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عرض دهانه (سانتی‌متر)</label>
              <input 
                type="number" 
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ارتفاع دهانه (سانتی‌متر)</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div className="pt-4 border-t border-gray-100 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">تعداد پنل تخمینی:</span>
                <span className="font-bold text-gray-800">{Math.ceil(height / 50)} عدد</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">مساحت کل:</span>
                <span className="font-bold text-gray-800">{(width * height / 10000).toFixed(2)} متر مربع</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-2">
               <Save size={18} />
               ذخیره در بانک اطلاعاتی
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
          <AlertCircle className="text-blue-600 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-blue-800 text-sm mb-1">نکته فنی</h4>
            <p className="text-blue-700 text-xs leading-relaxed">
              برای درب‌های با عرض بالای 450 سانتی‌متر، استفاده از پروفیل تقویتی (Strut) الزامی است که در لیست زیر به صورت خودکار لحاظ نشده است.
            </p>
          </div>
        </div>
      </div>

      {/* BOM Table */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">لیست مواد و قطعات (BOM)</h3>
            <div className="text-lg font-bold text-blue-600">
               هزینه برآوردی: {totalCost.toLocaleString()} تومان
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3">نام قطعه / متریال</th>
                  <th className="px-6 py-3">دسته بندی</th>
                  <th className="px-6 py-3">واحد</th>
                  <th className="px-6 py-3">مقدار مصرفی</th>
                  <th className="px-6 py-3">قیمت واحد</th>
                  <th className="px-6 py-3">قیمت کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bomItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-800">{item.name}</td>
                    <td className="px-6 py-3">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{item.category}</span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{item.unit}</td>
                    <td className="px-6 py-3 font-mono text-blue-600 font-semibold">{item.quantityPerUnit.toFixed(2)}</td>
                    <td className="px-6 py-3 text-gray-600">{item.unitCost.toLocaleString()}</td>
                    <td className="px-6 py-3 font-medium text-gray-800">{item.totalCost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-bold text-gray-800">
                <tr>
                    <td colSpan={5} className="px-6 py-4 text-left pl-12">جمع کل</td>
                    <td className="px-6 py-4 text-blue-700">{totalCost.toLocaleString()} تومان</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOM;