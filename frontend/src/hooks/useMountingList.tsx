import { useEffect, useState} from 'react'
import type { MCType, Config } from '../types'
import axios from 'axios'
import {DRF_ADRESS} from '../data/constants.js'
import { notify_error } from '../utils/basicToasts.js'


export const useMountingComponent = (config : Config, defaultMountingComp: MCType) => {

    const [mountingComp, setMountingComp] = useState<Array<MCType>>([defaultMountingComp, ])


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


    useEffect( () => {
        getMountingList()
    }, [])

    return {mountingComp}

}