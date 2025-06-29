import { useState, useEffect} from 'react';
import Papa from "papaparse"


import { useProject } from '../../hooks/useProject';
import LineChart from '../Chart/LineChart';
import{
    Button,
    Modal, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form, 
    FormGroup,
    Input,
    Label,
    Tooltip,
    FormFeedback,
    

} from 'reactstrap';

import PhotoGallery from '../PhotoGallery/PhotoGallery';

import type { RegisterType, ClientType, Config, ValidateRegister } from '../../types';

interface Props {
    activeItem: RegisterType,
    clients: Array<ClientType>,
    config: Config,
    toggle: () => void,
    onSave: (item : RegisterType) => void,
    checkCustomPn: (item : string) => void,
    validate: ValidateRegister,
    setValidate: (item : ValidateRegister) => void,
    readOnly: boolean

}


const CustomModal = (props : Props) => {
    const {activeItem, clients, config, toggle, onSave, checkCustomPn, validate, setValidate,  readOnly} = props;
    const initCustomPN = JSON.parse(JSON.stringify(activeItem.custom_pn))
    const [state, setState] = useState<RegisterType>(activeItem);
    const [photoGallery, setPhotoGallery] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const client_name_init = 'new client to add'
    const client_id_init = JSON.parse(JSON.stringify(activeItem.project.id !== -1 ? clients.find(item => item.id === (activeItem.project?.client))?.id : clients.find(item => item.name === client_name_init)?.id ))


    const [clientId, setClientId] = useState(client_id_init) // tutaj dodać warunek na newclient to add
    const {projects} = useProject(clientId, config)
    const axle = ['Front','Rear']
    const newItem = activeItem.custom_pn === '' && activeItem.client_pn === '' ? true:false



    
    const togglePhotoGallery = () => {
        setPhotoGallery(!photoGallery);
    }
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    
    const handleChange = (e : any) => {
        if (readOnly) return;
        let {name, value} = e.target;
     
        let files
        if (e.target.type === "checkbox"){
            value = e.target.checked;

            setState({...state, [name]: value});
        }
        else if (e.target.type === 'file'){
            files = e.target.files
            setValidate({...validate, photos: true, photos_msg: 'ok'})

            setState({...state, [name]: files});
        }else if(e.target.name ==='custom_pn'){
            let input = e.target.value.replace(/[^a-zA-Z0-9-]/g, '')
            if (input.length > 4) input = input.substring(0, 3) + ' ' + input.substring(3);
            if (input.length > 6) input = input.substring(0, 6) +' ' + input.substring(6);


            setState({...state, [name]: input.toUpperCase()});

            if(!state.id ){
                checkCustomPn(input.toUpperCase())
            } else if(state.id && initCustomPN !== input){
                checkCustomPn(input.toUpperCase())
            }else{
                setValidate({...validate, [name]: true })
            }
            

        }else if(e.target.name ==='client') {
            setState({...state, [name]: value});

            setClientId(parseInt(value))

            setValidate({...validate, project_id: true, [name]: true});


        }else{
            setState({...state, [name]: value});
            setValidate({...validate, [name]: true});
        }

    };



    const importCSV = (file : any) => {

        Papa.parse(file, {
            complete: updateData,
            header:true 
        })

    }

    const updateData = (result :any) =>{
        const data = result.data
        let stiffness_x_array = []
        let stiffness_y_array = []

        for(let index = 0; index < data.length; index++){
            if (data[index]["x"] === undefined  || data[index]["y"] === undefined){
                continue
            }
            stiffness_x_array.push(parseFloat(data[index]["x"]))
            stiffness_y_array.push(parseFloat(data[index]["y"]))
        }


        if (stiffness_x_array.length === stiffness_y_array.length){
            setState({...state,
                stiffness_x: stiffness_x_array,
                stiffness_y: stiffness_y_array,
            });
        }
    }

    const handleFileChange = ( e : any) => {


        importCSV(e.target.files[0])

    };

    const photoGalleryBtn = () => {

        if(state.photo_links.length > 0){
            
            return(
                <FormGroup>
                    <Button style={{width: '100%'}} onClick={() => togglePhotoGallery()}>Show photos</Button>
                </FormGroup>
            )
        }

    }

    const saveBtn = () => {
        if(!readOnly){
            return (
                <Button  color="success" style={{width: '100%'}} onClick={() => onSave(state)}>
                Save
                </Button>
                )
        }
    }

    const createdAtDate = () => {
        debugger
        if(readOnly){
            return(
            <FormGroup>
            <Label for="post_date">Created at date</Label>
            <Input
                type='date'
                name="post_date"
                value={state.created_at ? state.created_at.substring(0, 10) : ""}
                placeholder = "Enter Date"
                dateFormat="DD-MM-YYYY"
                readOnly={readOnly}
            
            />

            </FormGroup>
            )
        }
    }

    useEffect(() => {
        if(state.photo_links.length > 0){
            setValidate({...validate, photos: false, photos_msg: 'Uploading files will cause to delete old photos.'})
        }else{
            setValidate({...validate, photos: false, photos_msg: 'Photos are not uploaded yet. Please add photos.'})
        }


    },[])

    useEffect(() => {

        if ((!state.project || state.project?.client !== clientId) && projects.length > 0){
            const project_id_init = 0
            setState({...state, project: {...projects[project_id_init]}, project_id: projects[project_id_init].id});
            setValidate({...validate, project_id: true});
        }
        
    },[projects])

    useEffect(( ) => {
        if (state.project && clientId && newItem && projects.length > 0)
        {
            const year = new Date().getFullYear()
            const axle_str = state.axle === 'Rear' ? 'RR' : 'FR'
            const Custom_id_auto_name = clients.find(item => item.id === clientId)?.name.substring(0, 3) + ' ' + String(year).substring(2, 4) + " " + projects.find(proj_item => proj_item.id === Number(state.project_id))?.name?.replaceAll(' ','_') + '-' + axle_str + '-' + '01'
            setState({...state, custom_pn: Custom_id_auto_name, project: {...projects.find(proj_item => proj_item.id === Number(state.project_id)) ?? {id: -1, name: '', client: -1}}});

        }


    },[state.project_id, state.axle]) // there is no [projects, client_id] tracking, because change in project_id from above will trigger it




    
        return (
            <>
            <Modal isOpen={true} toggle={toggle} centered={true}  style={{maxWidth: '1000px'}}>
                <ModalHeader toggle={toggle}>
                    Bushing Item
                </ModalHeader>

                <ModalBody>

                    <Form>
                        
                        <div className='row align-items-center'>
                        <div className='col'>
                        <FormGroup>
                        <Label for="client">Client</Label>
                        <Input
                            valid={!readOnly && validate.client}
                            invalid={!readOnly && !validate.client}
                            type="select"
                            name="client"
                            value={clientId}
                            onChange={handleChange}
                            placeholder="Choice client"
                            
                        >   
                            {
                                clients.map(client => (
                                    <option value={client.id} key={client.id}>{client.name?.toUpperCase()}</option>
                                ))
                            }

                        </Input>
                        </FormGroup>

                        <FormGroup>
                        <Label for="project">Project</Label>
                        <Input
                            valid={!readOnly && validate.project_id}
                            invalid={!readOnly && !validate.project_id}
                            type="select"
                            name="project_id"
                            value={state.project_id}
                            onChange={handleChange}
                            placeholder="Choice project"
                            
                        >
                            {
                                projects.map(project => (
                                    <option value={project.id} key={project.id}>{project.name?.toUpperCase()}</option>
                                ))
                            }
                        </Input>
                        </FormGroup>

                        <FormGroup>
                        <Label for="axle">Axle</Label>
                        <Input
                            valid={!readOnly && validate.axle}
                            invalid={!readOnly && !validate.axle}
                            type="select"
                            name="axle"
                            value={state.axle}
                            onChange={handleChange}
                            placeholder="Choice axle"
                            
                        >   
                        {
                            axle.map( (value, index) => (
                                <option value={value} key={index}>{(value.toUpperCase())}</option>
                             ) )
                        }
                            
                        </Input>
                        </FormGroup>
                        
                        <FormGroup>
                        <Label for="custom_pn">Custom Part Number</Label>
                        <Input
                            valid={!readOnly && validate.custom_pn}
                            invalid={!readOnly && !validate.custom_pn}
                            type="text"
                            name="custom_pn"
                            value={state.custom_pn.toUpperCase()}
                            onChange={handleChange}
                            placeholder="Enter Custom P/N"
                            readOnly={readOnly}
                        />
                        <FormFeedback 
                            valid={!readOnly && validate.custom_pn}
                            invalid={!readOnly && !validate.custom_pn}
                            >{validate.custom_pn_msg}
                        </FormFeedback>
                        
                        </FormGroup>

                    
                        <FormGroup>
                        <Label for="client_pn">Client Part Number</Label>
                        <Input
                            valid={!readOnly && validate.client_pn}
                            invalid={!readOnly && !validate.client_pn}
                            type="text"
                            name="client_pn"
                            value={state.client_pn.toUpperCase()}
                            onChange={handleChange}
                            placeholder="Enter client P/N"
                            readOnly={readOnly}
                        />
                        <FormFeedback valid>All is good!</FormFeedback>
                        </FormGroup>

                        <FormGroup check>
                        <Label for="decommissioned">
                            <Input
                            type="checkbox"
                            name="decommissioned"
                            checked={state.decommissioned}
                            onChange={handleChange}
                            />
                            Decommissioned
                        </Label>
                        </FormGroup>

                        <FormGroup>
                        <Label for="storage_locker">Storage Locker Name</Label>
                        <Input
                            valid={!readOnly && validate.storage_locker}
                            invalid={!readOnly && !validate.storage_locker}
                            type="text"
                            name="storage_locker"
                            value={state.storage_locker.toUpperCase()}
                            onChange={handleChange}
                            placeholder="Enter storage_locker Name"
                            readOnly={readOnly}
                        />
                        <FormFeedback valid>All is good!</FormFeedback>
                        </FormGroup>


                        </div>
                    
                        <div className='col'>
                        <FormGroup >
                        <Label for="photos">Photo files</Label>
                        <Input
                            valid={!readOnly && validate.photos}
                            invalid={!readOnly && !validate.photos}
                            type="file"
                            multiple={true}
                            name="photos"
                            style={{display: readOnly ? 'none': 'block'}}
                            onChange={handleChange}
                            placeholder="Enter photos"
                        />
                        <FormFeedback 
                            valid={!readOnly && validate.photos}
                            invalid={!readOnly && !validate.photos}
                        >
                            {validate.photos_msg}
                        </FormFeedback>

                        {photoGalleryBtn()}
                        </FormGroup>
                        

                        
                        <FormGroup>
                        <Label  for="stiffness_map">Stiffness map</Label>
                        <Input
                            id='TooltipExample'
                            type="file"
                            accept=".csv"
                            name="stiffness_map"
                            // value={state.stiffness_csv}
                            onChange={handleFileChange}
                            placeholder="Enter stiffness map file"
                        
                        />
                        

                        <Tooltip
                        placement="left"
                        isOpen={tooltipOpen}
                        target="TooltipExample"
                        toggle={toggleTooltip}
                        >
                            
                            Create excel file with columns: x and y.<br/>
                            Then save it as *csv[Macintosh][MS-DOC] file.<br/>
                            <br/>
                            Where x is Force [N] and y is Stiffnes [N/mm].<br/>
                            <br/>
                            x;y<br/>
                            -2400;1200<br/>
                            -2000;1000<br/>
                            -1500;850<br/>
                            -800;800<br/>
                            -200;820<br/>
                            0;850<br/>
                            200;800<br/>
                            800;780<br/>
                            1500;800<br/>
                            2000;850<br/>
                            2400;1100<br/>
                            ;<br/>
                            ;<br/>
                            <br/>
                        
                        </Tooltip>


                        </FormGroup>
                        <FormGroup>
                        <Label for="velocity">Velocity [m/s]</Label>
                        <Input
                            type="number"
                            step={'0.1'}
                            name="velocity"
                            value={state.velocity}
                            onChange={handleChange}
                            placeholder="Enter factor"
                        />
                        </FormGroup>
                        {LineChart(state.stiffness_x, state.stiffness_y)}
                        {createdAtDate()}
                        </div>
                        </div>

                    </Form>

                </ModalBody>

                <ModalFooter>
                    {saveBtn()}
                </ModalFooter>
            </Modal>

            {photoGallery ? ( <PhotoGallery 
            toggle={togglePhotoGallery} 
            photos={state.photo_links} />):null
            }
            </>



        )

        
    

}





export default CustomModal