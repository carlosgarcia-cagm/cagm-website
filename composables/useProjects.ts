import { useI18n } from 'vue-i18n'

export type Project = PortfolioProject

export const useProjects = () => {
  const { tm } = useI18n()

  const projects = computed(() =>
    tm('projects.items') as Project[]
  )

  return {
    projects: projects
  }
}
