const profile = { 'player': 'john', 'age':20, 'skill':'cooking'};

// Destructure to get certain objects keys
console.log('Example 1');
const { player , skill } = profile;
console.log('player: ',player);
console.log('skill:', skill);

// Destructure with renaming
const { player:firstName, skill:occupation } = profile;
console.log('firstName:', firstName);
console.log('occupation:', occupation);

// dynamically in object
console.log(`\nExample2`);
const mykey = 'dennis';
const profile2 = { [mykey]:'prescott', 'age':10, 'job':'chef'};
console.log(profile2);

// key and item simultaneously
console.log("\nExample3");
const company='apple';
const title='ceo';
const salary='9876543';
const profile3 = {company, title, salary};
console.log(profile3);

// Removing an object property through spread...
// https://ultimatecourses.com/blog/remove-object-properties-destructuring
const data = { a: 1, b: 2, c: 3 };
const removeProp = 'b';
const { [removeProp]: remove, ...rest } = data;
console.log('remove one:', remove); // 2
console.log('spread object:', rest); // { a: 1, c: 3 }

// Removing multiple objects
// https://www.cloudhadoop.com/2020/02/different-ways-of-remove-property-in.html
const data2 = { a: 1, b: 2, c: 3, d:4 };
const { a, c, ...othertwo } = data2;
console.log('other two:', othertwo);


