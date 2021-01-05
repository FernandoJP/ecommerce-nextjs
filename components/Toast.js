const Toast = ({msg, handleShow, bgColor}) => { //destructuring in params, props object will be converted to 3 params
    return (
        <div className={`toast show position-fixed text-light ${bgColor}`} 
        style={{ top: 5, right: 5, zIndex:9, minWidth: 280 }}
        data-autohide="false">
            <div className={`toast-header ${bgColor}`}>
                <strong className="mr-auto text-light">{msg.title}</strong>
                <button type="button" 
                className={`ml-2 mb-1 closetext-light text-light ${bgColor}`} 
                data-dismiss="toast"
                style={{ outline: 'none' }} 
                onClick={handleShow}
                >x</button>
            </div>
            <div className="toast-body">
                {msg.msg}
            </div>
        </div>
    )
}

export default Toast