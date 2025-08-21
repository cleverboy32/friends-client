import React, { useEffect, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import type { FRProps } from 'form-render';
import Button from '../../components/button';

const words = ['饭搭子', '游戏搭子', '自习搭子', '旅行搭子'];

// 字段类型
interface LoginFormData {
    nickname: string;
    email: string;
    phone: string;
    birthday: string;
    gender: string;
}

export default function Login() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const form = useForm();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    // JSON Schema
    const schema: FRProps['schema'] = {
        type: 'object',
        displayType: 'row',
        properties: {
            nickname: {
                type: 'string',
                required: true,
                minLength: 1,
                props: { placeholder: '请输入昵称' },
            },
            email: {
                type: 'string',
                format: 'email',
                required: true,
                props: { placeholder: '请输入邮箱' },
            },
            phone: {
                type: 'string',
                pattern: '^\\d{6,}$',
                required: true,
                props: { placeholder: '请输入电话' },
            },
            birthday: {
                type: 'string',
                format: 'date',
                required: true,
                props: { placeholder: '请选择生日' },
            },
            gender: {
                type: 'string',
                required: true,
                enum: ['男', '女', '其他'],
                enumNames: ['男', '女', '其他'],
                props: { placeholder: '请选择性别' },
                widget: 'select',
            },
        },
    };

    // 提交逻辑
    const onSubmit = (formData: LoginFormData) => {
        // 这里 form-render 已自动校验，若有错误不会触发 onFinish
        window.alert('登录信息：\n' + JSON.stringify(formData, null, 2));
        // 这里可替换为实际登录请求
    };

    return (
        <div className="min-h-screen w-full flex flex-col  bg-cover bg-center">
            {/* 顶部导航栏 */}
            <nav className="w-full flex items-center justify-between px-8 py-4 ">
                <div className="flex items-center space-x-1">
                    <img
                        src="/src/assets/logo.png"
                        alt="logo"
                        className="w-10 h-10"
                    />
                    <span className="text-3xl font-bold text-primary">
                        搭子
                    </span>
                </div>
            </nav>

            {/* 主体内容 */}
            <main className="flex-1 flex items-center justify-center mx-auto flex ">
                <div className=" flex flex-col items-center flex-1 bg-white rounded-lg p-12">
                    <p className="mb-6 text-center text-gray-700">
                        欢迎👏🏻，你的【
                        <span className="inline-block w-[160px] text-3xl border-b border-gray-400 align-middle transition-all duration-300 text-green-700 font-semibold">
                            {words[currentWordIndex]}
                        </span>
                        】正在等你 ~
                    </p>
                    <div className="mt-4 px-10 ">
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
                            className="py-2 rounded font-semibold  w-full"
                            onClick={() => form.submit()}
                        >
                            登录
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
