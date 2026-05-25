// Tools feature exports - financial calculators
export type { VATCalculation, SalaryCalculation, TaxEstimate } from './types'

// VAT Calculator utility
export function calculateVAT(amount: number, vatRate = 17, direction: 'add' | 'extract' = 'add') {
  if (direction === 'add') {
    const vatAmount = amount * (vatRate / 100)
    return { amount, vatRate, vatAmount, total: amount + vatAmount, direction }
  } else {
    const total = amount
    const amountBeforeVAT = total / (1 + vatRate / 100)
    const vatAmount = total - amountBeforeVAT
    return { amount: amountBeforeVAT, vatRate, vatAmount, total, direction }
  }
}
