
import { 
    MyModalBody,
    MyModal, 

    BottomButtonDiv,
} from './PhotoGallery.styles';


import{
    ModalHeader,   
} from 'reactstrap';

interface Props {
    toggle: () => void,
    photos: Array<{file: string}>,

}

let PhotoGallery = (props : Props) => {

    const {toggle, photos} = props

    // const closeBtn = (
    //     <button className="close" onClick={toggle} type="button">
    //       &times;
    //     </button>
    //   );




        return (
            
            <MyModal 
            isOpen={true} 
            toggle={toggle} 
            centered={true} 
            backdrop={true} 
            
            >
                
                <ModalHeader toggle={toggle} className='m-1'>

                    Photo gallery
                </ModalHeader>

                <MyModalBody 
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.2rem',
                        padding: '0.5rem',
                    }}
          
                >
                    {photos.map((link, index : number) => (
                        <img key={index} src={link.file} alt={`Photo ${index + 1}`} style={{width: '100%'}}/>
                    ))}



                    <BottomButtonDiv >

                    </BottomButtonDiv>


                </MyModalBody>
                           
            </MyModal>
        )
}

export default PhotoGallery;