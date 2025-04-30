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
    type?: 'text' | 'select' | 'checkbox';
}

/**
 * Custom hook para manejar formularios en React.
 * @param initialState Estado inicial del formulario.
 */
export function useForm(initialState: FormState = {}) {
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

    /**
     * Registra un campo en el formulario.
     * Devuelve props compatibles con inputs HTML.
     * @param key Nombre del campo.
     * @param options Opciones adicionales (tipo de input).
     */
    const register = (key: string, options: RegisterOptions = {}) => {
        if (options.type === 'checkbox') {
            return {
                checked: formData[key] || false,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(key, e.target.checked),
            };
        }

        // text, select, etc.
        return {
            value: formData[key] ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(key, e.target.value),
        };
    };

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
        onChange,
        resetForm,
        register,
        getEmptyFields,
    };
}
