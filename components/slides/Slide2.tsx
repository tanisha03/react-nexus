import { AgendaSlide as AgendaSlideType } from "./types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface Slide2Props {
  slide: AgendaSlideType
}

export function Slide2({ slide }: Slide2Props) {
  const [message, setMessage] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [status, setStatus] = useState("idle")
  const [items, setItems] = useState<string[]>([])

 
  // setItems(slide.items)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setStatus("submitting")

    // Fake async submission
    setTimeout(() => {
      if (message.length > 100) {
        setStatus("too_long")
        toast({
          title: "Error",
          description: "Message is too long! Please keep it under 100 characters.",
          variant: "destructive",
        })
      } else {
        setStatus("submitted")
        toast({
          title: "Success",
          description: "Message submitted successfully!",
        })
      }
    }, 1000)
  }

  // Update char count when message changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    setCharCount(e.target.value.length)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {slide.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agenda Items */}
        <Card>
          <CardHeader>
            <CardTitle>Agenda Items</CardTitle>
            <CardDescription>What we'll cover today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Badge variant="secondary">{index + 1}</Badge>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>Share your thoughts with us</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}>
                <Textarea
                  value={message}
                  onChange={handleChange}
                  placeholder="Write something..."
                  className="min-h-[120px]"
                />
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Character count: {charCount}</span>
                  <span className={charCount > 100 ? "text-red-500" : ""}>
                    {100 - charCount} remaining
                  </span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={status === "submitting" || message.trim() === ""}
                className="w-full"
              >
                {status === "submitting" ? "Submitting..." : "Submit Message"}
              </Button>
            </form>

            {/* Status Messages */}
            {status === "submitting" && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
                Submitting your message...
              </div>
            )}
            {status === "too_long" && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                Message too long! Please keep it under 100 characters.
              </div>
            )}
            {status === "submitted" && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
                Submitted successfully ✅
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
