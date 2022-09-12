import React, { createContext } from 'react';

export const RegisterContext = createContext({
	diabetesType: null,
	setDiabetesType: () => {},
	medication: null,
	setMedication: () => {},
	age: null,
	setAge: () => {},
	weight: null,
	setWeight: () => {},
	height: null,
	setHeight: () => {},
	sex: null,
	setSex: () => {},
});
