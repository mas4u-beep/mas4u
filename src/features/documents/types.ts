export type DocumentStatus = '×××©××' | '×××ª××' | '××××¤××' | '××××'

export type DocumentCategory = '×××××ª' | '×©××¨' | '××¡××' | '××¢"×' | '××©××× ×××ª' | '×××××' | '×××¨'

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
