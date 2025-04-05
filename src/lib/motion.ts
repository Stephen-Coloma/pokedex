/**Constants that defines the animation for the parts of the application. */

export const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } },
}

export const textRevealVariant1 = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0 0 0)' },
};

export const textRevealVariant2 = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, },
};