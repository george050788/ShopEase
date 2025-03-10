import React from 'react'
import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from 'react-admin'

const CategoryEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='name' />
        <TextInput source='code' />
        <TextInput source='description' />
        <ArrayInput source='categoryTypes'>
          <SimpleFormIterator inline>
            <TextInput source='name' />
            <TextInput source='code' />
            <TextInput source='descriptions' />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  )
}

export default CategoryEdit