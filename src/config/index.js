
const env = process.env.NODE_ENV;
const dev = {
    host: "http://192.168.1.140:3000"
}

const prod = {
    host: "https://api.bubaocloud.xin/"
}

const config = env === "production" ? prod : dev;
export default config