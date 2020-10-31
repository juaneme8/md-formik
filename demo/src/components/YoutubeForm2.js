import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

function YoutubeForm() {
	const initialValues = {
		name: '',
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

	const onSubmit = values => {
		console.log('Form Data', values);
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

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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

					<button type='submit'>Submit</button>
				</Form>
			</Formik>
		</>
	);
}

export default YoutubeForm;
