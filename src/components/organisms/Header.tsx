import { Link } from 'react-router-dom'
import { Menu, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DragonIcon, DragonTextLogo } from '@/components/atoms/icons'
import { NavLink } from '@/components/molecules/NavLink'
import { useScrollNavigation } from '@/hooks/useScrollNavigation'
import { navigationItems } from '@/config/navigation'
import { SPACING } from '@/lib/constants'
import { useAuth } from '@/hooks/useAuth'
import texts from '@/data/texts.json'

export function Header() {
  const { handleNavigation } = useScrollNavigation()
  const { user, signOut } = useAuth()

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    handleNavigation('/', 'top')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className={SPACING.container}>
        <div className="flex h-20 sm:h-24 md:h-28 items-center justify-between">
          <Link to="/" onClick={handleLogoClick} className={`flex items-center ${SPACING.gapSm}`}>
            <DragonIcon className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 fill-primary flex-shrink-0" />
            <DragonTextLogo className="h-8 sm:h-10 md:h-12 w-2/3 fill-primary flex-shrink-0" />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center ${SPACING.gapXs}`}>
            {navigationItems.map((item) => (
              <NavLink key={item.label} to={item.to} scrollTo={item.scrollTo}>
                {item.label}
              </NavLink>
            ))}

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <UserCircle className="h-5 w-5 text-primary" />
                  <span className="max-w-[150px] truncate">{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  {texts.navigation.logout}
                </Button>
              </div>
            ) : (
              <NavLink to="/login" className="ml-4">
                <Button variant="default" size="sm">
                  {texts.navigation.login}
                </Button>
              </NavLink>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="lg:hidden hover:text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className={`flex flex-col ${SPACING.gapSm} ${SPACING.marginTopMd}`}>
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    scrollTo={item.scrollTo}
                    className="text-xl font-medium text-card hover:text-primary transition-colors"
                  >
                    {item.label}
                  </NavLink>
                ))}

                <div className="border-t border-border mt-4 pt-4">
                  {user ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-lg font-medium">
                        <UserCircle className="h-6 w-6 text-primary" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <Button variant="outline" onClick={() => signOut()}>
                        {texts.navigation.logout}
                      </Button>
                    </div>
                  ) : (
                    <NavLink
                      to="/login"
                      className="text-xl font-medium text-card hover:text-primary transition-colors"
                    >
                      {texts.navigation.login}
                    </NavLink>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
