import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Award, Building2, MapPin, Star } from 'lucide-react'
import { useContent, useDocumentTitle } from '@/hooks/useContent'
import { EASE } from '@/lib/utils'
import { Card, Chip, Container, Label, Section, SectionHeading } from '@/components/ui/Primitives'
import Button from '@/components/ui/Button'
import CvButton from '@/components/ui/CvButton'
import Portrait from '@/components/ui/Portrait'
import Reveal from '@/components/motion/Reveal'
import CountUp from '@/components/motion/CountUp'

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: EASE },
})

function Hero() {
  const { t, list } = useContent('home')
  const common = useContent('common')

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_80%_at_85%_10%,rgba(48,216,72,0.16),transparent_60%)]" />
      <Container className="relative grid items-center gap-10 pb-24 pt-12 md:pb-28 md:pt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.p {...rise(0)} className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-lime">
            <span aria-hidden="true" className="h-px w-8 bg-lime" />
            {t('hero.eyebrow')}
          </motion.p>
          <motion.h1 {...rise(0.06)} className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.4rem]">
            {t('hero.name')}
            <span className="mt-2 block text-xl font-semibold text-navy-200 md:text-2xl">{t('hero.alias')}</span>
          </motion.h1>
          <motion.p {...rise(0.12)} className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-lime md:text-base">
            {t('hero.role')}
          </motion.p>
          <motion.p {...rise(0.18)} className="mt-4 max-w-xl leading-relaxed text-navy-200 md:text-lg">
            {t('hero.intro')}
          </motion.p>
          <motion.ul {...rise(0.22)} className="mt-6 flex flex-wrap gap-2">
            {list('hero.fields').map((field) => (
              <li key={field}>
                <Chip tone="dark">{field}</Chip>
              </li>
            ))}
          </motion.ul>
          <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/research" variant="lime">
              {t('hero.cta')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <CvButton variant="light" />
            <span className="ml-1 flex items-center gap-2 text-sm text-navy-300">
              <MapPin className="size-4 text-lime" aria-hidden="true" />
              {common.t('contact.location')}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
          className="mx-auto w-full max-w-[19rem] lg:col-span-5 lg:mr-0 lg:max-w-[22rem]"
        >
          <Portrait />
        </motion.div>
      </Container>
    </section>
  )
}

function Stats() {
  const { t, list } = useContent('home')
  return (
    <section aria-labelledby="stats-title" className="relative z-10 -mt-14">
      <Container>
        <Reveal className="rounded-xl border border-navy-100 bg-white shadow-[0_24px_50px_-30px_rgba(10,35,56,0.55)]">
          <h2 id="stats-title" className="sr-only">
            {t('stats.title')}
          </h2>
          <dl className="grid grid-cols-2 divide-navy-100 lg:grid-cols-4 lg:divide-x">
            {list('stats.items').map((item, i) => (
              <div key={i} className="flex flex-col border-navy-100 p-5 even:border-l md:p-7 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:even:border-l-0">
                <dt className="order-2 mt-2 text-[13px] leading-snug text-navy-600">{item.label}</dt>
                <dd className="order-1 text-3xl font-extrabold tracking-tight text-navy md:text-[2.6rem]">
                  <CountUp value={item.value} decimals={item.decimals} suffix={item.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}

function Profile() {
  const { t, list } = useContent('home')
  const common = useContent('common')

  return (
    <Section aria-labelledby="profile-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        <div className="flex flex-col lg:col-span-7">
          <SectionHeading id="profile-title" title={t('profile.title')} />
          <Reveal>
            <p className="leading-relaxed text-navy-700 md:text-[17px]">{t('profile.text')}</p>
          </Reveal>
          <Reveal delay={0.05} className="mt-8 flex flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center rounded-xl border-l-2 border-lime bg-navy-50 p-5 md:p-6">
              <Label>{t('objective.title')}</Label>
              <p className="mt-2 flex items-center gap-2 text-sm font-bold text-navy">
                <Building2 className="size-4 shrink-0 text-lime-dark" aria-hidden="true" />
                {t('objective.org')}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-700">{t('objective.text')}</p>
            </div>
          </Reveal>
        </div>

        <aside className="flex flex-col gap-5 lg:col-span-5">
          <Reveal delay={0.06}>
            <Card className="h-full">
              <Label as="h3">{t('education.title')}</Label>
              <ol className="mt-4 space-y-4">
                {list('education.items').map((e) => (
                  <li key={e.year} className="grid grid-cols-[3.25rem_1fr] gap-3">
                    <span className="text-sm font-extrabold text-lime-dark">{e.year}</span>
                    <span>
                      <span className="block font-bold leading-snug">{e.degree}</span>
                      <span className="mt-0.5 block text-sm text-navy-600">{e.school}</span>
                      {e.note && <span className="mt-1 block text-xs leading-relaxed text-navy-600">{e.note}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-1 flex-col">
            <Card className="flex h-full flex-1 flex-col justify-between">
              <div>
                <Label as="h3">{t('languages.title')}</Label>
                <dl className="mt-4 space-y-3">
                  {list('languages.items').map((l) => (
                    <div key={l.name}>
                      <dt className="font-bold">{l.name}</dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-navy-600">{l.level}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-5 border-t border-navy-100 pt-4 text-sm font-semibold text-navy-700">
                {common.t('contact.location')}
              </p>
            </Card>
          </Reveal>
        </aside>
      </div>
    </Section>
  )
}

function Featured() {
  const { t } = useContent('home')
  const research = useContent('research')
  const teaching = useContent('teaching')
  const allAwards = teaching.list('awards.items')
  const awards = [...allAwards.filter((a) => a.featured), ...allAwards.filter((a) => !a.featured)].slice(0, 3)

  return (
    <Section tone="muted">
      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Link
            to="/research"
            className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 transition duration-300 hover:border-navy-300 hover:shadow-[0_18px_40px_-24px_rgba(10,35,56,0.45)] md:p-8"
          >
            <Label>{t('featured.title')}</Label>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip tone="navy">{research.t('publication.type')}</Chip>
              <Chip>{research.t('publication.year')}</Chip>
              <Chip tone="gold">{research.t('publication.role')}</Chip>
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight">{research.t('publication.paperTitle')}</h3>
            <p className="mt-2 text-sm font-semibold text-navy-600">{research.t('publication.authors')}</p>
            <p className="mt-5 border-l-2 border-gold pl-4 leading-relaxed text-navy-700">{research.t('publication.finding')}</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold">
              {t('featured.cta')}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-5">
          <Link
            to="/teaching"
            className="group flex h-full flex-col rounded-xl bg-navy p-6 text-white transition duration-300 hover:bg-navy-800 md:p-8"
          >
            <Label className="text-gold-light">{t('recognitionTeaser.title')}</Label>
            <ul className="mt-5 space-y-4">
              {awards.map((a) => (
                <li key={`${a.date}-${a.title}`} className="flex gap-3">
                  {a.featured ? (
                    <Star className="mt-0.5 size-5 shrink-0 fill-gold-light text-gold-light" aria-hidden="true" />
                  ) : (
                    <Award className="mt-0.5 size-5 shrink-0 text-gold-light" aria-hidden="true" />
                  )}
                  <span>
                    <span className="block font-bold leading-snug">{a.title}</span>
                    <span className="mt-0.5 block text-sm text-navy-300">
                      {a.org} · {a.date}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-gold-light">
              {t('recognitionTeaser.cta')}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  )
}

export default function HomePage() {
  const { t } = useContent('home')
  useDocumentTitle(t('meta.title'))

  return (
    <>
      <Hero />
      <Stats />
      <Profile />
      <Featured />
    </>
  )
}
