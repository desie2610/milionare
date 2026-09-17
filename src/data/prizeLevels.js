export const prizeLevels = [
1000, 
2000,
3000,
4000, 
5000,
10000,
15000,
25000,
50000,
75000,
100000,
150000,
200000,
300000,
400000,
500000,
750000,
1000000,
];
export const automaticGuarantees = [10000, 150000];
export const money = (value) =>
  `${value.toLocaleString("uk-UA").replace(/,/g, " ")} ₴`;
