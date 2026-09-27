import { useI18n } from 'vue-i18n'

export type Project = PortfolioProject

export const useProjects = () => {
  const { tm, rt } = useI18n()

  const projects = computed(() =>
    (tm('projects.items') as Project[]).map(proj => ({
      id: rt(proj.id),
      title: rt(proj.title),
      description: rt(proj.description),
      projectUrl: proj.projectUrl != null ? rt(proj.projectUrl as unknown as string) : undefined,
      githubRepos: proj.githubRepos
        ? (proj.githubRepos as unknown as { name: unknown; url: unknown }[]).map(repo => ({
            name: rt(repo.name as string),
            url: rt(repo.url as string)
          }))
        : undefined,
      technologies: (proj.technologies as unknown[]).map(t => rt(t as string)),
      isPublic: proj.isPublic,
      personal: proj.personal,
      logo: proj.logo != null ? rt(proj.logo as unknown as string) : undefined
    }))
  )

  return {
    projects: projects
  }
}
