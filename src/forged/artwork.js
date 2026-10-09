// Decorative presentation assets. Original portfolio image fields are untouched.
export const artwork = Object.fromEntries(
  [
    ["techtribe", "Interconnected metal modules with orange links on charcoal"],
    ["fragrencia", "Sculptural perfume bottle and packaging in metal and bone"],
    ["quickbite", "Metal food-delivery packaging with an orange route motif"],
    ["connectu", "Paired communication sculptures connected by orange signals"],
    ["moviemap", "Curved film frames around a sculptural cinema lens"],
    [
      "coinwatch",
      "Blank metal coins beside abstract sculptural chart geometry",
    ],
  ].map(([slug, alt]) => [
    slug,
    {
      alt,
      small: `/artwork/${slug}-640.webp`,
      large: `/artwork/${slug}-1280.webp`,
    },
  ]),
);
