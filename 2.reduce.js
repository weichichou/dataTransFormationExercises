const pokemons = require('./pokeData')

const calculateTotalPokemonWeight = (pokemons) => {
    return pokemons.reduce((totalWeight, currentPokemon) => {
        return totalWeight + parseFloat(currentPokemon.weight)
    }, 0)
}

const calculateAverageSpawnChance = (pokemons) => {

    const totalSpawnChance = pokemons.reduce((acc, val) => {
        return acc + val.spawn_chance
    }, 0)
    console.log(totalSpawnChance)
    return totalSpawnChance / pokemons.length
}

// 有沒有放initial value就影響結果了，為什麼
// 想一想：先用filter, 再做計算
const calculateTotalEggDistance = (pokemons) => {
    return pokemons.reduce((acc, val) => {
        if (val.egg === 'Not in Eggs'){
            return acc
        } return acc + parseInt(val.egg)
    },0)
}

//should use parseFloat instead of parseInt
//Try: trun if statement into 'return <condition> ? :

const getHeaviestPokemon = (pokemons) => {
    return pokemons.reduce((acc, val) => {
        if (parseInt(val.weight) > parseInt(acc.weight)){
            return val
        } return acc
    })
}

// 想一想：當分類很多時，使用 '...acc' (不用重複打分類名稱）
const categorizePokemonsByRarity = (pokemons) => {
    return pokemons.reduce((acc, val) => {
        if(val.spawn_chance <= 0.01){
            return {
                common: acc.common,
                rare: acc.rare,
                legendary: acc.legendary.concat(val)
            } 
        }else if(val.spawn_chance <= 0.1) {
             return {
                common: acc.common,
                rare: acc.rare.concat(val),
                legendary: acc.legendary
             } 
        } else {
            return {
                common: acc.common.concat(val),
                rare: acc.rare,
                legendary: acc.legendary
            }
        }
    },
    {
        common: [],
        rare: [],
        legendary: []
    })
}


//console.log(categorizePokemonsByRarity(pokemons));
/*
categorizePokemonsByRarity should return an object like this:

{
   common: [ ], // array of pokemons
   rare: [ ], // array of pokemons
   legendary: [ ], // array of pokemons
}

Common: spawn_chance higher than 0.1
Rare: spawn_chance less than 0.1
Legendary: spawn_chance less than 0.01

*/

module.exports = {
    calculateTotalPokemonWeight,
    calculateAverageSpawnChance,
    calculateTotalEggDistance,
    getHeaviestPokemon,
    categorizePokemonsByRarity,
}