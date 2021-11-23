const Loader = () => {
    return (
        <div className = "fixed inset-0 bg-white z-20 flex justify-center items-center">
            <div 
            className = "w-24 h-24 border-gray-500 border-solid border-8 rounded-full loader-top-border animate-spin" 
            ></div>
        </div>
    )
}

export default Loader
