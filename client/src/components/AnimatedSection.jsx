import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AnimatedSection = ({ 
  children, 
  animation = 'fadeUp',
  delay = 0,
  className = '',
  threshold = 0.1,
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={`animated-section ${animation} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ '--animation-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;

