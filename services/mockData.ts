import { Order, OrderStatus, ProductionTask, BOMItem } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-1403-001',
    customerName: 'پروژه برج میلاد',
    productType: 'درب سکشنال صنعتی',
    dimensions: { width: 400, height: 450 },
    quantity: 2,
    orderDate: '1403/02/10',
    deliveryDate: '1403/02/25',
    status: OrderStatus.InProduction,
    progress: 65,
  },
  {
    id: 'ORD-1403-002',
    customerName: 'مجتمع مسکونی پارس',
    productType: 'درب پارکینگی مسکونی',
    dimensions: { width: 280, height: 220 },
    quantity: 15,
    orderDate: '1403/02/12',
    deliveryDate: '1403/03/01',
    status: OrderStatus.Planned,
    progress: 0,
  },
  {
    id: 'ORD-1403-003',
    customerName: 'کارخانه فولاد',
    productType: 'درب سریع‌بازشو',
    dimensions: { width: 500, height: 500 },
    quantity: 1,
    orderDate: '1403/02/05',
    deliveryDate: '1403/02/20',
    status: OrderStatus.Completed,
    progress: 100,
  },
];

export const generateBOMForOrder = (width: number, height: number): BOMItem[] => {
  // Simple logic to simulate BOM calculation based on dimensions
  const area = (width * height) / 10000; // m2
  const panelCount = Math.ceil(height / 50); // Assuming 50cm panels
  
  const items: BOMItem[] = [
    { id: 'mat-01', name: 'پنل ساندویچی پلی‌اورتان', unit: 'متر', quantityPerUnit: height / 100 * (width/100), unitCost: 1500000, totalCost: 0, category: 'Raw Material' },
    { id: 'mat-02', name: 'ریل گالوانیزه عمودی', unit: 'شاخه', quantityPerUnit: 2, unitCost: 800000, totalCost: 0, category: 'Hardware' },
    { id: 'mat-03', name: 'فنر پیچشی (Torsion Spring)', unit: 'عدد', quantityPerUnit: 2, unitCost: 2500000, totalCost: 0, category: 'Hardware' },
    { id: 'mat-04', name: 'موتور ساید صنعتی', unit: 'دستگاه', quantityPerUnit: 1, unitCost: 12000000, totalCost: 0, category: 'Motor' },
    { id: 'lab-01', name: 'نیروی مونتاژ', unit: 'ساعت', quantityPerUnit: 4, unitCost: 200000, totalCost: 0, category: 'Labor' },
  ];

  return items.map(item => ({
    ...item,
    totalCost: item.quantityPerUnit * item.unitCost
  }));
};

export const mockTasks: ProductionTask[] = [
  { id: 'task-1', orderId: 'ORD-1403-001', station: 'Cutting', stationName: 'برش پنل', assignedTo: 'علی رضایی', status: 'Done', estimatedTime: 120 },
  { id: 'task-2', orderId: 'ORD-1403-001', station: 'Assembly', stationName: 'مونتاژ یراق‌آلات', assignedTo: 'حسن احمدی', status: 'In Progress', estimatedTime: 240 },
  { id: 'task-3', orderId: 'ORD-1403-002', station: 'Cutting', stationName: 'برش پنل', assignedTo: 'محسن کریمی', status: 'Pending', estimatedTime: 600 },
];