import React from 'react';
import { useParams } from 'react-router-dom';

import ProfilePage from '../components/profile/ProfilePage'

/*
this component is simply a wrapper inorder for profilepage component to remount
after switching the react router params when moving from one profile page to another
*/

function Profile() {
    const { id } = useParams()
    return  <ProfilePage key={id} />
  }
  
  export default Profile;
  