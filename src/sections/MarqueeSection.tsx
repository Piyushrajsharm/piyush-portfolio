import { useRef, useState, useEffect } from 'react'

const ROW1_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
]

const ROW2_IMAGES = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const ROW1_TRIPLED = [...ROW1_IMAGES, ...ROW1_IMAGES, ...ROW1_IMAGES]
const ROW2_TRIPLED = [...ROW2_IMAGES, ...ROW2_IMAGES, ...ROW2_IMAGES]

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(currentOffset)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3 select-none"
    >
      {/* Row 1: moves RIGHT on scroll */}
      <div
        className="flex gap-3 whitespace-nowrap"
        style={{
          transform: `translate3d(${offset - 200}px, 0, 0)`,
          willChange: 'transform',
        }}
      >
        {ROW1_TRIPLED.map((url, i) => (
          <div
            key={i}
            className="w-[420px] h-[270px] min-w-[420px] flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-900"
          >
            <img
              src={url}
              alt={`Work preview 1-${i}`}
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Row 2: moves LEFT on scroll */}
      <div
        className="flex gap-3 whitespace-nowrap"
        style={{
          transform: `translate3d(${-(offset - 200)}px, 0, 0)`,
          willChange: 'transform',
        }}
      >
        {ROW2_TRIPLED.map((url, i) => (
          <div
            key={i}
            className="w-[420px] h-[270px] min-w-[420px] flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-900"
          >
            <img
              src={url}
              alt={`Work preview 2-${i}`}
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
