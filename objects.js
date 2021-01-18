users = { 'a': 'amy', 'b':'brie', 'c':'christie' }
Object.keys(users).forEach((keys, index) => console.log(index, keys));
Object.values(users).forEach((values, index) => console.log(index,values));
Object.entries(users).forEach((values, index) => console.log(index, values));

myObj = Object.entries(users).map(values => {return values[0] + ' is for ' + values[1]})

players = [['d','diane'], ['e','elise'], ['f','faye']]
Object.fromEntries(players)