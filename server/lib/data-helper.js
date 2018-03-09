module.exports = function makeDataHelpers(knex) {
  return {
    //GETs
    getRestaurants: () => knex("restaurant").limit(10),
    getFoods: (id) => knex("food").where("restaurant_id", id).limit(10),

    //POSTs
    saveOrder: () => {
      
    }
  }
}