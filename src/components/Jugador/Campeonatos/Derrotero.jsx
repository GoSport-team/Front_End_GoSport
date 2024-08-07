import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const Derrotero = () => {
    const {id} = useParams()
    const [data, setData]=useState()
    useEffect(()=>{
        const traerFases =async ()=>{
            const response = await axios.get(`http://localhost:3001/fase/fases`,
                {
                    headers:{
                        id:id
                    }
                }
            )
            setData(response.data)
        }
        traerFases()
    },[])
    console.log(data)
  return (
    <div>Derrotero</div>
  )
}
