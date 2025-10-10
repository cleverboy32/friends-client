import React, { useMemo, useState } from 'react';
import Upload from '@/components/Upload';
import Modal from '@/components/Modal';
import { updateUser } from '@/api/user';
import Button from '@/components/button';
import useUserStore from '@/store/user';
import type { UserInfo } from '@/types/user';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { DatePicker } from '@/components/DatePicker';
import Radio from '@/components/Radio';
import { ArrowUpOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface EditUserValues {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    bio?: string;
    birthday?: string; // ISO 字符串 (yyyy-MM-dd)
}

interface EditUserProps {
    defaultValues?: Partial<EditUserValues>;
    onCancel?: () => void;
    submittingText?: string;
    submitText?: string;
    // Modal 相关
    open?: boolean;
    onClose?: () => void;
    title?: string;
}

const mapUserToValues = (user?: UserInfo | null): EditUserValues => ({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    avatar: user?.avatar ?? '',
    gender: (user?.gender as any) ?? undefined,
    bio: '',
    birthday: user?.createdAt ? '' : '',
});

const EditUser: React.FC<EditUserProps> = ({
    defaultValues,
    onCancel,
    submittingText = '保存中...',
    submitText = '保存',
    open = false,
    onClose,
    title = '编辑资料',
}) => {
    const { userInfo } = useUserStore();

    const initialValues = useMemo<EditUserValues>(() => {
        const fromStore = mapUserToValues(userInfo);
        return { ...fromStore, ...defaultValues } as EditUserValues;
    }, [userInfo, defaultValues]);

    const [values, setValues] = useState<EditUserValues>(initialValues);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (key: keyof EditUserValues, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: '' }));
        }
    };

    const validate = () => {
        const nextErrors: Record<string, string> = {};
        if (!values.name || values.name.trim().length === 0) {
            nextErrors.name = '昵称不能为空';
        }
        if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            nextErrors.email = '邮箱格式不正确';
        }
        if (values.phone && !/^[0-9\-+()\s]{6,20}$/.test(values.phone)) {
            nextErrors.phone = '手机号格式不正确';
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setSubmitting(true);

            const payload: Record<string, any> = {
                name: values.name,
                avatar: values.avatar || undefined,
                gender: values.gender || undefined,
                bio: values.bio || undefined,
                birthday: values.birthday ? new Date(values.birthday).toISOString() : undefined,
            };
            if (values.email && values.email.trim().length > 0) {
                payload.email = values.email.trim();
            }
            if (values.phone && values.phone.trim().length > 0) {
                payload.phone = values.phone.trim();
            }

            await updateUser(payload);
            await useUserStore.getState().getUserInfo();
            alert('保存成功');
            onCancel?.();
            onClose?.();
        } catch (err) {
            alert('保存失败，请稍后重试');
        } finally {
            setSubmitting(false);
        }
    };

    const formNode = (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl space-y-4">
            <div className="grid grid-cols-1 gap-[32px]">
                <div className="flex items-center">
                    <label className="w-[80px] mb-1 text-sm font-medium text-gray-700">头像</label>
                    <Upload
                        maxCount={1}
                        multiple={false}
                        accept="image/*"
                        showTip={false}
                        onChange={(files) => handleChange('avatar', files?.[0]?.url || '')}
                        onRemove={() => handleChange('avatar', '')}>
                        <div className="mt-2">
                            <div className="relative inline-block group">
                                {values.avatar ? (
                                    <img
                                        src={values.avatar}
                                        alt="avatar"
                                        className="w-14 h-14 rounded-full object-cover bg-gray-100"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-gray-100" />
                                )}
                                <div className="absolute inset-0 rounded-full bg-gray-100/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ArrowUpOnSquareIcon className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </div>
                    </Upload>
                </div>

                <Input
                    label="昵称"
                    labelWidth="80px"
                    placeholder="请输入昵称"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                />

                <div className="flex items-center">
                    <label
                        className="w-[80px] mb-1 text-sm font-medium text-gray-700"
                        htmlFor="birthday">
                        生日
                    </label>
                    <DatePicker
                        className="flex-1"
                        value={values.birthday ?? ''}
                        onChange={(value) => handleChange('birthday', value as string)}
                    />
                </div>

                <div className="flex items-center">
                    <Radio
                        labelWidth="80px"
                        label="性别"
                        options={[
                            { label: '男', value: 'MALE' },
                            { label: '女', value: 'FEMALE' },
                        ]}
                        value={values.gender ?? ''}
                        onChange={(value) => handleChange('gender', value as string)}
                    />
                </div>

                <Textarea
                    labelWidth="80px"
                    label="个性签名"
                    placeholder="写点关于你的介绍..."
                    value={values.bio ?? ''}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    error={errors.bio}
                />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                    type="submit"
                    disabled={submitting}>
                    {submitting ? submittingText : submitText}
                </Button>
            </div>
        </form>
    );

    return (
        <Modal
            visible={open}
            onClose={onClose ?? (() => {})}
            className="w-[600px]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <XMarkIcon
                    className="text-gray-500 hover:text-gray-700 w-5 h-5"
                    onClick={onClose}
                />
            </div>
            <div className="px-[32px] py-[20px] flex justify-between">{formNode}</div>
        </Modal>
    );
};

export default EditUser;
