import React, { useState } from 'react'

const Description = ({ description }) => {
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <p className={`max-w-[360px] md:max-w-[450px] ${visible ? "" : "line-clamp-3"}`}>{description}</p>
            <button className="text-main-color mt-1" onClick={() => setVisible(!visible)}>
                {visible ? "ver menos" : "ver más"}
            </button>
        </div>

    )
}

export default Description