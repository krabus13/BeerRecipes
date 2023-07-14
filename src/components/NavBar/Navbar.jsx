import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const NavBar = ({ myRecipes }) => {
  return (
    <div>
      <div className={styles.bar}>
        <Link to="/" className={styles.title}>
          <h2>Beer List</h2>
        </Link>
        <Link to="/my-recipes" className={styles.button}>
          <button> MyRecipes </button>
        </Link>
        <div className={styles.recipeCount}>
          {myRecipes.length} favourite recipe
        </div>
      </div>
    </div>
  );
};
export default NavBar;
