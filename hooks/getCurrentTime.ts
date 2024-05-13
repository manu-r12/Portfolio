export function getCurrentTime() {
    // Create a new Date object
    let time = new Date();

    // Adjust for IST (UTC+5:30)
    let ISTOffset = 5.5 * 60; // Offset in minutes
    let currentTimeOffset = time.getTimezoneOffset(); // Offset in minutes
    time.setMinutes(time.getMinutes() + currentTimeOffset + ISTOffset);

    // Get adjusted hours and minutes
    let hours: string | number = time.getHours();
    let minutes: string | number = time.getMinutes();
    let seconds: string | number = time.getSeconds();

    // Convert to 12-hour format
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Add leading zeros if necessary
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let timeString = hours + ' : ' + minutes + ' ' + ampm;

    return timeString;
}
