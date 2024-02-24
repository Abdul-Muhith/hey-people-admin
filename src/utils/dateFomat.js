export const changeDateFomat = (date) => {
    // console.log('date -> ', date);

    const newDate = new Date(date).toLocaleDateString();
    // console.log('newDate -> ', newDate);

    const [day, month, year] = newDate.split("/");

    const ymd = [year, month, day].join("-");

    const newTime = new Date(date).toLocaleTimeString();
    // console.log('newTime -> ', newTime);

    return [ ymd, newTime ].join(",");
};

export const alignDateFomat = (date) => {
    // console.log('date -> ', date);

    const newDate = new Date(date).toLocaleDateString();
    // console.log('newDate -> ', newDate);

    const [day, month, year] = newDate.split("/");

//   const [day, month, year] = changeDateFomat(date).split(",")[0].split("-");

//   console.log(' [day, month, year] expiry: ',  [day, month, year]);

//   console.log(' expiry: ', [year, month, day].join("/"));

// console.log('return -> ', [year, month, day].join("-"));

return [year, month, day].join("-");
};

export const alignDateTimeFomat = (date) => {
    // console.log('date -> ', date);

    const newDate = new Date(date).toLocaleDateString().split("/").join("-");
    // console.log('newDate -> ', newDate);

    const newTime = new Date(date).toLocaleTimeString();
    // console.log('newTime -> ', newTime);

    return [ newDate, newTime ].join(",");
};