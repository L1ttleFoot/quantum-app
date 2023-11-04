from itertools import product, combinations_with_replacement
import numpy as np

VECTOR_INDEX = '0ijklxyzopqvcasdfghtremn'  # список возможных индексов
VECTOR_INDEX_MAP = {k: i for i, k in enumerate(VECTOR_INDEX)}  # словарь индексов


def INDEX(n: int, number_of_vibrational_degrees) -> list:
    ''' Индексы вектора vec, степени возмущения n, vec дб tuple для хэширования '''
    if n == -2: return [('0')]  # добавил так как в VECTOR_INDEX добавил 0
    return [''.join(i) for i in combinations_with_replacement(VECTOR_INDEX[1:number_of_vibrational_degrees+1], n+2)]


def VECTORS_m(n: int, vec, number_of_vibrational_degrees):
    '''генерирует список с возможными значениями k для вектора m_i=n_i+k_i, k_i принимает значение [-n:n] и сумма модулей k_i   меньше или равна n
    пример: element_index(1,(0,0))== [(-1, 0), (0, -1), (0, 0), (0, 1), (1, 0)]'''
    ''' Индексы элементов к которым будут применяться операторы '''
   # rng = range(-n,n+1)
    el = [i for i in product(range(-n, n+1), repeat=number_of_vibrational_degrees) if sum(map(abs, i)) <= n]
    el = np.array(el) + vec
    return list(map(tuple, el))
