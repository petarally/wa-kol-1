// filter
const numbers = [1, 2, 3, 4];
// želimo dobiti 2 i 4
const parni = numbers.filter((broj) => broj % 2 === 0);
console.log(parni);

// some
// Želimo provjeriti ako postoji barem jedan paran broj
const postojiParni = numbers.some((broj) => broj % 2 === 0);
console.log(postojiParni);

// every
// Želimo provjeriti ako su svi brojevi parani
const sviParni = numbers.every((broj) => broj % 2 === 0);
console.log(sviParni);

// map
// Želimo kvadrirati brojeve u arrayu
const kvadrati = numbers.map((broj) => broj ** 2);
console.log(kvadrati);
console.log(numbers);

// reduce
// Vraća samo 1 vrijednost
// Želimo zbrojiti sve brojeve
const zbroj = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

// accumulator = 0
// accumulator = 0 + 1 = 1
// accumulator = 1 + 2 = 3
// accumulator = 3 + 3 = 6
// accumulator = 6 + 4 = 10

console.log(zbroj);

const umnozak = numbers.reduce(
  (accumulator, currentValue) => accumulator * currentValue,
  1
);

// accumulator = 1
// accumulator = 1 * 1 = 1
// accumulator = 1 * 2 = 2
// accumulator = 2 * 3 = 6
// accumulator = 6 * 4 = 24

console.log(umnozak);

// find
// Želimo pranaći prvi broj koji je veći od 2
const veciOdDva = numbers.find((broj) => broj > 2);
console.log(veciOdDva);

// findIndex
// Želimo pronaći index prvog broja koji je veći od 2
const indexVeciOdDva = numbers.findIndex((broj) => broj > 2);
console.log(indexVeciOdDva);

// forEach
numbers.forEach((broj) => console.log(broj ** 2));
