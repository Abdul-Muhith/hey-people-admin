
// CLASS 07
const getDataFromLocalStorage = localStorage?.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

// console.log('getDataFromLocalStorage -> ', getDataFromLocalStorage);
// console.log('Token -> ', getDataFromLocalStorage.token);

export const config = {
  headers: {
    // Authorization: `Bearer ${getDataFromLocalStorage.token}`,
    // TODO: first time of class 16
    // Authorization: `${ getDataFromLocalStorage.token}`,
    Authorization: `${getDataFromLocalStorage !== null ? getDataFromLocalStorage.token : ""}`,
    Accept: "application/json",
  }
};