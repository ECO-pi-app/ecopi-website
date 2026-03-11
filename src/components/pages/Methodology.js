import React from 'react';
import '../../App.css';
import './SimplePage.css';
import './Methodology.css';

export default function Methodology() {
  return (
    <div className="page methodology-page">
      <div className="page__container">
        <div className="methodology-header">
          <h1>Methodology</h1>
          <p className="page__muted methodology-subtitle">
            How ECO-Pi estimates emissions across materials, transport, energy, and more —
            with transparent inputs and calculations.
          </p>
        </div>

        <div className="page__row methodology-stack">
          <div className="page__card methodology-card">
            <h2>1) Materials</h2>
            <p>
              Materials emissions are estimated using an emission factor (EF) per kg of material.
              Total material emissions = EF × mass.
            </p>
            <div className="methodology-formula">
              CO₂e = EF (kgCO₂e/kg) × mass (kg)
            </div>
          </div>

          <div className="page__card methodology-card">
            <h2>2) Transport</h2>
            <p>
              Transport uses emission factors by mode such as road, sea, and air.
              Depending on the dataset, factors may be per kg-km or per tonne-km.
            </p>
            <div className="methodology-formula">
              CO₂e = EF × mass × distance
            </div>
          </div>

          <div className="page__card methodology-card">
            <h2>3) Machining</h2>
            <p>
              Electricity and machining emissions are estimated from energy use.
              If power draw is known, energy is computed from power × time and multiplied by grid intensity.
            </p>
            <div className="methodology-formula">
              power_drawed = spindle + milling_spindle
              <br />
              machine_emissions = power_drawed × grid_intensity × time_operated
            </div>
          </div>

          <div className="page__card methodology-card">
            <h2>4) Fugitive</h2>
            <p>
              Fugitive emissions are calculated from the released gas mass and the Global Warming
              Potential (GWP) of the gas.
            </p>
            <div className="methodology-formula">
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