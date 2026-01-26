export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ms. Hesa, CEO TechCorp',
      quote: 'This platform revolutionized how we manage preschool operations.',
    },
    {
      name: 'Ms. Lina, Bamboo Daycare',
      quote: 'Streamlined attendance, billing, and admin tasks.',
    },
    {
      name: "Ms. Meriem, Madeleine's Preschool",
      quote: 'KidooCare replaced multiple apps and exceeded expectations.',
    },
  ]

  return (
    <section className='bg-white py-24'>
      <div className='mx-auto mb-12 max-w-5xl text-center'>
        <h2 className='text-3xl font-bold'>Testimonials</h2>
      </div>

      <div className='mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-3'>
        {testimonials.map((t, i) => (
          <div key={i} className='rounded-2xl border p-6 shadow-sm'>
            <p className='mb-4 text-muted-foreground'>&quot;{t.quote}&quot;</p>
            <p className='font-semibold'>{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
