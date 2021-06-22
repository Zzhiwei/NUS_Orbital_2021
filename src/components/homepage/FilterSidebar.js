import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core';

import Menu from './Menu'
import AccordionWrapper from './AccordionWrapper'


const useStyles = makeStyles(() => {
    return {
        root: {
            backgroundColor: 'rgb(246,238,227)',
        },
        title: {
            padding: '10px',
            borderBottom: '1px solid rgba(128, 128, 128, 0.12)',
            fontSize: 20
        }
    }
});


export default function FilterSidebar() {
    const classes = useStyles()

    return (
        <div   style={{display: 'block', position: '-webkit-sticky', top: "104px", height: '85vh', border: '1px solid rgb(128, 128, 128, 0.12)', overflowY: 'auto', borderRadius: "4px" }}>
            <Paper elevation={2} className={classes.root}>
            <Typography variant="h3" className={classes.title}>
                Filter your search
            </Typography>
            <AccordionWrapper title="Category">
                <Menu 
                    attribute="category" 
                    customItems={["All", "Competition", "Project"]} 
                />
            </AccordionWrapper>
            <AccordionWrapper title="Type">
                <Menu
                    attribute="type"
                    customItems={["All", "Business", "IT & Software", "Photography and Film", "Music", "Health & Fitness", "Sciences", "Others"]}
                />
            </AccordionWrapper>
            <AccordionWrapper title="Location">
                <Menu attribute="location" customItems={["All", "Online", "In-Person"]} />
            </AccordionWrapper>
            <AccordionWrapper title="Education Level">
                <Menu 
                    attribute="education"
                    customItems={["All", "Any", "Secondary", "Pre-University", "Undergraduate"]}
                />
            </AccordionWrapper>
        </Paper>
        </div>
    )
}