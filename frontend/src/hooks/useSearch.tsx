import { useEffect, useState } from 'react'
import axios from 'axios'
import { DRF_ADRESS } from '../data/constants'

import type { RegisterType } from '../types'


export const useSearch = (query : string, pageNumber :number, config :object, refresh :boolean) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [list, setList] = useState<Array<RegisterType>>([])
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {
        setList([])
    }, [query, refresh])

    useEffect(() => {
        setLoading(false)
        setError(false)


        axios.get(DRF_ADRESS + `/api/bushing_register/?${query}&page=${pageNumber}`, config) //query
        .then(response => {
          const data = response.data;

          setList(prevItems => 
          {
            let newData  = data.results.map((item : any) => {
    
              if (!item?.photo_links){
                item.photo_links = JSON.parse(JSON.stringify(item.photos ?? [])) 
                item.photos = null}
              return item
            })
            const combined = [...prevItems, ...newData]

            const unique = combined.filter( (item, index, self) => (
              index === self.findIndex((secondItem) => secondItem.id ===item.id)
            ))

            return [... new Set([...unique])]
          } )
          setHasMore(response.data.next ? true : false)

          setLoading(false)
          

        })
        .catch(error => {
            if (axios.isCancel(error)) return
            setError(true)
        });


        // return () => cancel()
    }, [query, pageNumber, refresh])
    




    return {loading, error, list, hasMore}
}

