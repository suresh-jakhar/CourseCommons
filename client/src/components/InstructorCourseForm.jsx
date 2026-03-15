import { useEffect, useState } from 'react'

const defaultValues = {
  title: '',
  description: '',
  imageUrl: '',
  price: '0',
  isFree: true,
}

export default function InstructorCourseForm({
  initialValues = defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting,
  error,
}) {
  const [form, setForm] = useState(initialValues)
  const [clientError, setClientError] = useState('')

  useEffect(() => {
    setForm({ ...defaultValues, ...initialValues })
  }, [initialValues])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'isFree' && checked ? { price: '0' } : {}),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setClientError('')

    const price = form.isFree ? 0 : Number(form.price)

    if (!form.isFree && (!Number.isFinite(price) || price <= 0)) {
      setClientError('Paid courses must have a price greater than 0.')
      return
    }

    await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      isFree: form.isFree,
      price,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-secondary">
          Course title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          minLength={3}
          required
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-[#141414] px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-[#2F2F2F] focus:ring-1 focus:ring-[#2F2F2F] focus:outline-none"
          placeholder="Design systems for product teams"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-secondary">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          minLength={10}
          required
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-primary placeholder-muted focus:border-[#2F2F2F] focus:ring-1 focus:ring-[#2F2F2F] focus:outline-none"
          placeholder="Explain what learners will get from this course."
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="mb-1.5 block text-sm font-medium text-secondary">
          Cover image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          required
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-[#141414] px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-[#2F2F2F] focus:ring-1 focus:ring-[#2F2F2F] focus:outline-none"
          placeholder="https://images.example.com/course-cover.jpg"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr,220px]">
        <label className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-secondary">
          <input
            name="isFree"
            type="checkbox"
            checked={form.isFree}
            onChange={handleChange}
            className="h-4 w-4 rounded border-muted bg-[#141414] text-muted focus:ring-glass"
          />
          This is a free course
        </label>

        <div>
          <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-secondary">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            disabled={form.isFree}
            value={form.isFree ? '0' : form.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-[#141414] px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-[#2F2F2F] focus:ring-1 focus:ring-[#2F2F2F] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="49"
          />
        </div>
      </div>

      {(clientError || error) && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {clientError || error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-btn text-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-btn-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}