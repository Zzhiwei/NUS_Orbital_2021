import React from 'react';
import { useParams } from 'react-router';
import ViewPost from '../pages/ViewPost';

export default function GetViewId() {

    const { id } = useParams();

    return (
        <div>
            <ViewPost id={ id }/>
        </div>
    );
}
