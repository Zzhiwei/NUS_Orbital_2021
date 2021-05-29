import React, {useState, useRef} from "react"
import { Slider, Button, makeStyles, IconButton, Snackbar, Tooltip } from '@material-ui/core'
import Cropper from "react-easy-crop"
import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';


import './Cropper.css'
import getCroppedImg from "./CropImage";
import { db } from "../../../firebase";
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
		}
    }
});



export default function PictureCropper({ closeCropper }) {
    const classes = useStyles()

	const { currentUser,  currentUserData, setCurrentUserData } = useAuth()
    
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [warningOpen, setWarningOpen] = useState(false);

	
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
		const canvas = await getCroppedImg(image, croppedArea)
		const canvasDataUrl = canvas.toDataURL("image/jpeg")
		await db.collection('users').doc(currentUser.uid).update({
			profilePicture: canvasDataUrl
		})
		console.log("successfully uploaded picture")
		setCurrentUserData({
			...currentUserData,
			profilePicture: canvasDataUrl
		})
		// setSrcURL(canvasDataUrl)
		
		closeCropper()

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
				<Button style={{backgroundColor: '#4caf50', color: 'white'}} variant='contained'  onClick={handleUpload}>
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
		</div>
	);
}