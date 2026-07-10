import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
  as = 'div',
}) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const variant = VARIANTS[direction] || VARIANTS.up;
  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      initial={variant.hidden}
      animate={inView ? variant.visible : variant.hidden}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </Component>
  );
}
