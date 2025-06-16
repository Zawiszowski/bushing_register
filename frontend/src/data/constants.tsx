
// can be empty
let DRF_ADRESS = ''


if (window.location.origin === "http://localhost:3000") {
    DRF_ADRESS = 'http://127.0.0.1:8001' 
}else if(window.location.origin === "http://10.66.98.30:3000"){
    DRF_ADRESS = 'http://10.66.98.30:8000'

}else if(window.location.origin === "http://10.66.108.43:3000"){
    DRF_ADRESS = 'http://10.66.108.43:8000'

}else if(window.location.origin === "http://10.66.103.23:3000"){
    DRF_ADRESS = 'http://10.66.103.23:8000'

} else {
    //prod
    DRF_ADRESS = window.location.origin;

}


export { DRF_ADRESS}



