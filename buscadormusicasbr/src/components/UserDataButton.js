import React from 'react'
import '../css/UserDataButton.css'


export default function UserDataButton({buttonIcon, buttonText, buttonHref}) {
  return (
    <div className="text-center">

      <a href={buttonHref}>
        <button type="button" className="btn text-center userDataButton">
          {buttonIcon}
          {buttonText}
        </button>
      </a>

    </div>
  )

}
