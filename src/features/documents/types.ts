export type DocumentStatus = 'אושר' | 'ממתין' | 'בטיפול' | 'נדחה'

export type DocumentCategory = 'דוחות' | 'שכר' | 'מיסים' | 'מע"מ' | 'ביטוח לאומי' | 'חוזים' | 'אחר'

export interface Document {
    id: string
    name: string
    type: 'PDF' | 'XLSX' | 'DOCX' | 'JPG' | 'PNG'
    size: string
    sizeBytes: number
    date: Date
    category: DocumentCategory
    status: DocumentStatus
    uploadedBy: string
    clientId: string
    tags?: string[]
    notes?: string
}
