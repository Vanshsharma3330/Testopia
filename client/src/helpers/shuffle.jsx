// Seeded random number generator
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Fisher-Yates shuffle with seeded randomization
export default function seededShuffle(array, seed) {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomSeed = seed;

  while (currentIndex !== 0) {
    // Generate random index based on seed
    const randomIndex = Math.floor(seededRandom(randomSeed) * currentIndex);
    currentIndex--;

    // Swap elements
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];

    // Update seed for next iteration
    randomSeed++;
  }

  return shuffled;
}
