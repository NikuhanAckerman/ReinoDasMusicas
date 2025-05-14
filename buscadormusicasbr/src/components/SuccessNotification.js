import React from 'react'
import "../css/SuccessNotification.css"

export default function SuccessNotification({successMessage}) {
  return (
    <div>

        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body success-message-body">
                    {successMessage}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>

    </div>
  )
}
