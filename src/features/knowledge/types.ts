export type ArticleCategory = 'מס הכנסה' | 'מע"מ' | 'תקנות' | 'ביטוח לאומי' | 'שכר' | 'חדשות' | 'כללי'

export interface Article {
    id: string
    title: string
    summary: string
    content: string
    category: ArticleCategory
    tags: string[]
    readTimeMinutes: number
    publishedAt: Date
    updatedAt: Date
    author: string
    featured?: boolean
}
