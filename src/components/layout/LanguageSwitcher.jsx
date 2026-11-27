import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/i18n'
import { cn } from '@/lib/utils'

// The pill slides with a percentage x inside the equal-width grid (no layoutId):
// layoutId used page coordinates and flew in vertically after a scroll in the sticky header.
export default function LanguageSwitcher({ className }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage
  const activeIndex = Math.max(0, LANGUAGES.indexOf(current))

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={cn('relative grid grid-cols-2 rounded-full border border-navy-200 bg-white p-1', className)}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-navy"
        initial={false}
        animate={{ x: `${activeIndex * 100}%` }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      />
      {LANGUAGES.map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            type="button"
            lang={lng}
            aria-pressed={active}
            aria-label={t(`lang.${lng}Name`)}
            onClick={() => i18n.changeLanguage(lng)}
            className={cn(
              'relative min-w-10 rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-300',
              active ? 'text-white' : 'text-navy-600 hover:text-navy',
            )}
          >
            <span className="relative">{t(`lang.${lng}`)}</span>
          </button>
        )
      })}
    </div>
  )
}
