export function formatTime(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}


export function parseMessage(message:string):[string,number]{
  if(!message){
    throw new Error(`message is null`);
  }
  let arr = message.split(" ");
  if(arr.length != 2){
    throw new Error(`invalid args:${ message}`);
  }
  let p = arr[0];
  let id = parseInt(arr[1]);

  return [p,id];
}