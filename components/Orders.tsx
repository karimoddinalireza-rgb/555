import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileText, X } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { mockOrders } from '../services/mockData';

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const colors = {
    [OrderStatus.Pending]: 'bg-gray-100 text-gray-600',
    [OrderStatus.Planned]: 'bg-blue-100 text-blue-600',
    [OrderStatus.InProduction]: 'bg-amber-100 text-amber-600',
    [OrderStatus.QualityControl]: 'bg-purple-100 text-purple-600',
    [OrderStatus.Completed]: 'bg-green-100 text-green-600',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Order Form State
  const [formData, setFormData] = useState({
    customerName: '',
    productType: 'درب سکشنال صنعتی',
    width: '',
    height: '',
    quantity: 1,
    deliveryDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate simple ID
    const newId = `ORD-1403-${String(orders.length + 1).padStart(3, '0')}`;
    
    // Get current Persian date (approximation for demo)
    const today = new Date().toLocaleDateString('fa-IR');

    const newOrder: Order = {
      id: newId,
      customerName: formData.customerName,
      productType: formData.productType,
      dimensions: {
        width: Number(formData.width) || 0,
        height: Number(formData.height) || 0
      },
      quantity: Number(formData.quantity) || 1,
      orderDate: today,
      deliveryDate: formData.deliveryDate || today,
      status: OrderStatus.Pending,
      progress: 0
    };

    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
      customerName: '',
      productType: 'درب سکشنال صنعتی',
      width: '',
      height: '',
      quantity: 1,
      deliveryDate: ''
    });
  };

  const filteredOrders = orders.filter(order => 
    order.customerName.includes(searchTerm) || 
    order.id.includes(searchTerm)
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">مدیریت سفارشات</h2>
          <p className="text-gray-500 mt-1">لیست سفارشات تولید درب‌های سکشنال</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          <span>سفارش جدید</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="جستجو بر اساس نام مشتری یا شماره سفارش..." 
            className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm">
          <Filter size={16} />
          <span>فیلتر وضعیت</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">شماره سفارش</th>
                <th className="px-6 py-4">مشتری</th>
                <th className="px-6 py-4">نوع محصول</th>
                <th className="px-6 py-4">ابعاد (cm)</th>
                <th className="px-6 py-4">تاریخ تحویل</th>
                <th className="px-6 py-4">وضعیت</th>
                <th className="px-6 py-4">پیشرفت</th>
                <th className="px-6 py-4">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-600">{order.productType}</td>
                  <td className="px-6 py-4 text-gray-600" dir="ltr">{order.dimensions.width} x {order.dimensions.height}</td>
                  <td className="px-6 py-4 text-gray-600">{order.deliveryDate}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 w-20">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{order.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-blue-600 p-1">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    موردی یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-gray-500 text-xs text-center">
          نمایش {filteredOrders.length} سفارش
        </div>
      </div>

      {/* New Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">ثبت سفارش جدید</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام مشتری / پروژه</label>
                <input 
                  type="text" 
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="مثال: برج مسکونی آسمان"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع محصول</label>
                <select 
                  name="productType"
                  value={formData.productType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="درب سکشنال صنعتی">درب سکشنال صنعتی</option>
                  <option value="درب پارکینگی مسکونی">درب پارکینگی مسکونی</option>
                  <option value="درب سریع‌بازشو">درب سریع‌بازشو</option>
                  <option value="درب آتش‌نشانی">درب آتش‌نشانی</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عرض (cm)</label>
                  <input 
                    type="number" 
                    name="width"
                    required
                    min="100"
                    value={formData.width}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ارتفاع (cm)</label>
                  <input 
                    type="number" 
                    name="height"
                    required
                    min="100"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تعداد</label>
                  <input 
                    type="number" 
                    name="quantity"
                    required
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ تحویل</label>
                  <input 
                    type="text" 
                    name="deliveryDate"
                    required
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    placeholder="1403/05/20"
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  انصراف
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  ثبت سفارش
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;