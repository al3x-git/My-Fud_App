import React, { createContext } from 'react';

export const LogsContext = createContext({
	logs: [],
	setLogs: () => {},
});
