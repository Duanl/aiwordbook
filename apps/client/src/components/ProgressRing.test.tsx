import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressRing from './ProgressRing';

describe('ProgressRing', () => {
  it('renders with default props', () => {
    const { container } = render(<ProgressRing progress={50} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
  });

  it('renders with custom size', () => {
    const { container } = render(<ProgressRing progress={75} size={200} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
    expect(svg?.getAttribute('width')).toBe('200');
    expect(svg?.getAttribute('height')).toBe('200');
  });

  it('renders with custom strokeWidth', () => {
    const { container } = render(<ProgressRing progress={50} strokeWidth={12} />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);
  });

  it('does not render text when showText is false', () => {
    render(<ProgressRing progress={50} showText={false} />);
    const text = screen.queryByText('50%');
    expect(text).toBeNull();
  });

  it('renders text when showText is true', () => {
    render(<ProgressRing progress={50} showText={true} />);
    const text = screen.getByText('50%');
    expect(text).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProgressRing progress={50} className="custom-class" />
    );
    const div = container.querySelector('.custom-class');
    expect(div).toBeDefined();
  });

  it('calculates correct progress offset for 100%', () => {
    const { container } = render(<ProgressRing progress={100} />);
    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1];
    const offset = progressCircle?.getAttribute('stroke-dashoffset');
    expect(offset).toBe('0');
  });

  it('calculates correct progress offset for 0%', () => {
    const { container } = render(<ProgressRing progress={0} />);
    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1];
    const circumference = progressCircle?.getAttribute('stroke-dasharray');
    const offset = progressCircle?.getAttribute('stroke-dashoffset');
    expect(offset).toBe(circumference);
  });
});
