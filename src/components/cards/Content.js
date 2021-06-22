import React, { useState, useEffect } from 'react'
import { Divider, Chip, makeStyles, Tooltip, CardContent } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';
import lastUpdated from './LastUpdated';

const useStyles = makeStyles(theme => {
    return {
        chipStyle: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: "-5px",
            marginBottom: '10px',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        },
        contentBox: {
            display: 'flex',
            marginTop: '-5px',
        },
        content: {
            display: "flex", 
            alignItems: "center", 
            flexWrap: "wrap",
            marginBottom: "10px",
            marginLeft: "10px"
        },
        footerContent: {
            display: "flex", 
            alignItems: "center", 
            flexWrap: "wrap",
        },
        footer: {
            display: "flex", 
            justifyContent:"space-between", 
            marginTop: "10px", 
            marginBottom: "-10px"
        },
    }    
})

export default function Content({ data, timeStamp }) {
    
    const classes = useStyles()
    const { current, total, location, commitment, education, skills : chips } = data

    const [time, setTime] = useState('some time ago')

    useEffect(() => {
        lastUpdated(timeStamp, setTime)
    }, [timeStamp])

    return (
        <CardContent>
            <div className={classes.contentBox}>
                <div>
                    <div className={classes.content}>
                        <Tooltip title="Location">
                        <LocationOnIcon style={{marginLeft: '-0.5px', marginRight: '15px'}}/>
                        </Tooltip>
                        {location}
                    </div>
                    <div className={classes.content}>
                        <Tooltip title="Commitment Period">
                        <DateRangeIcon style={{marginRight: '15px'}}/>
                        </Tooltip>
                        {commitment}
                    </div>
                    <div className={classes.content}>
                        <Tooltip title="Education Level">
                        <SchoolRoundedIcon style={{marginRight: '15px'}}/>
                        </Tooltip>
                        {education}
                    </div>
                </div>
            </div>
            <div className={classes.chipStyle}>
                {chips && chips.map((tag, index) => {
                    return <Chip key={index} label={tag}/>
                })}
            </div>
            <Divider variant="middle" />
            <div className={classes.footer}>
                <span className={classes.footerContent}>
                    <Tooltip title="Members">
                        <PeopleAltRoundedIcon style={{marginRight: '10px'}}/>
                    </Tooltip>
                    {current} / {total}
                </span>
                <span className={classes.footerContent}>
                    <Tooltip title="Last Update to Post">
                        <ScheduleIcon style={{marginRight: '7px'}}/>
                    </Tooltip>
                    Updated {time}
                </span>
            </div>
        </CardContent>
    )
}
