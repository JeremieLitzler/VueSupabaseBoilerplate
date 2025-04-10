import type { CacheValidationKeyInfo } from '@/types/CacheValidationInfo'
import type { CacheValidationRefreshRequest } from '@/types/CacheValidationRefreshRequest'
import type { FormDataCreateEntity } from '@/types/FormDataCreateEntity'
import { StoreCacheKey } from '@/types/StoreCacheKeys'
import { timeStampExpired, validateCache } from '@/utils/cache-validation'
import { toISOStringWithTimezone } from '@/utils/date-format'
import {
  allEntitiesQuery,
  createEntityQuery,
  deleteEntityQuery,
  entityWithSubEntitiesBySlugQuery,
  updateEntityQuery,
} from '@/services/supabase-queries'
import type { EntityWithSubEntitiesBySlugType } from '@/services/supabase-queries'
import { type PostgrestError } from '@supabase/supabase-js'
import { useMemoize } from '@vueuse/core'
import type { EntityRecordWithRpc } from '@/types/EntityRecordWithRpc'

export const useEntityStore = defineStore('entity-store', () => {
  const GET_METHODS_EXPIRATION = 900 // 15 min

  const entities = ref<EntityRecordWithRpc[] | null>()
  const entity = ref<EntityWithSubEntitiesBySlugType | null>(null)
  const _entityLastFetchTime = ref<CacheValidationKeyInfo>({})

  const validateCacheEntities = async (forceRefresh: boolean = false) =>
    validateCache<typeof entities, typeof allEntitiesQuery, typeof loadEntities, PostgrestError>({
      key: StoreCacheKey.AllEntities,
      loaderFn: loadEntities,
      query: allEntitiesQuery,
      reference: entities,
      lastFetchInfo: {
        ..._entityLastFetchTime.value[StoreCacheKey.AllEntities],
        forceRefresh,
      },
    })
  const validateCacheEntity = ({ key: slug, forceRefresh }: CacheValidationRefreshRequest) => {
    validateCache<
      typeof entity,
      typeof entityWithSubEntitiesBySlugQuery,
      typeof loadEntity,
      PostgrestError
    >({
      key: slug as string,
      filter: slug,
      loaderFn: loadEntity,
      query: entityWithSubEntitiesBySlugQuery,
      reference: entity,
      lastFetchInfo: {
        ..._entityLastFetchTime.value[slug as string],
        forceRefresh,
      },
    })
  }
  const forceRefreshOnEntities = () => {
    return timeStampExpired({
      timeStamp: _entityLastFetchTime.value[StoreCacheKey.AllEntities].timeStamp,
      invalidateAfterSeconds: GET_METHODS_EXPIRATION,
    })
  }
  const clearCache = () => {
    console.log('called clearCache')
    loadEntities.clear()
    console.log('cleared entities')
    loadEntity.clear()
    console.log('cleared individual entities')
  }
  const loadEntities = useMemoize(async (key: string) => {
    const { data, error, status } = await allEntitiesQuery

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      _entityLastFetchTime.value[StoreCacheKey.AllEntities] = { timeStamp: Date.now() }
    }

    return data
  })
  const getEntities = async () => {
    entities.value = null
    entities.value = await loadEntities(StoreCacheKey.AllEntities)
    validateCacheEntities(forceRefreshOnEntities())
  }
  const loadEntity = useMemoize(async (slug: string) => {
    const { data, error, status } = await entityWithSubEntitiesBySlugQuery(slug)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      _entityLastFetchTime.value[slug] = { timeStamp: Date.now() }
    }

    return data
  })
  const getEntity = async (slug: string, forceRefresh: boolean = false) => {
    entity.value = null
    entity.value = await loadEntity(slug)
    if (!forceRefresh) {
      forceRefresh = timeStampExpired({
        timeStamp: _entityLastFetchTime.value[slug].timeStamp || 0,
        invalidateAfterSeconds: GET_METHODS_EXPIRATION,
      })
    }
    validateCacheEntity({ key: slug, forceRefresh })
  }
  const refreshEntity = async (slug: string) => {
    getEntity(slug, true)
  }
  const createEntity = async (entity: FormDataCreateEntity) => {
    const { error, status } = await createEntityQuery(entity)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    validateCacheEntities(true)
  }

  // TODO > conver to generic as task store use the same logic
  const updateEntity = async () => {
    if (!entity.value) return

    const { id, sub_entities, ...EntityProps } = entity.value
    EntityProps.updated_at = toISOStringWithTimezone(new Date())
    console.log('updateEntity', EntityProps)

    const { count, data, error, status } = await updateEntityQuery(EntityProps, id)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    if (count && count > 1) {
      useErrorStore().setError({ error: Error('Many entities updated...'), customCode: 500 })
    }
    validateCacheEntity({ key: EntityProps.slug, forceRefresh: true })
    // Below replaces "validateCacheEntities(true)" as when the update is done,
    // the list isn't refreshed...
    loadEntities.clear()
  }

  const deleteEntity = async () => {
    if (!entity.value) return

    const { error } = await deleteEntityQuery(entity.value.id)
    if (error) {
      useErrorStore().setError({ error })
    } else {
      console.log('deleteEntity>no error')
    }
    loadEntities.clear()
  }

  return {
    entity,
    entities,
    loadEntity,
    loadEntities,
    clearCache,
    getEntity,
    refreshEntity,
    getEntities,
    createEntity,
    updateEntity,
    deleteEntity,
    validateCacheEntity,
  }
})
