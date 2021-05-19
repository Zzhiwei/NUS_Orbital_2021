import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import Copyright from '../components/Copyright'
import PageHeader from '../components/PageHeader'
import DescriptionIcon from '@material-ui/icons/Description'
import Controls from "../components/Controls"

const useStyles = makeStyles (theme => ({
    pageContent: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
    }
}))

export default function PostOutput({ data })  {
    const classes = useStyles()
    return (
        <div>
        <PageHeader 
                title={data.title}
                subTitle={"by " + data.name}
                icon={<DescriptionIcon fontSize="large"/>}
            />
        <Container component="main" maxWidth="sm">
            <div className={classes.pageContent}>
                <Grid container spacing={3}>
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
                        <ChipInput style={{background: "white", borderRadius: "4px"}} readOnly disableUnderline fullWidth  multiline rows={1}  label="Skills" value={data.skills}/>
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
        </div>
    )
}