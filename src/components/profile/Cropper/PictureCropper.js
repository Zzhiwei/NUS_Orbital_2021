import React, { useState } from "react"
import { Modal, Slider, Button, makeStyles, IconButton, Snackbar, Tooltip, CircularProgress } from '@material-ui/core'
import Cropper from "react-easy-crop"
import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';


import './Cropper.css'
import getCroppedImg from "./CropImage";
import { db, storage } from "../../../firebase";
import { useAuth } from '../../../contexts/AuthContext'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            height: '100vh',
            width: '100vw',
			backgroundColor: 'rgb(0, 0, 0, 0.5)'
        },
        cropperWidget: {
            height: '90%',
			display: 'relative'
        },
        cropperMain: {
            height: "98%"
        },
		close: {
			position: 'absolute',
			color: 'white',
			right: '20px',
			top: '70px',
			'&:hover': {
				color: 'red'
			}
		},
		warning: {
			width: '100%',
			'& > * + *': {
			  marginTop: theme.spacing(2),
			},
		}, 
		modal: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)'
			}
    }
});



export default function PictureCropper({ closeCropper, setAvatarKey}) {
    const classes = useStyles()

	const { currentUser,  currentUserData, setCurrentUserData } = useAuth()
    
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [warningOpen, setWarningOpen] = useState(false);
	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)


	
	const handleWarningClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setWarningOpen(false);
	  };
	

	

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	const handleUpload = async () => {
		if (!image) {
			return setWarningOpen(true)
		}
		setOpenModal(true)
		setLoading(true)
		const canvas = await getCroppedImg(image, croppedArea)
		const canvasDataUrl = canvas.toDataURL("image/jpeg")
		const ref = storage.ref(`profile_pictures/${currentUser.uid}`)
		
		await ref.putString(canvasDataUrl, 'data_url').catch(error => {
				alert("An error has occurred")
				window.location.assign(window.location.href)
			})

		await ref.getDownloadURL().then(async url => {
			await db.collection('users').doc(currentUser.uid).update({
				profilePicture: url
			})
			setCurrentUserData({
				...currentUserData,
				profilePicture: url
			})
		})

		setLoading(false)
		setOpenModal(false)
		closeCropper()
		setAvatarKey(prev => prev + 1)
		
		

	}

	const handleClear = () => {
		if (image) {
			return setImage(null)
		}
		setWarningOpen(true)
	}


	return (
		<div className={classes.container} >
			<Tooltip title="Close Image Uploader">
				<IconButton onClick={closeCropper}  className={classes.close}>
					<CancelIcon fontSize="large" />
				</IconButton>
			</Tooltip>
			<div className={classes.cropperWidget}>
				{image ? (
					<>
						<div className={classes.cropperMain}>
							<Cropper 
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>

						<div className="cropperSlider">
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e, zoom) => setZoom(zoom)}
								color="secondary"
                                
							/>
						</div>
					</>
				) : null}
			</div>

			<div className="buttons">
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
				<Button
					variant='contained'
					color='secondary'
					onClick={handleClear}
					style={{backgroundColor: '#f44336', color: 'white', marginRight: "10px" }}
				>
					Clear
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
				>
					Select Image
				</Button>
				<Button disabled={loading} style={{backgroundColor: '#4caf50', color: 'white'}} variant='contained'  onClick={handleUpload}>
					Upload
				</Button>
				
			</div>
			<div className={classes.warning}>
					<Snackbar 
						open={warningOpen}
						autoHideDuration={2000}
						onClose={handleWarningClose}
						anchorOrigin={{vertical:'top', horizontal: 'center'}}
					>
						<Alert onClose={handleWarningClose} severity="warning">
						Please select an image first!
						</Alert>
					</Snackbar>
				</div>
				<Modal
						open={openModal}
						onClose={null}
				>
						<div className={classes.modal}>
								<CircularProgress />
						</div>
				</Modal>
		</div>
	);
}