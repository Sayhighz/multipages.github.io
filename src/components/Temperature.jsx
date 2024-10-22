import React, { useState, useEffect } from "react";
import { Plus } from "./Plus";

export const Temperature = (props) => {
  const [celsius, setCelsius] = useState(props.celsius || 0);
  const [fahrenheit, setFahrenheit] = useState((celsius * 9) / 5 + 32);
  const [kelvin, setKelvin] = useState(celsius + 273.15);

  useEffect(() => {
    setFahrenheit((celsius * 9) / 5 + 32);
    setKelvin(celsius + 273.15);
  }, [celsius]);

  useEffect(() => {
    const newCelsius = ((fahrenheit - 32) * 5) / 9;
    setCelsius(newCelsius);
    setKelvin(newCelsius + 273.15);
  }, [fahrenheit]);

  useEffect(() => {
    const newCelsius = kelvin - 273.15;
    setCelsius(newCelsius);
    setFahrenheit((newCelsius * 9) / 5 + 32);
  }, [kelvin]);

  return (
    <div className="border bg-white card p-3">
      <div className="row text-center">
        <div className="col-md-4">
          <div className="border p-3">
            <h2>{celsius.toFixed(2)} °C</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border p-3">
            <h2>{fahrenheit.toFixed(2)} °F</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="border p-3">
            <h2>{kelvin.toFixed(2)} K</h2>
          </div>
        </div>
      </div>

      <div className="row text-center mt-3">
        <div className="col-md-4">
          <Plus
            count={parseFloat(celsius.toFixed(2))}
            setCount={setCelsius}
            name="Celsius"
          />
        </div>
        <div className="col-md-4">
          <Plus
            count={parseFloat(fahrenheit.toFixed(2))}
            setCount={setFahrenheit}
            name="Fahrenheit"
          />
        </div>
        <div className="col-md-4">
          <Plus
            count={parseFloat(kelvin.toFixed(2))}
            setCount={setKelvin}
            name="Kelvin"
          />
        </div>
      </div>
    </div>
  );
};
