import confetti from 'canvas-confetti';

export function fireGiftConfetti() {
  // Multiphase burst of hearts and rose-gold / pink celebration confetti
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f472b6', '#ec4899', '#fbbf24', '#ffffff'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#c084fc', '#f43f5e', '#ffd700', '#fbcfe8'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#f472b6', '#db2777', '#a855f7'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ['circle'],
    colors: ['#fde047', '#f472b6', '#38bdf8'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#fb7185', '#e879f9', '#ffffff'],
  });
}

export function fireHeartShower() {
  // Gentle shower from top sides
  const end = Date.now() + 2 * 1000;
  const colors = ['#f472b6', '#ec4899', '#fb7185', '#c084fc', '#fbbf24'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
