import React, { useEffect, useState } from 'react'
import useStyle from "./styles";
import { Typography } from '@mui/material';
import {getStats} from "../../api/index.js"
import { PieChart, Pie, Sector } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UserItem from './UserItem';
import { sleep } from '../../constants/helper';
import Loader from '../../constants/Loader';

const StatsPage = ({repo}) => {
    const classes = useStyle();
    const [stats, setStats] =  useState(null);
    const [pieData, setPieData] = useState([])
    const [barData, setBarData] = useState([])

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#42ff68' ];

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
            const data = await getStats({repoId: repo._id}); 
            await sleep(1500);
            setStats(data.data);

            var no1 = 0;
            var no2 = 0;
            var no3 = 0;
            var no4 = 0;
            var no5 = 0;
            for (var i in data.data.ratings) {
              var rate = data.data.ratings[i];
              if (rate == 1) no1 += 1;
              if (rate == 2) no2 += 1;
              if (rate == 3) no3 += 1;
              if (rate == 4) no4 += 1;
              if (rate == 5) no5 += 1;
            }

            var newPieData = [
              {
                "name": "1",
                "value": no1
              },
              {
                "name": "2",
                "value": no2
              },
              {
                "name": "3",
                "value": no3
              },
              {
                "name": "4",
                "value": no4
              },
              {
                "name": "5",
                "value": no5
              },
            ]

            setPieData(newPieData);

            var newBarData = [
              {
                "name": "file",
                "# of queries" : data.data.fileNo
              },
              {
                "name": "folder",
                "# of queries" : data.data.folderNo
              },
              {
                "name": "method",
                "# of queries" : data.data.methodNo
              },
            ]

            setBarData(newBarData)

          } catch (error) {
            console.log(error);
          }
        }
    
        getQueries();
      }, []);

    return (
      <div className={classes.container}>
        <div className={classes.seperator}></div>
          {stats == null? 
          <>
            <Loader/>
          </>
          : <>
            <Typography variant='h2'> You used ExDev {stats.noOfQueries} times in {getDaysFromBeginning()} days! </Typography>
            <div className= {classes.row} >
              <div className= {classes.pie}>
                <Typography variant='h4'>Out of 5, on average, you rated ExDev {stats.averageRating.toPrecision(2)}</Typography>
                <div className= {classes.space}></div>

                <Typography variant='h4'>Distribution of Ratings </Typography>
                <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
               

          

                </ResponsiveContainer>
               
              </div>
              <div className= {classes.bar}>
                <Typography variant='h4' >The most queries are runned for getting help on {stats.mostQueriesOn} </Typography>
                <div className= {classes.space}></div>
                
                <ResponsiveContainer width="100%" height="100%">

                <BarChart width={150} height={40} data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="# of queries" fill="#8884d8" />
                </BarChart>


                

                </ResponsiveContainer>

        
               
              </div>

            </div>
            <div className={classes.space}></div>
            <Typography variant='h2'> Some quotes from you: </Typography>


            { stats.texts.map(text =>
              <UserItem 
                name = {text.name} 
                ppUrl={text.avatarUrl} 
                text = {text.text} 
                rate ={text.rate} 
                createdAt ={text.createdAt} 
              />) 
            
            }
          </>
        
        }

        <div className={classes.footer}></div>

      </div>

  )
}

export default StatsPage


