import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index"; // Import the RootState type

export default function Plants(params: any) {
    const { plants } = useSelector((state: RootState) => state);
    const { session } = useSelector((state: RootState) => state);
    if (!session.user) {
        return <h1>Log in to view your published plants</h1>
    }
    const userPlants = Object.values(plants).filter(plant => plant.user_id === session.user?._id)
    console.log(userPlants);

  return (
    <>
          <h1>Plants Component 2</h1>
          {userPlants.map((plant, index) => {
              return (
                  <div key={`plant-index-${index}`}>
                      <p>Name of Plant: { plant.name}</p>
                      <p>Description: {plant.description}</p>
                      <p>Safe to eat?: {plant.isSafe ? 'EAT UP!' : 'Avoid consumption at all costs'}</p>
                      <p>Coordinates:

                          <ul>
                            <li>Latitude: {plant.lat}</li>
                            <li>Longitude: {plant.lng}</li>

                          </ul></p>
                  </div>
              )
          })}
      {/* Use the 'plants' variable as needed in your component */}
    </>
  );
}
