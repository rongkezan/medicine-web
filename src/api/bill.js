import { http } from "@/utils";
import { handleQuery } from "./common";

export const queryBillPage = async (param) => {
    const res = await http.post("backend/query/bill/page", param)
    return handleQuery(res)
}