import { useMutation, useQuery } from "@apollo/client"
import gql from 'graphql-tag'
import useForm from "../lib/useForm"
import DisplayError from "./ErrorMessage"
import Form from "./styles/Form"

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!){
        Product(where: {id : $id}){
            id
            name
            description
            price
        
        }
    }
`

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int
    ){
        updateProduct(
            id: $id
            data: {
                name: $name,
                description: $description,
                price: $price,
            }
        ){
            id
            name
            description
            price
        }
    }

`

export default function UpdateProduct({id}){
    //1. We need to get the existing product
    const {data, loading, error} = useQuery(SINGLE_PRODUCT_QUERY,{
        variables:{id}
    })

    //2. We need to get the mutation to update the product
    const [updateProduct,{data: updateData, error: updateError, loading: updateLoading}] = useMutation(UPDATE_PRODUCT_MUTATION, )
    //2.5 create some states for form inputs
    const {inputs, handleChange, clearForm, resetForm} = useForm(data?.Product)
    //3. We need the form to handle the updates
    if(loading) return <p>Loading...</p>

    return(
        <Form onSubmit = { async (e) => {
            e.preventDefault()
            const res =  await updateProduct({
                variables: {
                    id: id,
                    name: inputs.name,
                    description: inputs.description,
                    price: inputs.price   
                }
            }).catch(console.error)
            console.log(res)
            //submit inputs fiels to backend
            // const res = await createProduct()
            // clearForm()
            //go to that product page
            // Router.push({
            //     pathname: `/product/${res.data.createProduct.id}`
            // })
            //TO DO: handle submit
        }}>
            <DisplayError error = {error || updateError}/>
            <fieldset disabled = {updateLoading} aria-busy = {updateLoading}>
                <label htmlFor = "name">
                    Name
                    <input 
                        type = "text"  
                        id = "name" 
                        name = "name" 
                        placeholder = "Name"
                        value = {inputs.name} 
                        onChange = {handleChange}
                    />
                </label>
                <label htmlFor = "price">
                    Price
                    <input 
                        type = "number" 
                        id = "price" 
                        name = "price" 
                        placeholder = "Price"
                        value = {inputs.price} 
                        onChange = {handleChange}
                    />
                </label>
                <label htmlFor = "description">
                    Description
                    <textarea 
                        id = "description" 
                        name = "description" 
                        placeholder = "Description"
                        value = {inputs.description} 
                        onChange = {handleChange}
                    /> 
                </label>
                <button type= "submit" >Update Product</button>
            </fieldset>        
        </Form>
    )
}