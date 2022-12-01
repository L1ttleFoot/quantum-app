from itertools import product, combinations_with_replacement
import numpy as np
import sympy as sy
from functools import reduce
from math import factorial
import copy

VECTOR_INDEX = '0ijklxyzopqvcasdfghtremn' # список возможных индексов
VECTOR_INDEX_MAP = {k:i for i,k in enumerate(VECTOR_INDEX)} # словарь индексов

def INDEX(n:int, number_of_vibrational_degrees)->list:
    ''' Индексы вектора vec, степени возмущения n, vec дб tuple для хэширования '''
    if n==-2:return [('0')] # добавил так как в VECTOR_INDEX добавил 0
    
    return [''.join(i) for i in combinations_with_replacement(VECTOR_INDEX[1:number_of_vibrational_degrees+1], n+2) ]    

def VECTORS_m(n:int, vec, number_of_vibrational_degrees):
  '''генерирует список с возможными значениями k для вектора m_i=n_i+k_i, k_i принимает значение [-n:n] и сумма модулей k_i   меньше или равна n
  пример: element_index(1,(0,0))== [(-1, 0), (0, -1), (0, 0), (0, 1), (1, 0)]'''
  ''' Индексы элементов к которым будут применяться операторы '''
 # rng = range(-n,n+1)
  el = [i for i in product(range(-n,n+1), repeat=number_of_vibrational_degrees) if sum(map(abs,i)) <=n]
  el = np.array(el) + vec
  return list(map(tuple,el))

def factor_k(str):
  return(2**(-len(str)/2))

def factor_fi(str):
  unique = dict(zip(list(str),[factorial(list(str).count(i)) for i in list(str)]))
  return(2**(-len(str)/2)/reduce(lambda a, b : a * b, unique.values()))

def dict_gen(n, omega, const, constType):

  n_list={}
  for i in range(len(n)):
    #n_list[sy.symbols('n_'+str(n[i]['letIndex']))]=int(n[i]['value'])
    n_list[sy.symbols('n_'+str(n[i]['letIndex']))]=0

  omega_list={}
  for i in range(len(omega)):
    omega_list[sy.symbols('omega_'+str(omega[i]['letIndex']))]=float(omega[i]['value'])

  const_changed=copy.deepcopy(const)
  if constType=='k':
    list(map(lambda x: x.update(value=float(x['value'])*factor_k(x['letIndex'])),const_changed))
  elif constType=='fi':
    list(map(lambda x: x.update(value=float(x['value'])*factor_fi(x['letIndex'])),const_changed))

  const_list_changed={}
  for i in range(len(const_changed)):
    const_list_changed[sy.symbols('A_'+str(const_changed[i]['letIndex']))]=float(const_changed[i]['value'])

  D_0=sy.symbols('D_0')

  d_list={D_0:0}

  complete_dict = {**n_list, **omega_list, **const_list_changed, **d_list}
  
  return complete_dict