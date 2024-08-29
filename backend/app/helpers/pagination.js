
const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const skip = page ? page * limit : 0;

    // console.log('page pagination = ' + page);
    // console.log('size pagination = ' + size);
   

    // console.log('limit pagination = ' + limit);

    return { limit, skip };
};

const getPagingData = (page, limit, totalItems) => {

    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, totalPages, currentPage };
  };
  


// const getPagingData = (page, limit, data, order = []) => {

//     const  totalItems = data.count;
//     const currentPage = page ? +page : 0;
//     const totalPages = Math.ceil(totalItems / limit);

//     return { currentPage , totalPages , totalItems, data};
// };



export default {
    getPagination,
    getPagingData
}

