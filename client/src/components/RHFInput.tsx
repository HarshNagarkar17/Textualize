import { Controller, useFormContext } from 'react-hook-form';
import { Input } from './ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type Props = {
    name: string,
    type?: string,
    placeholder?: string
}

const RHFInput = ({ name, type, placeholder }: Props) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                <>
                    <div className='relative'>
                        <Input
                            value={value}
                            type={type === 'password' && !showPassword ? 'password' : 'text'}
                            placeholder={placeholder}
                            onChange={(e) => {
                                onChange(e.target.value);
                                if (isTouched) onBlur();
                            }}
                            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                        />
                        {type === "password" && (
                            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={toggleShowPassword}>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </div>
                        )}
                    </div>
                    {error && (
                        <div>
                            <p className='text-left text-red-700'>{error.message}</p>
                        </div>
                    )}
                </>
            )}
        />
    );
}

export default RHFInput;
