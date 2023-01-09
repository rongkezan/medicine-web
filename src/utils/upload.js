import { message } from "antd";

export function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
}

export function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

export function handleImageChange(info, setUrl, setLoading) {
    if (info.file.status === 'uploading') {
        setLoading(true)
        return;
    }
    if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false)
            setUrl(url)
        });
    }
}