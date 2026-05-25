import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, FileText, Image, X, CheckCircle, AlertCircle, CloudUpload } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'done' | 'error'
  progress: number
}

interface QuickUploadProps {
  onUpload?: (files: File[]) => void
  accept?: string
  maxSize?: number
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return Image
  if (type === 'application/pdf' || type.includes('text')) return FileText
  return File
}

export default function QuickUpload({ onUpload, accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.png', maxSize = 10 }: QuickUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const processFiles = useCallback((rawFiles: FileList | File[]) => {
    const arr = Array.from(rawFiles)
    const newFiles: UploadedFile[] = arr.map(f => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: f.size,
      type: f.type,
      status: 'uploading',
      progress: 0,
    }))
    setFiles(prev => [...prev, ...newFiles])
    onUpload?.(arr)

    // Simulate upload progress
    newFiles.forEach(file => {
      let progress = 0
      const timer = setInterval(() => {
        progress += Math.random() * 20 + 10
        if (progress >= 100) {
          progress = 100
          clearInterval(timer)
          setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'done', progress: 100 } : f))
        } else {
          setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress } : f))
        }
      }, 200)
    })
  }, [onUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files)
  }, [processFiles])

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-2xl border bg-card shadow-sm"
      dir="rtl"
    >
      <div className="flex items-center gap-2 border-b p-5">
        <CloudUpload className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">העלאת מסמכים</h2>
      </div>
      <div className="p-5 space-y-4">
        {/* Drop zone */}
        <motion.div
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          animate={{ borderColor: isDragging ? 'hsl(var(--primary))' : 'hsl(var(--border))', backgroundColor: isDragging ? 'hsl(var(--primary) / 0.05)' : 'transparent' }}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors hover:bg-accent/40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">גררו קבצים לכאן</p>
            <p className="text-sm text-muted-foreground mt-1">או לחצו לבחירת קבצים</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, Word, Excel, תמונות · עד {maxSize}MB</p>
          </div>
        </motion.div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />

        {/* File list */}
        <AnimatePresence>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file) => {
                const Icon = getFileIcon(file.type)
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-lg border bg-muted/30 px-3 py-2.5 overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <div className="flex items-center gap-1.5 mr-2 shrink-0">
                            <span className="text-xs text-muted-foreground">{formatSize(file.size)}</span>
                            {file.status === 'done' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {file.status === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                            <button onClick={() => removeFile(file.id)} className="text-muted-foreground hover:text-foreground">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        {file.status === 'uploading' && (
                          <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${file.progress}%` }}
                              className="h-full rounded-full bg-primary"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Quick type buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          {['חשבונית', 'תלוש שכר', 'דוח בנק', 'קבלה', 'חוזה'].map(type => (
            <button key={type} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              {type}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
                              }
