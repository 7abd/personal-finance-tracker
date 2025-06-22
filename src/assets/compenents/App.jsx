import Header from "./Header";
import { Add } from "./Add";
import Dashboard from "./Dashboard";
import Chart from "./Chart";
import React from "react";


export const TheContext = React.createContext();
export  function App() {

  const [come,setCome] = React.useState(
 {value:0,
  precome:'',
    categ:''
  }
 )
   
 
   
    function handleSubmit(event) {
    event.preventDefault()
    const formEl = event.currentTarget
    const formData = new FormData(formEl)
   
    const categ = formData.get('categ') 
     //const selector = formData.get("selector")
     const selector = categ === 'salary' ? 'Income': 'Outcome'
    const numb = Number(formData.get('numb'))
   
    setCome({
      value:numb,
      precome:selector,
      Category:categ
    })
    formEl.reset()
    
  }
  
        

  return (
    <>
    <TheContext.Provider value={{come,handleSubmit}}>
      <Header />
      <Add/>
      <Dashboard/>
      <Chart />
 </TheContext.Provider>
    </>
  
  )
}
