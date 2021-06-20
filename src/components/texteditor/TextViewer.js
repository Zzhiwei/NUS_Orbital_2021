import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css'

export default function TextViewer({ content }) {

    return (
        <Editor     
            initialContentState={content}
            toolbarHidden
            readOnly
        />
    )
}
