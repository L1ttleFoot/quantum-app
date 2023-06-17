import React from 'react'
import { AppBar, Toolbar, Paper, Typography, Divider } from '@mui/material'
import './style.css'
import img1 from '../../../imges/Label1.png'
import img2 from '../../../imges/Label2.png'
import img3 from '../../../imges/Label3.png'
import img4 from '../../../imges/Label4.png'

const StartPage = () => {

    return (
        <div style={{ marginLeft: 60 }}>
            <AppBar style={{ background: 'white', position: 'absolute' }}>
                <Toolbar style={{ display: 'flex' }}>

                </Toolbar>
            </AppBar>

            <div>

                <Paper style={{ margin: 20, color: '#49acff', textShadow: '3px 4px #558ABB' }}>
                    <Typography variant="h2" style={{ textAlign: 'center' }} >
                        Институт квантовой физики
                    </Typography>
                </Paper>

                <Paper style={{ margin: 20, padding: 20, display: 'flex' }}>

                    <div style={{ textAlign: 'center', width: '50%' }} >
                        <Typography variant='h4' style={{ color: '#49acff', textShadow: '2px 3px #558ABB' }}>
                            ОБ ИНСТИТУТЕ
                        </Typography>

                        <p>
                            Институт квантовой физики создан в 2019 году на базе Иркутского национального исследовательского технического университета
                            и служит универсальной площадкой для проведения передовых исследований в области квантовой физики,
                            объединяя знания и опыт специалистов, работающих в ведущих российских и зарубежных научных организациях.
                        </p>

                        <p>
                            Приоритетом Института является проведение оригинальных исследований в области квантовой физики,
                            ориентированных в значительной степени на решение прикладных задач в области астрофизики,
                            физики атмосферы, газовой динамики, молекулярной физики и пр.
                            Развитие Института должно способствовать формированию и удовлетворению запроса на фундаментальные исследования в области квантовой физики,
                            в том числе, за счет развития школы теоретиков, создания современных лабораторий для экспериментальных исследований,
                            укрепления сотрудничества между ведущими учеными и научными центрами.
                        </p>
                    </div>

                    <Divider orientation='vertical' flexItem />

                    <div style={{ textAlign: 'center', width: '50%' }} >
                        <Typography variant='h4' style={{ color: '#49acff', textShadow: '2px 3px #558ABB' }}>
                            НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ
                        </Typography>

                        <div className='directions'>
                            <img src={img1} width="90" height="90" alt='logo' />

                            <div className='description'>
                                <div className={'main'}>МОДЕЛИРОВАНИЕ ФУНДАМЕНТАЛЬНЫХ ПРОЦЕССОВ</div>
                                <div className={'additional'}>РАЗВИТИЕ ТЕОРИИ И НОВЫХ МЕТОДОВ ДЛЯ РЕШЕНИЯ КВАНТОВОМЕХАНИЧЕСКИХ ПРОБЛЕМ МОЛЕКУЛЯРНОЙФИЗИКИ</div>
                            </div>
                        </div>

                        <div className='directions'>
                            <img src={img2} width="90" height="90" alt='logo' />

                            <div className='description'>
                                <div className={'main'}>АСТРОФИЗИКА</div>
                                <div className={'additional'}>ОПИСАНИЕ ЯВЛЕНИЙ, ПРОТЕКАЮЩИХ В МЕЖЗВЕЗДНЫХ ОБЛАКАХ, АТМОСФЕРАХ ЭКЗОПЛАНЕТ, ПЛАНЕТ СОЛНЕЧНОЙ СИСТЕМЫ, ВНУТРИ ХОЛОДНЫХ ЗВЕЗД</div>
                            </div>
                        </div>

                        <div className='directions'>
                            <img src={img3} width="90" height="90" alt='logo' />

                            <div className='description'>
                                <div className={'main'}>ГЛОБАЛЬНОЕ ПОТЕПЛЕНИЕ</div>
                                <div className={'additional'}>МОДЕЛИРОВАНИЕ ЭФФЕКТОВ РАДИАЦИОННОГО БАЛАНСА В АТМОСФЕРЕ ЗЕМЛИ И ИССЛЕДОВАНИЕ ФАКТОРОВ, ВЫЗЫВАЮЩИХ ПАРНИКОВЫЙ ЭФФЕКТ</div>
                            </div>
                        </div>

                        <div className='directions'>
                            <img src={img4} width="90" height="90" alt='logo' />

                            <div className='description'>
                                <div className={'main'}>АТОМЫ И МОЛЕКУЛЫ В ЭКСТРЕМАЛЬНЫХ УСЛОВИЯХ</div>
                                <div className={'additional'}>ИЗУЧЕНИЕ РАДИАЦИОННЫХ ПРОЦЕССОВ И ХИМИЧЕСКИХ ПРЕВРАЩЕНИЙ В МОЛЕКУЛЯРНЫХ ГАЗАХ ПРИ ЭКСТРЕМАЛЬНО ВЫСОКИХ ТЕМПЕРАТУРАХ И В УСЛОВИЯХ СВЕРХЗВУКОВЫХ ГАЗОВЫХ ПОТОКОВ</div>
                            </div>
                        </div>

                    </div>

                </Paper>

            </div>

        </div>
    )
}

export default StartPage