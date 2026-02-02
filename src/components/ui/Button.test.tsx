import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Submit</Button>)
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading text when isLoading', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Loading...')
  })

  it('is disabled when disabled', () => {
    render(<Button disabled>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-cp-brand-600')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button').className).toContain('border')
  })
})
