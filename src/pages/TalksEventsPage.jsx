import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { BookOpen, Calendar } from 'lucide-react'
import { useContent, useDocumentTitle } from '@/hooks/useContent'
import { EASE, cn } from '@/lib/utils'
import { Card, Chip, IconBadge, Section, SectionHeading } from '@/components/ui/Primitives'
import PageHeader from '@/components/ui/PageHeader'
import Timeline from '@/components/ui/Timeline'
import Reveal from '@/components/motion/Reveal'

const FILTERS = ['all', 'talk', 'workshop', 'forum', 'mentoring']

function Courses() {
  const { t, list } = useContent('talks')
  const groups = list('courses.groups')
  const total = groups.reduce((sum, g) => sum + (g.items?.length ?? 0), 0)

  return (
    <Section aria-labelledby="courses-title" className="bg-navy-50">
      <SectionHeading
        id="courses-title"
        title={t('courses.title')}
        aside={<Chip tone="navy" className="text-sm">{t('courses.total', { count: total })}</Chip>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {groups.map((group, gi) => (
          <Reveal key={group.tier} delay={gi * 0.08}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <IconBadge icon={BookOpen} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-lime-700">
                    {group.tier} · {group.items.length}
                  </p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{group.name}</h3>
                </div>
              </div>
              <ul className="mt-6 grid gap-x-6 gap-y-3 md:grid-cols-2">
                {group.items.map((course) => (
                  <li key={course} className="flex gap-2.5 text-sm font-medium leading-snug">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lime" />
                    {course}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Events() {
  const { t, list } = useContent('talks')
  const [filter, setFilter] = useState('all')
  const items = list('events.items')
  const visible = filter === 'all' ? items : items.filter((item) => item.type === filter)
  const count = (type) => (type === 'all' ? items.length : items.filter((item) => item.type === type).length)

  return (
    <Section aria-labelledby="events-title">
      <SectionHeading id="events-title" title={t('events.title')} />

      <LayoutGroup>
        <div role="group" aria-label={t('events.filterLabel')} className="mb-8 flex flex-wrap gap-2">
          {FILTERS.filter((f) => count(f) > 0).map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={cn(
                  'relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300',
                  active ? 'border-navy text-white' : 'border-navy-200 text-navy-700 hover:border-navy',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="event-filter"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-navy"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">
                  {t(`events.filters.${f}`)} <span className={active ? 'text-lime' : 'text-navy-600'}>{count(f)}</span>
                </span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="grid gap-5 md:grid-cols-2" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.li
                layout
                key={`${item.date}-${item.role}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Card interactive className="h-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip tone="navy">
                      <Calendar className="size-3.5" aria-hidden="true" />
                      {item.date}
                    </Chip>
                    <Chip tone="lime">{t(`events.filters.${item.type}`)}</Chip>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-snug">{item.role}</h3>
                  <p className="mt-1 text-sm font-semibold text-navy-700">{item.org}</p>
                  <p className="mt-3 leading-relaxed text-navy-600">{item.text}</p>
                </Card>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </Section>
  )
}

export default function TalksEventsPage() {
  const { t, list } = useContent('talks')
  useDocumentTitle(t('meta.title'))

  const teaching = list('teaching.items').map((item) => ({
    id: item.period + item.org,
    period: item.period,
    title: item.role,
    subtitle: item.org,
    text: item.text,
  }))

  return (
    <>
      <PageHeader eyebrow={t('header.eyebrow')} title={t('header.title')} lead={t('header.lead')} />
      <Section aria-labelledby="teaching-title">
        <SectionHeading id="teaching-title" title={t('teaching.title')} />
        <Timeline items={teaching} />
      </Section>
      <Courses />
      <Events />
    </>
  )
}
