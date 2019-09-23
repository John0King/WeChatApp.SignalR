//index.js
//获取应用实例
//import { IMyApp } from '../../app'
import { HubConnectionBuilder, HubConnection } from 'wechat-app-signalr'
import { parseMessage } from "../../utils/util";

//const app = getApp<IMyApp>()

Page({
    data: {
        mesages: [] as any[]
    },
    onLoad() {
        let connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5009/echo")
            .withAutomaticReconnect()
            .build();

        connection.on("Ping", ping => {
            let [type, id] = parseMessage(ping);
            console.log(`${type} ${id}`);
            connection.send("Pong", `pong ${id + 1}`);
        })
        connection.start()
            .catch(e => {
                console.log(`连接失败`);
                console.log(e);
            });
        
        let xid = 0;
        setInterval(()=>{
            this.pingServer(connection, xid)
            .then(x=>{
                xid = x;
            });
        },3000) 
            
    },
    async pingServer(connection:HubConnection, lastId:number){
        let pong = await connection.invoke("Ping",`ping ${lastId+1}`) as string;
        let [type,id] = parseMessage(pong);
        console.log(`${type} ${id}`);
        return id;
    }
})
