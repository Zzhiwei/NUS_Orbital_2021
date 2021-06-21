import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import Copyright from '../../components/Copyright'
import PageHeader from '../../components/PageHeader'
import DescriptionIcon from '@material-ui/icons/Description'
import Controls from "../../components/Controls"
import { Link } from 'react-router-dom'
import MUIRichTextEditor  from 'mui-rte'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const useStyles = makeStyles (theme => ({
    root: {
        // '& .MuiFormControl-root': {
        //   width: '100%',
        //   margin: theme.spacing(1) 
          
        // }
    },
    pageContent: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
    },
    byline: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        '&:hover':{
            textDecoration: "underline",
        },
    }
}))

const rteTheme = createMuiTheme()

Object.assign(rteTheme, {
  overrides: {
    MUIRichTextEditor: {
        root: {
            marginTop: "1rem",
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "1px solid gray"
        },
        container: {
            borderRadius: '4px'
        },
        editor: {
            padding: "5px 15px",
            height: "250px",
            maxHeight: "250px",
            overflow: "auto",
        },
        placeHolder: {
            backgroundColor: "#fff",
            padding: "5px 15px",
        },
        anchorLink: {
            color: "#333333",
            textDecoration: "underline"
        }
      }
    }
})

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
                                name="schedule"
                                label="Commitment Period"
                                value={data.schedule}                          
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
                                name="location"
                                label="Location"
                                value={data.location}
                                rows={1}
                            /> 
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Output
                                name="current"
                                label="Current Members"
                                value={data.current}              
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Output
                                name="total"
                                label="Total Group Size"
                                value={data.total}              
                                rows={1}
                            />  
                        </Grid>
                        <Grid item xs={12}>
                            <MuiThemeProvider theme={rteTheme}>
                                <MUIRichTextEditor
                                    defaultValue={data.description}
                                    controls={[]}
                                />
                            </MuiThemeProvider>
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