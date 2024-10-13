'use client'
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
interface Todo {
    task:string,
    description:string
}

export default function Create() {
    const [todo, setTodo] = useState<Todo>({
        task:'',
        description:''
    })
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

 const handleInput =(e:ChangeEvent<HTMLInputElement>)=>{
    setTodo({
        ...todo, [e.target.name]:e.target.value
    })
 }

 async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    setLoading(true)
    try {
        const res = await fetch('http://localhost:3000/api/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(todo)
        })
        const data = await res.json()
        if(res.ok){
            alert(data.message)
            router.push('/todos')
            setLoading(false)
           
        }else{
            alert(data.message)
            setLoading(false)
        }
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen text-white">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-[25rem] max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task</span>
                </label>
                <input
                  type="text"
                  placeholder="task"
                  value={todo.task}
                  name="task"
                  onChange={handleInput}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="description"
                  value={todo.description}
                  name="description"
                  onChange={handleInput}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit"  className="btn btn-primary">
                {
                    loading ? <span className="loading loading-spinner loading-xs"></span> : 'Create'
                }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
