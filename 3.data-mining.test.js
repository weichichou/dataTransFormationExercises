const pokemons = require("./pokeData");
const trainers = require("./trainerData");
const gyms = require("./gymData");

const {
  getTrainerPokemons,
  getTrainersPokemons,
  getGymLeader,
  getBigGyms,
  getRarestGym
} = require("./3.data-mining");

describe("LG: creatively applying array methods", () => {
  test("[3/A] getGymleader: gets the gymleader belonging to a gym", () => {
    const fuchsiaCity = gyms.find(gym => gym.city === "Fuchsia City");
    const gymLeader = getGymLeader(fuchsiaCity, trainers);
    expect(gymLeader).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        pokemonIds: expect.any(Array)
      })
    );
    expect(gymLeader.name).toBe("Koga");
  });

  test("[3/B] getTrainerPokemons: gets the pokemons belonging to a trainer", () => {
    const ash = trainers.find(trainer => trainer.name === "Ash");
    const teamAsh = getTrainerPokemons(ash, pokemons);

    expect(teamAsh).toEqual(expect.any(Array));
    expect(teamAsh.map(pokemon => pokemon.name)).toEqual(
      expect.arrayContaining([
        "Pikachu",
        "Bulbasaur",
        "Squirtle",
        "Charizard",
        "Pidgeotto",
        "Butterfree"
      ])
    );
  });

  test(`[3/C] getTrainersPokemons: replaces trainerIds with 
            the pokemons belonging to a trainer for an array of trainers`, () => {
    const trainersWithPokemons = getTrainersPokemons(trainers, pokemons);

    expect(trainersWithPokemons).toEqual(expect.any(Array));

    trainersWithPokemons.forEach(trainer => {
      expect(trainer).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          pokemons: expect.any(Array)
        })
      );

      trainer.pokemons.forEach(pokemon => {
        expect(pokemon).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            avg_spawns: expect.any(Number)
          })
        );
      });
    });
  });

  test("[3/D] getBigGyms: gets the city names with gym leaders who have 4 pokemons or more", () => {
    const bigGymCities = getBigGyms(gyms, trainers);
    expect(bigGymCities).toEqual(
      expect.arrayContaining([
        "Saffron City",
        "Fuchsia City",
        "Cinnabar Island",
        "Viridian City"
      ])
    );
  });

  test("[3/E] getRarestGym: gets the gym with the most legendary pokemon", () => {
    const rarestGym = getRarestGym(gyms, trainers, pokemons);
    expect(rarestGym).toEqual({ id: 1, city: "Saffron City", trainerId: 2 });
  });
});
