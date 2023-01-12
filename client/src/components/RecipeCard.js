import React from "react";

export default function RecipeCard(props) {
    return (
        <div>
            <div>
                <h1>{props.name}</h1>
                <img src={props.image}/>
                <div>
                {props.diets.map(diet=> <p>{diet}</p>)}
                </div>
            </div>
        </div>
    )
}