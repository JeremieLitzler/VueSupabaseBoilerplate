import type { CacheValidationKeyInfo } from '@/types/CacheValidationInfo'
import type { CacheValidationRefreshRequest } from '@/types/CacheValidationRefreshRequest'
import type { FormDataCreateSubEntity } from '@/types/FormDataCreateSubEntity'
import { timeStampExpired, validateCache } from '@/utils/cache-validation'
import { toISOStringWithTimezone } from '@/utils/date-format'
import {
  createSubEntityQuery,
  deleteSubEntityQuery,
  subEntityWithParentQuery,
  updateSubEntityQuery,
  type SubEntityWithParentType,
} from '@/services/supabase-queries'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMemoize } from '@vueuse/core'

export const useSubEntityStore = defineStore('SubEntitys-store', () => {
  const GET_METHODS_EXPIRATION = 900 // 15 min
  const subEntity = ref<SubEntityWithParentType | null>(null)
  const SubEntityLastFetchTime = ref<CacheValidationKeyInfo>({})

  const getSubEntityKey = (id: string) => `subEntity-id-${id}`

  const validateCacheSubEntity = ({ key: id, forceRefresh }: CacheValidationRefreshRequest) => {
    validateCache<
      typeof subEntity,
      typeof subEntityWithParentQuery,
      typeof loadSubEntity,
      PostgrestError
    >({
      key: getSubEntityKey(id as string),
      filter: id,
      reference: subEntity,
      query: subEntityWithParentQuery,
      loaderFn: loadSubEntity,
      lastFetchInfo: {
        ...SubEntityLastFetchTime.value[getSubEntityKey(id as string)],
        forceRefresh,
      },
    })
  }
  const clearCache = () => {
    console.log('cleared SubEntitys')
    loadSubEntity.clear()
    console.log('cleared individual SubEntitys')
  }

  const loadSubEntity = useMemoize(
    async (id: string) => {
      const { data, error, status } = await subEntityWithParentQuery(id)

      if (error) {
        useErrorStore().setError({ error, customCode: status })
      } else {
        SubEntityLastFetchTime.value[getSubEntityKey(id)] = { timeStamp: Date.now() }
      }

      return data
    },
    {
      // TODO > see https://vueuse.org/core/useMemoize/#resolving-cache-key
      getKey: (id) => getSubEntityKey(id),
    },
  )
  const getSubEntity = async (id: string) => {
    subEntity.value = null
    subEntity.value = await loadSubEntity(id)
    const forceRefresh = timeStampExpired({
      timeStamp: SubEntityLastFetchTime.value[getSubEntityKey(id)].timeStamp,
      invalidateAfterSeconds: GET_METHODS_EXPIRATION,
    })
    validateCacheSubEntity({ key: id, forceRefresh })
  }
  const createSubEntity = async (subEntity: FormDataCreateSubEntity) => {
    const { error, status } = await createSubEntityQuery(subEntity)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
  }
  const updateSubEntity = async () => {
    if (!subEntity.value) return

    const { id, entities, ...SubEntityProps } = subEntity.value
    SubEntityProps.updated_at = toISOStringWithTimezone(new Date())
    const { count, data, error, status } = await updateSubEntityQuery(SubEntityProps, id)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    if (count && count > 1) {
      useErrorStore().setError({ error: Error('Many projects updated...'), customCode: 500 })
    }
    validateCacheSubEntity({ key: id, forceRefresh: true })
  }
  const deleteSubEntity = async () => {
    if (!subEntity.value) return

    const { error } = await deleteSubEntityQuery(subEntity.value.id)
    if (error) {
      useErrorStore().setError({ error })
    } else {
      console.log('deleteSubEntity>no error')
    }
  }

  return {
    subEntity,
    loadSubEntity,
    clearCache,
    getSubEntity,
    createSubEntity,
    updateSubEntity,
    deleteSubEntity,
  }
})
