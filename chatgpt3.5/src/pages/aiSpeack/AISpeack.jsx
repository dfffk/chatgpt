import React, { useEffect, useState } from 'react'
import './newAi.less'
import { MenuOutlined, EditOutlined, LoadingOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button } from '@chatui/core'
import { useNavigate } from 'react-router-dom'
import keli from './keli.jpg'
import qintuanzhang from './qin.jpg'
import axios from 'axios'
const AISpeack = () => {
    //切换绘画与聊天
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [previousChats, setPreviousChats] = useState([])
    const [currentTitle, setCurrentTitle] = useState(null)

    const creatNewChat = () => {
        setMessage(null)
        setValue('')
        setCurrentTitle(null)
        setOpenSide('none')
        setLoadingIcon('none')
    }

    const handClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle)
        setMessage(null)
        setValue('')
        setOpenSide('none')
    }

    const getMessages = async () => {
        if (value) {
            setLoadingIcon('flex');
            const options = {
                method: 'POST',
                data: {
                    message: value
                },
                headers: {
                    "Content-Type": "application/json",
                }
            };
            try {
                const response = await axios('你自己的服务器地址', options);
                const data = response.data;
                setMessage(data.data.choices[0].message);
                setLoadingIcon('none');
            } catch (err) {
                console.log(err);
            }
        } else {
            setValueIsNone('block');
        }
    }

    useEffect(() => {
        if (!currentTitle && value && message) {
            setCurrentTitle(value)
        }
        if (currentTitle && value && message) {
            setPreviousChats(previousChats => (
                [...previousChats,
                {
                    title: currentTitle,
                    role: 'user',
                    content: value
                },
                {
                    title: currentTitle,
                    role: message.role,
                    content: message.content
                }
                ]
            ))
        }
    }, [message, currentTitle])

    const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(item => item.title)))

    //打开关闭菜单
    const [openSide, setOpenSide] = useState('none')
    const openClose = async () => {
        if (openSide === 'block') {
            setOpenSide('none')
        } else {
            setOpenSide('block')
        }
    }

    const [valueIsNone, setValueIsNone] = useState('none')
    const [password, setPassword] = useState('block')
    const [loadingIcon, setLoadingIcon] = useState('none')
    useEffect(() => {
        if (localStorage.getItem('password') === 'none') {
            setPassword('none')
        }
    }, [])
    return (
        <div id='aiAsk'>
            <div className='password' style={{ display: password }}>
                <input type="text" style={{ backgroundColor: '#aaa', margin: '40% auto 0', display: 'block', width: '30vw', borderRadius: '0.2rem', color: '#000' }} onChange={(e) => {
                    if (e.target.value === 'none') {
                        setPassword('none')
                        localStorage.setItem('password', 'none');
                        e.target.value = ''
                    }
                }} />
                <div style={{ margin: '0.2rem auto', textAlign: 'center', color: 'red', fontSize: '0.15rem' }}>请输入密码</div>
                <div style={{
                    width: '60%', margin: '0.3rem auto 0', color: 'black', fontSize: '0.15rem'
                }}>
                    特别说明：<br />
                    1、本作未经训练，只能回答基础简单问题，如遇到提问很久没有反应，请直接刷新页面或new chat<br /><br />
                    2、由于api限制，频繁提问会导致连接失败，最多3次/分钟<br /><br />
                    3、历史记录一次new chat只储存一次，一旦刷新就会清空
                    <br /><br />
                    4、返回此页面在菜单底部,页面没有做适配请用手机查看
                    <br /><br />
                    5、需要页面源码请(github)<a href="你自己的链接地址" target='_blank' style={{ color: 'rgba(39, 168, 245, 0.8)' }}>点击此处</a>
                </div>
            </div>
            <div className='aiSpeack'>
                <section className='side-bar' style={{ display: openSide }}>
                    <button onClick={creatNewChat}>+ New chat</button>
                    <p style={{ textAlign: 'center', fontSize: '0.15rem', padding: '0.1rem', marginTop: '0.4rem', marginBottom: '0', borderBottom: '0.01rem solid #ccc' }}>历史记录</p>
                    <div style={{ overflowX: 'hidden' }}>
                        <ul className='history'>
                            {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handClick(uniqueTitle)} style={{ textAlign: 'center' }}>{uniqueTitle}</li>)}
                        </ul>
                    </div>
                    <nav style={{ margin: '0' }}>
                        <p style={{ textAlign: 'center', padding: '0.05rem 0.1rem', margin: '0', fontSize: '0.1rem' }}>Made by huise <span style={{ color: '#3399ff', marginLeft: '0.2rem' }} onClick={() => {
                            localStorage.clear()
                            setPassword('block')
                        }}>点击返回到输入密码页面</span></p>
                    </nav>
                </section>
                <section className='main'>
                    <div style={{ position: 'fixed', top: '40vh', left: '40vw', width: '20vw', height: '20vw', backgroundColor: 'rgba(39, 168, 245, 0.4)', borderRadius: '0.1rem', display: loadingIcon, alignItems: 'center', justifyContent: 'center' }}>
                        <LoadingOutlined style={{ fontSize: '0.3rem', }} />
                    </div>
                    <EditOutlined style={{ position: 'absolute', top: '0.2rem', right: '0.2rem', color: '#fff', fontSize: '0.2rem', cursor: 'pointer' }} onClick={() => {
                        navigate('/painting')
                    }} />
                    <ReloadOutlined style={{ position: 'absolute', top: '0.2rem', left: '0.7rem', color: '#fff', fontSize: '0.2rem', cursor: 'pointer' }} onClick={() => {
                        window.location.reload()
                    }} />
                    <MenuOutlined style={{ position: 'absolute', top: '0.2rem', left: '0.2rem', color: '#fff', fontSize: '0.2rem' }} onClick={openClose} />
                    <h1 style={{ fontSize: '0.2rem' }} >ChatGPT3.5</h1>
                    <div style={{ overflowX: 'hidden', width: '100%', height: '100%' }}>
                        <ul className='feed'>
                            {currentChat.map((item, index) => {
                                if (item.role === 'user') {
                                    return <li key={index}>
                                        <p style={{ width: '50%', fontSize: '0.15rem', minHeight: '0.5rem', backgroundColor: 'black', marginLeft: '28%', marginTop: '0.5rem', padding: '0.1rem', color: '#fff' }}>{item.content}</p>
                                        <img style={{ display: 'block', width: '0.4rem', height: '0.4rem', borderRadius: '50%', margin: '0.2rem 0.2rem 0 0 ' }} src={keli} alt="" />
                                    </li>
                                } else {
                                    return <li key={index}>
                                        <img style={{ display: 'block', width: '0.4rem', height: '0.4rem', borderRadius: '50%', margin: '0.2rem 0 0 0.2rem' }} src={qintuanzhang} alt="" />
                                        <p style={{ width: '50%', fontSize: '0.15rem', padding: '0.1rem', minHeight: '0.5rem', backgroundColor: '#fff', color: 'black', marginRight: '28%', marginTop: '0.5rem', }}>{item.content}</p>
                                    </li>
                                }
                            })}
                        </ul>
                    </div>
                    <div className='bottom-section'>
                        <div className='input-container'>
                            <div style={{ position: 'absolute', letterSpacing: '0.02rem', width: '100%', top: '-0.2rem', color: '#FF3333', fontSize: '0.1rem', textAlign: 'center', display: valueIsNone }}>
                                请输入内容
                            </div>
                            <input value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setValueIsNone('none')} />
                            <Button id='submit' onClick={getMessages}>send</Button>
                        </div>
                        <p className='info'>
                            你自己的备案号
                        </p>
                    </div>
                </section >
            </div >

        </div>
    )
}

export default AISpeack