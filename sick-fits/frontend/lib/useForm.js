import { validate } from "graphql"
import { number } from "prop-types"
import { useState } from "react"

export default function useForm(initial = {}){
//create state object for our inputs 
    const [inputs, setInputs] = useState(initial)
    
    // {
        //     name: "shoes",
        //     description: "nice shoes",
        //     price: 1000
        // }
        
    function handleChange(e){
        let {value, name, type} = e.target
        if(type === 'number'){
            value = parseInt(value)
        }
        if(type === 'files'){
            value[0] = e.target.files
        }
        //copy existing state
        setInputs({
            ...inputs,
            [name] : value
        }) 
    }

    function resetForm(){
        setInputs(initial)
    }

    function clearForm(){
        const blankSlate = Object.fromEntries(Object.entries(inputs).map(([key,value]) => [key, ''])) 
        setInputs(blankSlate)
    }
    

    //return things we want to surface from this custome hook
    // clearForm()
    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    }
}