import { useEffect, useState, useRef, useCallback} from 'react'
import useDeboundce from '../../hooks/useDebounce.js'
import Modal from '../../components/Modal/Modal.tsx'
import axios from 'axios'

import ModalAccept from '../../components/ModalAccept/ModalAccept.tsx'
import { notify_error, notify_success, validation_info_error } from '../../utils/basicToasts.js'

import { useSearch } from '../../hooks/useSearch.tsx'
import {
    Span,
    InnerContainer,
    WrapperContainer,
    RegisterSection,
    SpanWrapper,
    
}from './register.styles.tsx'; 

import { Context, EditBtn, DeleteBtn, AddBtn,  } from '../../styles/Generic.styles.tsx'

import {
  FormGroup,
  FormText,
  Input,

} from 'reactstrap';

import { useAuthContext } from '../../context/AuthContext.tsx'
import {DRF_ADRESS, PERMISSIONS} from '../../data/constants.js'

import type { RegisterType, ClientType, ProjectType, ValidateRegister, MCType   } from '../../types/index.tsx'
import { HeroSection, HeroTitle } from '../Home/home.styles.tsx'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const defaultProject : ProjectType = {
    id: -1,
    client: -1,
    name: '',
}
const defaultClient : ClientType = {
    id: -1,
    name: '',

}

const defaultMountingComp : MCType = {
    id: -1,
    name: '',

}

const defaultRegister : RegisterType = {
    id: -1,
    custom_pn: "",
    client_pn: "",
    decommissioned: false,
    storage_locker:"",
    velocity: "",
    axle: '',
    stiffness_x:  [-2400,-2000,-1500,-800,-200,0,200,800,1500,2000,2400],
    stiffness_y: [1,1,1,1,1,1,1,1,1,1,1],//[1200,1000,850,800,820,850,800,780,800,850,1100],
    post_date: "",
    photo_links: [],
    project: defaultProject, //{id: null, name: null, client: null},,
    project_id: -1,
    created_at: '',
    updated_at: '',
}


const defaultFalseValidate : ValidateRegister = {
    client: false,
    mountingComp: false,
    project_id: false,
    axle: true,
    custom_pn: false,
    client_pn: false,
    storage_locker: false,
    photos: false,
    custom_pn_msg: '',
    photos_msg: ''
  }
  const defaultTrueValidate : ValidateRegister = {
    client: true,
    mountingComp: true,
    project_id: true,
    axle: true,
    custom_pn: true,
    client_pn: true,
    storage_locker: true,
    photos: true,
    custom_pn_msg: '',
    photos_msg: '',
  }

const BushingRegister = () => {
  let {user, config} = useAuthContext();
  

  const [modal, setModal] = useState(false)
  const [detail, setDetail] = useState(false)
  const [acceptDelete, setAcceptDelete] = useState(false)
  const [viewSelector, setViewSelector] = useState('i_use') //: 'i_use',// warehous, i_use, o_use
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDeboundce(search, 500)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [validate, setValidate] = useState<ValidateRegister>(defaultFalseValidate);
  const [pageNumber, setPageNumber] = useState(1)
  const observer = useRef<any>('')
  const [query, setQuery] = useState('decommissioned=false&search=' + debouncedSearch) //  'i_use' --- > 'decommissioned=false&search=' + debouncedSearch
  const [clients, setClients] = useState<Array<ClientType>>([defaultClient, ])
  const [mountingComp, setMountingComp] = useState<Array<MCType>>([defaultMountingComp, ])
  
  const {loading, error, list, hasMore} = useSearch(query, pageNumber, config, refresh)
  let [activeItem, setActiveItem] = useState<RegisterType>(
    defaultRegister
      )

  const toggleRefresh = () => {
    setRefresh(!refresh)
    setPageNumber(1)
  }

  


    let displayCompleted = (status : string ) =>{
        
        switch (status) {
            case 'warehouse':
              setViewSelector("warehouse")
              break;
               
            case 'i_use':
              setViewSelector("i_use")
              break;
            
                
            case 'o_use':
              setViewSelector("o_use")
              break;

               
                
        }

    }
  
    let renderTabList = () => {
      return (
  
          <SpanWrapper>

            <div className='col' style={{marginBlock: '1rem'}} > 
              <Span
                  onClick={() => displayCompleted('o_use')}
                  className={viewSelector ==='o_use' ? "active" : "" }>
                  OUT OF USE
              </Span>
            </div>
            <div className='col ' style={{marginBlock: '1rem'}}> 
              <Span
                  onClick={() => displayCompleted('i_use')}
                  className={viewSelector ==='i_use' ? "active" : "" }>
                  IN USE
              </Span>
            </div>
            <div className='col' style={{marginBlock: '1rem'}}> 
              <Span
                  onClick={() => displayCompleted('warehouse')}
                  className={viewSelector === 'warehouse' ? "active": ""}>
                  WAREHOUSE
              </Span>
            </div>

          </SpanWrapper>
  
        
  

      )
    }
    const lastItemRef = useCallback(
      (node : any) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1)
          }
        });
        if (node) observer.current.observe(node);
      },
      [loading, hasMore]
    );

    const checkCustomPn = (custom_pn : string) => {

      axios.get(DRF_ADRESS + `/api/bushing_register/?custom_pn=${custom_pn}`, config) //query
      .then(response => {
        const data = response.data.results;
        if (data.length > 0){
          setValidate({...validate, custom_pn: false, custom_pn_msg: 'PN is already taken.'})
        } else{

          if(custom_pn[3] !== ' ' && custom_pn[5] !== ' '){
            setValidate({...validate, custom_pn: false, custom_pn_msg: 'Check format: XXX XX '})
          }else{
            setValidate({...validate, custom_pn: true, custom_pn_msg: 'All is good!'})
          }
          
        }

      })
      .catch(_ => {
        notify_error("something went wrong")
      });
    }

    // const ClientNames = (item) => (

    //   <div className='row'>

    //   <div className='col'> 
    //   CLIENT: 
    //   </div>
    //   <div className='col'> 
    //   <b>{item.project ? clients.find(client => client.id === item.project?.client)?.name : "NONE"}</b>
    //   </div>
    
    // </div>
      

    // )


    const Row = (item : RegisterType, ref: any) => (
  
        <WrapperContainer
        hasPhotos={item?.photo_links?.length > 0 ? true: false}
        key={item.id}
        className='row'
        // style={{...WrapperContainer, backgroundColor: item.photo_links.length > 0 ? 'rgb(231, 196, 196)' : 'rgb(233, 231, 231)'}}
        ref={ref}
        >
          
          <div
            className={`col `}
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
            onClick={() => showItem(item)}
          >




            <div className='row'>

              <div className='col'> 
              CLIENT: 
              </div>
              <div className='col'> 
                <b>{item.project ? clients.find(client => client.id === item.project?.client)?.name.toUpperCase() : "NONE"}</b>
              </div>
    
            </div>
          
            
     

            <div className='row'>

              <div className='col'> 
              PROJECT: 
              </div>
              <div className='col'> 
              <b>{item?.project?.name.toUpperCase() ?? "NONE"}</b>
              </div>
            
            </div>

            <div className='row'>

              <div className='col'> 
              CUSTOM PN: 
              </div>
              <div className='col'> 
              <b>{item.custom_pn?.toUpperCase()}</b>
              </div>
            </div>
            
          </div>
          <div 
            className='col ' 
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
            onClick={() => showItem(item)}
          >
            <div className='row'>

              <div className='col'> 
              CLIENT PN: 
              </div>
              <div className='col'> 
              {item.client_pn?.toUpperCase()}
              </div>
             
            </div>

            <div className='row'>

              <div className='col'> 
              storage_locker: 
              </div>
              <div className='col'> 
              {item.storage_locker.toUpperCase()}
              </div>
             
            </div>
            <div className='row'>

              <div className='col'> 
              DATE: 
              </div>
              <div className='col'> 
              {item.updated_at.split('T')[0]}
              </div>
              
             
            </div>

          </div>

          
            {renderControlButtons(item)}

       
        
      </WrapperContainer>
      


    )

    const InfoRow = (info : string) => (
      <WrapperContainer
      className='row  d-flex justify-content-between align-items-center'
      hasPhotos={false}
      >
        
        <InnerContainer>
    
          <b>{info}</b>
  
        </InnerContainer>
      
    </WrapperContainer>
    )

    const renderBushingList = () => {
      return (
        <div >
          {list?.map((item, index) => {
              if (list.length === index + 1){
                return Row(item, lastItemRef)
              }else{
                
                return Row(item, null)
              }
            })
          }
        {loading && InfoRow('Loading ...')}
        {error && InfoRow('Error')}
        {list.length === 0 && InfoRow('NO RESULTS')}
        </div>
      )
    }
   
    
    

    const renderControlButtons = (item : RegisterType) =>{
      if(user?.permissions.includes(PERMISSIONS.CAN_CHANGE_TM)){
        
        return(
        <div className='col' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <EditBtn  
            disabled={!user?.permissions.includes(PERMISSIONS.CAN_CHANGE_TM)}
            onClick={() => editItem(item)}
            style={{width: '100%'}}
            > 
            Edit </EditBtn>
          <DeleteBtn  
            hidden={!user?.permissions.includes(PERMISSIONS.CAN_DELETE_TM)}
            onClick={() => acceptanceWIndow(item)} 
            style={{width: '100%'}}
            > 
            Delete </DeleteBtn>
        </div>
      )}else{
        return(
        <>

        </>
        )
      }
  }
  
  
    let toggle = () => {

      setModal(!modal)
    };

    let toggleDetail = () => {

      setDetail(!detail)
    }

    let toggleAcceptance = () => {

      setAcceptDelete(!acceptDelete)
    }
  
    let handleSubmit = (item : RegisterType) => {

      
      let formDataItem = new FormData()

      Object.entries(item).forEach( ([key, value], _) =>{
        if(value === null || value === -1 || key==='photo_links' || key === 'project'){
  
        }else if(Array.isArray(value)){
    
          formDataItem.append(key, JSON.stringify(value))
        }else if(key === 'photos'){
          for(let i = 0; i < value.length; i++){
          formDataItem.append(key, value[i])}
        }
        else{
          formDataItem.append(key, value)
        }
      })
      

      if (item.id !== -1) {
        axios
          .put(DRF_ADRESS + `/api/bushing_register/${item.id}/`, formDataItem, config)
          .then(_ => {

            toggleRefresh()
            toggle();
            
            notify_success('ok')
            
          })
          .catch(res => validation_info_error(res))
          
      }else{
        axios
          .post( DRF_ADRESS+ "/api/bushing_register/", formDataItem, config)
          .then(_ => {

            toggleRefresh()

            toggle();

            notify_success('ok')
            
          })
          .catch(res => validation_info_error(res))}
    };
  
    let handleDelete = (item : RegisterType) => {
      axios
      .delete(DRF_ADRESS + `/api/bushing_register/${item.id}/`,  config)
      .then(_ => {

        toggleRefresh()
        toggleAcceptance()

        notify_success('ok')
      })
      .catch(_ => notify_error('something went wrong'))
    };
  
    let createItem = () => {

      setActiveItem(defaultRegister)
      setValidate(defaultFalseValidate)
      setModal(!modal)

    };

    let showItem = (item : RegisterType) => {

      setActiveItem(item)
      setDetail(!detail)

    };
  
    let editItem = (item : RegisterType)=> {
      setActiveItem(item)
      setValidate(defaultTrueValidate)
      setModal(!modal)
    }
    let acceptanceWIndow = (item : RegisterType) => {
      setActiveItem(item)
      setAcceptDelete(!acceptDelete)
    }



    let renderAddBtnButton =() =>{
      
        if (user?.permissions.includes(PERMISSIONS.CAN_ADD_TM)){
        return (
          <>
          <AddBtn 
          disabled={!user?.permissions.includes(PERMISSIONS.CAN_ADD_TM)} 
          onClick={createItem}>Add Bushing</AddBtn>
          </>
        )}
    }

    const getClientList = () => {

      axios.get(DRF_ADRESS + `/api/client/`, config)
      .then(response => {

        setClients(response.data ?? [])
      })
      .catch(error => {
        setClients([])
        notify_error(error)
      })

    }

    const getMountingList = () => {

      axios.get(DRF_ADRESS + `/api/mounting_component/`, config)
      .then(response => {

        setMountingComp(response.data ?? [])
      })
      .catch(error => {
        setMountingComp([])
        notify_error(error)
      })

    }


    
    useEffect(() =>{


      switch (viewSelector){
        case 'i_use':
          setQuery('decommissioned=false&search=' + debouncedSearch)
          break
        case 'o_use':
          setQuery(`decommissioned=true&search=${debouncedSearch}`)
          break
        case 'warehouse':
          setQuery(`search=${debouncedSearch}`)
          break
        default:
          break
      }
      setPageNumber(1)

    },[debouncedSearch, viewSelector])

    useEffect( () => {
      getClientList()
      getMountingList()
    }, [])



    return (
    <Context >


      <HeroSection> 
        <HeroTitle> Bushin registry management </HeroTitle>
      </HeroSection>

        <div className="col-md-9  mx-auto " style={{marginBottom: '4rem'}}>
          <RegisterSection>
            <div style={{textAlign: 'center'}}>
            <a style={{fontSize: '20px'}}>Welcome to the Bushing List!</a><br/>
            <hr></hr>

            Here you will find a comprehensive selection of bushings for car's suspension, designed to enhance your vehicle's performance and comfort. <br/>
            Browse through our list to find the perfect fit for your needs.<br/>
            This is a complete overview of our bushings, where we track stiffness, location, and condition using photos.

            </div>

        
              <div className='row m-0'>
               
                {renderAddBtnButton()}   
                
                <FormGroup style={{marginBlock: '2rem'}} >   
                  <Input
                        
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />
                  <FormText>
                    Enter search phrase to filter the list. Phrase will be search through all fields.
                  </FormText>
                </FormGroup>

              
              </div>
       

           
            <div>
            {renderTabList()}</div>

            <hr style={{marginBlock: '3rem'}}></hr>
            
            {renderBushingList()}

          </RegisterSection>
        </div>
      


      


      {modal ? (
        <Modal 
          activeItem={activeItem} 
          clients={clients}
          mountingComp={mountingComp}
          config={config}
          toggle={toggle}
          onSave={handleSubmit}
          checkCustomPn={checkCustomPn}
          validate={validate}
          setValidate={setValidate}
          readOnly={false}
          ></Modal>

      ): null}

        {detail ? (
        <Modal 
          activeItem={activeItem} 
          clients={clients}
          mountingComp={mountingComp}
          config={config}
          toggle={toggleDetail}
          onSave={() => {}}
          checkCustomPn={checkCustomPn}
          validate={validate}
          setValidate={setValidate}
          readOnly={true}
          ></Modal>

      ): null}

        {acceptDelete ? (
        <ModalAccept
        activeItem={activeItem}
          
          toggle={toggleAcceptance}
          onDelete={handleDelete}></ModalAccept>

        ): null}


        
    </Context>
  
  
  
  
    );

  // }
  
};
  
export default BushingRegister;
