import React, { createContext } from 'react';

export const SearchContext = createContext({
	selected: [{}],
	setSelected: () => {},
});
