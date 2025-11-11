import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './index.css';

const comments = [
    {
        avatar: '/src/assets/logo.png',
        name: '李明',
        content:
            'Finish Task Together 改变了我的任务协作方式！平台高效匹配可靠搭子，界面友好，社区支持也很棒。强烈推荐给需要合作的朋友！',
    },
    {
        avatar: '/src/assets/logo.png',
        name: '张强',
        content:
            '使用 Finish Task Together 让我高效完成了许多任务。平台简单易用，社区氛围好，很容易找到靠谱的搭子。',
    },
    {
        avatar: '/src/assets/logo.png',
        name: '王芳',
        content: '在这里认识了很多志同道合的朋友，大家互帮互助，合作愉快。推荐给想拓展社交圈的你！',
    },
];

const CommentsCarousel: React.FC = () => {
    return (
        <section className="testimonials-carousel">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="swiper-testimonials">
                {comments.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="testimonial-content ">
                            <img
                                className="avatar"
                                src={item.avatar}
                                alt={item.name}
                            />
                            <p className="testimonial-text">{item.content}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CommentsCarousel;
