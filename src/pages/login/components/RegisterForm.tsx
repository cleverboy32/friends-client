import FormRender, { useForm } from 'form-render';
import type { FRProps } from 'form-render';
import Button from '@/components/button';
import useUserStore from '@/store/user';

interface RegisterFormData {
    name: string;
    password: string;
    email: string;
    phone: string;
}

interface Props {
    onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: Props) {
    const form = useForm();
    const { register, isLoading } = useUserStore();

    // JSON Schema
    const schema: FRProps['schema'] = {
        type: 'object',
        displayType: 'row',
        properties: {
            name: {
                title: '用户名',
                type: 'string',
                required: true,
                minLength: 1,
                props: {
                    placeholder: '请输入用户名',
                    autoComplete: 'name',
                },
            },
            password: {
                title: '密码',
                type: 'string',
                required: true,
                minLength: 6,
                props: {
                    placeholder: '请输入密码（至少6位）',
                    type: 'password',
                    autoComplete: 'new-password',
                },
            },
            email: {
                title: '邮箱',
                type: 'string',
                format: 'email',
                props: {
                    placeholder: '请输入邮箱',
                    autoComplete: 'email',
                },
            },
            phone: {
                title: '手机号',
                type: 'string',
                pattern: '^1[3-9]\\d{9}$',
                props: {
                    placeholder: '请输入手机号',
                    autoComplete: 'tel',
                },
            },
        },
    };

    // 提交逻辑
    const onSubmit = async (formData: RegisterFormData) => {
        try {
            await register(formData);
            // 注册成功后自动切换到登录页
            onSwitchToLogin();
        } catch (error) {
            // 错误已经被统一处理
            console.error('注册失败:', error);
        }
    };

    return (
        <div className="w-full">
            <FormRender
                form={form}
                schema={schema}
                displayType="row"
                onFinish={onSubmit}
                labelWidth={80}
                className="w-[400px]"
            />

            <Button
                type="button"
                className="py-2 rounded font-semibold w-full"
                onClick={() => form.submit()}
                disabled={isLoading}>
                {isLoading ? '注册中...' : '注册'}
            </Button>

            <div className="mt-4 text-center">
                <button
                    onClick={onSwitchToLogin}
                    className="text-primary hover:text-primary-dark">
                    已有账号？立即登录
                </button>
            </div>
        </div>
    );
}
