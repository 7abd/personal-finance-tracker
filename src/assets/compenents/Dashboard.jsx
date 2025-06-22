import { TheContext } from "./App"
import React from "react"


export default function Dashboard() {
     const {come} = React.useContext(TheContext)
     const [excome,setExcome] = React.useState( () => { 
      const savedExcome = localStorage.getItem('myExcome');
      return savedExcome? JSON.parse(savedExcome) :  {income:0,
    outcome:0,
    total:0}
     })

       React.useEffect(() => {
         if(!come || !come.value) return;
       
       setExcome(  prev => { 
         
           const income = come.precome === 'Income'? prev.income + come.value: prev.income;
           const outcome = come.precome === 'Outcome' ? prev.outcome + come.value: prev.outcome;
          const total = income - outcome;
          
          const newExcome ={income,outcome,total}
          localStorage.setItem('myExcome',JSON.stringify(newExcome))
          return newExcome;
       }
         
  
       
       )
       },[come]
       )
       
    return(
         <section className="section2">
          <h3 className="dash-board"> Dashboard</h3>
          <div className="dash-cont">
          <div>
            <p>Total Income</p>
            <p> { excome.income}$</p>
          </div>
          <div>
            <p>Total Expenses</p>
              <p> {excome.outcome}$</p>
          </div>
          <div>

            <p>balance</p>
            <p>{ excome.total}$ </p>
          </div>
          </div>
         </section>
    )
}