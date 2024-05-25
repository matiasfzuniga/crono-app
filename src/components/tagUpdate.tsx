'use client'
import React from 'react'
import useTagInput from "@/hooks/useTag";
import { TagField } from "./tagField";
import { Button } from "@/components/ui/button";

const TagUpdate = ({params}:any) => {
    const { tags, handleAddTag, handleRemoveTag } = useTagInput(5, params);
    const [modify,setModify] = React.useState(false)

    React.useEffect(() => {
      if(tags !== params){
        setModify(true)
      }else{
        setModify(false)
      }
    },[tags,params])

  return (
    <form className='flex flex-col items-center h-[150px]'>
    <TagField
      tags={tags}
      addTag={handleAddTag}
      removeTag={handleRemoveTag}
      maxTags={5}
    />
    {
      modify ? <Button className='m-4'>guardar</Button> : ""
    }
  </form>
  )
}

export default TagUpdate