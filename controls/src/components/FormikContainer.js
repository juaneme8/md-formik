import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

function FormikContainer() {
	const dropdownOptions = [
		{ key: 'Select an option', value: '' },
		{ key: 'Option 1', value: 'option1' },
		{ key: 'Option 2', value: 'option2' },
		{ key: 'Option 3', value: 'option3' },
	];
	const radioOptions = [
		{ key: 'Option 1', value: 'rOption1' },
		{ key: 'Option 2', value: 'rOption2' },
		{ key: 'Option 3', value: 'rOption3' },
	];
	const checkboxOptions = [
		{ key: 'Option 1', value: 'cOption1' },
		{ key: 'Option 2', value: 'cOption2' },
		{ key: 'Option 3', value: 'cOption3' },
	];
	const initialValues = { email: '', description: '', selectOption: '', radioOption: '', checkboxOption: [] };
	const validationSchema = Yup.object({
		email: Yup.string().email('Formato Inválido').required('Requerido'),
		description: Yup.string().required('Requerido'),
		selectOption: Yup.string().required('Requerido'),
		radioOption: Yup.string().required('Requerido'),
		checkboxOption: Yup.array().required('Requerido'),
	});
	const onSubmit = values => console.log('Form Data', values);
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{formik => (
				<Form>
					<FormikControl control='input' type='email' label='Email' name='email' />
					<FormikControl control='textarea' label='Description' name='description' />
					<FormikControl control='select' label='Select a Topic' name='selectOption' options={dropdownOptions} />
					<FormikControl control='radio' label='Radio Topic' name='radioOption' options={radioOptions} />
					<FormikControl control='checkbox' label='Checkbox Topics' name='checkboxOption' options={checkboxOptions} />

					<button type='submit'>Submit</button>
				</Form>
			)}
		</Formik>
	);
}

export default FormikContainer;
