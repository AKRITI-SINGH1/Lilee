import React from "react"

const AuthLayout = ({children}: {children:React.ReactNode})=> {
    return (
        <div className="min-h-screen w-full bg-white relative">
            {/* Pink Glow Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
                    `,
                    backgroundSize: "100% 100%",
                }}
            />
            
            {/* Noise Texture (Darker Dots) Background */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: "transparent",
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                }}
            />
            
            {/* Content */}
            <main className="relative z-10 flex justify-center items-center min-h-screen flex-col">
                {children}
            </main>
        </div>
    )
}

export default AuthLayout;