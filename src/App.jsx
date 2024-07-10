import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
 import { GrEdit } from "react-icons/gr";
 import { RiDeleteBin6Line } from "react-icons/ri";

function App() {

   const [todo, setTodo] = useState("")
   const [todos, setTodos] = useState([])
   const [showFinished, setshowFinished] = useState(true)
   useEffect(() => {
    let todoString= JSON.parse(localStorage.getItem("todos"))
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }
   }, [])
   const toggleFinished=(params)=>{
    setshowFinished(!showFinished)

   }

   const saveToLS=(params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
   }

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    

    let newTodos= todos.filter(item=>{
      return item.id!=id;
    })
 
    setTodos([...newTodos])
    saveToLS()

  }


  const handleDelete=(e)=>{
   let id= e.target.name
   let index=todos.findIndex(item=>{
    return item.id===id
   })
   let newTodos= todos.filter(item=>{
     return item.id!=id;
   })

   setTodos([...newTodos])
   saveToLS()
    
  }


  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
    saveToLS()
    
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e) => {
   let id= e.target.name;
   console.log(id)
   let index=todos.findIndex(item=>{
    return item.id===id;
   })
   let newTodos=[...todos];
   newTodos[index].isCompleted=!newTodos[index].isCompleted;
   setTodos([...newTodos])
   saveToLS()
  }
  
  

  return (
    <> 
    <Navbar/>
     <div className="w-full md:container mx-auto my-5 rounded-xl p-5 bg-[#a7f3d0] min-h-[80vh] md:w-[35%]">
     <h1 className='font-bold text-center text-2xl'>My Task Todos in one place</h1>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex gap-3">
          <input name={todo.id} onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-[#059669] hover:bg-[#22c55e] p-3 py-1 text-white rounded-md disabled:bg-[#86efac]'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" name="" id="" checked={showFinished}/>Show Finished
        <div className="h-[1px] bg-black opacity-30 my-1"></div>
        <h2 className='text-lg font-bold'>Your ToDos</h2>
        {todos.length==0 && <div className='m-5'>No todos to display</div>}
        {todos.map(item=>{
       return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
        <div className='flex gap-5'>

        <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
        </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-[#059669] hover:bg-[#064e3b] p-3 py-1 text-white rounded-md mx-1'><GrEdit /></button>
            <button name={item.id} onClick={handleDelete} className='bg-[#059669] hover:bg-[#064e3b] p-3 py-1 text-white rounded-md mx-1'><RiDeleteBin6Line /></button>
          </div>
        </div>
        })}
      </div>
    </>
  )
}

export default App
