import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";
import Schedules_users_properties from "../../entities/schedules_user_properties.entity";
import AppError from "../../errors/appError";

const listSheduleService = async(propertieId:string)=>{

    const propertiesModel = AppDataSource.getRepository(Properties);
    const chedulesModel = AppDataSource.getRepository(Schedules_users_properties);

    const propertyExist = await propertiesModel.findOneBy({
        id: propertieId,
    });
    if(!propertyExist){
        throw new AppError('Property with invalid id', 404)
    }
    /* const schedules = await propertiesModel.find(
        {
            relations: { schedules_users_properties: true }, 
            where: {id: propertieId}
        }) */

    /* const schedules = await AppDataSource
    .getRepository(Schedules_users_properties)
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.properties = :id", { id: propertieId })
    .getMany() */

    const schedules = await chedulesModel.createQueryBuilder('schedules_users_properties')
    .innerJoinAndSelect('schedules_users_properties.properties', 'properties')
    .innerJoinAndSelect('schedules_users_properties.users', 'users')
    .where('schedules_users_properties.properties = :id_properties', {id_properties: propertieId})
    .select(['users.name as user', 
            'schedules_users_properties.date as date', 
            'schedules_users_properties.hour as hour', 
            'schedules_users_properties.id as id'])
    .getRawMany()

   /*  const technologies = await projectRepository.createQueryBuilder('projects').
    innerJoinAndSelect('projects.technologiesToProjects', 'technologiesToProjects').
    innerJoinAndSelect('technologiesToProjects.technology', 'technologies').
    where('projects.id = :id_projeto', {id_projeto: projectId}).
    select(['projects.id as id_projeto', 'technologiesToProjects', 'technologies']).
    getRawMany() */

    return ({schedules: schedules})
}

export default listSheduleService