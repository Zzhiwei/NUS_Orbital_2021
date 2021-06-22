export default function lastUpdated(timeStamp, setTime) {
    const now = new Date()
    const secondsPast = (now.getTime() - timeStamp) / 1000
    if (secondsPast < 60) {
        setTime('<1 minute ago')
    }
    else if (secondsPast < 3600) {
        setTime('<1 hour ago')
    }
    else if (secondsPast <= 86400) {
        let hoursPast = parseInt(secondsPast / 3600)
        setTime(
            hoursPast === 1 
                ? hoursPast + ' hour ago' 
                : hoursPast + ' hours ago'
            )
    }
    else if (secondsPast <= 604800) {
        let daysPast = parseInt(secondsPast / 86400)
        setTime(
            daysPast === 1 
                ? daysPast + ' day ago' 
                : daysPast +  ' days ago'
            )
    } 
    else if (secondsPast <= 2419200) {
        let weeksPast = parseInt(secondsPast / 604800)
        setTime(
            weeksPast === 1 
                ? weeksPast + ' week ago' 
                : weeksPast + ' weeks ago'
            )
        //setTimeColor('orange')
    } 
    else if (secondsPast <= 29030400) {
        let monthsPast = parseInt(secondsPast / 2419200)
        setTime(
            monthsPast === 1 
                ? monthsPast + ' month ago' 
                : monthsPast + ' months ago'
            )
    }
    else {
        setTime('>1 year ago')
    }
}
