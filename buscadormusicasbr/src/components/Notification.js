import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast';
import "../css/Notification.css"

export default function Notification({notificationType, notificationText}) {
  let type = notificationType;

  if(type == "Sucesso") {
    type = "#33c45a";
  } else {
    type = "#ad092c";
  }
  
  return (
  
    <Toast show={true}>
        <Toast.Body style={{backgroundColor: type, color: "white", fontSize: "1.15rem"}}>
            {notificationText}
        </Toast.Body>
    </Toast>

  )
}
