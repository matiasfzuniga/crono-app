import React from 'react'
import useTodoStore from '@/store/todoStore'
import { motion } from 'framer-motion'
import { Checkbox } from './ui/checkbox'

const ToDoItem = ({todo}:any) => {
const {removeTodo, toggleTodo} = useTodoStore();
const variants = {
    initial:{opacity:0,y:50},
    animate:{opacity:1,y:0}
} 
    return (
    <motion.li variants={variants}
    initial="initial"
    animate="animate"
    className='flex items-center p-2 relative'
    layout
    >
    <Checkbox className='bg-gray-700' onClick={() => toggleTodo(todo.id)}/>
    <span className={`flex-1 ml-2 text-gray-200 ${todo.completed ? 'line-through decoration-2 decoration-red-700' : ''}`}>{todo.text}</span>
    <button className='ml-2 text-gray-200 hover:text-gray-500' onClick={() => removeTodo(todo.id)}>&times;</button>
    </motion.li>
  )
}

export default ToDoItem