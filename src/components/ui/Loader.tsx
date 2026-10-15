
import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute h-full w-full animate-spin rounded-full border-4 border-primary border-t-transparent opacity-20"></div>
                <div className="absolute h-full w-full animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg [animation-duration:1.5s]"></div>
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse"></div>
            </div>
        </div>
    );
};

export default Loader;
