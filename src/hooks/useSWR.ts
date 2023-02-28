import type { IKey } from 'swrv/esm/types'
import useSWRV from 'swrv'
import { get } from '@/api/fetcher'

export const useSWR = <Data = any, Error = any>(key: IKey) => {
  return useSWRV<Data, Error>(key, get, {
    revalidateOnFocus: false,
  })
}
