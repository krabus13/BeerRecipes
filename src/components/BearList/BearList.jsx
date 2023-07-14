import React, { useEffect, useState } from "react";
import useApiStore from "../../apiStore";
import styles from "./BearList.module.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/Navbar";

function BeerList() {
  const {
    initialBeers,
    additionalBeers,
    fetchBeers,
    fetchAdditionalBeers,
    addToMyRecipes,
    removeFromMyRecipes,
    myRecipes,
  } = useApiStore();
  const [visibleBeers, setVisibleBeers] = useState([]);
  const [loadedCount, setLoadedCount] = useState(5);

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  useEffect(() => {
    const combinedBeers = [...initialBeers, ...additionalBeers];
    setVisibleBeers(combinedBeers.slice(0, loadedCount));
  }, [initialBeers, additionalBeers, loadedCount]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && loadedCount < 25) {
      setLoadedCount((prevCount) => prevCount + 5);
    }
  };

  useEffect(() => {
    if (loadedCount === 20) {
      fetchAdditionalBeers();
    }
  }, [loadedCount, fetchAdditionalBeers]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRightClick = (e, beer) => {
    e.preventDefault();
    const isAlreadyAdded = addToMyRecipes(beer);
    if (isAlreadyAdded) {
      removeFromMyRecipes(beer);
    }
  };

  return (
    <div className={styles.main}>
      <NavBar myRecipes={myRecipes} />
      {visibleBeers.map((beer) => (
        <Link
          to={`/recipe/${beer.id}`}
          className={styles.card}
          key={beer.id}
          onContextMenu={(e) => handleRightClick(e, beer)}
        >
          <h2>{beer.name}</h2>
          <div className={styles.description}>
            <div>
              <h5 style={{ opacity: "0.5" }}>{beer.tagline}</h5>
              <h5>Description :</h5> {beer.description}
              <h5>Brewers tips :</h5> {beer.brewers_tips}
            </div>
            <div>
              <img src={beer.image_url} alt="beer" />
            </div>
          </div>
          <div className={styles.downCard}>
            <h5>First brewed {beer.first_brewed}</h5>
            <h5>pH {beer.ph}</h5>
            <h5>SRM {beer.srm}</h5>
            <h5>Contributed by {beer.contributed_by}</h5>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BeerList;
