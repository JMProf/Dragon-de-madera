import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { useToast } from '@/components/ui/use-toast'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: error.message,
      })
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-secondary font-display">
              Acceso al Club
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Gestiona tu cuenta del Dragón de Madera
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-secondary font-medium">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-white bg-card border-border placeholder:text-muted-foreground/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-secondary font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-white bg-card border-border placeholder:text-muted-foreground/50 font-sans"
                  required
                />
              </div>
              <Button type="submit" className="w-full font-display text-lg py-6" disabled={loading}>
                {loading ? 'Cargando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground italic text-center text-balance">
              Al acceder, aceptas nuestras normas de convivencia del club.
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
