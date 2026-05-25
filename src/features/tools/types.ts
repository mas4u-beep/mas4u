export interface VATCalculation {
  amount: number
  vatRate: number
  vatAmount: number
  total: number
  direction: 'add' | 'extract'
}

export interface SalaryCalculation {
  grossSalary: number
  incomeTax: number
  nationalInsurance: number
  healthInsurance: number
  pensionEmployee: number
  netSalary: number
}

export interface TaxEstimate {
  annualIncome: number
  exemptions: number
  taxableIncome: number
  estimatedTax: number
  effectiveRate: number
}
