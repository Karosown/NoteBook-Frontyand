//图片转base64api（文件） POST
const base="/file";
const img2base64_File=base+"/i2b/img";
//图片转base64api（链接） GET
const img2base64_URL=base+"/i2b/src?url=";

export {
    img2base64_URL,
    img2base64_File
}