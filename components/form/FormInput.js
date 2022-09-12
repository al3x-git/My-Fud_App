import { TextInput, HelperText } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const FormInput = ({
	name,
	type,
	label,
	mode = 'outlined',
	control,
	errors,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Controller
			control={control}
			render={({ field: { onChange, onBlur, value } }) => (
				<View style={styles.input}>
					<TextInput
						{...props}
						label={label}
						mode={mode}
						onBlur={onBlur}
						theme={{ roundness: 10 }}
						outlineColor="#fff"
						style={{ backgroundColor: '#fff' }}
						activeOutlineColor="#16A31C"
						onChangeText={(value) => onChange(value)}
						value={value}
						error={errors?.name ? true : false}
						left={
							type === 'email' ? (
								<TextInput.Icon icon="email" />
							) : undefined
						}
						right={
							type === 'password' ? (
								<TextInput.Icon
									icon={showPassword ? 'eye' : 'eye-off'}
									onPress={() =>
										setShowPassword(!showPassword)
									}
								/>
							) : undefined
						}
						secureTextEntry={
							type === 'password' ? !showPassword : undefined
						}
					/>
					{errors[name] && (
						<HelperText type="error">
							{errors[name].message}
						</HelperText>
					)}
				</View>
			)}
			name={name}
		/>
	);
};

export default FormInput;

const styles = StyleSheet.create({
	input: {
		marginBottom: 15,
	},
});
