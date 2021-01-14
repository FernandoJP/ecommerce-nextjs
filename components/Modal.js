import { useContext } from 'react'
import { deleteItem } from '../store/Actions'
import { DataContext} from '../store/GlobalState'

const Modal = () => {
    const { state, dispatch } = useContext(DataContext)
    const { modal } = state

    const handleSubmit = () => {
        dispatch(deleteItem(modal.data, modal.id, 'ADD_CART'))
        dispatch({ type: 'ADD_MODAL', payload: {}})
    }

    return (
        <div className="modal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-capitalize">{modal.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Do you want to delete this item?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Yes</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal