import { Award, BadgeCheck, BookOpen, Star } from 'lucide-react'
import { useContent, useDocumentTitle } from '@/hooks/useContent'
import { cn } from '@/lib/utils'
import { Card, Chip, IconBadge, Label, Section, SectionHeading } from '@/components/ui/Primitives'
import PageHeader from '@/components/ui/PageHeader'
import Timeline from '@/components/ui/Timeline'
import Reveal from '@/components/motion/Reveal'

function Awards() {
  const { t, list } = useContent('teaching')
  const items = list('awards.items')
  const ordered = [...items.filter((a) => a.featured), ...items.filter((a) => !a.featured)]

  return (
    <div className="rounded-xl bg-navy p-6 text-white md:p-7 lg:sticky lg:top-24">
      <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-gold" />
      <h2 className="text-xl font-bold">{t('awards.title')}</h2>
      <ul className="mt-5 divide-y divide-white/10">
        {ordered.map((a) => (
          <li key={`${a.date}-${a.title}`} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
            {a.featured ? (
              <Star className="mt-0.5 size-5 shrink-0 fill-gold-light text-gold-light" aria-hidden="true" />
            ) : (
              <Award className="mt-0.5 size-5 shrink-0 text-gold-light" aria-hidden="true" />
            )}
            <div>
              <p className="font-bold leading-snug">{a.title}</p>
              <p className="mt-0.5 text-sm leading-snug text-navy-300">{a.org}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gold-light">{a.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Courses() {
  const { t, list } = useContent('teaching')
  const groups = list('courses.groups')
  const total = groups.reduce((sum, g) => sum + (g.items?.length ?? 0), 0)

  return (
    <Section tone="muted" aria-labelledby="courses-title">
      <SectionHeading id="courses-title" title={t('courses.title')} aside={<Chip tone="navy">{t('courses.total', { count: total })}</Chip>} />
      <div className="grid gap-5 lg:grid-cols-2">
        {groups.map((group, gi) => (
          <Reveal key={group.tier} delay={gi * 0.06}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <IconBadge icon={BookOpen} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                    {group.tier} · {t('courses.total', { count: group.items.length })}
                  </p>
                  <h3 className="mt-1 font-bold leading-snug">{group.name}</h3>
                </div>
              </div>
              <ul className="mt-5 grid gap-x-6 gap-y-2.5 border-t border-navy-100 pt-5 sm:grid-cols-2">
                {group.items.map((course) => (
                  <li key={course} className="flex gap-2.5 text-sm font-medium leading-snug">
                    <span aria-hidden="true" className="mt-[7px] size-1 shrink-0 rounded-full bg-gold" />
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

function Certifications() {
  const { t, list } = useContent('teaching')
  return (
    <Section aria-labelledby="certs-title">
      <SectionHeading id="certs-title" title={t('certs.title')} />
      <div className="grid gap-5 lg:grid-cols-12">
        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
          {list('certs.items').map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.04}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-navy-100 p-4">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-gold-dark" aria-hidden="true" />
                <div>
                  <p className="font-bold leading-snug">{c.title}</p>
                  <p className={cn('mt-1 text-sm text-navy-600')}>
                    {[c.org, c.date].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.08} className="lg:col-span-4">
          <div className="h-full rounded-xl bg-navy-50 p-5">
            <Label as="h3">{t('certs.additionalTitle')}</Label>
            <ul className="mt-3 space-y-2 text-sm leading-snug text-navy-700">
              {list('certs.additional').map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[7px] size-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

export default function TeachingPage() {
  const { t, list } = useContent('teaching')
  useDocumentTitle(t('meta.title'))

  const appointments = list('appointments.items').map((item) => ({
    id: item.period + item.org,
    period: item.period,
    title: item.role,
    subtitle: item.org,
    text: item.text,
  }))

  return (
    <>
      <PageHeader eyebrow={t('header.eyebrow')} title={t('header.title')} lead={t('header.lead')} />
      <Section aria-labelledby="appointments-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="appointments-title" title={t('appointments.title')} />
            <Timeline items={appointments} />
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <Awards />
            </Reveal>
          </div>
        </div>
      </Section>
      <Courses />
      <Certifications />
    </>
  )
}
