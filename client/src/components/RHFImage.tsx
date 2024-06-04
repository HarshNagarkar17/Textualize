import React, { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PenLine } from 'lucide-react';

type Props = {
    name: string,
}

const RHFImage = ({ name }: Props) => {
    const { control } = useFormContext();
    const profileImageRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleProfileImageSet = () => {
        if (profileImageRef.current) {
            profileImageRef.current.click();
        }
    }

    console.log({preview})
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange } }) => (
                <div className="w-[90px] relative h-[90px] rounded-full cursor-pointer bg-gray-500 mx-auto" onClick={handleProfileImageSet}>
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center text-white">
                            <PenLine className="" width={'20px'} height={'20px'} />
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                    setPreview(reader.result as string);
                                }
                                reader.readAsDataURL(file)
                                onChange(file)
                            }
                        }}
                        className="hidden"
                        id="profileImage"
                        ref={profileImageRef}
                        accept="image/*"
                    />
                </div>
            )}
        />
    );
}

export default RHFImage;
