import React, {useState} from 'react'
import { makeStyles, Paper, Typography, Button } from '@material-ui/core';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

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
        },
        btnRoot: {
            '&:hover': {
                backgroundColor: '#ff9999'
            }
        }
    }
});






export default function FilterSidebar({ scrollToTop }) {
    const classes = useStyles()
    const { currentUser } = useAuth()
    const stickFromTop = currentUser ? "144px" : "95px"
    const [resetFunctions, setResetFunctions] = useState([])

    function resetFilter() {
        for (const reset of resetFunctions) {
            reset()
        }
    }

    return (
        <div   style={{display: 'block', position: '-webkit-sticky', position: 'sticky', top: stickFromTop, height: '77vh', border: '1px solid rgb(128, 128, 128, 0.12)', overflowY: 'auto', borderRadius: "4px" }}>
            <Paper elevation={2} className={classes.root}>
            <div id="filterHeader" align="center">
                <Typography  variant="h3" className={classes.title}>
                    Filter your search
                </Typography>
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<RotateLeftIcon />}
                    classes={{
                        root: classes.btnRoot
                    }}
                    onClick={resetFilter}
                >
                    Reset Filter
                </Button>
            </div>
            <AccordionWrapper title="Category">
                <Menu 
                    setResetFunctions={setResetFunctions}
                    scrollToTop={scrollToTop}
                    attribute="category" 
                    customItems={["All", "Competition", "Project", "Leisure Activity"]} 
                />
            </AccordionWrapper>
            <AccordionWrapper title="Type">
                <Menu
                    setResetFunctions={setResetFunctions}
                    scrollToTop={scrollToTop}
                    attribute="type"
                    customItems={["All", "Business", "IT & Software", "Photography & Film", "Arts & Crafts", "Music", "Health & Fitness", "Sports", "Gaming", "Volunteer Work", "Others"]}
                />
            </AccordionWrapper>
            <AccordionWrapper title="Location">
                <Menu 
                    setResetFunctions={setResetFunctions}
                    scrollToTop={scrollToTop} 
                    attribute="location" 
                    customItems={["All", "Online", "North", "South", "East", "West"]} 
                />
            </AccordionWrapper>
            <AccordionWrapper title="Education Level">
                <Menu 
                    setResetFunctions={setResetFunctions}
                    scrollToTop={scrollToTop}
                    attribute="education"
                    customItems={["All", "Any", "Secondary", "Pre-University", "Undergraduate"]}
                />
            </AccordionWrapper>
        </Paper>
        </div>
    )
}