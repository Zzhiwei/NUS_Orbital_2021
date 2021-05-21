import React from 'react';
import { useParams } from 'react-router';
import EditPost from '../pages/EditPost';

export default function GetEditId() {

    const { id } = useParams();

    return (
        <div>
            <EditPost id={ id }/>
        </div>
    );
}
