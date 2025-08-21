import React from 'react';
import './home.css';
import CommentsCarousel from './components/comment-carousel';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <header></header>
            <section className="banner">
                <div className="banner-content">
                    <h1>寻找搭子</h1>
                    <p>
                        结识志同道合的伙伴，通过「Finish Task
                        Together」深化友谊并共同实现目标
                    </p>
                    <div className="flex gap-4">
                        <Button
                            className="join-btn"
                            onClick={() => navigate('/login')}
                        >
                            即刻加入！
                        </Button>
                        <Button
                            className="discover-btn"
                            onClick={() => navigate('/discover')}
                        >
                            发现活动
                        </Button>
                    </div>
                </div>
            </section>
            <section className="features">
                <h2>理想玩伴集</h2>
                <div className="flex justify-between gap-10">
                    <div className="flex-1">
                        <div className="feature-img-placeholder">
                            <img
                                src="/src/assets/two-friends.jpg"
                                alt="兴趣搭子匹配"
                                className="h-[250px]"
                            />
                        </div>
                        <h3 className="text-2xl font-bold">兴趣搭子匹配</h3>
                        <p>寻找你的兴趣圈子，一起愉快搭伴！</p>
                    </div>
                    <div className="flex-1">
                        <div className="feature-img-placeholder">
                            <img
                                src="/src/assets/party.jpg"
                                alt="party"
                                className="h-[250px]"
                            />
                        </div>
                        <h3 className="text-2xl font-bold">组局神器</h3>
                        <p>
                            随时开局加入身边真实社交，轻松结新朋友，拓展你的社交圈。
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className="feature-img-placeholder">
                            <img
                                src="/src/assets/run.jpg"
                                alt="originaze"
                                className="h-[250px]"
                            />
                        </div>
                        <h3 className="text-2xl font-bold">同城组队</h3>
                        <p>探索并加入本地的兴趣社群</p>
                    </div>
                </div>
            </section>

            <section className="community">
                <div className="community-content">
                    <h1>地域好友联结</h1>
                    <p>
                        「Finish Task
                        Together」是立足四川本地的创新平台，致力于为用户匹配多样化兴趣与真实圈层，实时结识附近的好友和搭子资源。探索本地内容，拓展社交网络，展示自己的搭子需求和成果。平台智能推荐让搭伴更高效，让「组队玩乐」成为个人的生活方式。
                    </p>
                    <Button className="contact-btn">联系</Button>
                </div>
                <div className="community-img-placeholder">
                    <img src="/src/assets/ten-friends.jpg" alt="community" />
                </div>
            </section>

            <section className="instagram">
                <h2>Instagram</h2>
                <p className="insta-tip">请连接你的Instagram账号以展示动态。</p>
                <div className="insta-grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div className="insta-placeholder" key={i}></div>
                    ))}
                </div>
            </section>

            <footer className="flex flex-col bg-[linear-gradient(0deg,var(--color-theme),#fff,var(--color-bg-theme))]">
                <CommentsCarousel />
                <div className="text-right text-4xl font-bold pb-10 pr-10 text-[var(--color-dark-theme)]">
                    搭子
                </div>
            </footer>
        </div>
    );
};

export default Home;
