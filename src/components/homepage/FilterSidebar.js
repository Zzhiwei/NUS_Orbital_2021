import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core';

import Menu from './Menu'
import AccordionWrapper from './AccordionWrapper'


const useStyles = makeStyles((theme) => {
    return {
        root: {
            margin: '16px'
        },
        title: {
            padding: '10px',
        }
    }
});


export default function FilterSidebar() {
    const classes = useStyles()


    return (
        <Paper elevation={2} className={classes.root}>
            <Typography className={classes.title}>
                Filter your search
            </Typography>
            <AccordionWrapper title="Type">
                <Menu attribute="type" customItems={["All", "Competition", "Project"]} />
            </AccordionWrapper>
            <AccordionWrapper title="Location">
                <Menu attribute="location" customItems={["All", "Online", "In-Person"]} />
            </AccordionWrapper>
            <AccordionWrapper title="Education Level">
                <Menu 
                    attribute="education"
                    customItems={["All", "Any", "Primary", "Secondary", "Pre-University", "Undergraduate", "Professional"]}
                />
            </AccordionWrapper>
            <AccordionWrapper title="Categories">
                To be implemented after category is set up in create post
            </AccordionWrapper>

        </Paper>
    )
}
