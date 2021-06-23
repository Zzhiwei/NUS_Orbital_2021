import { Container } from '@material-ui/core'
import React, { useState } from 'react'

import ChatMain from '../components/chat/ChatMain'

export default function Chat() {
    const [key, setKey] = useState(0)
    return (
        <Container>
            <ChatMain key={key} setKey={setKey}/> 
        </Container>
    )
}
