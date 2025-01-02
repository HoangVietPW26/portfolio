import {defineField, defineType} from 'sanity'

export const workExperiencesType = defineType({
    name:'workExperiences',
    title:'Work Experiences',
    type:'document',
    fields: defineField([
           {name:'name',
               title:'name',
               type:'string'
            },
            {
                name:'company',
                title:'Company',
                type:'string'
            },
            {
                name:'desc',
                title:'Desc',
                type:'string'
            }
    ])
})