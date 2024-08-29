import db from '../../db.js';
import { randomUUID } from 'crypto';

export async function InsertLogAktivitas (data, res) {  
  try {
    const { 
      username, user_id, action_method, ref_id, ref_table, data_before, data_after, module_name, description } = data;

    // Membuat catatan log aktivitas
    const logAktivitas = await db.log_activity.create({
      data: {
        uuid: randomUUID(),
        action_method: action_method,
        user_id: user_id,
        username: username,
        ref_id: ref_id,
        ref_table: ref_table,
        data_before: data_before,
        data_after: data_after,
        module_name: module_name,
        description: description,
        created_on: new Date(),
      },
    });

    console.log("Log aktivitas berhasil disimpan");
    return logAktivitas;
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

