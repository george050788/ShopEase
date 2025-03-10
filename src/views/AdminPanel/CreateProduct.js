import React from 'react'
import { ArrayInput, BooleanInput, Create, ImageField, ImageInput, NumberInput, ReferenceInput, SelectInput, SimpleForm, SimpleFormIterator, TextInput, required } from 'react-admin'
import CategoryTypeInput from './Category/CategoryTypeInput'
import { colorSelector } from '../../components/Filters/ColorsFilter'

const sizeSelector = ['S', 'M', 'L', 'XL', 'XXL'
]

const CreateProduct = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='name' validate={[required()]} />
        <TextInput source='slug' validate={[required()]} />
        <TextInput source='description' validate={[required()]} />
        <NumberInput source='price' validate={[required()]} />
        <TextInput source='brand' validate={[required()]} />

        <ReferenceInput source='categoryId' reference='category' />
        <CategoryTypeInput />

        <ImageInput source='thumbnail' label={'thumbnail'} />
        <ImageField source='src' title='title' />

        <ArrayInput source='variants'>
          <SimpleFormIterator inline>
            <SelectInput source='color' choices={Object.keys(colorSelector)} resettable />
            <SelectInput source='size' choices={sizeSelector} />
            <NumberInput source='Stock quantity' />
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput source='productResources'>
          <SimpleFormIterator inline>
            <TextInput source='name' validate={[required()]} />

            <ImageInput source='url' label={'Product Image'} />
            <ImageField source='src' title='title' />
            <SelectInput source='type' choices={['image']} />
            <BooleanInput source='isPrimary' />
          </SimpleFormIterator>
        </ArrayInput>

        <NumberInput source='rating' />
        <BooleanInput source='newArrival' />
      </SimpleForm>
    </Create>
  )
}

export default CreateProduct