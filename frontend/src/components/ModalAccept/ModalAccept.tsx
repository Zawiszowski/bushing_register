
import { EditBtn, DeleteBtn } from '../../styles/Generic.styles';

import{
    Modal, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form, 
    FormGroup,
    Input,
    Label,

    
} from 'reactstrap';

import {ToastContainer} from 'react-toastify'


const AcceptDelete = (item : any) => {

        const {activeItem, toggle, onDelete} = item;

        return (
            <Modal  isOpen={true} toggle={toggle} centered={true}>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark">
                </ToastContainer> 

                <ModalHeader toggle={toggle}>
                    Do you really would like to delete it?
                </ModalHeader>

                <ModalBody>


                    <Form>
                        
                        {/* 3 formgroupsconsole.log
                        1 title label */}
                        <FormGroup>
                        <Label for="custom_pn">Custom Part Number</Label>
                        <Input
                            type="text"
                            name="custom_pn"
                            value={activeItem.custom_pn}
                            
                            // readOnly='readonly'
                        />
                        </FormGroup>

                    </Form>

                </ModalBody>

                <ModalFooter>
                    <EditBtn color="success" onClick={toggle}>
                        Cancel
                    </EditBtn>
                    <DeleteBtn color="warning" onClick={() => onDelete(activeItem)}>
                        Delete
                    </DeleteBtn>


                </ModalFooter>
                
            </Modal>
            

        )
    

}


export default AcceptDelete