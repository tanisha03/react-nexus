import { Play, Users, Zap } from "lucide-react"
import { Slide } from "./types"

// Export all slide components
export { Slide1 } from "./Slide1"
export { Slide2 } from "./Slide2"
export { Slide3 } from "./Slide3"
export { Slide4 } from "./Slide4"
export { Slide5 } from "./Slide5"

// Export types
export * from "./types"

// Slide data
export const slides: Slide[] = [
  {
    id: 1,
    type: "title",
    title: "Building Modern React Apps",
    subtitle: "Best Practices & Performance Tips",
    author: "Your Name",
    conference: "React Conference 2024",
  },
  {
    id: 2,
    type: "agenda",
    title: "What We'll Cover",
    items: [
      "Component Architecture",
      "State Management Patterns",
      "Performance Optimization",
      "Testing Strategies",
      "Real-world Examples",
    ],
  },
  {
    id: 3,
    type: "code",
    title: "Component Composition",
    subtitle: "Building reusable components",
    code: `// Clean component composition
function UserCard({ user, onEdit }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <Badge variant="secondary">{user.role}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {user.email}
        </p>
        <Button onClick={() => onEdit(user.id)} className="mt-4">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}`,
    points: ["Single responsibility principle", "Props for customization", "Consistent styling with shadcn/ui"],
  },
  {
    id: 4,
    type: "demo",
    title: "Live Demo",
    subtitle: "Interactive component showcase",
    component: "UserCardDemo",
  },
  {
    id: 5,
    type: "code",
    title: "Custom Hooks",
    subtitle: "Reusable logic patterns",
    code: `// Custom hook for API data
function useUserData(userId) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const response = await fetch(\`/api/users/\${userId}\`)
        const userData = await response.json()
        setUser(userData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (userId) fetchUser()
  }, [userId])

  return { user, loading, error }
}`,
    points: ["Encapsulate complex logic", "Easy to test and reuse", "Clean component code"],
  },
] 