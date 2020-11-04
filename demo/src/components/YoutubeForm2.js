import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
	name: 'Ocho',
	email: '',
	channel: '',
	comments: '',
	address: '',
	social: {
		facebook: '',
		twitter: '',
	},
	phoneNumbers: ['', ''],
	phNumbers: [''],
};
const savedValues = {
	name: 'Juan',
	email: 'j@example.com',
	channel: 'JNM8',
	comments: 'Welcome',
	address: '123 Street',
	social: {
		facebook: '',
		twitter: '',
	},
	phoneNumbers: ['', ''],
	phNumbers: [''],
};

const onSubmit = (values, onSubmitProps) => {
	console.log('Form Data', values);
	console.log('Submit Props', onSubmitProps);

	//Esperar a la respuesta de la API
	//(...)

	onSubmitProps.setSubmitting(false);
	onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
	name: Yup.string().required('Requerido'),
	email: Yup.string().email('Formato Inválido').required('Requerido'),
	channel: Yup.string().required('Requerido'),
});

const validateComments = value => {
	let error;
	if (!value) {
		error = 'Requerido';
	}
	return error;
};

function YoutubeForm() {
	const [formValues, setFormValues] = useState(null);

	return (
		<>
			<Formik initialValues={formValues || initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
				{formik => {
					console.log('Formik Props', formik);
					return (
						<Form>
							<div className='form-control'>
								<label htmlFor='name'>Name</label>
								<Field type='text' id='name' name='name' placeholder='Nombre de usuario' />
								<ErrorMessage name='name'>
									{errorMsg => {
										return <div className='error'>{errorMsg}</div>;
									}}
								</ErrorMessage>
							</div>
							<div className='form-control'>
								<label htmlFor='email'>Email</label>
								<Field type='email' id='email' name='email' />
								<ErrorMessage name='email' />
							</div>
							<div className='form-control'>
								<label htmlFor='channel'>Channel</label>
								<Field type='text' id='channel' name='channel' />
								<ErrorMessage name='channel' />
							</div>
							<div className='form-control'>
								<label htmlFor='comments'>Comments!</label>
								<Field as='textarea' id='comments' name='comments' validate={validateComments} />
								<ErrorMessage name='comments' component={TextError} />
							</div>
							<div className='form-control'>
								<label htmlFor='address'>Address</label>
								<Field type='text' name='address'>
									{props => {
										// console.log('Field Rendered');
										const { field, form, meta } = props;
										// console.log('Render props:', props);
										return (
											<div>
												<input type='text' id='address' {...field} />
												{meta.touched && meta.error ? <div>{meta.error}</div> : null}
											</div>
										);
									}}
								</Field>
							</div>
							<div className='form-control'>
								<label htmlFor='facebook'>Facebook Profile</label>
								<Field type='text' id='facebook' name='social.facebook' />
								<ErrorMessage name='facebook' />
							</div>
							<div className='form-control'>
								<label htmlFor='twitter'>Twitter Profile</label>
								<Field type='text' id='twitter' name='social.twitter' />
								<ErrorMessage name='twitter' />
							</div>
							<div className='form-control'>
								<label htmlFor='primaryPh'>Teléfono Primario</label>
								<Field type='text' id='primaryPh' name='phoneNumbers[0]' />
								<ErrorMessage name='primaryPh' />
							</div>
							<div className='form-control'>
								<label htmlFor='secondaryPh'>Teléfono Secundario</label>
								<Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
								<ErrorMessage name='secondaryPh' />
							</div>

							<div className='form-control'>
								<label htmlFor='secondaryPh'>Lista de Teléfonos</label>
								<FieldArray name='phNumbers'>
									{fieldArrayProps => {
										const { push, remove, form } = fieldArrayProps;
										const { values } = form;
										const { phNumbers } = values;
										// console.log('form.errors', form.errors);
										// console.log('fieldArrayProps:', fieldArrayProps);
										return (
											<div>
												{phNumbers.map((phNumbers, index) => (
													<div key={index}>
														<Field name={`phNumbers[${index}]`} />

														{index > 0 && (
															<button type='button' onClick={() => remove(index)}>
																-
															</button>
														)}
													</div>
												))}
												<button type='button' onClick={() => push('')}>
													+
												</button>
											</div>
										);
									}}
								</FieldArray>
							</div>
							{/* <button type='button' onClick={() => formik.validateField('comments')}>
								Validate Comments
							</button>
							<button type='button' onClick={() => formik.validateForm()}>
								Validate Form
							</button>
							<button type='button' onClick={() => formik.setFieldTouched('comments')}>
								setFieldTouched
							</button>
							<button
								type='button'
								onClick={() =>
									formik.setTouched({
										name: false,
										email: true,
										channel: true,
										comments: true,
									})
								}
							>
								setTouched
							</button> */}
							<button type='button' onClick={() => setFormValues(savedValues)}>
								Load Saved Data
							</button>

							<button type='reset'>Reset</button>

							<button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
								Submit
							</button>
						</Form>
					);
				}}
			</Formik>
		</>
	);
}

export default YoutubeForm;
