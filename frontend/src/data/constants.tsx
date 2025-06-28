
// can be empty
let DRF_ADRESS = ''


if (window.location.origin === "http://localhost:3000") {
    DRF_ADRESS = 'http://127.0.0.1:8001' 
}else if(window.location.origin === "http://localhost:5173"){
    DRF_ADRESS = 'http://127.0.0.1:8000'

}else if(window.location.origin === "http://10.66.108.43:3000"){
    DRF_ADRESS = 'http://10.66.108.43:8000'

}else if(window.location.origin === "http://10.66.103.23:3000"){
    DRF_ADRESS = 'http://10.66.103.23:8000'

} else {
    //prod
    DRF_ADRESS = window.location.origin;

}

const PERMISSIONS = {
    CAN_CHANGE_TM: "Can change bushing register",
    CAN_ADD_TM: "Can add bushing register",
    CAN_DELETE_TM: "Can delete bushing register",

}


export { DRF_ADRESS, PERMISSIONS}



