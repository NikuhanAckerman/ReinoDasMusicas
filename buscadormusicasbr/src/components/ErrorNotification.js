import React from 'react'
import "../css/ErrorNotification.css"

export default function ErrorNotification({errorMessage}) {
  return (
    <div>

        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body error-message-body">
                    {errorMessage}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>

    </div>
  )
}
