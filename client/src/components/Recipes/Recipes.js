import RecipeCard from "../RecipeCard/RecipeCard.js";
import styles from "./recipes.module.css";

export default function Recipes({recipes}) {
    return (
        <div className={styles.container}>
            {recipes.length? recipes.map(recipe => 
            <RecipeCard
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            dishTypes={recipe.dishTypes}
            diets={recipe.diets.map((diet) => diet.name)}
            />
          ) : <div>ERROR</div>}
        </div>
    )
};