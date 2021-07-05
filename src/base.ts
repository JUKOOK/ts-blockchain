interface Human {
  name: string;
  age: number;
  gender: string;
}

const me = {
  name: "JUKOOK",
  age: 28,
  gender: "male",
};

// const sayHi = (name: string, age: number, gender: string): string => {
//   return `안녕하세요 저는 ${name}입니다. 나이는 ${age}살이고, 성별은 ${gender}입니다.`;
// };

const sayHi = (person: Human): string => {
  return `안녕하세요 저는 ${person.name}입니다. 나이는 ${person.age}살이고, 성별은 ${person.gender}입니다.`;
};

console.log(sayHi(me));
