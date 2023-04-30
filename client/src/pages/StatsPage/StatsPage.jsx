import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStyle from "./styles";
import { qetQueriesOfARepo } from '../../api';


const StatsPage = ({repo}) => {
    const classes = useStyle();
    const [queries, setQueries] = useState(null);
    const [avgScore, setAvgScore] = useState(null);
    const [quotes, setQuotes] = useState(null);



    const getDaysFromBeginning = ()=> {
        var startDate = new Date(repo.createdAt)
        var currentDate = new Date()
        var difference = currentDate - startDate

        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays
    }
  
    useEffect( ()=> {
      
        const getQueries = async () => {

          try {
            const data = await qetQueriesOfARepo({repoId: repo._id}); 
            setQueries(data.data);

            var feedBackNo = 0;
            var totalNo = 0;
            var quotes = [];

            for (var i  = 0 ; i < data.data.length; i++) {
              var q = data.data[i];
              if(q.feedbackGiven) {
                feedBackNo += 1;
                totalNo += q.feedbackNumber;
                quotes.push( q.feedbackText)
                
              }
            }

            const avgNo = totalNo / feedBackNo;
            setAvgScore( avgNo);
            setQuotes(quotes);
          } catch (error) {
            console.log(error);
          }
        }
    
        getQueries();
      }, []);

    return (


        <Container className={classes.container} >
            <Typography className={classes.left} variant='h4'>Your project has been using ExDev for {getDaysFromBeginning()} days!</Typography>
            <Typography className={classes.right} variant='h4'>{queries? queries.length: 0} times someone used ExDev to get help!</Typography>
            <Typography className={classes.left} variant='h4'>{avgScore ? "The average score you gave us is " + avgScore : "No one has given us a rating yet!"} </Typography>
            {
              quotes? 
              <>
                <Typography className={classes.center} variant='h4'>Some quotes from you</Typography>
                {
                  quotes.map(q=> <Typography className={classes.center}> <i>"{q}"</i> </Typography>)
                }
              </> : <></>
            }
            




        </Container>

  )
}

export default StatsPage