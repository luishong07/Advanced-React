import { PAGINATION_QUERY } from "../components/Pagination"

export default function paginationField(){
    return{
        keyArgs: false,// it tells apollo we take care of everything
        read(exisiting = [], {args, cache}){
            // console.log(exisiting, args, cache)
            const { skip, first } = args
            
            //read the number of items on the page from the cache
            const data = cache.readQuery({query: PAGINATION_QUERY})
            const count = data?._allProductsMeta?.count
            const page = skip / first +1
            const pages = Math.ceil(count/first)

            //check if we have existing items
            const items = exisiting.slice(skip, skip + first).filter((x) => x)
            //if
                //there are items
                //AND there are not enought items to satify how many were requested
                //AND we are on the last page
            // just send them 
            if(items.length && items.length !== first && page == pages){
                return items
            }
            if(items.length !== first){
                //we don't have any items, we must go to the network to fetch them
                return false
            }
            //if there are items, just return them from the cache and we don't have to go to the network
            if(items.length){
                console.log(`there are ${items.length} items in the cache. Gonna send them to apollo`)
                return items
            }

            return false// fallback to network

            // first thing it does is it asks the read function for those items
            //we can do one of two things
            
            //first thing we can do is return the items because they are already in the cache

            //the other thing we can do is to return false from here(network request )
        },
        merge(existing, incoming, { args }){
            const { skip, first } = args
            // this runs when the apollo client comes back from the network with our products
            // console.log(`merging items from the network ${incoming.length}`)
            const merged = existing ? existing.slice(0) : []
            for(let i = skip; i < skip + incoming.length; ++i){
                merged[i] = incoming[i - skip]
            }
            // console.log(merged)
            return merged
        }  
    }
}