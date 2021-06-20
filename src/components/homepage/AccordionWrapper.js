import React from 'react'
import {  makeStyles, Typography, AccordionSummary, AccordionDetails, withStyles, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAccordion from '@material-ui/core/Accordion';


const useStyles = makeStyles((theme) => {
    return {
      root: {
        // backgroundColor: '#eee7d7'
      }
    }
})

const Accordion = withStyles({
    root: {
      //border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&$expanded': {
        margin: 'auto',
      },
      backgroundColor: '#f6eee3'
    },
    expanded: {},
  })(MuiAccordion);

export default function AccordionWrapper({children, title}) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
             <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                <Typography>
                    {title}
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography style={{marginTop: "-20px"}}>
                    {children}
                </Typography>
                </AccordionDetails>
            </Accordion>
            { title !== "Education Level" && <Divider variant="middle" />}
        </div>
    )
}
