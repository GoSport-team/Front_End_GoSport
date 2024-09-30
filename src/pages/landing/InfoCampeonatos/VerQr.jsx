import React, { useEffect } from 'react'
import {QRCodeSVG} from 'qrcode.react';
import { useState } from 'react';
export const VerQr = ({ id, open, close}) => {
    const URL_BASE = 'https://front-end-go-sport-b5r9.vercel.app'
    const [color, setColor] = useState()
    const colors = ['#00E7FA', '#12FA5C', '#FAB40F'];
    useEffect(()=>{
        const randomIndex = Math.floor(Math.random() * colors.length);
        setColor(randomIndex)

    },[id])
  return (
    <>
    {open && (
<div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div class=" p-6 rounded-lg shadow-lg bg-white w-full max-w-md">
        <div class="flex justify-end">
            <button class=" hover:text-gray-700 focus:outline-none text-4xl text-black" onClick={()=> close()}>×</button>
        </div>
        <div class="flex justify-center">
            <QRCodeSVG value={`${URL_BASE}/equiposcampeonato/${id}`} fgColor={colors[color]}  bgColor='transparent' 
        size={356} />
        </div>
    </div>
</div>
    )}
    </>
  )
}
