import { Space, Card, Divider, Button } from 'antd'
import './index.scss'

const Home = () => {

    const jumpToIntroduction = () => {
        document.querySelector('#introduction').scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        })
    }

    const jumpToReleaseInfo = () => {
        document.querySelector('#releaseInfo').scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        })
    }

    return (
        <div className='Home'>
            <section id='banner'>
                <h2 className='title'>PlantscRNAdb</h2>
                <p className='content'>A Database for Plant Single-cell RNA Analysis</p>
                <Space size='large'>
                    <Button ghost size='large' onClick={jumpToIntroduction}>Learn More</Button>
                    <Button ghost size='large' onClick={jumpToReleaseInfo}>Release Info</Button>
                </Space>
            </section>
            <Divider />
            <Card title='Introduction of PlantscRNAdb' className='card' id='introduction'>
                PlantscRNAdb is a database for plant single-cell RNA analysis, which includes eight species (Arabidopsis thaliana, Oryza sativa, Solanum lycopersicum, Zea mays, Fragaria vesca, Populus, Nicotiana attenuata and Lemna minuta).
            </Card>
            <Divider />
            <Card title='Release Info' className='card' id='releaseInfo'>
                Release Info
            </Card>
        </div>
    )
}

export default Home