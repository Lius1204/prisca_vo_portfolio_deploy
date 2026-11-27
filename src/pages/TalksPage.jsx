import { useState } from 'react'
import { LayoutGroup } from 'motion/react'
import { HeartHandshake } from 'lucide-react'
import { useContent, useDocumentTitle } from '@/hooks/useContent'
import { Card, Chip, IconBadge, Label, Section, SectionHeading } from '@/components/ui/Primitives'
import FilterChips from '@/components/ui/FilterChips'
import PageHeader from '@/components/ui/PageHeader'
import Timeline from '@/components/ui/Timeline'
import Reveal from '@/components/motion/Reveal'
import CountUp from '@/components/motion/CountUp'

const FILTERS = ['all', 'talk', 'workshop', 'forum', 'mentoring']

function Events() {
  const { t, list } = useContent('talks')
  const [filter, setFilter] = useState('all')
  const items = list('events.items')
  const visible = filter === 'all' ? items : items.filter((item) => item.type === filter)

  const timelineItems = visible.map((item) => ({
    id: `${item.date}-${item.role}`,
    period: item.date,
    badge: t(`events.filters.${item.type}`),
    title: item.role,
    subtitle: item.org,
    text: item.text,
  }))

  return (
    <Section aria-labelledby="events-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <Reveal className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-xl bg-navy p-6 text-white">
              <p className="text-5xl font-extrabold tracking-tight">
                <CountUp value={items.length} />
              </p>
              <p className="mt-1 text-sm font-semibold text-lime">{t('events.badge')}</p>
              <p className="mt-4 text-sm leading-relaxed text-navy-200">{t('events.summary')}</p>
            </div>
            <div className="rounded-xl border border-navy-100 bg-white p-5">
              <Label as="h3">{t('events.filterLabel')}</Label>
              <div className="mt-3">
                <LayoutGroup>
                  <FilterChips
                    label={t('events.filterLabel')}
                    options={FILTERS}
                    value={filter}
                    onChange={setFilter}
                    getLabel={(f) => t(`events.filters.${f}`)}
                    getCount={(f) => (f === 'all' ? items.length : items.filter((i) => i.type === f).length)}
                    layoutId="event-filter"
                  />
                </LayoutGroup>
              </div>
            </div>
          </Reveal>
        </aside>

        <div className="lg:col-span-8">
          <SectionHeading id="events-title" title={t('events.title')} />
          <div aria-live="polite">
            <Timeline key={filter} items={timelineItems} />
          </div>
        </div>
      </div>
    </Section>
  )
}

function Community() {
  const { t, list } = useContent('talks')
  return (
    <Section tone="muted" aria-labelledby="community-title">
      <SectionHeading id="community-title" title={t('community.title')} aside={<Chip>{t('community.period')}</Chip>} />
      <ul className="grid gap-5 md:grid-cols-2">
        {list('community.items').map((item, i) => (
          <Reveal as="li" key={i} delay={i * 0.06} className="h-full">
            <Card interactive className="flex h-full flex-col gap-3.5">
              <div className="flex items-start gap-4">
                <IconBadge icon={HeartHandshake} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.role && (
                      <span className="text-xs font-bold uppercase tracking-wider text-lime-dark">{item.role}</span>
                    )}
                    {item.date && <Chip tone="soft">{item.date}</Chip>}
                  </div>
                  <h3 className="mt-2 font-bold leading-snug text-navy md:text-lg">{item.title}</h3>
                </div>
              </div>
              <p className="text-sm font-semibold leading-snug text-navy-700">{item.org}</p>
              {item.text && <p className="text-[15px] leading-relaxed text-navy-600">{item.text}</p>}
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

export default function TalksPage() {
  const { t } = useContent('talks')
  useDocumentTitle(t('meta.title'))
  return (
    <>
      <PageHeader eyebrow={t('header.eyebrow')} title={t('header.title')} lead={t('header.lead')} />
      <Events />
      <Community />
    </>
  )
}
