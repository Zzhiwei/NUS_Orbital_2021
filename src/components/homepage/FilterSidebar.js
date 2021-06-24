import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core';

import Menu from './Menu'
import AccordionWrapper from './AccordionWrapper'
import { useAuth } from '../../contexts/AuthContext';


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


export default function FilterSidebar({ scrollToTop }) {
    const classes = useStyles()
    const { currentUser } = useAuth()
    const stickFromTop = currentUser ? "144px" : "95px"

    return (
        <div   style={{display: 'block', position: '-webkit-sticky', position: 'sticky', top: stickFromTop, height: '77vh', border: '1px solid rgb(128, 128, 128, 0.12)', overflowY: 'auto', borderRadius: "4px" }}>
            <Paper elevation={2} className={classes.root}>
            <Typography variant="h3" className={classes.title}>
                Filter your search
            </Typography>
            <AccordionWrapper title="Category">
                <Menu 
                    scrollToTop={scrollToTop}
                    attribute="category" 
                    customItems={["All", "Competition", "Project"]} 
                />
            </AccordionWrapper>
            <AccordionWrapper title="Type">
                <Menu
                    scrollToTop={scrollToTop}
                    attribute="type"
                    customItems={["All", "Business", "IT & Software", "Photography and Film", "Music", "Health & Fitness", "Sciences", "Others"]}
                />
            </AccordionWrapper>
            <AccordionWrapper title="Location">
                <Menu scrollToTop={scrollToTop} attribute="location" customItems={["All", "Online", "In-Person"]} />
            </AccordionWrapper>
            <AccordionWrapper title="Education Level">
                <Menu 
                    scrollToTop={scrollToTop}
                    attribute="education"
                    customItems={["All", "Any", "Secondary", "Pre-University", "Undergraduate"]}
                />
            </AccordionWrapper>
        </Paper>
        </div>
    )
}