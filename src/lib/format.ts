export const formatCurrency = (amount: number, currency: string = 'EGP'): string => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('ar-EG')
}

export const generateInvoiceNumber = (lastNumber: number): string => {
  return `INV-${String(lastNumber + 1).padStart(4, '0')}`
}

export const calculateItemTotal = (qty: number, price: number, discount: number = 0): number => {
  const total = qty * price
  return total - (total * discount / 100)
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'PAID': return '#2e7d32'
    case 'UNPAID': return '#d32f2f'
    case 'PARTIAL': return '#f57c00'
    case 'DRAFT': return '#6c757d'
    default: return '#6c757d'
  }
}

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'PAID': return '??????'
    case 'UNPAID': return '??? ??????'
    case 'PARTIAL': return '?????'
    case 'DRAFT': return '?????'
    default: return status
  }
}
