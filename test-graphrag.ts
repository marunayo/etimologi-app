const res = await fetch('http://localhost:3000/api/graphrag', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: 'Dari mana asal kata sabun?' }),
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));

export {};