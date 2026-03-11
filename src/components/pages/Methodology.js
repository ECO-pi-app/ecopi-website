import React from "react";
import "./Methodology.css";

export default function Methodology() {
  const methodologyData = [
    {
      title: "1) Materials",
      description: "Materials emissions are estimated using an emission factor (EF) per kg of material. Total material emissions = EF × mass.",
      formula: "CO₂e = EF (kgCO₂e/kg) × mass (kg)"
    },
    {
      title: "2) Transport",
      description: "Transport uses emission factors by mode (road/sea/air). Depending on the dataset, factors may be per kg-km or per tonne-km (1000 kg-km). We convert to match user inputs.",
      formula: "CO₂e = EF × mass × distance"
    },
    {
      title: "3) Machining",
      description: "Electricity and machining are estimated from energy use. If you have power draw, we compute energy from power × time, then multiply by grid intensity.",
      formula: `power_drawed = spindle + milling_spindle
machine_emissions = power_drawed × grid_intensity × time_operated`
    },
    {
      title: "4) Fugitive",
      description: "The mass of GHG released is determined as the difference between the total amount charged into the system and the remaining charge at the time of assessment. The resulting CO₂-equivalent emissions are then calculated by multiplying the released mass by the Global Warming Potential (GWP) of the specific gas.",
      formula: `m_GHG = total_charged_amount − current_charge_amount
Emissions (kgCO₂e) = GWP_GHG × m_GHG`
    }
  ];

  return (
    <div className="method-page">
      <div className="method-hero">
        <h1>Methodology</h1>
        <p>
          How ECO-Pi estimates emissions across materials, transport, energy, and more — with transparent inputs and calculations.
        </p>
      </div>

      <div className="method-stack">
        {methodologyData.map((item, index) => (
          <div key={index} className="method-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="method-formula">{item.formula}</div>
          </div>
        ))}
      </div>
    </div>
  );
}