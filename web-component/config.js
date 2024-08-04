import ip from 'ip';

export default {
    // 获取本机ip
    host: ip.address(),
    port: {
        main: 4000,
        micro: 3000,
    }    
}