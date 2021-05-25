import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import Copyright from '../components/Copyright'
import PageHeader from '../components/PageHeader'
import DescriptionIcon from '@material-ui/icons/Description'
import Controls from "../components/Controls"
import { Link } from 'react-router-dom'

const useStyles = makeStyles (theme => ({
    root: {
        '& .MuiFormControl-root': {
          width: '100%',
          margin: theme.spacing(1) 
          
        }
    },
    pageContent: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
    },
    byline: {
        color: theme.palette.primary.main,
        textDecoration: "none"
    }
}))



export default function PostOutput({ data })  {
    const classes = useStyles()
    
    const byline = (
        <Link className={classes.byline} to={`/profile/${data.author}`}>
            {`by: ${data.name}`}
        </Link>
    )

    return (
    <>
        <PageHeader 
            title={data.title}
            subTitle={byline}
            icon={<DescriptionIcon fontSize="large"/>}
        />
        <form className={classes.root}>
            <Container component="main" maxWidth="sm">
                <div className={classes.pageContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controls.Output
                                name="type"
                                label="Type"
                                value={data.type}                       
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Output
                                name="members"
                                label="Group Size"
                                value={data.members}              
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{marginLeft: "20px"}}>
                                <Typography>
                                    Required Skills / Experience
                                </Typography>
                            </div>
                            <ChipInput 
                                style={{background: "white", borderRadius: "4px", height: "53px"}} 
                                readOnly 
                                variant="outlined"
                                fullWidth 
                                multiline 
                                value={data.skills}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Output
                                name="education"
                                label="Education Level"
                                value={data.education}
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Output 
                                name="proficiency"
                                label="Proficiency"
                                value={data.proficiency}
                                rows={1}
                            />  
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Output
                                name="location"
                                label="Location"
                                value={data.location}
                                rows={1}
                            /> 
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Output 
                                name="schedule"
                                label="Commitment Period"
                                value={data.schedule}                          
                                rows={1}
                            />  
                        </Grid>
                        <Grid item xs={12}>
                            <Controls.Output 
                                name="description"
                                label="Description"
                                value={data.description}
                                rows={10}
                            /> 
                        </Grid>
                    </Grid>
                </div>
                <Box mt={5} align="center">
                    <Copyright />
                </Box>
            </Container>
        </form>
    </>
    )
}