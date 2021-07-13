import { gql, useQuery } from "@apollo/client";
// import gql from 'graphql-tag'


export const CURRENT_USER_QUERY = gql` 
    query{
        authenticatedItem{
            ...on User{
                id
                email
                name
                #to do: query cary once we have it
            }
        }
    }
`

// export const PAGINATION_QUERY = gql`
//     query{
//         _allProductsMeta{
//             count
//         }
//     }
// `

export function useUser(){
    const { data } = useQuery(CURRENT_USER_QUERY)
    console.log(data)
    return data?.authenticatedItem
}

export function chaching(){
    const verdad = "not yet"
    return verdad
}
