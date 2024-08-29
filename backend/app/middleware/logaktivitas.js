import db from '../../db.js';
import { InsertLogAktivitas } from '../helpers/log.helper.js';

export async function logMiddleware(req, res, next) {
  try {
    const { method, url, body, user } = req;
    const { username, id: user_id } = user;
    const action_method = method.toUpperCase();
    const module_name = req.originalUrl.split('/')[2];
    const ref_table = `mst_${module_name}`;

    const logDescription = `User ${username} sedang melakukan ${action_method} di module ${module_name}`;

    let dataResponse = { refId: null };
    let dataBefore;
    let dataAfter;
    let isLogged = false;

    const originalSend = res.send;
    res.send = async function (data) {
      const resData = data.data;
      if (!isLogged) {
        const refUuid = data.data.uuid;
        if (action_method === 'POST') {
          dataBefore = undefined;
          dataAfter = JSON.stringify(resData);
        } else if (action_method === 'PUT') {
          const previousData = await db.log_activity.findFirst({
            where: {
              ref_id: refUuid,
            },
            orderBy: {
              created_on: 'desc',
            },
          });
          

          if (previousData) {
            dataBefore = JSON.stringify(previousData);
          } else {
            dataBefore = undefined;
          }

          dataAfter = JSON.stringify(resData);
        } else if (action_method === 'DELETE') {
          const dataDelete = await db.log_activity.findFirst({
            where: {
              ref_id: refUuid,
            },
            orderBy: {
              created_on: 'desc',
            },
          });

          if (dataDelete) {
            dataBefore = JSON.stringify(dataDelete);
          } else {
            dataBefore = undefined;
          }

          dataAfter = undefined;
        } else if (action_method === 'GET') {
          dataBefore = undefined;
          dataAfter = JSON.stringify(resData);
        }

        if (data && data.data && data.data.uuid) {
          dataResponse.refId = data.data.uuid;
        }

        const logAktivitas = {
          username,
          user_id,
          ref_id: dataResponse.refId,
          module_name,
          action_method,
          ref_table,
          data_before: dataBefore,
          data_after: dataAfter,
          description: logDescription,
          created_on: new Date(),
          dataResponse,
        };

        InsertLogAktivitas(logAktivitas);
        isLogged = true;
      }

      return originalSend.apply(res, arguments);
    };

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
    next();
  }
}
