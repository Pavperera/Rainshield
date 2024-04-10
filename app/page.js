"use client";
import React, { useState, useEffect } from "react";
// import { Dropdown } from "primereact/dropdown";
import Dropdown from "./Components/dropdown";
import { db } from "./firebase";
import { ref, get, update } from "firebase/database";

export default function Home() {
  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [status, setStatus] = useState("");

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
      );
      const data = await response.json();

      for (let i = 0; i < data.items[0].forecasts.length; i++) {
        if (data.items[0].forecasts[i].area === location) {
          console.log(
            "Weather for",
            location,
            "is",
            data.items[0].forecasts[i].forecast
          );
          setCurrentWeather(data.items[0].forecasts[i].forecast);
          await updateFirebaseWeather();
          break;
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const updateFirebaseWeather = async () => {
    const dbWeatherRef = ref(db, "Data");
    await update(dbWeatherRef, { weather: currentWeather });
  };

  const updateFirebaseLocation = async () => {
    const dbLocationRef = ref(db, "Data");
    await update(dbLocationRef, { location: location });
  };

  const checkStatus = async () => {
    try {
      const dbStatusRef = ref(db, "Data/rainshieldstatus");
      const statusSnapshot = await get(dbStatusRef);
      if (statusSnapshot.exists()) {
        setStatus(statusSnapshot.val());
      } else {
        console.log("No Status available");
      }

      const dbLocationRef = ref(db, "Data/location");
      const locationSnapshot = await get(dbLocationRef);
      if (locationSnapshot.exists()) {
        setLocation(locationSnapshot.val());
      } else {
        console.log("No Location available");
      }

      const dbWeatherRef = ref(db, "Data/weather");
      const weatherSnapshot = await get(dbWeatherRef);
      if (weatherSnapshot.exists()) {
        setCurrentWeather(weatherSnapshot.val());
      } else {
        console.log("No Weather available");
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchWeatherData, 120000); // Update every 2 minutes
    return () => clearInterval(intervalId);
  }, [location, fetchWeatherData]);

  const handleLocationChange = (event) => {
    setLocation(event.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateFirebaseLocation();
    fetchWeatherData();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center flex flex-col justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl mt-12 mb-6 p-4 font-bold">RainShield</h1>
        <div className="bg-slate-800 p-4 rounded-lg flex flex-col items-center w-full sm:w-auto">
          {status !== "" ? (
            <div className="flex flex-col items-center w-full">
              <h2 className="text-l p-2">Your Rainshield is</h2>
              <h1 className="text-4xl font-bold justify-center text-blue-500">
                {status}
              </h1>
            </div>
          ) : (
            <button
              className=" text-white bg-blue-500 p-2 rounded-xl my-4"
              type="submit"
              onClick={checkStatus}
            >
              {" "}
              Check Status
            </button>
          )}{" "}
          {currentWeather !== "" ? (
            <div className="flex flex-col items-center w-full">
              <h2 className="text-l p-2">Your Weather is</h2>
              <h1 className="text-2xl font-bold justify-center text-blue-500">
                {currentWeather}
              </h1>
            </div>
          ) : (
            <button
              className=" text-white bg-blue-500 p-2 rounded-xl my-4"
              type="submit"
              onClick={checkStatus}
            >
              {" "}
              Get Weather
            </button>
          )}{" "}
          <form className="flex flex-col items-center p-4 w-full">
            <label className="text-l p-2" htmlFor="location">
              Update Location
            </label>
            {/* <div className="w-full">
              <Dropdown
                id="location"
                name="location"
                className="p-2 mb-3 bg-white  rounded-lg text-black w-60 "
                value={location}
                onChange={handleLocationChange}
                options={locations}
                optionLabel="label"
                optionValue="value"
                placeholder="Select a location"
              />
            </div> */}
            <Dropdown location={location} setLocation={setLocation} />
            <button
              className=" text-white bg-blue-500 p-2 rounded-xl mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
              Send to Rainshield
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
