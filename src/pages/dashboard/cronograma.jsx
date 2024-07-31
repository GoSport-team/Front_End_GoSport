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
    <div className='w-full h-full'>
      <Card className='w-auto h-auto flex justify-center items-center p-2'>
        <CronogramaDesing></CronogramaDesing>
      </Card>
    </div>
  )
}
