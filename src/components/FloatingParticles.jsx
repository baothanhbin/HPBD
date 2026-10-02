const particles = Array.from({ length: 44 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index * 0.23) % 6}s`,
  duration: `${5 + (index % 7) * 0.55}s`,
  size: `${4 + (index % 5)}px`
}));

export default function FloatingParticles() {
  return (
    <div className="particles-layer" aria-hidden="true">
      {particles.map((particle) => (
        <span
          className="particle"
          key={particle.id}
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size
          }}
        />
      ))}
    </div>
  );
}
