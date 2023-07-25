// constants
const GET_PLANTS = "plants/GET_PLANTS";
// const REMOVE_USER = "plants/REMOVE_USER";

const getPlants = (plants) => ({
    type: GET_PLANTS,
    payload: plants,
});

// const removeUser = () => ({
//     type: REMOVE_USER,
// });

const initialState = {};

export const fetchPlants = () => async (dispatch) => {
    const response = await fetch("/api/plants");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getPlants(data));
    }
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PLANTS:
            return { plants: action.payload };

        default:
            return state;
    }
}
