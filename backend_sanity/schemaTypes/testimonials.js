import {defineField, defineType} from 'sanity'

export const testimonialsType =  defineType({
    name: 'testimonials',
    title: 'Testimonials',
    type: 'document',
    fields: defineField([
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'company',
            title: 'Company',
            type: 'string'
        },
        {
            name: 'imageURL',
            title: 'ImgURL',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'feedback',
            title: 'Feedback',
            type: 'string'
        }
    ])
})