export interface User {
  uid: string
  email: string | null
}

export interface Customer {
  id: string
  name: string
  phone?: string
  email?: string
  address?: string
  totalBilled: number
  totalPaid: number
  balanceDue: number
  createdAt: any
  updatedAt: any
}

export interface Product {
  id: string
  name: string
  price: number
  qty: number | null
  minQty: number | null
  isActive: boolean
  createdAt: any
  updatedAt: any
}

export interface Expense {
  id: string
  amount: number
  category: string
  date: string
  note?: string
  createdAt: any
}

export interface InvoiceItem {
  name: string
  qty: number
  price: number
  discount: number
  total: number
}

export type InvoiceStatus = 'DRAFT' | 'UNPAID' | 'PARTIAL' | 'PAID'
export type PaymentType = 'CASH' | 'CREDIT'
export type Currency = 'EGP' | 'SAR' | 'AED' | 'USD'

export interface Invoice {
  id: string
  invoiceNumber: string
  customerId: string
  customerName: string
  date: string
  dueDate: string
  items: InvoiceItem[]
  subTotal: number
  total: number
  paid: number
  balance: number
  status: InvoiceStatus
  paymentType: PaymentType
  currency: Currency
  notes?: string
  createdAt: any
  updatedAt: any
}
