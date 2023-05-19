import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Painting = () => {
    const [images, setImages] = useState(null)
    const [value, setValue] = useState(null)
    const surpriseOption = [
        'A blue ostirch eating molon',
        'A matisse style shark on the telephone',
        'A pineapple synbathing on an island'
    ]
    const navigate = useNavigate()
    const getImages = async () => {
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    message: 'BLUGH'
                }),
                headers: {
                    "Content-type": "application/json",
                }
            }
            const response = await fetch('你自己的服务器', options)
            const data = await response.json()
            setImages(data)
        } catch (err) {
            console.error(err);
        }
    }
    // console.log(value);
    return (
        // <div className='parent'>
        //     <div className='app'>
        //         <section className='search-section'>
        //             <p style={{ color: 'black' }}>进行一段描述
        //                 <span className='surprise'>Surprise me</span>
        //             </p>
        //             <div className='input-container1'>
        //                 <input
        //                     placeholder='An impressionst oil painting of a sunflower in a purple vase...'
        //                     onChange={e => setValue(e.target.value)} />
        //                 <button className='button-painting' onClick={getImages}>生成</button>
        //             </div>
        //         </section>
        //         <section className='image-section'>
        //             {images?.map((image, index) => (
        //                 <img src={image.url} alt="图片加载失败" key={index} />
        //             ))}
        //         </section>
        //     </div>
        // </div>
        <div style={{ height: '100vh' }} id='paintingBox'>
            <div style={{ width: '100vw', color: 'black', fontSize: '0.3rem', textAlign: 'center' }}>AI绘画没有api暂未开发
            </div>
            <p style={{ color: 'red', textAlign: 'center', fontSize: '0.3rem' }} onClick={() => navigate('/speack')}>点击返回</p>
        </div>

    )
}

export default Painting