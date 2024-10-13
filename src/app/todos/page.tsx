'use client'
import { useEffect, useState } from "react"
import { BsDot } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

interface Creator{
    _id:string,
    name:string,
}

interface Todo {
    _id:string,
    task:string,
    description:string,
    status:string,
    isCompleted:boolean,
    creator:Creator

}

export default function Todos(){
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState<boolean>(false)
     async function getTodos(){
        try {
            const res = await fetch('http://localhost:3000/api/getTodos')
            const data = await res.json()
             setTodos(data)
             console.log(data)
        } catch (error) {
            console.log(error)
            alert(error)
        }
     }
  
    async function changeStatus(todoId){
          try {
            setLoading(true)
            const res = await fetch('http://localhost:3000/api/changeStatus',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({todoId})
            })
            const data = await res.json()
            if(res.ok){
                alert(data.message)
                setLoading(false)
                getTodos()
            }else{
                alert(data.message)
                setLoading(false)
            }
          } catch (error) {
            console.log(error)
            setLoading(false)
          }
     }
     async function deleteTodo(todoId){
        try {
            setLoading(true)
            const res = await fetch('http://localhost:3000/api/delete',{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({todoId})
            })
            const data = await res.json()
            if(res.ok){
                alert(data.message)
                setLoading(false)
                getTodos()
            }else{
                alert(data.message)
                setLoading(false)
            }
          } catch (error) {
            console.log(error)
            setLoading(false)
          }
     }
     useEffect(()=>{
        getTodos() 
     },[])
    return(
        <div className=" text-white flex justify-evenly" >
         {
           todos.map((item)=>(
            <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.task}</h2>
              <p>{item.description}</p>
              <h3 className=" flex" >{item.status == 'Pending' ? <BsDot size={30} color="red" /> : <BsDot size={30} color="green" /> } <span>{item.status}</span>  </h3>

              <div className="card-actions justify-between">
                <button onClick={()=>changeStatus(item._id)} className="btn btn-primary">
             {
                   loading ? <span className="loading loading-spinner loading-xs"></span> : 'Change Status'
             }
                </button>
                <button className="btn ml-10" >
                   
                    {
                        loading ? <span className="loading loading-spinner loading-xs"></span> : <MdDelete onClick={()=>deleteTodo(item._id)} size={20}/>
                    }
                </button>
              </div>
            </div>
          </div>
           ))
         }
        </div>
    )
}