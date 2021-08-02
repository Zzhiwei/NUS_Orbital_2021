import React, {useState} from "react";
import { Grid, IconButton, makeStyles, TextField,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Dialog,
    Button,
    Modal
} from "@material-ui/core";
import firebase from "firebase/app";
import _ from "lodash";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import EditEducation from "./modals/EditEducation";


const useStyles = makeStyles(() => {
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

function EducationBlock({ institution, from, to, enableEdit, index }) {
    const classes = useStyles();

    const { currentUser, currentUserData, setCurrentUserData } = useAuth();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const info = {institution, from, to}
    

    const handleDelete = async () => {
        setLoading(true)
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
        setOpen(false)
        setLoading(false)
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
                            className={classes.delete} 
                            onClick={() => setModalOpen(true)}
                        >
                            <EditIcon  />
                        </IconButton>
                        <IconButton
                            classes={{
                                root: classes.iconRoot,
                            }}
                            className={classes.delete} 
                            onClick={() => setOpen(true)}
                        >
                            <DeleteIcon />
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
                        <Button disabled={loading} onClick={handleDelete} color="primary">
                            Yes
                        </Button>
                        <Button onClick={() => setOpen(false)} color="primary">
                            No
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Modal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                    >
                        <div>
                            <EditEducation index={index} info={info} handleClose={() => setModalOpen(false)} />
                        </div>
                    </Modal>
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
