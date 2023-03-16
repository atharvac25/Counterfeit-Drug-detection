import React from "react";

export default function DrugList({drugsList, getDrugData}) {
    return drugsList.map((drug, index) => {
        return(
            <div key={drug} className="row">
                <h5>{index+1}</h5>
                <button onClick={(e) => getDrugData(drug)}>{drug}</button>
            </div>
        )
    })
}