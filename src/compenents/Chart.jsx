import React, { useContext, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { TheContext } from "./App";

export default function Chart() {
  const { come } = useContext(TheContext);

  const [trans, setTrans] = useState(() => {
    const savedTrans = localStorage.getItem('mytrans')
    return savedTrans? JSON.parse(savedTrans): []
  })
  const [pie, setPie] = useState( () => {
    const savedPie = localStorage.getItem(('mypie'));

    return savedPie? JSON.parse(savedPie):{

    rent: 0,
    food: 0,
    entertainment: 0,
    others: 0
  }
  }
    
    );

  // Update totals
  useEffect(() => {
    setPie((prev) => {
    
        const newpie = {
        rent: come.Category === "rent" ? prev.rent + come.value : prev.rent,
        food: come.Category === "food" ? prev.food + come.value : prev.food,
        entertainment:
          come.Category === "entertainment"
            ? prev.entertainment + come.value
            : prev.entertainment,
        others: come.Category === "others" ? prev.others + come.value : prev.others
      };
      localStorage.setItem('mypie',JSON.stringify(newpie))
      return newpie;
    });

    setTrans((prev) => {
      const transArray = [...prev,come]
      localStorage.setItem('mytrans',JSON.stringify(transArray))
      return transArray;
    });
  }, [come]);

  // Calculate total and percentages
  const total = pie.rent + pie.food + pie.entertainment + pie.others || 1;

  const data = [
    {
      title: "Entertainment",
      value: (pie.entertainment * 100) / total,
      color: "rgb(205, 92, 92)"
    },
    {
      title: "Food",
      value: (pie.food * 100) / total,
      color: "rgb(106, 164, 206)"
    },
    {
      title: "Others",
      value: (pie.others * 100) / total,
      color: "rgb(41, 56, 45)"
    },
    {
      title: "Rent",
      value: (pie.rent * 100) / total,
      color: "rgb(13, 229, 63)"
    }
  ];

  // Format date
  const today = new Date();
  const dayMonth = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  // Map transaction list
  const Transaction = trans.map((tran, index) => {
    if (tran.value === 0) return null;
    return (
      <p className="span-marg" key={`${tran.Category}-${tran.value}-${index}`}>
        <span>{dayMonth}</span> <span>{tran.value}</span> <span>{tran.Category}</span>
      </p>
    );
  });

  return (
    <section className="section4">
      <div className="div-cont">
        <section className="section3">
          <h4>Transaction List</h4>
          <div>
            <p>
              <span>Date</span> <span>Description</span> <span>Category</span>
            </p>
            {Transaction}
          </div>
        </section>

        <div className="chart-cont">
          <h5>Chart</h5>

          <PieChart
            data={data}
            label={({ dataEntry }) =>
              `${dataEntry.title} (${Math.round(dataEntry.value)}%)`
            }
            labelStyle={{
              fontSize: "5px",
              fontFamily: "sans-serif",
              fill: "#fff"
            }}
            labelPosition={70}
            radius={42}
            animate
          />
        </div>
      </div>
    </section>
  );
}
