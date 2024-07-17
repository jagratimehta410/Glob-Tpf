import { Project } from "./project";
import { ProjectImage } from "./project-image";

export interface ProjectGallary {
    project: Project,
    projectImages: ProjectImage[]
}
