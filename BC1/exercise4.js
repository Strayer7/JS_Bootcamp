
const dayStart = "07:30" // начало дня
const dayEnd = "17:45" // конец дня;

let dayStartMin = cutStringTime(dayStart);
let dayEndMin = cutStringTime(dayEnd);

function cutStringTime(string)
{
    let hours = parseInt(string.substring(0,2),10); 
    let minutes = parseInt(string.substring(3,5),10);
    return (hours * 60) + minutes;

}


function scheduleMeeting(startTime, durationMinutes) {
    let meetingStartMin = cutStringTime(startTime);
    return meetingStartMin >= dayStartMin && 
       meetingStartMin + durationMinutes <= dayEndMin;
}

console.log(scheduleMeeting("17:15", 30));


