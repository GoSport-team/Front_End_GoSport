import React from 'react'
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tooltip,
    Button,
    Spinner,
  } from "@material-tailwind/react";
import CronogramaDesing from '@/widgets/componentes/Cronograma';

export default function Cronograma() {
  return (
    <div className='w-full h-full p-5 '>
      <Card className='w-full h-full'>
        <CronogramaDesing></CronogramaDesing>
      </Card>
    </div>
  )
}
