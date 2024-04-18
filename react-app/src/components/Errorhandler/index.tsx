import React from 'react';
import classes from './errorHandler.module.css';

interface IError {
    code: number;
}

export const ErrorHandler: React.FC<IError> = ({code}) => {
    return (
        <div className={classes.wrapper}>
            <h1>Упс, произошла ошибка</h1>
            <div>Сервер не отвечает</div>
        </div>
    );
};
