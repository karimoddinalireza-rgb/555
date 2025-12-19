export enum OrderStatus {
  Pending = 'در انتظار',
  Planned = 'برنامه‌ریزی شده',
  InProduction = 'در حال تولید',
  QualityControl = 'کنترل کیفیت',
  Completed = 'تکمیل شده'
}

export interface ProductDimensions {
  width: number; // cm
  height: number; // cm
}

export interface Order {
  id: string;
  customerName: string;
  productType: string; // e.g., "درب سکشنال صنعتی", "درب پارکینگی"
  dimensions: ProductDimensions;
  quantity: number;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatus;
  progress: number; // 0-100
}

export interface BOMItem {
  id: string;
  name: string;
  unit: string;
  quantityPerUnit: number; // Formula based
  unitCost: number; // Tomans
  totalCost: number;
  category: 'Raw Material' | 'Hardware' | 'Motor' | 'Labor';
}

export interface ProductionTask {
  id: string;
  orderId: string;
  station: 'Cutting' | 'Assembly' | 'Painting' | 'Packaging';
  stationName: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Done';
  estimatedTime: number; // minutes
  actualTime?: number;
}

export interface CostingReport {
  orderId: string;
  materialCost: number;
  laborCost: number;
  overheadCost: number;
  totalCost: number;
  margin: number;
}

export interface DashboardMetric {
  name: string;
  value: number;
  unit: string;
  trend: number; // percentage change
}