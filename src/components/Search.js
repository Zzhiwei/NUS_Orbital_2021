import { Button, Grid, TextField } from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune'

function Search({toggleFilter}) {
    
    return (
        <div style={{margin: '50px 0px'}}>
            <form>
                <Grid container>
                    <Grid item xs={6}  style={{marginBottom: '20px'}}>
                        <TextField style={{background: "white", borderRadius: "4px"}}variant="outlined" label="Search"  fullWidth/>
                    </Grid>
                    
                    <Button color="primary" variant="contained" style={{marginLeft: '20px', marginTop: '0px', height: '55px', width: '100px', color: 'white'}}>
                        Search
                    </Button>

                    <Button onClick={toggleFilter(true)} variant="outlined" startIcon={<TuneIcon />} style={{marginLeft: '20px', marginTop: '0px', height: '55px', width: '100px', background: "white", color: '#027dc5'}}>
                        filter
                    </Button>
                    
                </Grid>
            </form>
        </div>
    );
  }
  
  export default Search;
  