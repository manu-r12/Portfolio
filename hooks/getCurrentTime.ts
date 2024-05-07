export function getCurrentTime() {
    // Create a new Date object
    let time = new Date();

    time.setUTCHours(time.getUTCHours() + 5); 
    time.setUTCMinutes(time.getUTCMinutes() + 30); 

    let hours: string | number = time.getHours();
    let minutes: string | number = time.getMinutes();
    let seconds: string | number = time.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let timeString = hours + ':' + minutes + ':' + seconds;

    
    return timeString
}
