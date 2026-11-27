import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  GraduationCap,
  Images,
  LayoutGrid,
  Mic,
  X,
} from 'lucide-react'
import { useContent, useDocumentTitle } from '@/hooks/useContent'
import { EVIDENCE_FILES } from '@/config/site'
import { EASE, cn } from '@/lib/utils'
import { Chip, Label, Section, SectionHeading } from '@/components/ui/Primitives'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'

const CATEGORIES = [
  { key: 'all', icon: LayoutGrid },
  { key: 'B', icon: GraduationCap },
  { key: 'C', icon: BookOpen },
  { key: 'D', icon: Briefcase },
  { key: 'E', icon: Award },
  { key: 'F', icon: Mic },
  { key: 'H', icon: BadgeCheck },
]

function CategoryIcon({ type, className }) {
  const found = CATEGORIES.find((c) => c.key === type)
  const Icon = found ? found.icon : FileText
  return <Icon className={className} aria-hidden="true" />
}

function CardPreview({ item, t }) {
  const entry = EVIDENCE_FILES[item.code] ?? {}
  const images = entry.images ?? []
  const lead = images[0]

  if (lead) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-navy-100 bg-navy-50">
        <img
          src={lead}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover object-top transition-transform duration-500 ease-(--ease-brand) group-hover:scale-[1.03]"
        />
        {images.length > 1 && (
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-navy/85 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
            <Images className="size-3 text-lime" aria-hidden="true" />
            {t('photosCount', { count: images.length })}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="relative grid aspect-[4/3] w-full place-items-center bg-navy-50 transition-colors duration-300 group-hover:bg-lime-50/40">
      <div aria-hidden="true" className="absolute inset-3.5 rounded-lg border border-dashed border-navy-200" />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span className="grid size-11 place-items-center rounded-xl bg-white text-navy shadow-sm ring-1 ring-navy-100">
          <CategoryIcon type={item.type} className="size-5 text-lime-dark" />
        </span>
        <span className="text-[11px] font-semibold text-navy-400">{t('pending')}</span>
      </div>
    </div>
  )
}

function CertificateModal({ item, items, onSelect, onClose, t }) {
  const idx = items.findIndex((x) => x.code === item.code)
  const hasPrev = idx > 0
  const hasNext = idx >= 0 && idx < items.length - 1
  const entry = EVIDENCE_FILES[item.code] ?? {}
  const images = entry.images ?? []
  const [photoIdx, setPhotoIdx] = useState(0)
  const safePhotoIdx = photoIdx < images.length ? photoIdx : 0
  const activeImage = images[safePhotoIdx]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onSelect(items[idx - 1])
      if (e.key === 'ArrowRight' && hasNext) onSelect(items[idx + 1])
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [hasNext, hasPrev, idx, items, onClose, onSelect])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-navy-950/75 backdrop-blur-xs"
      />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-navy-100 px-5 py-4 md:px-7">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="lime">{t(`filters.${item.type}`)}</Chip>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('closeModal')}
            className="grid size-9 place-items-center rounded-lg border border-navy-200 text-navy transition-colors hover:border-navy hover:bg-navy-50"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid flex-1 gap-6 overflow-y-auto p-5 md:grid-cols-12 md:gap-8 md:p-7">
          <div className="md:col-span-7">
            {activeImage ? (
              <div className="space-y-3">
                <a
                  href={activeImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-xl border border-navy-100 bg-navy-50"
                >
                  <img
                    src={activeImage}
                    alt={`${item.title} (${safePhotoIdx + 1}/${images.length})`}
                    className="max-h-[460px] w-full object-contain bg-white"
                  />
                </a>

                {images.length > 1 && (
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-navy-600">
                      {t('galleryLabel')} ({safePhotoIdx + 1}/{images.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {images.map((src, i) => {
                        const selected = i === safePhotoIdx
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setPhotoIdx(i)}
                            className={cn(
                              'overflow-hidden rounded-lg border-2 bg-white transition-all',
                              selected
                                ? 'border-lime ring-2 ring-lime/30'
                                : 'border-navy-100 opacity-75 hover:opacity-100',
                            )}
                          >
                            <img
                              src={src}
                              alt={`${item.title} ${i + 1}`}
                              className="size-16 object-cover"
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative grid aspect-[4/3] w-full place-items-center rounded-xl border border-dashed border-navy-200 bg-navy-50 p-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <span className="grid size-14 place-items-center rounded-2xl bg-navy text-lime">
                    <CategoryIcon type={item.type} className="size-7" />
                  </span>
                  <p className="max-w-xs text-xs leading-relaxed text-navy-600">{t('imagePending')}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:col-span-5">
            <h2 id="evidence-modal-title" className="text-xl font-extrabold leading-snug text-navy md:text-2xl">
              {item.title}
            </h2>

            <dl className="mt-5 grid grid-cols-1 gap-3.5 rounded-xl bg-navy-50 p-4 sm:grid-cols-2 md:grid-cols-1">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-navy-600">{t('issuerLabel')}</dt>
                <dd className="mt-1 text-sm font-semibold text-navy">{item.issuer || '—'}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-navy-600">{t('dateLabel')}</dt>
                <dd className="mt-1 text-sm font-semibold text-navy">{item.date || '—'}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <Label>{t('summaryLabel')}</Label>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-700">{item.details || item.summary}</p>
            </div>

            {entry.file && (
              <div className="mt-6">
                <Button href={entry.file} target="_blank" rel="noopener noreferrer" variant="lime">
                  {t('open')}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between border-t border-navy-100 bg-navy-50/70 px-5 py-3.5 md:px-7">
          <button
            type="button"
            disabled={!hasPrev}
            onClick={() => hasPrev && onSelect(items[idx - 1])}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-navy transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            {t('previous')}
          </button>
          <span className="text-xs font-bold text-navy-600">
            {idx + 1} / {items.length}
          </span>
          <button
            type="button"
            disabled={!hasNext}
            onClick={() => hasNext && onSelect(items[idx + 1])}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-navy transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('next')}
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default function EvidencePage() {
  const { t, list } = useContent('evidence')
  useDocumentTitle(t('meta.title'))
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  const items = list('items')
  const visible = activeCategory === 'all' ? items : items.filter((i) => i.type === activeCategory)
  const getCount = (key) => (key === 'all' ? items.length : items.filter((i) => i.type === key).length)

  return (
    <>
      <PageHeader eyebrow={t('header.eyebrow')} title={t('header.title')} lead={t('header.lead')} />

      <Section aria-labelledby="evidence-categories-title">
        <SectionHeading id="evidence-categories-title" title={t('categoryHeading')} />
        <p className="mb-6 -mt-3 text-sm text-navy-600">{t('note')}</p>

        {/* Category Directory Cards */}
        <div
          role="tablist"
          aria-label={t('filterLabel')}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
        >
          {CATEGORIES.map(({ key, icon: Icon }) => {
            const count = getCount(key)
            if (count === 0) return null
            const active = activeCategory === key
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(key)}
                className={cn(
                  'group flex flex-col items-start rounded-xl border p-3.5 text-left transition-all duration-300 ease-(--ease-brand) active:scale-[0.98]',
                  active
                    ? 'border-navy bg-navy text-white shadow-[0_14px_30px_-18px_rgba(10,35,56,0.65)]'
                    : 'border-navy-100 bg-white text-navy hover:border-navy-300 hover:bg-navy-50/50',
                )}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    className={cn(
                      'grid size-8 place-items-center rounded-lg transition-colors',
                      active ? 'bg-lime text-navy' : 'bg-navy-50 text-navy group-hover:bg-navy group-hover:text-lime',
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <span className="mt-3 text-sm font-bold leading-snug">{t(`filters.${key}`)}</span>
                <span className={cn('mt-1 text-xs font-semibold', active ? 'text-lime' : 'text-navy-400')}>
                  {t('itemsCount', { count })}
                </span>
              </button>
            )
          })}
        </div>

        {/* Certificate Cards Grid for Selected Category */}
        <div role="tabpanel" className="mt-10">
          <motion.ul
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-navy-100 bg-white text-left transition-all duration-300 ease-(--ease-brand) hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_18px_40px_-24px_rgba(10,35,56,0.45)]"
                >
                  <CardPreview item={item} t={t} />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-navy-600">
                      {t(`filters.${item.type}`)}
                    </span>
                    <h3 className="mt-3 text-base font-bold leading-snug text-navy">{item.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-navy-600">
                      {[item.issuer, item.date].filter(Boolean).join(' · ')}
                    </p>
                    {item.summary && (
                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-navy-600">{item.summary}</p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-navy group-hover:text-lime-dark">
                      {t('viewDetails')}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </motion.ul>
        </div>
      </Section>

      <AnimatePresence>
        {selectedItem && (
          <CertificateModal
            key={selectedItem.code}
            item={selectedItem}
            items={visible}
            onSelect={setSelectedItem}
            onClose={() => setSelectedItem(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  )
}
