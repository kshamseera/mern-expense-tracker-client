import React from 'react';
import ExpensePreview from './ExpenseOverview'
import {useGlobalState} from '../config/store'

const Home = () => {

    const divStyle= {
        margin: ".5rem auto",
        padding: ".6rem "
    }
    const paraStyle = {
        color: "Green",
        size:"3rem"
    }

    const {store} = useGlobalState()
    const {loggedInUser} = store
    return ( 
        <>
        {loggedInUser?
            ( <div>
                <ExpensePreview />
            </div> )
        
        : ( <div style ={divStyle}>
            <h1>Expense Tracker</h1>
            <div style ={paraStyle}>
                <p>Tracking your expenses helps make you more mindful of spending in the moment.</p>
            </div>
            </div> )
        }
        </>
     );
}
 
export default Home;