import React, { useState, useEffect } from 'react'
import Input from './Input'
import TextArea from './TextArea'
import Button from '../../common/Button'

const RecipeForm = ({ initialValues = {}, onSubmit, submitButtonLabel = 'Submit', isEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        prep_time_minutes: '',
        cook_time_minutes: '',
        servings: '',
        is_public: false,
        ingredients: [{}],
        instructions: '',
        ...initialValues,
    })

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const handleChange = (e) => {
        const { name, value, checked } = e.target
        setFormData(prev => ( { ...prev, [ name ]: name === 'is_public' ? checked : value } ))
    }

    const handleIngredientChange = (index, name, value) => {
        const updatedIngredients = [...formData.ingredients]
        updatedIngredients[ index ][ name ] = value
        setFormData(prev => ( { ...prev, ingredients: updatedIngredients } ))
    }

    const addIngredientField = () => {
        setFormData(prev => ( {
            ...prev,
            ingredients: [...prev.ingredients, {}],
        } ))
    }

    const removeIngredientField = (index) => {
        const updatedIngredients = formData.ingredients.filter((_, i) => i !== index)
        setFormData(prev => ( { ...prev, ingredients: updatedIngredients } ))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[ 0 ]
        console.log(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setFormData(prev => ( { ...prev, image_url: imageUrl } ))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={ handleSubmit } className="space-y-6">
            <Input label="Recipe Title" name="title" id="title" required value={ formData.title }
                   onChange={ handleChange }/>
            <TextArea label="Description" name="description" id="description" required value={ formData.description }
                      onChange={ handleChange } rows="3"/>

            <div>
                <Input label="Upload Picture" name="image_url" id="image_url" type="file" required={ !isEdit }
                       accept="image/*" onChange={ handleFileChange }/>
                { formData.image_url && (
                    <img src={ formData.image_url } alt="Preview" className="mt-2 max-h-48 rounded-md object-cover"/>
                ) }
            </div>

            <div className="flex gap-2">
                <Input label="Prep Time (min)" type="number" name="prep_time_minutes" id="prep_time_minutes"
                       value={ formData.prep_time_minutes } onChange={ handleChange }/>
                <Input label="Cook Time (min)" type="number" name="cook_time_minutes" id="cook_time_minutes"
                       value={ formData.cook_time_minutes } onChange={ handleChange }/>
                <Input label="Servings" type="number" name="servings" id="servings" value={ formData.servings }
                       onChange={ handleChange }/>
            </div>

            <div>
                { formData.ingredients.map((ingredient, index) => (
                    <div key={ index } className="flex gap-2 items-center">
                        <Input label="Ingredient" name="name" required value={ ingredient.name || '' }
                               onChange={ (e) => handleIngredientChange(index, 'name', e.target.value) }/>
                        <Input label="Amount" name="amount" required value={ ingredient.amount || '' }
                               onChange={ (e) => handleIngredientChange(index, 'amount', e.target.value) }/>
                        { formData.ingredients.length > 1 && (
                            <button type="button" onClick={ () => removeIngredientField(index) }
                                    className="text-red-500 font-bold h-full">✕</button>
                        ) }
                    </div>
                )) }

                <button type="button" onClick={ addIngredientField }
                        className="text-indigo-600 mt-1 text-sm hover:underline">
                    + Add Ingredient
                </button>
            </div>
            <div>
                <label htmlFor="is_public" className='text-gray-700 font-medium'>Set to public</label>
                <input type="checkbox" name="is_public" id="is_public" className='mx-2'
                       checked={ formData.is_public } onChange={handleChange}/>
            </div>

            <TextArea label="Instructions" name="instructions" id="instructions" required
                      value={ formData.instructions } onChange={ handleChange } rows="5"/>

            <Button type="submit">{ submitButtonLabel }</Button>
        </form>
    )
}

export default RecipeForm
