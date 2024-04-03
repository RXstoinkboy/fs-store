export const products = Array.from({ length: 40 }, () => {
  const rating = Math.round(Math.random() * 10) / 2; // Round to the nearest 0.5
  return {
    name: "Product " + Math.floor(Math.random() * 100),
    price: (Math.random() * 100).toFixed(2),
    featured: Math.random() < 0.5,
    rating: rating,
    company: ["ikea", "woodika", "mebelki", "marcos"][
      Math.floor(Math.random() * 4)
    ],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  };
});
