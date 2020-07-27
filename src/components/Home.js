import React from 'react';
import ExpensePreview from './ExpenseOverview'
import {useGlobalState} from '../config/store'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import piggybank from './../assets/piggybank.png'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 1000,
        margin: 'auto',
        marginTop: theme.spacing(20),
        marginBottom: theme.spacing(5),
      },
      title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
      },
      media: {
        minHeight: 500
      },
      credit: {
        padding: 10,
        textAlign: 'right',
        backgroundColor: '#ededed',
        borderBottom: '1px solid #d0d0d0',
        '& a':{
          color: '#4f83cc'
        } 
      } 
}))

const Home = () => {
    const classes = useStyles()
    const {store} = useGlobalState()
    const {loggedInUser} = store

    return ( 
        <>
        {loggedInUser
        ? ( <div>
                <ExpensePreview />
            </div> )
        
        : ( <div>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={piggybank}  title="PiggyBank"/>
            </Card>
            </div> )
        }
        </>
     )
}
 
export default Home