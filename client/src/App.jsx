import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { ThreeDots } from 'react-loader-spinner'

function App() {

  const [todos, setTodos] = useState([]);
  const [displayTodos, setDisplayTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputTitle = useRef(null);
  const inputSearch = useRef(null);

  async function handleAddClick() {
    setIsLoading(true);

    const title = inputTitle.current.value;
    
    try {
      const response = await axios.post("http://localhost:3000/api/todos", { title: title });
      
      console.log(response);

      inputTitle.current.value = "";
    } catch (error) {
      alert("Gagal menyimpan todo : " + error.response.data.message[0]);
      console.log(error.response);
    } finally {
      setIsLoading(false);
      fetchAllTodo();
    }
  }

  async function handleChangeStatus(event, id){
    setIsLoading(true);

    try {
      const response = await axios.patch("http://localhost:3000/api/todos/" + id, { status: event.target.value });
      
      console.log(response);
    } catch (error) {
      alert("Gagal mengubah status todo : " + error.response.data.message[0]);
      console.log(error.response);
    } finally {
      setIsLoading(false);
      fetchAllTodo();
    }
  }

  function handleChangeSearch(event) {
    const foundedTodos = todos.filter(todo => todo.title.toLowerCase().includes(event.target.value.toLowerCase()))

    if (event.target.value == null || event.target.value == "") {
      setDisplayTodos(todos);
    } else {
      setDisplayTodos(foundedTodos);
    }
  }

  async function fetchAllTodo() {
    inputSearch.current.value = ""
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/todos")
      
      const { data } = response.data;
      
      setTodos(data);
      setDisplayTodos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllTodo(setIsLoading);
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Header & Inputs */}
        <div className="p-6 bg-gray-50 border-b">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>
          
          <div className="space-y-4">

            {/* Add Todo Input */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add new todo title..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={inputTitle}
              />

              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 cursor-pointer"
                onClick={() => handleAddClick()}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="p-6 space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search todo title..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={inputSearch}
              onChange={(e) => handleChangeSearch(e)}
            />
          </div>
          
          {/* Todo Item 1 (Contoh dengan Collapse Terbuka) */}
          <div className="h-120 overflow-auto flex flex-col gap-5">
            {displayTodos.length < 0 || isLoading ? (
                (isLoading && 
                  <div>
                    <div className="w-full h-full flex items-center justify-center">
                      <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  </div>
                )
              ) : (
                displayTodos.map((todo) => (
                  <div className="border border-gray-200 rounded-lg" key={todo.id}>
                    <div className="flex items-center justify-between p-4 bg-white">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-500">#</span>
                        <span className="font-semibold text-gray-800">{todo.title}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {/* Update Status Option */}
                        <select 
                          value={todo.status} 
                          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          onChange={(e) => handleChangeStatus(e, todo.id)}
                        >
                          <option value="CREATED">Created</option>
                          <option value="ON_GOING">On Going</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="PROBLEM">Problem</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Collapse Content (Terbuka) */}
                    <DetailButton problemDesc={todo.problem_desc}  />
                  </div>
                ))
              )
            }
          </div>

        </div>
      </div>
    </div>
  )
}

function DetailButton({problemDesc}){
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`flex ${isOpen ? "justify-between" : "justify-end"} h-min-20`}>
      <div className={`p-4 bg-gray-50 text-sm text-gray-600p-4 bg-gray-50 text-sm text-gray-600 ${isOpen ? "" : "hidden"}`}>
        <p><strong>Problem Desc:</strong></p>
        <p className="mt-1">{problemDesc ? problemDesc : "-" }</p>
      </div>
      
      <div className="flex items-center p-4">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          Detail
        </button>
      </div>
    </div>
  )
}

export default App
