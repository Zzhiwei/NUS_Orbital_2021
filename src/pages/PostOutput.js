import { Box, Container, Grid, TextField, makeStyles } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import Copyright from '../components/Copyright'
import PageHeader from '../components/PageHeader'
import DescriptionIcon from '@material-ui/icons/Description'

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
                subTitle={"by " + data.author}
                icon={<DescriptionIcon fontSize="large"/>}
            />
        <Container component="main" maxWidth="sm">
            <div className={classes.pageContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{readOnly: true}}
                            name="type"
                            label="Type"
                            defaultValue={data.type}
                            variant="outlined"
                            rows={1}
                            fullWidth
                            multiline
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{readOnly: true}}
                            name="members"
                            label="Group Size"
                            defaultValue={data.members}
                            variant="outlined"
                            rows={1}
                            fullWidth
                            multiline
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ChipInput InputProps={{readOnly: true}} autoFocus fullWidth  multiline rows={1} variant="outlined" label="Skills" value={data.skills}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{readOnly: true}}
                            name="education"
                            label="Education Level"
                            defaultValue={data.education}
                            variant="outlined"
                            rows={1}
                            fullWidth
                            multiline
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{readOnly: true}} 
                            name="proficiency"
                            label="Proficiency"
                            defaultValue={data.proficiency}
                            variant="outlined"
                            rows={1}
                            fullWidth
                            multiline
                        />  
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{readOnly: true}}
                            name="location"
                            label="Location"
                            defaultValue={data.location}
                            variant="outlined"
                            rows={1}
                            fullWidth
                            multiline
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            InputProps={{readOnly: true}}
                            name="schedule"
                            label="Commitment Period"
                            defaultValue={data.schedule}
                            variant="outlined"
                            rows={1}
                            fullWidth
                            multiline
                        />  
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            InputProps={{readOnly: true}}
                            name="description"
                            label="Description"
                            defaultValue={data.description}
                            variant="outlined"
                            rows={10}
                            fullWidth
                            multiline
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