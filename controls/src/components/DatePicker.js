import React from 'react';
import DateView from 'react-datepicker';
import { Field, errorMessage, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import TextError from './TextError';

function DatePicker({ label, name, ...rest }) {
	return (
		<div className='form-control'>
			<label httpFor={name}>{label}</label>
			<Field name={name}>
				{({ form, field }) => {
					const { setFieldValue } = form;
					const { value } = field;
					return <DateView id={name} {...field} selected={value} onChange={value => setFieldValue(name, value)} />;
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
}

export default DatePicker;
