import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'

const CategoryList = () => {
  return (
    <List>
      <Datagrid>
        <TextField disabled source='id' />
        <TextField source='name' />
        <TextField source='code' />
        <TextField source='description' />
      </Datagrid>
    </List>
  )
}

export default CategoryList