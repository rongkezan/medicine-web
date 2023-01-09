import { message } from "antd"

export const handleQuery = (res) => {
    if (res.success) {
        return res.data
    } else {
        message.error(res.msg)
        return false
    }
}

export const handleAction = (res, func) => {
    if (res.success) {
        message.success(res.msg)
        func()
    } else {
        message.error(res.msg)
    }
}