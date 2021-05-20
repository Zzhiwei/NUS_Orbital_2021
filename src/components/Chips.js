import React from 'react';
import { Chip, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
}));

function Chips({title, items}) {
    const classes = useStyles();
    
    return (
        <div style={{marginBottom: "30px"}}>
                <Typography align="center" color="primary" variant="h4" style={{marginBottom: '10px'}}>
                        {title} 
                </Typography>
                <div className={classes.root}>
                  {(Object.entries(items).length !== 0) && items.map(i => {
                    return <Chip label={i}> </Chip>
                  })}
                </div>
        </div>
    );
  }
  
  export default Chips;
  