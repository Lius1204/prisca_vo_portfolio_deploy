import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { NAV } from '@/config/site'
import { EASE, cn } from '@/lib/utils'
import logoMark from '@/assets/logo-mark.png'
import LanguageSwitcher from './LanguageSwitcher'

function Brand() {
  const { t } = useTranslation()
  return (
    <Link to="/" aria-label={t('brand.home')} className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        width="36"
        height="36"
        className="size-8 shrink-0 object-contain md:size-9"
      />
      <span className="text-lg font-extrabold tracking-tight text-navy">{t('brand.name')}</span>
      <span aria-hidden="true" className="hidden h-5 w-px bg-lime md:block xl:hidden" />
      <span className="hidden text-xs font-semibold text-navy-600 md:block xl:hidden">{t('brand.suffix')}</span>
    </Link>
  )
}

/**
 * Sliding underline measured inside the <ul> (offsetLeft/offsetWidth), not with layoutId.
 * layoutId measures page coordinates; in a sticky header a scroll change during the
 * language re-render (shorter page -> scrollY clamps) made the underline fly in vertically.
 */
function DesktopNav() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const listRef = useRef(null)
  const [bar, setBar] = useState(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const active = list.querySelector('a[aria-current="page"]')
      // inset-x-3 of the old underline = the link's px-3 padding (12px each side)
      setBar(active ? { x: active.offsetLeft + 12, width: active.offsetWidth - 24 } : null)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [pathname, i18n.resolvedLanguage])

  return (
    <nav aria-label={t('nav.primary')} className="hidden xl:block">
      <ul ref={listRef} className="relative flex items-center">
        {NAV.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'relative block whitespace-nowrap px-3 py-5 text-[13px] font-semibold transition-colors',
                  isActive ? 'text-navy' : 'text-navy-600 hover:text-navy',
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          </li>
        ))}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-lime"
          initial={false}
          animate={bar ? { x: bar.x, width: bar.width, opacity: 1 } : { opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
        />
      </ul>
    </nav>
  )
}

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300',
        scrolled ? 'border-navy-100 shadow-[0_8px_24px_-18px_rgba(10,35,56,0.5)]' : 'border-navy-100',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Brand />

        <DesktopNav />

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="grid size-10 place-items-center rounded-lg border border-navy-200 text-navy xl:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={t('nav.primary')}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-navy-100 bg-white xl:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-4 md:px-8">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 + i * 0.04, ease: EASE }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between border-b border-navy-100 py-4 text-lg font-bold',
                        isActive ? 'text-navy' : 'text-navy-600',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t(`nav.${item.key}`)}
                        {isActive && <span aria-hidden="true" className="h-0.5 w-6 bg-lime" />}
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
