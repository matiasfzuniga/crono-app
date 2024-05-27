'use client'
import React from 'react'
import { motion} from "framer-motion";

const InfoDash = ({params}:{params:number}) => {
  return (
    <motion.div initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}  className="flex flex-col gap-4">
       
        <div className="border p-4 rounded-lg">
        <h1 className="text-xl ">horas este mes</h1>
        <p>{Math.trunc(params)}</p>
        </div>
        <div>
        <h1 className="text-xl ">objetivos cumplidos</h1>
        <p>uno</p>
        </div>
        </motion.div>
  )
}

export default InfoDash