const { sics, wip } = require("../../db.js").default;

// Condition 1

exports.QueryWithFilterDataPendingByStartEndDateSearch = async function (start_date, end_date , search, limit , skip) {

    let response = await wip.$queryRaw`
            SELECT 
                    id, 
                    unique_id, 
                    sik_drum_no, 
                    wo_no, 
                    wo_line_no, 
                    so_no, 
                    so_line_no, 
                    customer_cd, 
                    customer_name, 
                    project_name, 
                    transport_type, 
                    wo_date, 
                    prod_cd, 
                    product_name, 
                    length, 
                    "set", 
                    unit_price, 
                    currency, 
                    amount, 
                    time_stamp_input, 
                    time_stamp_update, 
                    request_due_date, 
                    contract_due_date, 
                    stock_in_date, 
                    color_insul, 
                    color_sheath, 
                    wo_revision_no, 
                    unique_product_id, 
                    manufacturing_type, 
                    size_cd, size_nm, 
                    prod_group_key, 
                    created_on, 
                    modified_on, 
                    is_pending, 
                    fg_test_date
            FROM wip_wo_request_product_pending where is_pending=true 
            AND  CAST(created_on as varchar) BETWEEN ${start_date} AND ${end_date}
            AND wo_no LIKE ${search}  OR sik_drum_no LIKE ${search} 
            order by created_on  desc LIMIT ${limit} OFFSET ${skip}`;
            BigInt.prototype.toJSON = function () {
              const int = Number.parseInt(this.toString());
              return int ?? this.toString();
            };
        response.unique_id = BigInt;
  
        return response;
  };

  
exports.TotalDataByStartEndDateSearch = async function (start_date, end_date,search) {

    let response = await wip.$queryRaw`
          SELECT 
                COUNT(id) as TotalData
            FROM  
                wip_wo_request_product_pending 
                where is_pending=true
                AND  CAST(created_on as varchar) BETWEEN ${start_date} AND ${end_date}
                AND wo_no LIKE ${search}  OR sik_drum_no LIKE ${search} 
                `;
  
            let totalData =  Number(response[0].totaldata);
        return totalData;
  };



// Condition 2

exports.QueryWithFilterDataPendingByStartEndDate = async function (start_date, end_date , limit , skip) {

    let response = await wip.$queryRaw`
            SELECT 
                    id, 
                    unique_id, 
                    sik_drum_no, 
                    wo_no, 
                    wo_line_no, 
                    so_no, 
                    so_line_no, 
                    customer_cd, 
                    customer_name, 
                    project_name, 
                    transport_type, 
                    wo_date, 
                    prod_cd, 
                    product_name, 
                    length, 
                    "set", 
                    unit_price, 
                    currency, 
                    amount, 
                    time_stamp_input, 
                    time_stamp_update, 
                    request_due_date, 
                    contract_due_date, 
                    stock_in_date, 
                    color_insul, 
                    color_sheath, 
                    wo_revision_no, 
                    unique_product_id, 
                    manufacturing_type, 
                    size_cd, size_nm, 
                    prod_group_key, 
                    created_on, 
                    modified_on, 
                    is_pending, 
                    fg_test_date
            FROM wip_wo_request_product_pending where is_pending=true 
            AND  CAST(created_on as varchar) BETWEEN ${start_date} AND ${end_date}
            order by created_on  desc LIMIT ${limit} OFFSET ${skip}`;
            BigInt.prototype.toJSON = function () {
              const int = Number.parseInt(this.toString());
              return int ?? this.toString();
            };
        response.unique_id = BigInt;
  
        return response;
  };

  
exports.TotalDataByStartEndDate = async function (start_date, end_date) {

    let response = await wip.$queryRaw`
          SELECT 
                COUNT(id) as TotalData
            FROM  
                wip_wo_request_product_pending 
                where is_pending=true
                AND  CAST(created_on as varchar) BETWEEN ${start_date} AND ${end_date}
                `;
  
            let totalData =  Number(response[0].totaldata);
        return totalData;
  };





// Condition 3

exports.QueryWithFilterDataPendingByStartDate = async function (start_date , limit , skip) {

    let response = await wip.$queryRaw`
            SELECT 
                    id, 
                    unique_id, 
                    sik_drum_no, 
                    wo_no, 
                    wo_line_no, 
                    so_no, 
                    so_line_no, 
                    customer_cd, 
                    customer_name, 
                    project_name, 
                    transport_type, 
                    wo_date, 
                    prod_cd, 
                    product_name, 
                    length, 
                    "set", 
                    unit_price, 
                    currency, 
                    amount, 
                    time_stamp_input, 
                    time_stamp_update, 
                    request_due_date, 
                    contract_due_date, 
                    stock_in_date, 
                    color_insul, 
                    color_sheath, 
                    wo_revision_no, 
                    unique_product_id, 
                    manufacturing_type, 
                    size_cd, size_nm, 
                    prod_group_key, 
                    created_on, 
                    modified_on, 
                    is_pending, 
                    fg_test_date
            FROM wip_wo_request_product_pending where is_pending=true 
            AND  CAST(created_on as varchar) = ${start_date}
            order by created_on  desc LIMIT ${limit} OFFSET ${skip}`;
            BigInt.prototype.toJSON = function () {
              const int = Number.parseInt(this.toString());
              return int ?? this.toString();
            };
        response.unique_id = BigInt;
  
        return response;
  };

  
exports.TotalDataByStartDate = async function (start_date) {

    let response = await wip.$queryRaw`
          SELECT 
                COUNT(id) as TotalData
            FROM  
                wip_wo_request_product_pending 
                where is_pending=true
                AND  CAST(created_on as varchar) = ${start_date} 
                `;
  
            let totalData =  Number(response[0].totaldata);
        return totalData;
  };

// Condition 4

exports.QueryWithFilterAllDataPendingSearch = async function (limit , skip) {

    let response = await wip.$queryRaw`
            SELECT 
                    id, 
                    unique_id, 
                    sik_drum_no, 
                    wo_no, 
                    wo_line_no, 
                    so_no, 
                    so_line_no, 
                    customer_cd, 
                    customer_name, 
                    project_name, 
                    transport_type, 
                    wo_date, 
                    prod_cd, 
                    product_name, 
                    length, 
                    "set", 
                    unit_price, 
                    currency, 
                    amount, 
                    time_stamp_input, 
                    time_stamp_update, 
                    request_due_date, 
                    contract_due_date, 
                    stock_in_date, 
                    color_insul, 
                    color_sheath, 
                    wo_revision_no, 
                    unique_product_id, 
                    manufacturing_type, 
                    size_cd, size_nm, 
                    prod_group_key, 
                    created_on, 
                    modified_on, 
                    is_pending, 
                    fg_test_date
            FROM wip_wo_request_product_pending where is_pending=true order by created_on  desc
             LIMIT ${limit} OFFSET ${skip}`;
            BigInt.prototype.toJSON = function () {
              const int = Number.parseInt(this.toString());
              return int ?? this.toString();
            };
        response.unique_id = BigInt;
  
        return response;
  };

  
exports.TotalDataAllDataPending = async function () {

    let response = await wip.$queryRaw`
          SELECT 
                COUNT(id) as TotalData
            FROM  
                wip_wo_request_product_pending where is_pending=true`;
  
            let totalData =  Number(response[0].totaldata);
        return totalData;
  };