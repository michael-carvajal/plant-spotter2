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
          
      {/* Use the 'plants' variable as needed in your component */}
    </>
  );
}
