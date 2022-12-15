import React from "react";
import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    /* Gets the restaurants from the database.
    It takes the value from the search input field and sends it with the url so we can use GET 
    to filter the query  */
    async function getRestaurants() {
      const url = `https://skole.mortengh.dk/PHP/restaurants.php?city=${searchCity}`;
      const response = await fetch(url);
      const data = await response.json();
      const restaurantssArray = Object.keys(data).map((key) => ({
        key: key,
        ...data[key],
      })); // from object to array
      setRestaurants(restaurantssArray);
    }
    getRestaurants();
    //Each time searchCity is changed, it runs the useEffect again
  }, [searchCity]);

  //Sets the searchCity state to the value of the search field
  const handleChange = (e) => {
    setSearchCity(e.target.value);
  };

  return (
    <>
      <div className="Filters">
        <label htmlFor="searchbar">Søg efter By: </label>
        <input
          name="searchbar"
          type="search"
          value={searchCity}
          onChange={(event) => handleChange(event)}
        />
      </div>
      <div className="RestaurantGrid">
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard restaurant={restaurant} key={restaurant.key} />
          );
        })}
      </div>
    </>
  );
};

export default Home;
