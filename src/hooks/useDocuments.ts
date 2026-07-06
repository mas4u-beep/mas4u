import { useState, useCallback } from 'react'
import type { Document, DocumentCategory, DocumentStatus } from '@/features/documents/types'

interface UseDocumentsOptions {
    clientId?: string
}

export function useDocuments(_options?: UseDocumentsOptions) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

  const uploadDocument = useCallback(async (_file: File, _metadata: Partial<Document>) => {
        setIsLoading(true)
        try {
                // TODO: implement upload API call
          await new Promise(r => setTimeout(r, 1000))
                setIsLoading(false)
                return true
        } catch (e) {
                setError('שגיאה בהעלאת הקובץ')
                setIsLoading(false)
                return false
        }
  }, [])

  const downloadDocument = useCallback(async (_id: string) => {
        // TODO: implement download
  }, [])

  return {
        isLoading,
        error,
        uploadDocument,
        downloadDocument,
  }
}
