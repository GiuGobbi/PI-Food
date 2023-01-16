// import {useDispatch, useSelector} from "react-redux";
// import { useState, useEffect } from "react";
// import { getDiets, postRecipe} from "../../redux/actions";
// import validate from "./validate.js"

// export default function CreateRecipe() {
//     const dispatch = useDispatch()
//     const allDiets = useSelector((state) => state.diets);
//     const [errors, setError] = useState({name: "", summary: "", image: ""});
//     const [input, setInput] = useState({
//         name: '',
//         image: '',
//         summary: '',
//         healthScore: '',
//         dishTypes: '',
//         stepByStep: '',
//         diets: [],
//     });

//     useEffect(() => {
//         if (!allDiets.length) {
//             dispatch(getDiets());
//         }
//     }, []);

//     function handleChange(e) {
//         e.preventDeafult()
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value,
//         });
//         setError(
//             validate({
//                 ...input,
//                 [e.target.name]: e.target.value,
//             })
//         );
//     };

//     function handleSelect(e) {
//         setInput({
//             ...input,
//             diets: [...input.diets, e.target.value],
//         });
//     };

//     function handleDeselect(e) {
//         setInput({
//             ...input,
//             diets: input.diets.filter((dieta) => dieta !== e),
//         });
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         var newRecipe = {
//             name: input.name,
//             image: input.image,
//             summary: input.summary,
//             healthScore: input.healthScore ? input.healthScore : null,
//             dishTypes: input.dishTypes? [input.dishTypes] : [],
//             stepByStep: input.stepByStep? [input.stepByStep] : [],
//             diets: input.diets.length? [input.diets] : [],
//         }

//         if (
//             !input.name ||
//             !input.image ||
//             !input.summary
//             ) 
//         {
//             alert(errors);
//         } else {
//             dispatch(postRecipe(newRecipe));
//             setInput({
//                 name: '',
//                 image: '',
//                 summary: '',
//                 healthScore: '',
//                 dishTypes: '',
//                 stepByStep: '',
//                 diets: [],
//             });
//         }
//     }
    
//     return (
//         <div>
//             <h1>Submit your own recipe!</h1>
//             <p>Complete the form below to create your own recipe!</p>
//             <div>
//             <form onSubmit={(e) => handleSubmit(e)}>
//                 <input type="text" name="name" placeholder="Title" value={input.name} onChange={handleChange}/>
//                 <br/>
//                 <input type="text" name="image" placeholder="Image" value={input.image} onChange={handleChange}/>
//                 <br/>
//                 <textarea name="summary" placeholder="Summary" value={input.summary} onChange={handleChange}/>
//                 <br/>
//                 <input type="text" name="healthScore" placeholder="Health Score" value={input.healthScore} onChange={handleChange}/>
//                 <br/>
//                 <input type="text" name="dishTypes" placeholder="Dish Type" value={input.dishTypes} onChange={handleChange}/>
//                 <br/>
//                 <input type="text" name="stepByStep" placeholder="Step by Step" value={input.diets} onChange={handleChange}/>
//                 <br/>
//                 <select onChange={(e) => {handleSelect(e)}}>
//                     <option value="">--select diets--</option>
//                     {allDiets.map((diet) => { return (
//                     <option key={diet.id} value={diet.name}>
//                     {diet.name}
//                     </option>
//                 )})}
//                 </select>
//                 <br/>
//                 <div>
//                 <p>edit diets</p>
//                 {input.diets?.map((e) => {
//                     return (
//                         <div key={e}>
//                             <p>{e}</p>
//                             <button
//                                 onClick={() => handleDeselect(e)}
//                             >
//                                 x
//                             </button>
//                         </div>
//                     )
//                 })}
//             </div>
//             <br/>
//                 <input type="submit" value="Submit" />
//             </form>
//             </div>
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postRecipe, getDiets } from '../../redux/actions';

// eslint-disable-next-line no-useless-escape
const imgRegexp = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')
const isBlankSpace = new RegExp("^\\s+$")

// cb
function validateText ({ name, summary, healthScore, image, dishTypes }) {
  const err = {}

  if (!name) err.name = 'Write the name'
  else if (isBlankSpace.test(name)) err.name = "Shouldn't be a blank space"
  else if (name.trim().length > 50) err.name = `Maximum number of characters: 50 (${name.trim().length}/50)`
  
  if (!summary) err.summary = 'Write the summary'
  else if (isBlankSpace.test(summary)) err.summary = "Shouldn't be a blank space"
  else if (summary.trim().length < 10) err.summary = `Minimum number of characters: 10 (${summary.trim().length}/10)`

  // optionals
  if (healthScore && (healthScore > 100 || healthScore < 0)) err.healthScore = 'Should be a number between 0 and 100'
  else if (healthScore && isNaN(healthScore)) err.healthScore = 'Should be a number'

  if (image && !imgRegexp.test(image.trim())) err.image = 'Should be a valid URL'
  if (dishTypes.trim().length > 30) err.dishTypes = `Maximum number of characters: 30`
  
  return err
}

// component
function CreateRecipe () {
  //me traigo las recipes para ver si el name ingresado del usuario ya existe. guardo todos los names en minús en un obj

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const diets = useSelector(state => state.diets)
  const [selectedDiet, setSelectedDiet] = useState([])
  const [err, setErr] = useState({})
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    stepByStep: "",
    dishTypes: "",
    image: "",
    diets: []
  })
  
  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
    setErr(validateText({...input, [e.target.name]: e.target.value}))
  }

  const isButtonDisabled = () => !(input.name && input.summary) || (Object.keys(err).length)

  const handleSelectDiet = (e) => {
    if (!selectedDiet.includes(e.target.value)) setSelectedDiet([...selectedDiet, e.target.value])
  }

  const handleDeleteDiet = (e) => {
    e.preventDefault()
    setSelectedDiet(selectedDiet.filter(d => d !== e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!Object.values(input).join("")) return alert('Please complete the form')
    if (Object.keys(err).length) return alert ('Please complete the form with the correct data')

    const newRecipe = {
      name: input.name.trim(),
      summary: input.summary.trim(),
      healthScore: input.healthScore ? Math.floor(input.healthScore) : null,
      stepByStep: input.stepByStep.trim() ? [input.stepByStep.trim()] : [],
      dishTypes: input.dishTypes.trim()? [input.dishTypes.trim()] : [],
      image: input.image.trim(),
      diets: selectedDiet
    }
    // console.log('newRecipe',newRecipe);
    dispatch(postRecipe(newRecipe))
    navigate('/home')
  }

  useEffect(() => {
    dispatch(getDiets())
    // si el estado allRecipes está vacío lo lleno, sino no 
  }, [dispatch])

  return (
    <div >
      <div >
        <h1 >Complete the form below to create your own recipe!</h1>
        <h5 >Fields marked with <span>*</span> are required</h5>

        <form onSubmit={handleSubmit}>
          <label >Name <span>*</span></label>
          <input value={input.name} name='name' onChange={handleChange} type='text' placeholder='Name' />
          {err.name && <p >{err.name}</p>}
          
          <label >Summary <span >*</span></label>
          <textarea value={input.summary} name='summary' onChange={handleChange} placeholder='Summary' />
          {err.summary && <p >{err.summary}</p>}
          
          <label >Health Score</label>
          <input value={input.healthScore} name='healthScore' onChange={handleChange} type='text' placeholder='Health Score (0 - 100%)' />
          {err.healthScore && <p >{err.healthScore}</p>}
          
          <label >Step by step</label>
          <textarea value={input.stepByStep} name='stepByStep' onChange={handleChange} placeholder='Step by step' />
          
          <label>Image</label>
          <input value={input.image} name='image' onChange={handleChange} type='text' placeholder='Image URL' />
          {err.image && <p >{err.image}</p>}

          <label>Type of dish</label>
          <input type="text" name="dishTypes" placeholder="Dish Type" value={input.dishTypes} onChange={handleChange}/>
          {err.dishTypes && <p >{err.dishTypes}</p>}

          <label>Diet</label>
          <select onChange={handleSelectDiet} defaultValue='DEFAULT'>
            <option value="DEFAULT" disabled>--select type of diet--</option>
            {diets.map(diet => <option value={diet.name} key={diet.id}>{diet.name}</option>)}
          </select>
          <ul >
            {selectedDiet.map((diet,id) => 
              <li  key={id}>
                {diet}
                <button  value={diet} onClick={handleDeleteDiet}>X</button>
              </li>
            )}
          </ul>
          <button disabled={isButtonDisabled()} type='submit'>Submit recipe</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;