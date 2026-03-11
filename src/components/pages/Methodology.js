import React from 'react';
import '../../App.css';

export default function Methodology() {
  return (
    <div className="page">
      <div className="page__container">

        <div className="method-header">
          <h1>Methodology</h1>
          <p className="method-subtitle">
            How ECO-Pi estimates emissions across materials, transport,
            energy and more — with transparent inputs and calculations.
          </p>
        </div>

        <div className="method-stack">

          <div className="page__card method-card">
            <h2>1) Materials</h2>
            <p>
              Materials emissions are estimated using an emission factor (EF)
              per kg of material. Total material emissions = EF × mass.
            </p>

            <div className="method-formula">
              CO₂e = EF (kgCO₂e/kg) × mass (kg)
            </div>
          </div>

          <div className="page__card method-card">
            <h2>2) Transport</h2>
            <p>
              Transport uses emission factors by mode (road/sea/air).
              Depending on the dataset, factors may be per kg-km or
              per tonne-km.
            </p>

            <div className="method-formula">
              CO₂e = EF × mass × distance
            </div>
          </div>

          <div className="page__card method-card">
            <h2>3) Machining</h2>
            <p>
              Electricity and machining emissions are estimated from
              energy use. Energy = power × time.
            </p>

            <div className="method-formula">
              power_drawed = spindle + milling_spindle  
              <br />
              machine_emissions = power_drawed × grid_intensity × time_operated
            </div>
          </div>

          <div className="page__card method-card">
            <h2>4) Fugitive</h2>
            <p>
              Fugitive emissions are calculated from the mass of gas
              released and the Global Warming Potential (GWP) of that gas.
            </p>

            <div className="method-formula">
              m_GHG = total_charged_amount − current_charge_amount  
              <br />
              Emissions (kgCO₂e) = GWP_GHG × m_GHG
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}