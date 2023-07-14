import create from "zustand";
import axios from "axios";

const useApiStore = create((set) => ({
  initialBeers: [],
  additionalBeers: [],
  myRecipes: [],
  addToMyRecipes: (beer) => {
    set((state) => {
      const isAlreadyAdded = state.myRecipes.some(
        (item) => item.id === beer.id
      );
      if (!isAlreadyAdded) {
        const updatedRecipes = [...state.myRecipes, beer];
        return { myRecipes: updatedRecipes };
      } else {
        const updatedRecipes = state.myRecipes.filter(
          (item) => item.id !== beer.id
        );
        return { myRecipes: updatedRecipes };
      }
    });
  },

  removeFromMyRecipes: (recipeId) => {
    set((state) => {
      const updatedRecipes = state.myRecipes.filter(
        (recipe) => recipe.id !== recipeId
      );
      return { myRecipes: updatedRecipes };
    });
  },

  fetchBeers: async () => {
    try {
      const response = await axios.get(
        "https://api.punkapi.com/v2/beers?per_page=15"
      );
      const data = response.data;
      set({ initialBeers: data });
    } catch (error) {
      console.log("Error", error);
    }
  },

  fetchAdditionalBeers: async () => {
    try {
      const response = await axios.get(
        "https://api.punkapi.com/v2/beers?per_page=25"
      );
      const data = response.data;
      const selectedBeers = data.slice(15, 25);
      set({ additionalBeers: selectedBeers });
    } catch (error) {
      console.log("Error", error);
    }
  },
}));

export default useApiStore;
