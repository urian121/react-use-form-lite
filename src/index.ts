import { useState } from 'react';

/**
 * Representa el estado general del formulario.
 */
type FormState = Record<string, any>;

/**
 * Opciones adicionales para el registro de un campo.
 * Permite definir el tipo de input para personalizar los handlers.
 */
interface RegisterOptions {
    type?: 'text' | 'select' | 'checkbox' | 'radio' | 'file';
    value?: string;
}

/**
 * Custom hook para manejar formularios en React.
 * @param initialState Estado inicial del formulario.
 */
export function useFormLite(initialState: FormState = {}) {
    const [formData, setFormData] = useState<FormState>({ ...initialState });

    /**
     * Actualiza un campo del formulario.
     * @param key Nombre del campo.
     * @param value Nuevo valor del campo.
     */
    const onChange = (key: string, value: any) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    };

    /**
     * Reinicia el formulario a su estado inicial.
     */
    const resetForm = () => setFormData({ ...initialState });

    // Overloads
    function register(key: string, options: { type: 'checkbox' }): {
        checked: boolean;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    function register(key: string, options: { type: 'select' }): {
        value: any;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    };
    function register(key: string, options: { type: 'radio'; value: string }): {
        name: string;
        value: string;
        checked: boolean;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    function register(key: string, options: { type: 'file' }): {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    function register(key: string, options?: { type?: 'text' }): {
        value: any;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };

    // Implementación real
    function register(key: string, options: RegisterOptions = {}) {
        if (options.type === 'checkbox') {
            const value = options.value;
            if (value !== undefined) {
                // Checkbox múltiple (grupo)
                const currentValues: string[] = formData[key] || [];
                return {
                    checked: currentValues.includes(value),
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const newValues = e.target.checked
                            ? [...currentValues, value]
                            : currentValues.filter((v) => v !== value);
                        onChange(key, newValues);
                    },
                };
            } else {
                // Checkbox único (booleano)
                return {
                    checked: formData[key] || false,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(key, e.target.checked),
                };
            }
        }

        /*if (options.type === 'checkbox') {
            return {
                checked: formData[key] || false,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(key, e.target.checked),
            };
        }*/

        if (options.type === 'select') {
            return {
                value: formData[key] ?? '',
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                    onChange(key, e.target.value),
            };
        }

        if (options.type === 'radio') {
            return {
                name: key,
                value: options.value!,
                checked: formData[key] === options.value,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(key, e.target.value),
            };
        }

        if (options.type === 'file') {
            return {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (!files) return;

                    if (e.target.multiple) {
                        onChange(key, Array.from(files)); // devuelve File[]
                    } else {
                        onChange(key, files[0]); // devuelve un solo File
                    }
                },
            };
        }


        return {
            value: formData[key] ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(key, e.target.value),
        };
    }

    /**
     * Obtiene los campos vacíos del formulario.
     * Retorna un objeto con claves y mensajes de error.
     */
    const getEmptyFields = () => {
        const emptyFields: Record<string, string> = {};
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === null || formData[key] === undefined) {
                emptyFields[key] = 'Este campo está vacío';
            }
        }
        return emptyFields;
    };

    return {
        formData,
        resetForm,
        register,
        getEmptyFields,
    };
}
