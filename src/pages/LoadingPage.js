import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

export default function LoadingPage() {
    const history = useHistory()
    //set timeout because it takes time for algolia index to update
    setTimeout(() => {
        history.push('/home/myposts')
    }, 2000)
    return (
        <CircularProgress style={{position: "absolute", top: "50%", left: "50%"}}/>
    )
}