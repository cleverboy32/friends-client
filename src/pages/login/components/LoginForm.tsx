import FormRender, { useForm } from 'form-render';
import type { FRProps } from 'form-render';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button';
import useUserStore from '@/store/user';
import LiquidGlassButton from '@/components/liquid';

interface LoginFormData {
    name: string;
    password: string;
}

interface Props {
    onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: Props) {
    const form = useForm();
    const navigate = useNavigate();
    const { login, isLoading } = useUserStore();

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
                    placeholder: '请输入密码',
                    type: 'password',
                    autoComplete: 'current-password',
                },
            },
        },
    };

    // 提交逻辑
    const onSubmit = async (formData: LoginFormData) => {
        try {
            await login(formData);
            // 登录成功，跳转到首页
            navigate('/discover');
        } catch (error) {
            // 错误已经被统一处理
            console.error('登录失败:', error);
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
            />

            <div className=" text-center">
                <LiquidGlassButton
                    height={40}
                    width={window.innerWidth - 64}
                    borderRadius={20}
                    surfaceType="squircle"
                    onClick={() => form.submit()}
                    glassThickness={0.2}
                    bezelWidth={0.38}>
                    <span className="text-white text-[20px]">
                        {isLoading ? '登录中...' : '登录'}
                    </span>
                </LiquidGlassButton>
                <button
                    onClick={onSwitchToRegister}
                    className="text-primary hover:text-primary-dark mt-4">
                    还没有账号？立即注册
                </button>
            </div>
        </div>
    );
}
