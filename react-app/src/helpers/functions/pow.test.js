import {pow} from './pow'

test('Возведенеи в степень', ()=>{
    expect(pow(1,2)).toBe(1)
})

describe('Возведения в степень', () => {
    
    test('Возведенеи в степень 2', ()=>{
        expect(pow(3,2)).toBe(9)
    })
    test('Возведенеи в степень 3', ()=>{
        expect(pow(4,2)).toBe(16)
    })
    test('Возведенеи в степень 4', ()=>{
        expect(pow(5,2)).toBe(25)
    })
})