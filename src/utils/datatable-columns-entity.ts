import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'
import AppInputLiveEditStatus from '@/components/AppInputLiveEditStatus.vue'
import { RouterPathEnum } from '@/types/RouterPathEnum'
import { formatDateStrToUserFriendly } from './date-format'
import type { EntityRecordWithRpc } from '@/types/EntityRecordWithRpc'

const headerStyle = 'text-left text-lg text-white hover:text-bg-brand-darker'
export const columns: ColumnDef<EntityRecordWithRpc>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: headerStyle }, 'Name'),
    cell: ({ row }) => {
      // When using render functions, the way we pass children to elements is different than passing them to a custom component.
      // With elements, we can pass them straightaway to the h() function like so:
      // - h("p", "I'm text inside a paragraph tag").
      // - h("p", { class: "example-class" } ,"I'm text inside a paragraph tag").
      //
      // While with custom components, we must pass them as functions:
      // - h(CustomComponent, () => "I'm text inside a custom component").
      // - h(CustomComponent, { class: "example-class" } ,() => "I'm text inside a custom component").
      //
      // You can read more about it in the official docs: https://vuejs.org/guide/extras/render-function#passing-slots
      return h(
        RouterLink,
        {
          to: `${RouterPathEnum.Entities}/${row.original.slug}`,
          class: 'text-left underline block w-full font-medium',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: headerStyle }, 'Due Date'),
    cell: ({ row }) => {
      return h('p', formatDateStrToUserFriendly(row.original.due_date).value)
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: headerStyle }, 'Status'),
    cell: ({ row }) => {
      return h(AppInputLiveEditStatus, {
        modelValue: row.original.status,
        readonly: true,
        showToolTip: false,
        pointer: false,
      })
    },
  },
]
