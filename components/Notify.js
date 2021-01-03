import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    //if(!useContext(DataContext)) return (<></>)
    const [ state, dispatch ]  = useContext(DataContext)
    console.log('notify.js ',{state, dispatch});
    const { notify } = state
    return (
        <>
            { notify.loading && <Loading /> }
            { notify.error && 
                <Toast 
                msg={{msg: notify.error, title: 'Error' }} 
                handleShow={() => dispatch({type: 'NOTIFY', payload: {} }) }
                bgColor="bg-danger"
                /> }
            { notify.success && 
                <Toast 
                msg={{msg: notify.success, title: 'Success' }} 
                handleShow={() => dispatch({type: 'NOTIFY', payload: {} }) }
                bgColor="bg-success"
                /> }
        </>
    )
}

export default Notify