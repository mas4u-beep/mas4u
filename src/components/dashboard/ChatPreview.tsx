import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Paperclip, Smile, Phone, Video, MoreVertical, Check, CheckCheck } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'client' | 'accountant'
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
  isSystem?: boolean
}

interface ChatContact {
  name: string
  role: string
  avatar?: string
  isOnline: boolean
}

interface ChatPreviewProps {
  contact?: ChatContact
  messages?: Message[]
  onOpenChat?: () => void
}

const defaultContact: ChatContact = {
  name: 'רו"ח אבי כהן',
  role: 'רואה חשבון ראשי',
  isOnline: true,
}

const defaultMessages: Message[] = [
  { id: '1', text: 'שלום! קיבלתי את מסמכי השכר שהעלית. תודה רבה.', sender: 'accountant', timestamp: '10:15', status: 'read' },
  { id: '2', text: 'מצוין! יש עוד משהו שצריך ממני?', sender: 'client', timestamp: '10:22', status: 'read' },
  { id: '3', text: 'כן, אשמח לקבל גם את דפי החשבון של חודש מאי ויוני עבור הדוח השנתי.', sender: 'accountant', timestamp: '10:24', status: 'read' },
  { id: '4', text: 'בסדר גמור, אעלה אותם עד מחר בבוקר.', sender: 'client', timestamp: '10:31', status: 'read' },
  { id: '5', text: 'תודה! נשלח לך תזכורת על מועד הגשת הדוח השנתי — 30 לספטמבר.', sender: 'accountant', timestamp: '11:05', status: 'delivered' },
]

const quickReplies = ['תודה רבה!', 'אני בבדיקה', 'אעשה זאת היום', 'נשוחח בטלפון?']

export default function ChatPreview({ contact = defaultContact, messages: initialMessages = defaultMessages, onOpenChat }: ChatPreviewProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'client',
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    }
    setMessages(prev => [...prev, newMsg])
    setInput('')

    // Simulate typing + reply
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'קיבלתי, אחזור אליך בהקדם.',
        sender: 'accountant',
        timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
      }])
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="rounded-2xl border bg-card shadow-sm flex flex-col overflow-hidden"
      style={{ maxHeight: 480 }}
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-card px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">
              {contact.name.split(' ').map(w => w[0]).join('').slice(0,2)}
            </div>
            {contact.isOnline && (
              <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
            )}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{contact.name}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {contact.isOnline ? (
                <><span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" /> מקוון</>
              ) : contact.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent transition-colors text-muted-foreground">
            <Phone className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent transition-colors text-muted-foreground">
            <Video className="h-4 w-4" />
          </button>
          <button onClick={onOpenChat} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent transition-colors text-muted-foreground">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-accent/20" style={{ minHeight: 0 }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
              msg.sender === 'client'
                ? 'bg-background border rounded-tr-sm text-foreground'
                : 'bg-primary text-primary-foreground rounded-tl-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}>
                <span className={`text-xs ${msg.sender === 'client' ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                  {msg.timestamp}
                </span>
                {msg.sender === 'client' && msg.status && (
                  msg.status === 'read'
                    ? <CheckCheck className="h-3 w-3 text-blue-400" />
                    : <Check className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        ))}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex justify-end"
            >
              <div className="bg-primary/20 rounded-2xl rounded-tl-sm px-4 py-2.5">
                <div className="flex gap-1 items-center h-4">
                  {[0,1,2].map(i => (
                    <motion.div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      <div className="flex gap-2 overflow-x-auto px-4 pt-3 pb-1">
        {quickReplies.map(r => (
          <button
            key={r}
            onClick={() => sendMessage(r)}
            className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {r}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t px-4 py-3">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Paperclip className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Smile className="h-4.5 w-4.5" style={{ width: '1.125rem', height: '1.125rem' }} />
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder="כתוב הודעה..."
          className="flex-1 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
            }
