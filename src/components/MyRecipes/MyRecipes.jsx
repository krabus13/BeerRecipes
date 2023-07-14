import React, { useState } from "react";
import useApiStore from "../../apiStore";
import styles from "./MyRecipes.module.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/Navbar";

const MyRecipes = () => {
  const { myRecipes, removeFromMyRecipes } = useApiStore();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpansion = (itemId) => {
    setExpandedItems((prevState) =>
      prevState.includes(itemId)
        ? prevState.filter((id) => id !== itemId)
        : [...prevState, itemId]
    );
  };

  const handleDelete = (recipeId) => {
    const updatedRecipes = removeFromMyRecipes(recipeId);
  };

  return (
    <div className={styles.main}>
      <NavBar myRecipes={myRecipes} />
      <h2>My Recipes</h2>
      {myRecipes.length === 0 ? (
        <p style={{ fontSize: "25px" }}>Not found recipe</p>
      ) : (
        myRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className={`${styles.card} ${
              expandedItems.includes(recipe.id) ? styles.expanded : ""
            }`}
          >
            <div className={styles.top}>
              <div>
                <h2>{recipe.name}</h2>
                <h3 style={{ opacity: "0.6", paddingLeft: "20px" }}>
                  {recipe.tagline}
                </h3>
              </div>
              <img src={recipe.image_url} alt="beer" />
            </div>
            <div>
              <button onClick={() => toggleExpansion(recipe.id)}>
                {expandedItems.includes(recipe.id)
                  ? "Hide Details"
                  : "Show Details"}
              </button>
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
            {expandedItems.includes(recipe.id) && (
              <div>
                <h5>Brewers tips:</h5>
                <p>{recipe.brewers_tips}</p>
                <h5>Description : </h5> {recipe.description}
                <h5>ABV : {recipe.abv}</h5>
                <h5>Atternation level : {recipe.attenuation_level} </h5>
                <h5>EBC : {recipe.ebc}</h5>
                <h5>IBU : {recipe.ibu}</h5>
                <h5>pH : {recipe.ph}</h5>
                <h5>SRM : {recipe.srm}</h5>
                <ul>
                  <h5> Food pairing : </h5>
                  {recipe.food_pairing.map((food, index) => (
                    <li key={index}>{food}</li>
                  ))}
                </ul>
                <ul>
                  <h5>Ingredients : </h5>
                  {recipe.ingredients.hops.map((ing, index) => (
                    <li key={index}>
                      {ing.name}, {ing.amount.value} {ing.amount.unit}, Add :{" "}
                      {ing.add}, {ing.attribute}
                    </li>
                  ))}
                </ul>
                <h5>Method</h5>
                <p>
                  Fermentation: Temp: {recipe.method.fermentation.temp.value}
                </p>
                <ul>
                  {recipe.method.mash_temp.map((temp, index) => (
                    <li key={index}>
                      Mash Temp {index + 1}: Temp: {temp.temp.value}, Duration:{" "}
                      {temp.duration}
                    </li>
                  ))}
                </ul>
                {recipe.method.twist && <p>Twist: {recipe.method.twist}</p>}
                <h5>Target fg : {recipe.target_fg}</h5>
                <h5>Target og : {recipe.target_og}</h5>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyRecipes;
