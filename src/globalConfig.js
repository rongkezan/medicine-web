let baseUrl = 'http://127.0.0.1:8001'

if (process.env.REACT_APP_ENV === "pro") {
    baseUrl = 'https://medicine.51nftcard.com'
}

global.config = {
    baseUrl: baseUrl
}