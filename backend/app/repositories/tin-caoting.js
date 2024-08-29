const { sics, wip } = require("../../db.js").default;


exports.QueryWithFilterDataTinCoating= async function () {

    let response = await wip.$queryRaw`
                                    select 
                                        c.uuid, 
                                        c.id, 
                                        c.date, 
                                        sum(a.drw_qty_complete) as qty_complete,
                                        c.total_drw_qty, 
                                        c.no_of_wire,
                                        c.size , 
                                        c.size_name,
                                        c.prod_size, 
                                        c.machine_cd , 
                                        c.next_process_code , 
                                        c.current_process_code,
                                        c.set,
                                        c.capacity,
                                        c.status
                                    from wip_progress_order_detail a
                                    inner join wip_progress_order b on b.id = a.wip_progress_order_id 
                                    inner join wip_grouping_result c on c.id = b.grouping_result_id  
                                    where a.tin_coated=1 and c.next_process_code ='TIN' and c.is_grouping =0
                                    group  by   
                                        c.uuid, 
                                        c.id, 
                                        c.date`;
  
        return response;
  };
