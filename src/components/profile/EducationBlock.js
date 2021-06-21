import React, {useState} from "react";
import { Grid, IconButton, makeStyles, TextField,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Dialog,
    Button
} from "@material-ui/core";
import firebase from "firebase/app";
import _ from "lodash";
import DeleteIcon from "@material-ui/icons/Delete";

import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { findAllByDisplayValue } from "@testing-library/react";

const useStyles = makeStyles((theme) => {
    return {
        iconRoot: {
            paddingBottom: "0px",
        },
        delete: {
            "&:hover": {
                color: "red",
            },
        },
    };
});

function EducationBlock({ institution, from, to, enableEdit }) {
    const classes = useStyles();

    const { currentUser, currentUserData, setCurrentUserData } = useAuth();
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        const currentUserRef = db.collection("users").doc(currentUser.uid);

        await currentUserRef.update({
            education: firebase.firestore.FieldValue.arrayRemove({
                institution,
                from,
                to,
            }),
        });

        const filteredList = currentUserData.education.filter((item) => {
            return !_.isEqual(item, {
                to,
                from,
                institution,
            });
        });

        setCurrentUserData({
            ...currentUserData,
            education: filteredList,
        });
    };

    const renderDelete = () => {
        if (enableEdit) {
            return (
                <Grid item xs={2}>
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                        }}
                    >
                        <IconButton
                            classes={{
                                root: classes.iconRoot,
                            }}
                            onClick={() => setOpen(true)}
                        >
                            <DeleteIcon className={classes.delete} />
                        </IconButton>
                    </div>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleDelete} color="primary">
                            Yes
                        </Button>
                        <Button onClick={() => setOpen(false)} color="primary">
                            No
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            );
        }
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        label="Institution"
                        value={institution}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="From"
                        value={from}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="To"
                        value={to}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                {renderDelete()}
            </Grid>
        </div>
    );
}

export default EducationBlock;
