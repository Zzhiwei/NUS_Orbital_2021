import { Button, makeStyles } from "@material-ui/core"
import { useHistory } from "react-router"

const useStyles = makeStyles(theme => {
    return {
        profileLink: {
            color: theme.palette.primary.main,
            textDecoration: "none",
            textTransform: "none",
            '&:hover':{
                textDecoration: "underline",
                backgroundColor: "rgb(246,238,227, 0.5)"
            },
        },
    }
})
        
export default function ByLine({author, name}) {
            
    const classes = useStyles()
    const history = useHistory()

    return (
        <Button 
                className={classes.profileLink} 
                disableRipple 
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    history.push(`/profile/${author}`)
                }}
            >
                {`by: ${name}`}
        </Button>
    )
}