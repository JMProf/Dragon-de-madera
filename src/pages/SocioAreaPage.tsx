import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { GamesLoanTable } from '@/components/organisms/GamesLoanTable'
import { SPACING } from '@/lib/constants'
import { SectionHeading } from '@/components/organisms/SectionHeading'
import texts from '@/data/texts.json'

export function SocioAreaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <div className={`${SPACING.container} ${SPACING.padYMd}`}>
          <div className="max-w-4xl mx-auto space-y-8">
            <header className="space-y-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary font-display">
                {texts.navigation.memberArea}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Bienvenido al área privada. Aquí puedes gestionar tus préstamos de la ludoteca
                y ver quién tiene cada juego en este momento.
              </p>
            </header>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary font-display">
                  Gestión de Préstamos
                </h2>
              </div>

              <GamesLoanTable />

              <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-lg">
                <p className="text-sm text-secondary-foreground">
                  <strong>Nota sobre préstamos:</strong> Recuerda devolver los juegos antes de la
                  fecha acordada o cuando termines tu sesión en el club para que otros socios
                  puedan disfrutarlos.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
