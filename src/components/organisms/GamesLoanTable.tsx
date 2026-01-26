import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, BookOpen, RotateCcw } from 'lucide-react'

interface Game {
  id: number
  nombre: string
  estado: 'Disponible' | 'En préstamo'
  prestado_a_id: string | null
  perfiles: {
    nombre_completo: string | null
  } | null
}

export function GamesLoanTable() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchGames = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('juegos_mesa')
      .select('*, perfiles(nombre_completo)')
      .order('nombre', { ascending: true })

    if (error) {
      console.error('Error fetching games:', error)
      toast({
        variant: 'destructive',
        title: 'Error al cargar juegos',
        description: error.message,
      })
    } else {
      setGames(data as any[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const handleAction = async (game: Game) => {
    if (!user) return
    setActionLoading(game.id)

    const isBorrowing = game.estado === 'Disponible'

    const { error } = await supabase
      .from('juegos_mesa')
      .update({
        estado: isBorrowing ? 'En préstamo' : 'Disponible',
        prestado_a_id: isBorrowing ? user.id : null,
        ultima_modificacion: new Date().toISOString()
      })
      .eq('id', game.id)

    if (error) {
      toast({
        variant: 'destructive',
        title: isBorrowing ? 'Error al pedir prestado' : 'Error al devolver',
        description: error.message,
      })
    } else {
      toast({
        title: isBorrowing ? '¡Juego prestado!' : 'Juego devuelto',
        description: isBorrowing
          ? `Disfruta de ${game.nombre}. Recuerda cuidarlo.`
          : `${game.nombre} ya está disponible para otros socios.`,
      })
      await fetchGames()
    }
    setActionLoading(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="text-secondary font-bold">Juego</TableHead>
            <TableHead className="text-secondary font-bold">Estado</TableHead>
            <TableHead className="text-secondary font-bold">Socio</TableHead>
            <TableHead className="text-right text-secondary font-bold">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No hay juegos registrados en el sistema.
              </TableCell>
            </TableRow>
          ) : (
            games.map((game) => (
              <TableRow key={game.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-white">{game.nombre}</TableCell>
                <TableCell>
                  <Badge
                    variant={game.estado === 'Disponible' ? 'default' : 'outline'}
                    className={game.estado === 'Disponible' ? 'bg-primary hover:bg-primary/90' : 'border-secondary text-secondary'}
                  >
                    {game.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {game.estado === 'En préstamo'
                    ? (game.perfiles?.nombre_completo || 'Socio desconocido')
                    : '-'}
                </TableCell>
                <TableCell className="text-right">
                  {game.estado === 'Disponible' ? (
                    <Button
                      size="sm"
                      onClick={() => handleAction(game)}
                      disabled={actionLoading === game.id}
                      className="gap-2"
                    >
                      {actionLoading === game.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
                      Pedir
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(game)}
                      disabled={actionLoading === game.id || game.prestado_a_id !== user?.id}
                      className="gap-2 border-secondary text-secondary hover:bg-secondary/10"
                    >
                      {actionLoading === game.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                      Devolver
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
