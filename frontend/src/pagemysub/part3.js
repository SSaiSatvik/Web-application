import React, { useState,useEffect } from "react"
import { useParams } from "react-router-dom";
import {Line} from 'react-chartjs-2';

export default function Part3() {

    const state = {
        labels: ['January', 'February', 'March','April', 'May'],
        datasets: [
        {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}

    return(
        <React.Fragment>
            {/* <Line
                data={state}
                options={{
                    title:{
                        display:true,
                        text:'Number of people in subgrediit',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
            /> */}
        </React.Fragment>
    )
}