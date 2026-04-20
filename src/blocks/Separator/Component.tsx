import React from 'react'

type Props = {
  spacing?: 'small' | 'medium' | 'large'
  color?: 'default' | 'muted'
}

export const SeparatorBlock: React.FC<Props> = ({ spacing = 'medium', color = 'default' }) => {
  const spacingClasses = {
    small: 'my-4 md:my-8',
    medium: 'my-8 md:my-16',
    large: 'my-16 md:my-32',
  }

  const colorClasses = {
    default: 'bg-foreground',
    muted: 'bg-foreground-2',
  }

  return (
    <div className="container">
      <div
        className={`w-full h-[1px] transition-all ${spacingClasses[spacing]} ${colorClasses[color]}`}
        aria-hidden="true"
      />
    </div>
  )
}
