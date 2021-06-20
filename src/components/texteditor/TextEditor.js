import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { storage } from '../../firebase';
import './TextEditor.css'

export default function TextEditor({ editorState, setEditorState }) {

    const handleChange = value => {
        setEditorState(value)
    }

    function firebaseUpload(file) {
        return new Promise(
            (resolve, reject) => {
                if (!file) {
                    reject('Invalid file')
                }
                const uploadTask = storage.ref(`images/${file.name}`).put(file)
                uploadTask.on('state_changed',
                    (snapShot) => {
                        console.log(snapShot)
                    },
                    (error) => {
                        console.log(error)
                    },
                    (complete) => {
                        storage.ref('images').child(file.name).getDownloadURL().then(
                            (url) => {
                                resolve(url)
                            }
                        )
                    }
                )
            }
        )
    }

    function uploadImage(file) {
        return new Promise(
            (resolve, reject) => {
                console.log('Uploading image ... ')
                firebaseUpload(file).then(
                    (link) => {
                        resolve({ data: { link }})
                    }
                )
                .catch(error => {
                    reject(error)
                })
            }
        )
    }

    return (
        <Editor     
            editorState={editorState}
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            onEditorStateChange={handleChange}
            toolbar={{
                options: ['inline', 'list', 'link', 'image', 'colorPicker', 'emoji'],
                inline: {
                    options: ['bold', 'italic', 'underline'],
                },
                list: {
                    options: ['ordered', 'unordered'],
                },
                image: { 
                    uploadCallback: uploadImage, 
                    previewImage: true,
                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg', 
                }
            }}
        />
    )
}
