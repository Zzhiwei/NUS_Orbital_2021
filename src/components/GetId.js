import React from 'react';
import { useParams } from 'react-router';
import ViewPost from '../pages/ViewPost';

function GetId() {

    const { id } = useParams();

    return (
        <div>
            <ViewPost id={ id }/>
        </div>
    );
}

export default GetId;