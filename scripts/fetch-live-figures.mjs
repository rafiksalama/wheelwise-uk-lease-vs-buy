const all = [];
for (let p = 1; p <= 6; p++) {
  const d = await (await fetch(
    'https://cars.limoja.ai/api/leases?page=' + p + '&per_page=96'
  )).json();
  all.push(...d.results);
}
const total = (await (await fetch('https://cars.limoja.ai/api/leases')).json()).total;
const uniq = new Map();
all.forEach(x => uniq.set(x.make + '|' + x.model + '|' + x.derivative + '|' + x.term + '|' + x.monthly, x));
const r = [...uniq.values()];
const ms = r.map(x => x.monthly).sort((a, b) => a - b);
const mean = ms.reduce((a, b) => a + b, 0) / ms.length;
const med = ms.length % 2 ? ms[(ms.length - 1) / 2] : (ms[ms.length / 2 - 1] + ms[ms.length / 2]) / 2;
console.log(JSON.stringify({
  total,
  unique: r.length,
  median: med,
  mean: +mean.toFixed(2),
  min: ms[0],
  max: ms[ms.length - 1]
}, null, 2));
