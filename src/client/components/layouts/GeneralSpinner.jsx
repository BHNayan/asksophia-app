const Spinner = () => {
    const styleBg = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 500
    }
    const styleSpinner = {
        border: "8px solid",
        borderColor: "#000 transparent #555 transparent",
    }
    return (
        <>
            <div style={styleBg} className="flex items-center justify-center space-x-2 fixed w-full h-full bg-gray-200 opacity-50">
                <div style={styleSpinner} className="spinner-border animate-spin inline-block w-12 h-12 rounded-full" role="status">
                </div>
            </div>
        </>
    )
}
export default Spinner