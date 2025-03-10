import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'

const EditProduct = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled label='Id' source='id' />
        <TextInput label='Name' source='name' />
        <TextInput label='Description' source='description' />
        <TextInput label='Price' source='price' />
        <TextInput label='Slug' source='slug' />
        <TextInput label='Brand' source='brand' />
      </SimpleForm>
    </Edit>
  )
}

export default EditProduct