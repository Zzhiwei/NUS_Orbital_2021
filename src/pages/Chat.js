import React, { useState } from 'react'

import ChatMain from '../components/chat/ChatMain'

export default function Chat() {
    const [key, setKey] = useState(0)
    return (
        <ChatMain key={key} setKey={setKey}/>
    )
}
