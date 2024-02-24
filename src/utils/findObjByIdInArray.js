const info = [
  {
    _id: "65b72aec1a4d34e2196a79e0",
    name: "number",
    email: "student@gmail.com"
  },
  {
    _id: "65b72af81a4d34e2196a79e2",
    name: "number",
    email: "student@gmail.com"
  },
  {
    _id: "65b72b071a4d34e2196a79e4",
    name: "number",
    email: "student@gmail.com"
  }
];

export const findObjByIdInArray = (array, id) => {
  const data = array.find(x => x._id === id);
  // console.log('data found', data);
  return data;
};

// findObjByIdInArray(info, "65b72aec1a4d34e2196a79e0");