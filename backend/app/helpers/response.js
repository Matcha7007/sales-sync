function response1(code, success, message, length, currentPage, totalPages, totalItems, sortaccessor, sortdirection, data) {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    const response = {
            "version": "1.0.0",
            "datetime": dateTime,
            "statuscode": code,
            "success": success,
            "message": message,
            "page" : currentPage,
            "length" : length,
            "totalPage" : totalPages,
            "totalCount" : totalItems,
            "sortAccessor" : sortaccessor,
            "sortDirection" : sortdirection,
            "data": data
    };

    return response;
}

function response2(code, success, message, data) {

    const response = {
        "code": code,
        "success": success,
        "message": message,
        "data": data
    };

    return response;
}

function response3(code, success, message) {
    const response = {
        "code": code,
        "success": success,
        "message": message
    };

    return response;
}

function paginationResponse (code, success, message, data) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    const response = {
        "version": "1.0.0",
        "datetime": dateTime,
        "code": code,
        "success": success,
        "message": message,
        "data": data['data'] ? data['data'] : [],
        "pageCount": data['pageCount'] ? data['pageCount'] : 0,
        "total": data['itemCount'] ? data['itemCount'] : 0,
        "pages": data['pages'] ? data['pages'] : 0,
    };

    return response
  }

export default {response1, response2, response3, paginationResponse};