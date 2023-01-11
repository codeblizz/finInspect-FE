import React from 'react';
import { formType } from '../../types/form.type';

function Form({ className, children, onSubmit }: formType) {
  return <form onSubmit={onSubmit} className={className}>{children}</form>;
}

export default Form;
