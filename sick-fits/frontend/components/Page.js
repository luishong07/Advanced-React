import PropTypes from 'prop-types'
import Header from './Header'


export default function Page({children,cool}){
    return(
        <div>
            <Header/>
            <h2>I am the Page component</h2>
            <h3>{cool}</h3>
            { children}
        </div>
    )
}

Page.prototype = {
    cool: PropTypes.string, 
    children: PropTypes.any 
}