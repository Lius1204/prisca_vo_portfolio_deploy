import { useLayoutEffect, useRef, useState } from 'react'
import { BookMarked, Compass, ExternalLink, FlaskConical } from 'lucide-react'
import { useContent, useDocumentTitle } from '@/hooks/useContent'
import { SITE } from '@/config/site'
import { cn } from '@/lib/utils'
import { Card, Chip, IconBadge, Section, SectionHeading } from '@/components/ui/Primitives'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Reveal from '@/components/motion/Reveal'

function Publication() {
  const { t, list } = useContent('research')
  const common = useContent('common')
  const [abstractOpen, setAbstractOpen] = useState(false)

  return (
    <Section aria-labelledby="pub-title">
      <SectionHeading id="pub-title" title={t('publication.title')} />
      <Reveal>
        <Card className="p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="navy">{t('publication.type')}</Chip>
            <Chip tone="outline">{t('publication.year')}</Chip>
            <Chip tone="lime">{t('publication.role')}</Chip>
          </div>
          <h3 className="mt-5 max-w-3xl text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
            {t('publication.paperTitle')}
          </h3>
          <p className="mt-3 font-semibold text-navy-700">{t('publication.authors')}</p>
          <p className="mt-1 text-sm text-navy-600">{t('publication.affiliations')}</p>

          <blockquote className="mt-8 border-l-4 border-lime pl-5 text-lg font-semibold leading-relaxed text-navy md:text-xl">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-lime-dark">
              {t('publication.findingLabel')}
            </span>
            {t('publication.finding')}
          </blockquote>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-600">
                {t('publication.abstractLabel')}
              </h4>
              <p className={cn('mt-3 leading-relaxed text-navy-700', !abstractOpen && 'line-clamp-6 md:line-clamp-none')}>
                {t('publication.abstract')}
              </p>
              <button
                type="button"
                aria-expanded={abstractOpen}
                onClick={() => setAbstractOpen((v) => !v)}
                className="mt-2 text-sm font-bold text-navy underline decoration-lime decoration-2 underline-offset-4 md:hidden"
              >
                {abstractOpen ? common.t('actions.showLess') : common.t('actions.showMore')}
              </button>
            </div>

            <div className="space-y-8 lg:col-span-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-600">
                  {t('publication.methodLabel')}
                </h4>
                <dl className="mt-3 grid grid-cols-3 gap-3">
                  {list('publication.methodStats').map((s) => (
                    <div key={s.label} className="flex flex-col rounded-xl bg-navy p-4 text-white">
                      <dt className="order-2 mt-1 text-xs leading-snug text-navy-200">{s.label}</dt>
                      <dd className="order-1 text-2xl font-extrabold">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {list('publication.methods').map((m) => (
                    <li key={m}>
                      <Chip tone="soft">{m}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-600">
                  {t('publication.keywordsLabel')}
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {list('publication.keywords').map((k) => (
                    <li key={k}>
                      <Chip tone="lime">{k}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-navy-100 pt-6 md:grid-cols-2 lg:grid-cols-4">
            {list('publication.meta').map((row) => (
              <div key={row.label}>
                <dt className="text-xs font-bold uppercase tracking-wider text-navy-600">{row.label}</dt>
                <dd className="mt-1 font-semibold leading-snug">{row.value}</dd>
              </div>
            ))}
          </dl>

          {SITE.publicationUrl && (
            <Button
              href={SITE.publicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="lime"
              className="mt-8"
            >
              {t('publication.publisherLink')}
              <ExternalLink className="size-4" aria-hidden="true" />
            </Button>
          )}
        </Card>
      </Reveal>
    </Section>
  )
}

/** Two balanced full-width editorial rows for MBA Thesis and Proposed Doctoral Research (PhD). */
function Projects() {
  const { t, list } = useContent('research')

  return (
    <Section className="pt-0 md:pt-0">
      <div className="space-y-6">
        <Reveal>
          <Card interactive className="p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <IconBadge icon={BookMarked} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-navy-600">{t('thesis.title')}</h2>
                </div>
                <p className="mt-4 text-xl font-extrabold leading-snug text-navy">{t('thesis.name')}</p>
                <p className="mt-2.5 text-sm font-semibold text-navy-700">{t('thesis.school')}</p>
                <p className="mt-1 text-xs font-medium text-navy-600">{t('thesis.programme')}</p>
              </div>

              <div className="flex flex-col justify-between border-t border-navy-100 pt-5 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-[15px] leading-relaxed text-navy-700">{t('thesis.summary')}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {list('thesis.tags').map((tag) => (
                    <li key={tag}>
                      <Chip tone="lime">{tag}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.06}>
          <Card className="border-navy bg-navy p-6 text-white md:p-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-lime text-navy">
                    <FlaskConical className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-lime">{t('phd.title')}</h2>
                </div>
                <p className="mt-4 text-xl font-extrabold leading-snug text-white">{t('phd.name')}</p>
              </div>

              <div className="flex flex-col justify-between border-t border-white/15 pt-5 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-[15px] leading-relaxed text-navy-100">{t('phd.summary')}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {list('phd.methods').map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-navy-100"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * Interactive Radial Mind Map for Core Research Interests.
 * Measures exact DOM positions of the central hub and all 6 surrounding nodes via ResizeObserver
 * so every curved SVG Bézier connector attaches cleanly to the center edge of each card on both sides.
 */
function Interests() {
  const { t, list } = useContent('research')
  const items = list('interests.items')
  const [activeIdx, setActiveIdx] = useState(null)
  const [connectors, setConnectors] = useState({ width: 0, height: 0, branches: [] })

  const stageRef = useRef(null)
  const hubRef = useRef(null)
  const nodeRefs = useRef([])

  const leftNodes = items.slice(0, 3)
  const rightNodes = items.slice(3, 6)

  const itemsKey = items.join('|')
  const count = items.length

  useLayoutEffect(() => {
    const stage = stageRef.current
    const hub = hubRef.current
    if (!stage || !hub) return

    const measure = () => {
      const box = stage.getBoundingClientRect()
      if (box.width === 0 || box.height === 0) return

      const hubRect = hub.getBoundingClientRect()
      const hubCx = hubRect.left - box.left + hubRect.width / 2
      const hubCy = hubRect.top - box.top + hubRect.height / 2

      const branches = Array.from({ length: count }, (_, idx) => {
        const el = nodeRefs.current[idx]
        if (!el) return null
        const r = el.getBoundingClientRect()
        const isLeft = idx < 3
        const endX = isLeft ? r.right - box.left : r.left - box.left
        const endY = r.top - box.top + r.height / 2
        const startX = isLeft ? hubRect.left - box.left : hubRect.right - box.left
        const startY = hubCy
        const midX = (startX + endX) / 2
        const d = `M ${hubCx} ${hubCy} L ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`
        return { d, endX, endY }
      })

      setConnectors({ width: box.width, height: box.height, branches })
    }

    measure()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(stage)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [count, itemsKey])

  const renderNode = (label, idx, alignRight = false, attachRef = false) => {
    const active = activeIdx === idx
    return (
      <button
        key={label}
        ref={
          attachRef
            ? (el) => {
                nodeRefs.current[idx] = el
              }
            : undefined
        }
        type="button"
        onMouseEnter={() => setActiveIdx(idx)}
        onMouseLeave={() => setActiveIdx(null)}
        onFocus={() => setActiveIdx(idx)}
        onBlur={() => setActiveIdx(null)}
        onClick={() => setActiveIdx((prev) => (prev === idx ? null : idx))}
        className={cn(
          'group relative z-10 flex min-h-[76px] w-full items-center gap-3.5 rounded-2xl border bg-white px-5 py-4 text-left transition-all duration-300 ease-(--ease-brand)',
          alignRight && 'lg:flex-row-reverse lg:text-right',
          active
            ? 'border-lime shadow-[0_14px_32px_-16px_rgba(48,216,72,0.5)] ring-2 ring-lime/25 -translate-y-0.5'
            : 'border-navy-200/80 shadow-[0_8px_24px_-18px_rgba(10,35,56,0.35)] hover:border-navy-300',
        )}
      >
        <span
          className={cn(
            'grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-colors duration-300',
            active ? 'bg-lime text-navy' : 'bg-navy text-lime',
          )}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>
        <span className="text-[15px] font-bold leading-snug text-navy">{label}</span>
      </button>
    )
  }

  return (
    <Section aria-labelledby="interests-title" className="bg-navy-50">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-white px-5 py-10 shadow-[0_20px_50px_-34px_rgba(10,35,56,0.35)] md:px-10 md:py-14">
          {/* Subtle dot grid texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(#ced3d7_1px,transparent_1px)] [background-size:20px_20px]"
          />

          {/* Desktop Radial Mind Map */}
          <div
            ref={stageRef}
            className="relative hidden lg:grid lg:min-h-[380px] lg:grid-cols-[minmax(0,1fr)_16rem_minmax(0,1fr)] lg:items-center lg:gap-12"
          >
            {connectors.width > 0 && (
              <svg
                aria-hidden="true"
                width={connectors.width}
                height={connectors.height}
                viewBox={`0 0 ${connectors.width} ${connectors.height}`}
                className="pointer-events-none absolute inset-0 size-full overflow-visible"
              >
                {connectors.branches.map((branch, idx) => {
                  if (!branch) return null
                  const isActive = activeIdx === idx
                  return (
                    <g key={idx}>
                      <path
                        d={branch.d}
                        fill="none"
                        stroke={isActive ? '#30d848' : '#b5bdc3'}
                        strokeWidth={isActive ? 3 : 2}
                        strokeDasharray={isActive ? 'none' : '5 5'}
                        className="transition-all duration-300"
                      />
                      <circle
                        cx={branch.endX}
                        cy={branch.endY}
                        r={isActive ? 5 : 4}
                        fill={isActive ? '#30d848' : '#0a2338'}
                        stroke="#ffffff"
                        strokeWidth={2}
                        className="transition-all duration-300"
                      />
                    </g>
                  )
                })}
              </svg>
            )}

            <div className="flex flex-col justify-between gap-7 py-2">
              {leftNodes.map((label, i) => renderNode(label, i, true, true))}
            </div>

            <div className="relative z-10 flex justify-center">
              <div
                ref={hubRef}
                className="relative grid size-56 place-items-center rounded-full border-4 border-lime/40 bg-navy p-6 text-center text-white shadow-[0_24px_50px_-20px_rgba(10,35,56,0.65)]"
              >
                <div className="flex flex-col items-center">
                  <span className="grid size-10 place-items-center rounded-full bg-lime/15 text-lime">
                    <Compass className="size-5" aria-hidden="true" />
                  </span>
                  <h2 id="interests-title" className="mt-3 text-lg font-extrabold leading-tight tracking-tight">
                    {t('interests.title')}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-7 py-2">
              {rightNodes.map((label, i) => renderNode(label, i + 3, false, true))}
            </div>
          </div>

          {/* Mobile & Tablet Mind Map Tree */}
          <div className="relative lg:hidden">
            <div className="mx-auto flex max-w-sm flex-col items-center rounded-2xl border-2 border-lime/40 bg-navy px-6 py-5 text-center text-white shadow-lg">
              <span className="grid size-9 place-items-center rounded-full bg-lime/15 text-lime">
                <Compass className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-2.5 text-lg font-extrabold tracking-tight">{t('interests.title')}</h2>
            </div>

            <div className="relative mx-auto mt-6 max-w-xl pl-7">
              <span aria-hidden="true" className="absolute bottom-6 left-2.5 top-0 w-0.5 bg-navy-200" />
              <div className="space-y-3.5">
                {items.map((label, idx) => (
                  <div key={label} className="relative">
                    <span aria-hidden="true" className="absolute -left-[18px] top-1/2 h-0.5 w-4 -translate-y-1/2 bg-lime" />
                    <span
                      aria-hidden="true"
                      className="absolute -left-[22px] top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 border-lime bg-white"
                    />
                    {renderNode(label, idx, false, false)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default function ResearchPage() {
  const { t } = useContent('research')
  useDocumentTitle(t('meta.title'))
  return (
    <>
      <PageHeader eyebrow={t('header.eyebrow')} title={t('header.title')} lead={t('header.lead')} />
      <Publication />
      <Projects />
      <Interests />
    </>
  )
}
