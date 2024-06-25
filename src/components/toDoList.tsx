import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import useTodoStore from '@/store/todoStore';
import ToDoItem from '@/components/toDoItem';
import { AnimatePresence } from 'framer-motion';
import AddToDoForm from './addToDoForm';


const ToDoList = () => {
    const todos = useTodoStore(state => state.todos)
    
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentList = todos.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="absolute lg:left-10 top-2 left-7">
    <Accordion
  type="single"
  collapsible
  className="flex justify-center items-center h-[80px] w-[160px] relative mt-4"
>
  <AccordionItem value="item-1">
    <AccordionTrigger className="w-[50px] justify-around flex-col rounded-full bg-[#808080] hover:bg-[#e0e0e0] absolute top-2 left-1 hover:no-underline font-semibold text-gray-900">
    </AccordionTrigger>
    <AccordionContent className="w-[180px] flex justify-center items-end ">
     <div className=" bg-[#e0e0e00c] border border-gray-800 border-opacity-80 h-[400px] w-[350px] absolute top-24 left-1 rounded-lg flex justify-top items-center flex-col">
      <h1 className="text-gray-300 text-lg py-4">LISTA DE TAREAS</h1>
      <span className="h-0.5 w-[85%] bg-[#1a1c27] mb-2"></span>
      <AddToDoForm/>
      <AnimatePresence>
      <ul>
    {
        currentList.map((todo:any) => (
            <ToDoItem key={todo.id} todo={todo} />
        ))
    }
      </ul>
      {todos.length >= 6? <PaginationSection
            totalPosts={todos.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> : ''}
      
      </AnimatePresence>
     </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
</div>
  )
}

function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalPosts: any;
  postsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; 
  const pageNumLimit = Math.floor(maxPageNum / 2); 
  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-gray-700 rounded-full" : ""}
      >
        <PaginationLink onClick={() => setCurrentPage(page)} className='text-gray-300 hover:bg-gray-800 hover:text-gray-500 rounded-full'>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination className='absolute bottom-3 left-0'>
        <PaginationContent>
          <PaginationItem className='absolute left-0 -translate-x-7'>
            <PaginationPrevious onClick={handlePrevPage}/>
          </PaginationItem>

          {renderPages()}

          <PaginationItem className='absolute right-0 translate-x-7'>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ToDoList