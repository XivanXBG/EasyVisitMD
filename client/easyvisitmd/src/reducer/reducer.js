const initialState = {
   
    specialty:"",
  location:"",
  name:"",
  };
  
  const searchCriteriaReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_SEARCH_CRITERIA':
        return {
          ...state,
          ...action.payload,
        };
       
      default:
        return state;
    }
  };
  
  export default searchCriteriaReducer;