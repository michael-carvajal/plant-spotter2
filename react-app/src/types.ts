export interface PlantType {
  // Define the properties of your 'plants' object
  // For example:
  id: number;
  name: string;
  // Add other properties as needed
}

export interface UserType {
  // Define the properties of your 'plants' object
  // For example:
  id: number;
  name: string;
  user: {
    _id: string
  };
  // Add other properties as needed
}
