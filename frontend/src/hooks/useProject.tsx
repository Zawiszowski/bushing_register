import { useEffect, useState } from 'react'
import axios from 'axios'
import { notify_error } from '../utils/basicToasts'
import { DRF_ADRESS } from '../data/constants'
import type { Config, ProjectType } from '../types'

export const useProject = (clientId: number, config : Config) => {

    const defaultProject : ProjectType= {
      id: -1,
      name: '',
      client: -1
    }

    const [projects, setProjects] = useState<Array<ProjectType>>([defaultProject, ])


    useEffect( () => {
        axios.get(DRF_ADRESS + `/api/project/filter/?client=${clientId}`, config)
        .then(response => {
          setProjects(response.data ?? [defaultProject, ])
        })
        .catch(error => {
          setProjects([defaultProject, ])
          notify_error(error)
        })
  
      }, [clientId])

    return {projects}
}

