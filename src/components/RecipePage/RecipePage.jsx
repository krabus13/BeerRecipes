import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import useApiStore from "../../apiStore";
import styles from "./Recipepage.module.css";

const RecipePage = () => {
  const { id } = useParams();
  const { initialBeers, myRecipes } = useApiStore();

  const recipe = initialBeers.find((beer) => beer.id === parseInt(id));

  return (
    <div>
      <NavBar myRecipes={myRecipes} />
      <div className={styles.main}>
        <div key={recipe.id} className={styles.card}>
          <div className={styles.top}>
            <div>
              <h2>{recipe.name}</h2>
              <h3 style={{ opacity: "0.5", paddingLeft: "20px" }}>
                {recipe.tagline}
              </h3>
            </div>
            <img src={recipe.image_url} alt="beer" />
          </div>
          <div></div>
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
            <p>Fermentation: Temp: {recipe.method.fermentation.temp.value}</p>
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
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
