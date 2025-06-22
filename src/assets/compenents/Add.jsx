
import React from "react"
import { TheContext } from "./App"


export function Add() {
   const {handleSubmit,come} = React.useContext(TheContext)
    return(
      <>
        <section className="section1">
        <h2 className="add-head">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="add">
            <div className="type">  
                <p> Type</p>
         <select  name="selector" >
            <option value='Income'>Income</option>
              <option value='Outcome'>Outcome</option>
               </select>
              </div>
              <div className="categ">  
                <p> Category</p>
         <select  name="categ" >
            <option value='salary'>salary</option>
              <option value='food'>food</option>
                 <option value='rent'>rent</option>
              <option value='entertainment'>entertainment
              </option>
                 <option value='others'>others</option>
            
               </select>
              </div>

          <div className="des"> <p>Description</p>
          <input name="numb" type="number" placeholder="Amount"/></div>
                
        <button type="submit">add</button>
        </form>

         
        </section>
       
         
         </>
    )
}