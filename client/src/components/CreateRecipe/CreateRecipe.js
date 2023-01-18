import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postRecipe, getDiets } from '../../redux/actions';
import HomeButton from '../HomeButton/HomeButton.js';
import styles from "./createrecipe.module.css"

const imgRegexp = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')
const isBlankSpace = new RegExp("^\\s+$")


function validateText ({ name, summary, healthScore, image, dishTypes }) {
  const err = {}
  
  //obligatorios
  if (!name) err.name = "Insert name"
  else if (isBlankSpace.test(name)) err.name = "Invalid name"
  else if (name.trim().length > 50) err.name = `Maximum number of characters: 50 (${name.trim().length}/50)`
  
  if (!summary) err.summary = "Write a brief summary"
  else if (isBlankSpace.test(summary)) err.summary = "Invalid summary"
  else if (summary.trim().length < 10) err.summary = `Minimum number of characters: 20 (${summary.trim().length}/20)`

  //opcionales
  if (healthScore && (healthScore > 100 || healthScore < 0)) err.healthScore = "HS should be a number between 0 and 100"
  else if (healthScore && isNaN(healthScore)) err.healthScore = "Please enter a number"

  if (image && !imgRegexp.test(image.trim())) err.image = "Please insert a valid URL"
  if (dishTypes.trim().length > 50) err.dishTypes = "Maximum number of characters: 50"
  
  return err
}

export default function CreateRecipe () {

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
      stepByStep: input.stepByStep? input.stepByStep.split(".").map(step => `${step}.`): [],
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
      <div className={styles.maindiv} >
        <HomeButton/>
        <h1 className={styles.titulo}>Complete the form below to create your own recipe!</h1>
        <h5 className={styles.titulo}>Fields marked with * are required</h5>

        <form className={styles.formulario} onSubmit={handleSubmit}>
          <label className={styles.label}>Name *</label>
          <input className={styles.inputtag} value={input.name} name='name' onChange={handleChange} type='text' placeholder='Name' />
          {err.name && <p className={styles.error} >{err.name}</p>}
          
          <label className={styles.label}>Summary *</label>
          <textarea className={styles.texttag} value={input.summary} name='summary' onChange={handleChange} placeholder='Summary' />
          {err.summary && <p className={styles.error} >{err.summary}</p>}
          
          <label className={styles.label}>Health Score</label>
          <input className={styles.inputtag} value={input.healthScore} name='healthScore' onChange={handleChange} type='text' placeholder='Health Score (0 - 100%)' />
          {err.healthScore && <p className={styles.error} >{err.healthScore}</p>}
          
          <label className={styles.label}>Step by step</label>
          <textarea className={styles.texttag} value={input.stepByStep} name='stepByStep' onChange={handleChange} placeholder='Step by step' />
          
          <label className={styles.label}>Image</label>
          <input className={styles.inputtag} value={input.image} name='image' onChange={handleChange} type='text' placeholder='Image URL' />
          {err.image && <p className={styles.error}>{err.image}</p>}

          <label className={styles.label}>Type of dish</label>
          <input className={styles.inputtag} type="text" name="dishTypes" placeholder="Dish Type" value={input.dishTypes} onChange={handleChange}/>

          <label className={styles.label}>Diet</label>
          <select className={styles.select} onChange={handleSelectDiet} defaultValue='DEFAULT'>
            <option value="DEFAULT" disabled>--select type of diet--</option>
            {diets.map(diet => <option value={diet.name} key={diet.id}>{diet.name}</option>)}
          </select>
          <ul >
            {selectedDiet.map((diet,id) => 
              <li className={styles.lista}  key={id}>
                {diet}
                <button className={styles.deselect} value={diet} onClick={handleDeleteDiet}>x</button>
              </li>
            )}
          </ul>
          <button className={styles.submit} disabled={isButtonDisabled()} type='submit'>Submit recipe</button>
        </form>
      </div>
  );
}
