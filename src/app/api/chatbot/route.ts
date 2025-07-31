import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: string
  content: string
}

interface ChatRequest {
  query: string
  message_history?: Message[]
  file?: string | null
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    
    if (!body.query?.trim()) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    const backendUrl = process.env.NODE_ENV === 'development' 
      ? 'http://127.0.0.1:8000/api/chat'
      : (process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000/api/chat')

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: body.query,
        message_history: body.message_history || [],
        file: body.file || null
      }),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Error in chat API route:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Chat API is running',
    timestamp: new Date().toISOString()
  })
}