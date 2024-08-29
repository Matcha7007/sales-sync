export function generateSuccessResponse(data, message, status = 'success') {
  const total = typeof data === 'object' ? data?.length : 0;
  return {
    status: status,
    code: 200,
    message,
    total,
    data,
  };
}
export function generatePaginationResponse(data, code, message) {
  return {
    status: 'success',
    code: code,
    message,
    result: data['results'] ? data['results'] : [],
    pageCount: data['pageCount'] ? data['pageCount'] : 0,
    total: data['itemCount'] ? data['itemCount'] : 0,
    pages: data['pages'] ? data['pages'] : [],
  };
}
export function generateFailResponse(message) {
  return {
    status: 'failed',
    code: 200,
    message
  };
}
export function generateErrorResponse(code, message) {
  return {
    status: 'error',
    code,
    message,
  };
}