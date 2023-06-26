
import { ICustomError, IMongoError } from "../models/errors";
import { ICompanyRegisterModel, IOrganisation, IOrganisationDoc, IOrganisationViewModel, Organisation } from "../models/organisations";
import { IPersonnel, IPersonnelDoc, Personnel } from "../models/personnel";
import { IStaff, Staff } from "../models/staff";

import { IUser, IUserDoc, User } from "../models/user";
import { IProject, Project } from "../models/project";
import { instanceOfTypeIStaff, instanceOfTypeIUser } from "../lib/typeCheck";
import { sendMail } from "../services/emailService";
import { GetAllProjects } from "./projectRepository";

export const GetAllOrganisations= async function():Promise<IOrganisationDoc[] | ICustomError>{
    try{
        const organisation = await Organisation.find({})
        const projects = await Project.find({}) as IProject[];
        
        return organisation as IOrganisationDoc[];
        }catch(e){
            return {code:500, message:"error", object:e} as ICustomError;
        }
}

export const GetOrganisationById= async function(id:string):Promise<IOrganisationViewModel | ICustomError>{
    try{
        const organisation = await Organisation.find({_id:id})
        const org =  organisation[0] as IOrganisation;

        const projects = await Project.find({}) as IProject[];
        
        const viewModel = {
            organisation:org,
            projects: projects
        } as IOrganisationViewModel;


        return viewModel;
        }catch(e){
            return {code:500, message:"error", object:e} as ICustomError;
        }
}

export const GetOrganisationProjects = function(projectIds:string, allProjects: IProject[]):IProject[]{
    
    const projectIdArray = projectIds.split(",");
    const projects = allProjects.filter(x=> projectIdArray.includes(x._id));
    return projects;

}


export const AddOrganisation = async function(_organisation:ICompanyRegisterModel):Promise<IOrganisation | ICustomError> {
    try{
        const organisation = AddOrganisationAndStaff(_organisation);
        return organisation;
        
    }catch(e){
        return {code:500, message:"error", object:e} as ICustomError;
    }
}

export const AddOrganisationAndStaff = async function(_organisation: ICompanyRegisterModel):Promise<IOrganisation | ICustomError  > {
    try{
        const _otp = Math.floor(Math.random() * (99999 -10000 + 1)) + 10000;
        const _user = {
            title:"",
            firstName: _organisation.userName,
            surname:_organisation.userSurname,
            email:_organisation.userEmail,
            password:_organisation.password,
            mobileNumber:_organisation.userNumber,
            type:"2",
            status:0,
            otp:_otp.toString()
           } as IUser
    
           const _staff ={
            position:_organisation.position,
            _shortlist:""
           } as IStaff;
    

           
       const userReq = {..._user} as IUser;       
        const user = User.build(userReq);
        const email = await sendMail(_user.email, `Activate your VICO net profile`, `Your otp is ${_otp.toString()}`, `Activate your VICO net profile, Your otp is <strong> ${_otp.toString()}</strong>` );
        const userResp  = await user.save();

    
        if(!instanceOfTypeIUser(userResp)){
            return {code:500, message:"Failed to add user", object:userResp} as ICustomError
        
        }

        const _userResp = userResp as IUserDoc;

        const organisationPayload ={
            name:_organisation.companyName,
            status:"0",		
            currentPackage:"0",
            renewalDate	:"",	
            mobilePhone:_organisation.companyNumber,	
            _staff:_staff._id,
            _adminStaff:_staff._id
    
           } as IOrganisation;
        const organisation = Organisation.build(organisationPayload);
       
            

        const staffReq = {..._staff, _user: _userResp._id, _organisation:organisation.id}
         
        const staff = Staff.build(staffReq);
        const staffResp = await staff.save();

        if(!instanceOfTypeIStaff(staffResp)){
            return {code:500, message:"Failed to add staff", object:staffResp} as ICustomError
        
        }
        organisation._adminStaff = staff.id;
        organisation._staff =staff.id;
       const _org =  organisation.save()

        return _org;
    }catch(e){ 
        
        return {code:500, message:"Fail;ed to add staff user", object:e} as ICustomError
        // return e as IMongoError;
    }
}


export const UpdateOrganisation = async function(_organisation:IOrganisation):Promise<IOrganisation | ICustomError> {
    try{

        const organisation = Organisation.build(_organisation);
        await organisation.updateOne(organisation);
        return organisation;
    }catch(e){
        return {code:500, message:"error", object:e} as ICustomError;
    }
}



export const AddStaffToOrganisation = async function(_organisation:string, staff :IStaff):Promise<IOrganisation | IMongoError> {
    try{
        const currentOrg = await GetOrganisationById(_organisation) as IOrganisation;
        const currentStaff = currentOrg._staff;
        const newStaff = `${currentStaff},${staff._id}`;

        const newOrg = {...currentOrg, _staff: newStaff} as IOrganisation;
        const organisation = Organisation.build(newOrg);
        await organisation.updateOne(organisation);
        return organisation;
    }catch(e){
        return e as IMongoError;
    }
}



export const AddProjectToOrganisation = async function(_organisation:string, projectId :string):Promise<IOrganisation | IMongoError> {
    try{
        const currentOrg = await GetOrganisationById(_organisation) as IOrganisation;
        const currentProjects = currentOrg._projects;
        const newProjects = `${currentProjects},${projectId}`;

        const newOrg = {...currentOrg, _projects: newProjects} as IOrganisation;
        const organisation = Organisation.build(newOrg);
        await organisation.updateOne(organisation);
        return organisation;
    }catch(e){
        return e as IMongoError;
    }
}




