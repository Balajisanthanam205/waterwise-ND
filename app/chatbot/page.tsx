"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, BotIcon, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarTrigger } from "@/components/ui/sidebar"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatbotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your water management assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your recent water usage, I recommend reducing shower time by 2 minutes to save approximately 20 liters per day.",
        "Your kitchen tap is using 15% more water than average. Consider installing a water-saving aerator.",
        "I've detected unusual water usage patterns at night. This might indicate a leak in your system.",
        "Your water usage is 12% below the average for similar households. Great job conserving water!",
        "Would you like me to analyze your water usage patterns for the past week?",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-3xl font-bold tracking-tight">AI Water Assistant</h2>
        </div>
      </div>

      <Card className="h-[calc(100vh-10rem)]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BotIcon className="mr-2 h-5 w-5 text-blue-600" />
            Water Management Assistant
          </CardTitle>
          <CardDescription>Ask questions about your water usage, get tips, or report issues</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-16rem)] px-4">
            <div className="space-y-4 pt-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex max-w-[80%] items-start space-x-2 ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className={message.role === "assistant" ? "bg-blue-100" : "bg-gray-100"}>
                      <AvatarFallback>
                        {message.role === "assistant" ? <BotIcon className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "assistant"
                            ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                            : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{formatTime(message.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] items-start space-x-2">
                    <Avatar className="bg-blue-100">
                      <AvatarFallback>
                        <BotIcon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSend} className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
