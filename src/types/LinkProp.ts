import type { SideBarActionsEnum } from './SideBarActionsEnum'

export interface LinkProp {
  to?: string
  action?: SideBarActionsEnum
  icon: string
  label: string
}