import { PrismaClient as generate_sales_sync } from "./node_modules/@generated/sales_sync"

const db = new generate_sales_sync()

export default { db }