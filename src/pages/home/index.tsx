import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import useUserStore from '@/store/user';
import { EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import bannerImg from '@/assets/banner.jpg';
import twoFriendsImg from '@/assets/two-friends.jpg';
import partyImg from '@/assets/party.jpg';
import runImg from '@/assets/run.jpg';
import tenFriendsImg from '@/assets/ten-friends.jpg';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const userInfo = useUserStore((state) => state.userInfo);

    return (
        <div className="w-full min-h-screen">
            <header></header>
            <section 
                className="flex flex-wrap items-center justify-center bg-no-repeat bg-[position:50%_20%] bg-cover py-12 px-[8vw] min-h-[600px] relative after:content-[''] after:absolute after:inset-0 after:bg-[rgba(227,252,232,0.25)] after:pointer-events-none max-[900px]:flex-col max-[900px]:px-[4vw] max-[900px]:py-9"
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <div className="z-10 text-center">
                    <h1 className="text-[4rem] max-[600px]:text-[2rem] m-0 mb-4 font-bold text-[#222]">寻找搭子</h1>
                    <p className="text-[1.5rem] mb-6 text-[#333]">结识志同道合的伙伴，通过「Finish Task Together」深化友谊并共同实现目标</p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={() => {
                                if (userInfo) {
                                    navigate('/discover');
                                } else {
                                    navigate('/login');
                                }
                            }}>
                            即刻加入！
                        </Button>
                        <Button
                            onClick={() => navigate('/discover')}>
                            发现活动
                        </Button>
                    </div>
                </div>
            </section>
            
            <section className="py-14 px-[8vw] max-[600px]:py-7 max-[600px]:px-[2vw]">
                <h2 className="text-[2rem] font-bold mb-8 text-[#222]">理想玩伴集</h2>
                <div className="flex justify-between gap-10 max-[900px]:flex-col max-[900px]:gap-[18px]">
                    <div className="flex-1 flex flex-col mb-6 max-[600px]:p-3">
                        <div className="mb-[18px]">
                            <img
                                src={twoFriendsImg}
                                alt="兴趣搭子匹配"
                                className="h-[250px] w-full object-cover rounded-xl"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-[#222] m-0">兴趣搭子匹配</h3>
                        <p className="m-0 text-[#444] text-base">寻找你的兴趣圈子，一起愉快搭伴！</p>
                    </div>
                    <div className="flex-1 flex flex-col mb-6 max-[600px]:p-3">
                        <div className="mb-[18px]">
                            <img
                                src={partyImg}
                                alt="party"
                                className="h-[250px] w-full object-cover rounded-xl"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-[#222] m-0">组局神器</h3>
                        <p className="m-0 text-[#444] text-base">随时开局加入身边真实社交，轻松结新朋友，拓展你的社交圈。</p>
                    </div>
                    <div className="flex-1 flex flex-col mb-6 max-[600px]:p-3">
                        <div className="mb-[18px]">
                            <img
                                src={runImg}
                                alt="originaze"
                                className="h-[250px] w-full object-cover rounded-xl"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-[#222] m-0">同城组队</h3>
                        <p className="m-0 text-[#444] text-base">探索并加入本地的兴趣社群</p>
                    </div>
                </div>
            </section>

            <section className="flex flex-wrap items-center justify-between py-14 pb-40 px-[8vw] max-[900px]:flex-col max-[900px]:py-9 max-[900px]:px-[4vw] max-[600px]:py-7 max-[600px]:px-[2vw]">
                <div className="mr-[100px] flex-1 max-[900px]:mr-0">
                    <h1 className="text-[2rem] font-bold mb-8 text-[#222]">地域好友联结</h1>
                    <p className="text-[1.1rem] text-[#333] mb-[18px]">
                        「Finish Task
                        Together」是立足线上线下的创新平台，致力于为用户匹配多样化兴趣与真实圈层，实时结识附近的好友和搭子资源。探索本地内容，拓展社交网络，展示自己的搭子需求和成果。平台智能推荐让搭伴更高效，让「组队玩乐」成为个人的生活方式。
                    </p>
                    <Button className="!bg-[#ffd166] hover:!bg-[#ffb700] !text-[#222] !border-none rounded-md px-7 py-2.5 text-base font-semibold cursor-pointer transition-colors">联系</Button>
                </div>
                <div className="max-[900px]:mt-6">
                    <img
                        src={tenFriendsImg}
                        alt="community"
                        className="w-[700px] h-[460px] max-w-full object-cover rounded-xl max-[900px]:h-auto"
                    />
                </div>
            </section>

            {/* 底部联系方式栏 */}
            <footer className="bg-white py-12 px-[8vw] border-t border-gray-100 flex justify-between items-end">
                <div className="flex flex-col flex-1">
                    <h2 className="font-bold mb-10 text-3xl text-gray-800">联系我 / 关注我</h2>
                    <div className="flex gap-10 text-lg  max-[600px]:flex-col max-[600px]:gap-4">
                        <a
                            href="https://github.com/cleverboy32"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 !text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub
                        </a>
                        <a
                            href="https://cleverboy32.github.io/Blog/#/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 !text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <GlobeAltIcon className="w-6 h-6" />
                            个人博客
                        </a>
                        <a
                            href="mailto:wuyunzhu.hdu@qq.com"
                            className="flex items-center gap-2 !text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <EnvelopeIcon className="w-6 h-6" />
                            发送邮件
                        </a>
                    </div>
                </div>
                <div className="text-sm text-gray-400 text-right">
                    © {new Date().getFullYear()} All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;