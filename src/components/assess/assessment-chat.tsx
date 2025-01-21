'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AssessmentChatProps {
  zipCode: string
  selectedFactor: string
}

export default function AssessmentChat({ zipCode, selectedFactor }: AssessmentChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // Here you would integrate your ChatGPT API call
      // const response = await yourChatGPTFunction(userMessage, zipCode, selectedFactor)
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000))
      const simulatedResponse = `Here's some information about ${selectedFactor} in ZIP code ${zipCode}: [Your API response would go here]`
      
      setMessages(prev => [...prev, { role: 'assistant', content: simulatedResponse }])
    } catch (error) {
      console.error('Error getting chat response:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try asking your question again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg h-[800px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-[#2c4547]">Ask about your community</h2>
        <p className="text-sm text-[#536b6f]">
          Ask questions about {selectedFactor} in {zipCode}
        </p>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-[#87A6A8] text-white'
                  : 'bg-[#DFE5E4] text-[#2c4547]'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#DFE5E4] text-[#2c4547] p-3 rounded-lg">
              <Loader className="h-5 w-5 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask about ${selectedFactor} in your area...`}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87A6A8]"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className={`p-2 rounded-lg ${
              isLoading || !inputMessage.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#87A6A8] hover:bg-[#6B8A8C] text-white'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}