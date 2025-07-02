"use client"

import { useState } from "react"
import { Plus, Trash2, CheckCircle, Circle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CodeSlide as CodeSlideType } from "./types"

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

interface Slide3Props {
  slide: CodeSlideType
}

export function Slide3({ slide }: Slide3Props) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTodos(prev => [todo, ...prev])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : undefined
        }
      }
      return todo
    }))
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {slide.title}
        </h1>
        <p className="text-xl text-slate-600">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Todo List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Todo List
            </CardTitle>
            <CardDescription>Manage your tasks efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Todo Form */}
            <div className="flex gap-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1"
              />
              <Button onClick={addTodo} disabled={!newTodo.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All ({todos.length})
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
              >
                Active ({activeCount})
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("completed")}
              >
                Completed ({completedCount})
              </Button>
            </div>

            <Separator />

            {/* Todo Items */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  {filter === "all" ? "No todos yet. Add one above!" : 
                   filter === "active" ? "No active todos!" : "No completed todos!"}
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                      todo.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="mt-1"
                    >
                      {todo.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        todo.completed ? 'line-through text-slate-500' : 'text-slate-700'
                      }`}>
                        {todo.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">
                          Created: {formatTime(todo.createdAt)}
                        </span>
                        {todo.completedAt && (
                          <>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-green-600">
                              Completed: {formatTime(todo.completedAt)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 