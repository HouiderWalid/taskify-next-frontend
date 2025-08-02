import React from "react";

export default function Authentication({children}: { children?: React.ReactNode }) {
    return <div>
        <div className="w-full h-screen bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700">
            {children}
        </div>
    </div>
}